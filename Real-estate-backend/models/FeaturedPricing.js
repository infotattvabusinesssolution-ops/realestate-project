import mongoose from 'mongoose';

const featuredPricingSchema = new mongoose.Schema(
  {
    days: {
      type: Number,
      required: [true, 'Please add number of days'],
    },
    cost: {
      type: String,
      required: [true, 'Please add cost'],
    },
    status: {
      type: String,
      enum: ['Active', 'Deactive'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

const FeaturedPricing = mongoose.model('FeaturedPricing', featuredPricingSchema);
export default FeaturedPricing;
