import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Category from '@/lib/models/Category';
import Subcategory from '@/lib/models/Subcategory';
import ChatMessage from '@/lib/models/ChatMessage';
import { generateChatResponse } from '@/lib/openai';
import { v4 as uuidv4 } from 'uuid';

// Helper function to get path segments
function getPathSegments(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/', '').replace('/api', '');
  return path ? path.split('/').filter(Boolean) : [];
}

// GET handler
export async function GET(request) {
  try {
    await connectToDatabase();
    const segments = getPathSegments(request);
    const { searchParams } = new URL(request.url);

    // GET /api/categories - Get all categories
    if (segments[0] === 'categories' && segments.length === 1) {
      const categories = await Category.find({}).sort({ createdAt: 1 });
      return NextResponse.json({ categories });
    }

    // GET /api/subcategories?categoryId=X - Get subcategories by category
    if (segments[0] === 'subcategories' && segments.length === 1) {
      const categoryId = searchParams.get('categoryId');
      if (!categoryId) {
        return NextResponse.json(
          { error: 'categoryId is required' },
          { status: 400 }
        );
      }
      const subcategories = await Subcategory.find({ categoryId }).sort({ createdAt: 1 });
      return NextResponse.json({ subcategories });
    }

    // GET /api/chat/history?sessionId=X - Get chat history
    if (segments[0] === 'chat' && segments[1] === 'history') {
      const sessionId = searchParams.get('sessionId');
      const userId = searchParams.get('userId');
      
      if (!sessionId || !userId) {
        return NextResponse.json(
          { error: 'sessionId and userId are required' },
          { status: 400 }
        );
      }

      const messages = await ChatMessage.find({ sessionId, userId })
        .sort({ timestamp: 1 })
        .lean();

      return NextResponse.json({ messages });
    }

    // GET /api/seed - Seed initial data
    if (segments[0] === 'seed' && segments.length === 1) {
      // Check if already seeded
      const existingCategories = await Category.countDocuments();
      if (existingCategories > 0) {
        return NextResponse.json({ message: 'Database already seeded' });
      }

      // Seed categories
      const categories = [
        { id: uuidv4(), name: 'Health', icon: '🏥', description: 'Health and wellness topics' },
        { id: uuidv4(), name: 'Economy', icon: '💰', description: 'Economic and financial matters' },
        { id: uuidv4(), name: 'Education', icon: '📚', description: 'Education and learning resources' },
        { id: uuidv4(), name: 'Moral Values', icon: '⚖️', description: 'Ethics and moral guidance' },
        { id: uuidv4(), name: 'Employment', icon: '💼', description: 'Job opportunities and career guidance' },
      ];

      await Category.insertMany(categories);

      // Seed subcategories for each category
      const subcategories = [];
      categories.forEach((category) => {
        for (let i = 1; i <= 5; i++) {
          subcategories.push({
            id: uuidv4(),
            categoryId: category.id,
            name: `${category.name} Topic ${i}`,
            description: `Placeholder description for ${category.name} topic ${i}`,
          });
        }
      });

      await Subcategory.insertMany(subcategories);

      return NextResponse.json({ 
        message: 'Database seeded successfully',
        categoriesCount: categories.length,
        subcategoriesCount: subcategories.length
      });
    }

    return NextResponse.json({ message: 'API is working' });

  } catch (error) {
    console.error('API GET Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(request) {
  try {
    await connectToDatabase();
    const segments = getPathSegments(request);
    const body = await request.json();

    // POST /api/chat - Context-aware chatbot
    if (segments[0] === 'chat' && segments.length === 1) {
      const { message, sessionId, userId, categoryId, categoryName } = body;

      if (!message || !sessionId || !userId) {
        return NextResponse.json(
          { error: 'message, sessionId, and userId are required' },
          { status: 400 }
        );
      }

      // Get previous messages for context
      const previousMessages = await ChatMessage.find({ sessionId, userId })
        .sort({ timestamp: 1 })
        .limit(10)
        .lean();

      const conversationHistory = previousMessages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content,
      }));

      const systemPrompt = `You are a helpful AI assistant for a mobile application focused on various life topics including Health, Economy, Education, Moral Values, and Employment. Provide clear, concise, and helpful responses.`;

      // Generate AI response with category context
      const aiResponse = await generateChatResponse(
        [
          ...conversationHistory,
          {
            role: 'user',
            content: message,
          },
        ],
        systemPrompt,
        categoryName || ''
      );

      // Save user message
      await ChatMessage.create({
        id: uuidv4(),
        sessionId,
        userId,
        categoryId: categoryId || '',
        sender: 'user',
        content: message,
        timestamp: new Date(),
      });

      // Save bot response
      await ChatMessage.create({
        id: uuidv4(),
        sessionId,
        userId,
        categoryId: categoryId || '',
        sender: 'bot',
        content: aiResponse,
        timestamp: new Date(),
      });

      return NextResponse.json({ response: aiResponse });
    }

    // POST /api/categories - Create category
    if (segments[0] === 'categories' && segments.length === 1) {
      const { name, icon, description } = body;
      if (!name) {
        return NextResponse.json({ error: 'name is required' }, { status: 400 });
      }

      const category = await Category.create({
        id: uuidv4(),
        name,
        icon: icon || '📋',
        description: description || '',
      });

      return NextResponse.json({ category }, { status: 201 });
    }

    // POST /api/subcategories - Create subcategory
    if (segments[0] === 'subcategories' && segments.length === 1) {
      const { categoryId, name, description } = body;
      if (!categoryId || !name) {
        return NextResponse.json(
          { error: 'categoryId and name are required' },
          { status: 400 }
        );
      }

      const subcategory = await Subcategory.create({
        id: uuidv4(),
        categoryId,
        name,
        description: description || '',
      });

      return NextResponse.json({ subcategory }, { status: 201 });
    }

    return NextResponse.json({ error: 'Invalid endpoint' }, { status: 404 });

  } catch (error) {
    console.error('API POST Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
