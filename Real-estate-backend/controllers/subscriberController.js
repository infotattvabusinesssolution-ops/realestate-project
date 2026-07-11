import Subscriber from '../models/Subscriber.js';

// @desc    Get all newsletter subscribers
// @route   GET /api/admin/subscribers
export const getSubscribers = async (req, res) => {
  try {
    const list = await Subscriber.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a newsletter subscriber
// @route   POST /api/admin/subscribers
export const createSubscriber = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    const sub = await Subscriber.create({ email });
    res.status(201).json(sub);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a subscriber
// @route   DELETE /api/admin/subscribers/:id
export const deleteSubscriber = async (req, res) => {
  try {
    const sub = await Subscriber.findById(req.params.id);
    if (!sub) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscriber unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
