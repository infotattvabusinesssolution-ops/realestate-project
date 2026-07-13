import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a blog title'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please add a blog category'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please add blog content'],
    },
    author: {
      type: String,
      required: [true, 'Please add an author'],
      trim: true,
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80',
    },
    serialNumber: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'Deactive'],
      default: 'Active',
    },
    metaKeywords: {
      type: String,
      default: '',
    },
    metaDescription: {
      type: String,
      default: '',
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

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
