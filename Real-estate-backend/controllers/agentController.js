import Property from '../models/Property.js';
import User from '../models/User.js';
import Message from '../models/Message.js';
import Project from '../models/Project.js';

// @desc    Get agent dashboard stats
// @route   GET /api/agent/stats
// @access  Private/Agent
export const getAgentStats = async (req, res) => {
  try {
    const agentId = req.user._id;

    // Get properties assigned to this agent
    const assignedProperties = await Property.countDocuments({ assignedAgent: agentId });

    // Get projects assigned to this agent
    const assignedProjects = await Project.countDocuments({ assignedAgent: agentId });

    // For leads count, we can get messages where receiver is the agent
    const newLeads = await Message.countDocuments({ receiver: agentId });

    res.json({
      assignedProperties,
      assignedProjects,
      newLeads,
      appointments: 4, // static mockup placeholder
      messages: newLeads,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get monthly chart data for agent dashboard
// @route   GET /api/agent/chart-data
// @access  Private/Agent
export const getAgentChartData = async (req, res) => {
  try {
    const agentId = req.user._id;
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    // Aggregate properties assigned to agent per month
    const propertyAgg = await Property.aggregate([
      {
        $match: {
          assignedAgent: agentId,
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

    // Aggregate projects assigned to agent per month
    const projectAgg = await Project.aggregate([
      {
        $match: {
          assignedAgent: agentId,
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

    // Format results to month array [1..12]
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(year, i, 1).toLocaleString('default', { month: 'short' }),
      properties: 0,
      projects: 0,
    }));

    propertyAgg.forEach(item => {
      const monthIndex = item._id - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyData[monthIndex].properties = item.count;
      }
    });

    projectAgg.forEach(item => {
      const monthIndex = item._id - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyData[monthIndex].projects = item.count;
      }
    });

    res.json(monthlyData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get properties assigned to agent
// @route   GET /api/agent/properties
// @access  Private/Agent
export const getAgentProperties = async (req, res) => {
  try {
    const properties = await Property.find({ assignedAgent: req.user._id })
      .populate('vendor', 'name email')
      .populate('category', 'name')
      .populate('amenities', 'name');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a property (as Agent)
// @route   POST /api/agent/properties
// @access  Private/Agent
export const createAgentProperty = async (req, res) => {
  try {
    const {
      name, price, type, address, beds, baths, area, tag, image,
      propertyType, description, city, country, state,
      videoUrl, latitude, longitude,
      amenities, category, features,
      metaKeywords, metaDesc,
      titleAr, addressAr, descriptionAr,
    } = req.body;

    const propertyData = {
      name,
      price,
      type: type === 'For Sell' ? 'Buy' : type === 'For Rent' ? 'Rent' : type,
      address: address || '',
      beds: Number(beds) || 0,
      baths: Number(baths) || 0,
      area: area || '',
      tag: tag || 'Property',
      image: image || undefined,
      propertyType: propertyType || 'Residential',
      description: description || '',
      city: city || '',
      country: country || '',
      state: state || '',
      videoUrl: videoUrl || '',
      latitude: latitude || '',
      longitude: longitude || '',
      metaKeywords: metaKeywords || '',
      metaDesc: metaDesc || '',
      titleAr: titleAr || '',
      addressAr: addressAr || '',
      descriptionAr: descriptionAr || '',
      vendor: req.user._id, // Agent serves as vendor here
      assignedAgent: req.user._id, // Assigned to self
      status: 'Approved', // Agent properties default to Approved or Pending
    };

    if (category) propertyData.category = category;
    if (amenities && Array.isArray(amenities)) {
      propertyData.amenities = amenities;
    }
    if (features && Array.isArray(features)) {
      propertyData.features = features.filter(f => f.labelEn || f.valueEn);
    }

    const property = await Property.create(propertyData);
    res.status(201).json(property);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(error.errors).map(val => val.message).join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an agent property
// @route   PUT /api/agent/properties/:id
// @access  Private/Agent
export const updateAgentProperty = async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      assignedAgent: req.user._id,
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found or not authorized' });
    }

    const updatableFields = [
      'name', 'price', 'type', 'address', 'beds', 'baths', 'area', 'tag',
      'image', 'propertyType', 'description', 'city', 'country', 'state',
      'videoUrl', 'latitude', 'longitude',
      'amenities', 'category', 'features', 'isActive', 'isFeatured',
      'metaKeywords', 'metaDesc', 'titleAr', 'addressAr', 'descriptionAr',
    ];

    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        property[field] = req.body[field];
      }
    });

    await property.save();
    res.json(property);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(error.errors).map(val => val.message).join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an agent property
// @route   DELETE /api/agent/properties/:id
// @access  Private/Agent
export const deleteAgentProperty = async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      assignedAgent: req.user._id,
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

// @desc    Get projects assigned to agent
// @route   GET /api/agent/projects
// @access  Private/Agent
export const getAgentProjects = async (req, res) => {
  try {
    const projects = await Project.find({ assignedAgent: req.user._id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a project (as Agent)
// @route   POST /api/agent/projects
// @access  Private/Agent
export const createAgentProject = async (req, res) => {
  try {
    const {
      name, minPrice, maxPrice, status, address, description,
      metaKeywords, metaDesc, titleAr, addressAr, descriptionAr,
      latitude, longitude, features
    } = req.body;

    const projectData = {
      name,
      minPrice,
      maxPrice,
      status: status || 'Complete',
      address: address || '',
      description: description || '',
      metaKeywords: metaKeywords || '',
      metaDesc: metaDesc || '',
      titleAr: titleAr || '',
      addressAr: addressAr || '',
      descriptionAr: descriptionAr || '',
      latitude: latitude || '',
      longitude: longitude || '',
      builder: req.user._id, // Assign builder to self
      assignedAgent: req.user._id, // Assigned to self
      approvalStatus: 'Approved',
    };

    if (features && Array.isArray(features)) {
      projectData.features = features.filter(f => f.labelEn || f.valueEn);
    }

    const project = await Project.create(projectData);
    res.status(201).json(project);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(error.errors).map(val => val.message).join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an agent project
// @route   PUT /api/agent/projects/:id
// @access  Private/Agent
export const updateAgentProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      assignedAgent: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found or not authorized' });
    }

    const updatableFields = [
      'name', 'minPrice', 'maxPrice', 'status', 'address', 'description',
      'metaKeywords', 'metaDesc', 'titleAr', 'addressAr', 'descriptionAr',
      'latitude', 'longitude', 'features', 'approvalStatus'
    ];

    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        project[field] = req.body[field];
      }
    });

    await project.save();
    res.json(project);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(error.errors).map(val => val.message).join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an agent project
// @route   DELETE /api/agent/projects/:id
// @access  Private/Agent
export const deleteAgentProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      assignedAgent: req.user._id,
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

// @desc    Get leads/messages assigned to agent
// @route   GET /api/agent/leads
// @access  Private/Agent
export const getAgentLeads = async (req, res) => {
  try {
    const leads = await Message.find({ receiver: req.user._id })
      .populate('sender', 'name email phone')
      .populate('property', 'name price')
      .sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an agent lead/message
// @route   DELETE /api/agent/leads/:id
// @access  Private/Agent
export const deleteAgentLead = async (req, res) => {
  try {
    const agentId = req.user._id;
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.receiver.toString() !== agentId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this message' });
    }

    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reply to an agent lead/message
// @route   POST /api/agent/leads/:id/reply
// @access  Private/Agent
export const replyAgentLead = async (req, res) => {
  try {
    const agentId = req.user._id;
    const { text } = req.body;

    const originalMessage = await Message.findById(req.params.id);
    if (!originalMessage) {
      return res.status(404).json({ message: 'Original message not found' });
    }

    if (originalMessage.receiver.toString() !== agentId.toString()) {
      return res.status(403).json({ message: 'Not authorized to reply to this message' });
    }

    const replyMsg = await Message.create({
      sender: agentId,
      receiver: originalMessage.sender,
      property: originalMessage.property,
      text,
    });

    const populated = await Message.findById(replyMsg._id)
      .populate('sender', 'name email phone')
      .populate('property', 'name price');

    res.status(201).json(populated);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(error.errors).map(val => val.message).join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};
