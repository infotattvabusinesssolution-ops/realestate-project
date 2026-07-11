import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please specify country name'],
      trim: true,
      unique: true,
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

const Country = mongoose.model('Country', countrySchema);
export default Country;
