import mongoose from 'mongoose';

const paymentLogSchema = new mongoose.Schema(
  {
    txn: {
      type: String,
      required: [true, 'Please add a transaction ID'],
      unique: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: String,
      required: [true, 'Please add an amount'],
    },
    status: {
      type: String,
      enum: ['Success', 'Pending', 'Failed'],
      default: 'Pending',
    },
    method: {
      type: String,
      required: [true, 'Please add a payment method'],
    },
    receipt: {
      type: String,
      default: '-',
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
    },
    hasDropdown: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentLog = mongoose.model('PaymentLog', paymentLogSchema);
export default PaymentLog;
