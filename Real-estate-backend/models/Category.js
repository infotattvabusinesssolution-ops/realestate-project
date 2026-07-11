import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Please specify category type (e.g. Residential, Commercial)'],
      enum: ['Residential', 'Commercial'],
    },
    name: {
      type: String,
      required: [true, 'Please specify category name (e.g. Apartment, Villa)'],
      trim: true,
      unique: true,
    },
    nameAr: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Active', 'Deactive'],
      default: 'Active',
    },
    serial: {
      type: Number,
      required: [true, 'Please specify serial number'],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
