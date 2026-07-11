import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a menu item name'],
      trim: true,
    },
    url: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      enum: ['Self', 'Blank'],
      default: 'Self',
    },
    isExpandable: {
      type: Boolean,
      default: false,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
