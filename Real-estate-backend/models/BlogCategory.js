import mongoose from 'mongoose';

const blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Deactive'],
      default: 'Active',
    },
    serialNumber: {
      type: Number,
      default: 0,
    },
    language: {
      type: String,
      default: 'English',
    },
  },
  {
    timestamps: true,
  }
);

const BlogCategory = mongoose.model('BlogCategory', blogCategorySchema);
export default BlogCategory;
