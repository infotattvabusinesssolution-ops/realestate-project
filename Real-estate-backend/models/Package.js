import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a package title'],
      trim: true,
    },
    price: {
      type: String,
      required: [true, 'Please add a package price'],
    },
    term: {
      type: String,
      enum: ['Lifetime', 'Yearly', 'Monthly'],
      default: 'Lifetime',
    },
    agents: {
      type: Number,
      default: 0,
    },
    properties: {
      type: Number,
      default: 0,
    },
    galleryPerProp: {
      type: Number,
      default: 0,
    },
    featuresPerProp: {
      type: Number,
      default: 0,
    },
    projects: {
      type: Number,
      default: 0,
    },
    typesPerProj: {
      type: Number,
      default: 0,
    },
    galleryPerProj: {
      type: Number,
      default: 0,
    },
    featuresPerProj: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model('Package', packageSchema);
export default Package;
