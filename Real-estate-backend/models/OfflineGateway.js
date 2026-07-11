import mongoose from 'mongoose';

const offlineGatewaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a gateway name'],
    },
    shortDescription: {
      type: String,
      default: '',
    },
    instructions: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Active', 'Deactive'],
      default: 'Active',
    },
    serialNumber: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const OfflineGateway = mongoose.model('OfflineGateway', offlineGatewaySchema);
export default OfflineGateway;
