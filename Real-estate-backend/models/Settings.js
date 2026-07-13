import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    needsApproval: {
      type: Boolean,
      default: true,
    },
    needsProjectApproval: {
      type: Boolean,
      default: true,
    },
    packageRemindDays: {
      type: Number,
      default: 3,
    },
    vendorNeedsApproval: {
      type: Boolean,
      default: true,
    },
    vendorEmailVerification: {
      type: Boolean,
      default: true,
    },
    vendorApprovalNotice: {
      type: String,
      default: 'Your account is deactive or pending now please contact with admin.',
    },
    ticketsActive: {
      type: Boolean,
      default: true,
    },
    adsensePublisherId: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
