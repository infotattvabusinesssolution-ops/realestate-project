import mongoose from 'mongoose';

const advertisementSchema = new mongoose.Schema(
  {
    adType: {
      type: String,
      required: [true, 'Please specify an ad type'],
      enum: ['Banner', 'AdSense'],
    },
    resolution: {
      type: String,
      required: [true, 'Please specify an ad resolution'],
      enum: ['728 x 90', '300 x 250', '300 x 600'],
    },
    views: {
      type: Number,
      default: 0,
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

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
export default Advertisement;
