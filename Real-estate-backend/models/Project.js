import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a project name'],
      trim: true,
    },
    builder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      type: String,
      required: [true, 'Please add a project location'],
    },
    units: {
      type: String,
      required: [true, 'Please specify units availability (e.g. 120 Units Available, Sold Out 80%)'],
    },
    status: {
      type: String,
      required: [true, 'Please specify project status'],
      enum: ['Under Construction', 'Pre-launching', 'Ready to Move', 'Complete'],
      default: 'Under Construction',
    },
    approvalStatus: {
      type: String,
      enum: ['Approved', 'Pending', 'Rejected'],
      default: 'Pending',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: '',
    },
    minPrice: {
      type: String,
      default: '',
    },
    maxPrice: {
      type: String,
      default: '',
    },
    latitude: { type: String, default: '' },
    longitude: { type: String, default: '' },
    features: [
      {
        labelEn: String,
        valueEn: String,
        labelAr: String,
        valueAr: String,
        label: String,
        value: String,
      },
    ],
    gallery: [
      {
        type: String,
      },
    ],
    floorPlans: [
      {
        type: String,
      },
    ],
    documents: [
      {
        name: String,
        url: String,
      },
    ],
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    metaKeywords: {
      type: String,
      default: '',
    },
    metaDesc: {
      type: String,
      default: '',
    },
    titleAr: {
      type: String,
      default: '',
    },
    addressAr: {
      type: String,
      default: '',
    },
    descriptionAr: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
