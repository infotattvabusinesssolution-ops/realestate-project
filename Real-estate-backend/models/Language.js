import mongoose from 'mongoose';

const languageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a language name'],
    },
    code: {
      type: String,
      required: [true, 'Please add a language code'],
      unique: true,
    },
    direction: {
      type: String,
      enum: ['LTR', 'RTL'],
      default: 'LTR',
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    keywords: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Language = mongoose.model('Language', languageSchema);
export default Language;
