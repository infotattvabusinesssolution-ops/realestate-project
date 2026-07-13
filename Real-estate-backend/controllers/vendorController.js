import Property from '../models/Property.js';
import Project from '../models/Project.js';
import User from '../models/User.js';
import Message from '../models/Message.js';
import Ticket from '../models/Ticket.js';
import PaymentLog from '../models/PaymentLog.js';
import Package from '../models/Package.js';
import bcrypt from 'bcryptjs';

// @desc    Get vendor dashboard stats
// @route   GET /api/vendor/stats
// @access  Private/Vendor
export const getVendorStats = async (req, res) => {
  try {
    const vendorId = req.user._id;

    const myProperties = await Property.countDocuments({ vendor: vendorId });
    const projects = await Project.countDocuments({ builder: vendorId });
    
    // Find agents
    const agents = await User.countDocuments({ role: 'agent' });

    // Find all property IDs owned by this vendor
    const propertiesList = await Property.find({ vendor: vendorId });
    const propIds = propertiesList.map(p => p._id);

    // Leads count is the number of distinct property inquiries
    const leads = await Message.countDocuments({ property: { $in: propIds } });

    // Aggregate property views
    let propertyViews = 0;
    propertiesList.forEach(p => {
      propertyViews += (p.views || 0);
    });

    // Support tickets count
    const ticketsCount = await Ticket.countDocuments({ user: vendorId });

    // Payment logs count
    const paymentLogsCount = await PaymentLog.countDocuments({ user: vendorId });

    res.json({
      myProperties,
      projects,
      agents,
      leads,
      revenue: '$14,800',
      propertyViews,
      ticketsCount,
      paymentLogsCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all properties owned by vendor
// @route   GET /api/vendor/properties
// @access  Private/Vendor
export const getVendorProperties = async (req, res) => {
  try {
    const properties = await Property.find({ vendor: req.user._id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a property
// @route   POST /api/vendor/properties
// @access  Private/Vendor
export const createVendorProperty = async (req, res) => {
  try {
    const { name, price, type, address, beds, baths, area, tag, image } = req.body;

    const property = await Property.create({
      name,
      price,
      type,
      address,
      beds,
      baths,
      area,
      tag: tag || 'Property',
      image: image || undefined,
      vendor: req.user._id,
      status: 'Pending', // requires Admin approval
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects by vendor
// @route   GET /api/vendor/projects
// @access  Private/Vendor
export const getVendorProjects = async (req, res) => {
  try {
    const projects = await Project.find({ builder: req.user._id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a project
// @route   POST /api/vendor/projects
// @access  Private/Vendor
export const createVendorProject = async (req, res) => {
  try {
    const { name, location, units, status, image } = req.body;

    const project = await Project.create({
      name,
      location,
      units,
      status,
      image: image || undefined,
      builder: req.user._id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get leads on vendor's properties
// @route   GET /api/vendor/leads
// @access  Private/Vendor
export const getVendorLeads = async (req, res) => {
  try {
    const vendorId = req.user._id;

    // Get properties
    const properties = await Property.find({ vendor: vendorId });
    const propIds = properties.map(p => p._id);

    // Get messages related to these properties, populate sender info
    const leads = await Message.find({ property: { $in: propIds } })
      .populate('sender', 'name email')
      .populate('property', 'name price')
      .sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get agents list (to assign or associate)
// @route   GET /api/vendor/agents
// @access  Private/Vendor
export const getVendorAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' });
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get monthly chart data for vendor dashboard
// @route   GET /api/vendor/chart-data
// @access  Private/Vendor
export const getVendorChartData = async (req, res) => {
  try {
    const vendorId = req.user._id;
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    // Aggregate properties created per month
    const propertyAgg = await Property.aggregate([
      {
        $match: {
          vendor: vendorId,
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
    ]);

    // Aggregate projects created per month
    const projectAgg = await Project.aggregate([
      {
        $match: {
          builder: vendorId,
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
    ]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const chartData = months.map((month, idx) => {
      const propEntry = propertyAgg.find((p) => p._id === idx + 1);
      const projEntry = projectAgg.find((p) => p._id === idx + 1);
      return {
        month,
        'Monthly Property Posts': propEntry ? propEntry.count : 0,
        'Monthly Projects Post': projEntry ? projEntry.count : 0,
      };
    });

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vendor's support tickets
// @route   GET /api/vendor/tickets
// @access  Private/Vendor
export const getVendorTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a support ticket
// @route   POST /api/vendor/tickets
// @access  Private/Vendor
export const createVendorTicket = async (req, res) => {
  try {
    const { title, urgency, text } = req.body;

    const ticket = await Ticket.create({
      user: req.user._id,
      title,
      urgency: urgency || 'Medium',
      status: 'Open',
      responses: [
        {
          sender: req.user._id,
          senderName: req.user.name,
          text: text,
          timestamp: new Date(),
        },
      ],
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get support ticket detail
// @route   GET /api/vendor/tickets/:id
// @access  Private/Vendor
export const getVendorTicketDetail = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('responses.sender', 'name role avatar');

    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reply to support ticket
// @route   POST /api/vendor/tickets/:id/reply
// @access  Private/Vendor
export const replyVendorTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (ticket) {
      const responseMessage = {
        sender: req.user._id,
        senderName: req.user.name,
        text: req.body.text,
        timestamp: new Date(),
      };

      ticket.responses.push(responseMessage);
      ticket.status = 'Open';
      await ticket.save();

      const updatedTicket = await Ticket.findById(req.params.id)
        .populate('responses.sender', 'name role avatar');

      res.json(updatedTicket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vendor's payment logs
// @route   GET /api/vendor/payment-logs
// @access  Private/Vendor
export const getVendorPaymentLogs = async (req, res) => {
  try {
    const logs = await PaymentLog.find({ user: req.user._id })
      .populate('package', 'title')
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new agent under vendor
// @route   POST /api/vendor/agents
// @access  Private/Vendor
export const createVendorAgent = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const agent = await User.create({
      name: username,
      username,
      email: email.toLowerCase(),
      password: password || 'Agent@123',
      role: 'agent',
      phone: phone || '',
      status: 'Active',
    });

    // Return agent without password
    const agentData = agent.toObject();
    delete agentData.password;

    res.status(201).json(agentData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a vendor property
// @route   DELETE /api/vendor/properties/:id
// @access  Private/Vendor
export const deleteVendorProperty = async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      vendor: req.user._id,
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found or not authorized' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a vendor project
// @route   DELETE /api/vendor/projects/:id
// @access  Private/Vendor
export const deleteVendorProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      builder: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found or not authorized' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
