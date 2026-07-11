import mongoose from 'mongoose';

const projectTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a project type name'],
      trim: true,
    },
    minPrice: {
      type: String,
      default: '$0.00',
    },
    minArea: {
      type: String,
      default: '0',
    },
    totalUnit: {
      type: Number,
      default: 0,
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

const ProjectType = mongoose.model('ProjectType', projectTypeSchema);
export default ProjectType;
