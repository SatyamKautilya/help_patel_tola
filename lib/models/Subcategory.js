import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    categoryId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

subcategorySchema.index({ categoryId: 1, createdAt: -1 });

export default mongoose.models.Subcategory || mongoose.model('Subcategory', subcategorySchema);
