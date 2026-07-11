import Property from '../models/Property.js';
import Project from '../models/Project.js';
import User from '../models/User.js';
import Message from '../models/Message.js';

// @desc    Get vendor dashboard stats
// @route   GET /api/vendor/stats
// @access  Private/Vendor
export const getVendorStats = async (req, res) => {
  try {
    const vendorId = req.user._id;

    const myProperties = await Property.countDocuments({ vendor: vendorId });
    const projects = await Project.countDocuments({ builder: vendorId });
    
    // Find agents
    const agents = await User.countDocuments({ role: 'agent' }); // For demo, list all active agents

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

    res.json({
      myProperties,
      projects,
      agents,
      leads,
      revenue: '$14,800',
      propertyViews,
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
