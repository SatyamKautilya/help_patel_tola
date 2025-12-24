import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    categoryId: {
      type: String,
      default: '',
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    sender: {
      type: String,
      enum: ['user', 'bot'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

chatMessageSchema.index({ sessionId: 1, timestamp: 1 });
chatMessageSchema.index({ userId: 1, timestamp: -1 });

export default mongoose.models.ChatMessage || mongoose.model('ChatMessage', chatMessageSchema);
