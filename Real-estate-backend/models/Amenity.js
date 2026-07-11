import mongoose from 'mongoose';

const amenitySchema = new mongoose.Schema(
  {
    iconName: {
      type: String,
      default: 'Award',
    },
    name: {
      type: String,
      required: [true, 'Please specify amenity name (e.g. Security, Gym)'],
      trim: true,
      unique: true,
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

const Amenity = mongoose.model('Amenity', amenitySchema);
export default Amenity;
