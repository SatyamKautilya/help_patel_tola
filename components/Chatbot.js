'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/chatbot.module.scss';
import { v4 as uuidv4 } from 'uuid';

export default function Chatbot({ categoryId, categoryName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Initialize user and session IDs
    if (typeof window !== 'undefined') {
      let uid = localStorage.getItem('userId');
      if (!uid) {
        uid = uuidv4();
        localStorage.setItem('userId', uid);
      }
      setUserId(uid);

      let sid = sessionStorage.getItem('chatSessionId');
      if (!sid) {
        sid = uuidv4();
        sessionStorage.setItem('chatSessionId', sid);
      }
      setSessionId(sid);
    }
  }, []);

  useEffect(() => {
    // Load chat history when opening
    if (isOpen && sessionId && userId) {
      loadChatHistory();
    }
  }, [isOpen, sessionId, userId]);

  const loadChatHistory = async () => {
    try {
      const response = await fetch(`/api/chat/history?sessionId=${sessionId}&userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: uuidv4(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue,
          sessionId,
          userId,
          categoryId: categoryId || '',
          categoryName: categoryName || '',
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      const botMessage = {
        id: uuidv4(),
        sender: 'bot',
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: uuidv4(),
        sender: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button className={styles.chatbotButton} onClick={() => setIsOpen(true)}>
        💬
      </button>

      {isOpen && (
        <div className={styles.chatModal} onClick={() => setIsOpen(false)}>
          <div className={styles.chatContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.chatHeader}>
              <h2 className={styles.chatTitle}>
                {categoryName ? `Chat about ${categoryName}` : 'AI Assistant'}
              </h2>
              <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>

            <div className={styles.chatMessages}>
              {messages.length === 0 ? (
                <div className={styles.emptyMessages}>
                  <p>Start a conversation! Ask me anything{categoryName ? ` about ${categoryName}` : ''}.</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${styles.message} ${message.sender === 'user' ? styles.messageUser : styles.messageBot}`}
                  >
                    <div
                      className={`${styles.messageBubble} ${message.sender === 'user' ? styles.messageBubbleUser : styles.messageBubbleBot}`}
                    >
                      <p className={styles.messageText}>{message.content}</p>
                      <span className={styles.messageTime}>
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}

              {isLoading && (
                <div className={`${styles.message} ${styles.messageBot}`}>
                  <div className={`${styles.messageBubble} ${styles.messageBubbleBot}`}>
                    <div className={styles.loadingDots}>
                      <div className={styles.dot}></div>
                      <div className={styles.dot}></div>
                      <div className={styles.dot}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.chatInput}>
              <textarea
                className={styles.inputField}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                rows={1}
                disabled={isLoading}
              />
              <button
                className={styles.sendButton}
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
