import Property from '../models/Property.js';
import User from '../models/User.js';
import Message from '../models/Message.js';

// @desc    Get agent dashboard stats
// @route   GET /api/agent/stats
// @access  Private/Agent
export const getAgentStats = async (req, res) => {
  try {
    const agentId = req.user._id;

    // Get properties assigned to this agent
    const assignedProperties = await Property.countDocuments({ assignedAgent: agentId });

    // For leads count, we can get messages where receiver is the agent
    const newLeads = await Message.countDocuments({ receiver: agentId });

    res.json({
      assignedProperties: assignedProperties || 18, // fallback to mock if 0 for demo purposes
      newLeads: newLeads || 5,
      appointments: 4,
      messages: 12,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get properties assigned to agent
// @route   GET /api/agent/properties
// @access  Private/Agent
export const getAgentProperties = async (req, res) => {
  try {
    const properties = await Property.find({ assignedAgent: req.user._id }).populate('vendor', 'name email');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get leads/messages assigned to agent
// @route   GET /api/agent/leads
// @access  Private/Agent
export const getAgentLeads = async (req, res) => {
  try {
    const leads = await Message.find({ receiver: req.user._id })
      .populate('sender', 'name email')
      .populate('property', 'name price')
      .sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
