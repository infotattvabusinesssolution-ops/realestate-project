import PaymentLog from '../models/PaymentLog.js';

// @desc    Get all payment logs
// @route   GET /api/admin/payments
export const getPaymentLogs = async (req, res) => {
  try {
    const logs = await PaymentLog.find()
      .populate('user', 'name email role status')
      .populate('package', 'title term price')
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update status of a manual/dropdown payment log
// @route   PUT /api/admin/payments/:id
export const updatePaymentLogStatus = async (req, res) => {
  try {
    const log = await PaymentLog.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ message: 'Payment log not found' });
    }

    if (req.body.status !== undefined) {
      log.status = req.body.status;
    }
    await log.save();

    const populated = await PaymentLog.findById(log._id)
      .populate('user', 'name email role status')
      .populate('package', 'title term price');
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
