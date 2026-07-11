import mongoose from 'mongoose';

const citySchema = new mongoose.Schema(
  {
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: true,
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please specify city name'],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
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

// Compound unique key
citySchema.index({ state: 1, name: 1 }, { unique: true });

const City = mongoose.model('City', citySchema);
export default City;
