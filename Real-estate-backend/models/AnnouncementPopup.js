import mongoose from 'mongoose';

const announcementPopupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a popup name'],
      trim: true,
    },
    type: {
      type: String,
      default: 'Type - 7',
    },
    bgColor: {
      type: String,
      required: [true, 'Please specify background color code'],
      default: '#ffffff',
    },
    bgOpacity: {
      type: Number,
      required: [true, 'Please specify background opacity level'],
      default: 1.0,
    },
    title: {
      type: String,
      required: [true, 'Please add a popup title'],
      trim: true,
    },
    text: {
      type: String,
      required: [true, 'Please add popup body text'],
    },
    btnText: {
      type: String,
      default: '',
    },
    btnColor: {
      type: String,
      default: '',
    },
    delay: {
      type: Number,
      required: [true, 'Please specify popup delay in seconds'],
      default: 0,
    },
    serialNumber: {
      type: Number,
      required: [true, 'Please specify serial number'],
      default: 0,
    },
    language: {
      type: String,
      default: 'English',
    },
    status: {
      type: String,
      enum: ['Active', 'Deactive'],
      default: 'Active',
    },
    img: {
      type: String,
      default: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=80&q=80',
    },
  },
  {
    timestamps: true,
  }
);

const AnnouncementPopup = mongoose.model('AnnouncementPopup', announcementPopupSchema);
export default AnnouncementPopup;
