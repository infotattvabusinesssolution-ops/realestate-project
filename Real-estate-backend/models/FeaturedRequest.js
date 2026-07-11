import mongoose from 'mongoose';

const featuredRequestSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pricing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeaturedPricing',
    },
    txnNo: {
      type: String,
      default: function () {
        return '#' + Math.random().toString(16).slice(2, 10);
      },
    },
    payVia: {
      type: String,
      default: 'Manual',
    },
    paymentStatus: {
      type: String,
      enum: ['Complete', 'Pending', 'Failed'],
      default: 'Pending',
    },
    receipt: {
      type: String,
      default: '-',
    },
    featuredStatus: {
      type: String,
      enum: ['Featured', 'Pending', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const FeaturedRequest = mongoose.model('FeaturedRequest', featuredRequestSchema);
export default FeaturedRequest;
