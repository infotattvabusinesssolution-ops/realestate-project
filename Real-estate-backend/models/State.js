import mongoose from 'mongoose';

const stateSchema = new mongoose.Schema(
  {
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please specify state name'],
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
stateSchema.index({ country: 1, name: 1 }, { unique: true });

const State = mongoose.model('State', stateSchema);
export default State;
