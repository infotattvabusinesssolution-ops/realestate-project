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
    const {
      name, price, type, address, beds, baths, area, tag, image,
      propertyType, description, city, country, state,
      videoUrl, latitude, longitude, assignedAgent,
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
      vendor: req.user._id,
      status: 'Pending',
    };

    // Optional references
    if (assignedAgent) propertyData.assignedAgent = assignedAgent;
    if (category) propertyData.category = category;
    if (amenities && Array.isArray(amenities) && amenities.length > 0) {
      propertyData.amenities = amenities;
    }
    if (features && Array.isArray(features) && features.length > 0) {
      propertyData.features = features.filter(f => f.labelEn || f.valueEn);
    }

    const property = await Property.create(propertyData);

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a vendor property
// @route   PUT /api/vendor/properties/:id
// @access  Private/Vendor
export const updateVendorProperty = async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      vendor: req.user._id,
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found or not authorized' });
    }

    const updatableFields = [
      'name', 'price', 'type', 'address', 'beds', 'baths', 'area', 'tag',
      'image', 'propertyType', 'description', 'city', 'country', 'state',
      'videoUrl', 'latitude', 'longitude', 'assignedAgent',
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
    const {
      name, location, units, status, image,
      minPrice, maxPrice, latitude, longitude, assignedAgent,
      description, metaKeywords, metaDesc,
      titleAr, addressAr, descriptionAr, features
    } = req.body;

    // Map status from frontend ('Complete', 'Incomplete', 'Ongoing') to backend enum values
    let backendStatus = 'Under Construction';
    if (status === 'Complete') {
      backendStatus = 'Complete';
    } else if (status === 'Incomplete' || status === 'Ongoing' || status === 'Under Construction') {
      backendStatus = 'Under Construction';
    }

    const projectData = {
      name,
      location: location || '',
      units: units || '10 Units',
      status: backendStatus,
      image: image || undefined,
      builder: req.user._id,
      minPrice: minPrice || '',
      maxPrice: maxPrice || '',
      latitude: latitude || '',
      longitude: longitude || '',
      description: description || '',
      metaKeywords: metaKeywords || '',
      metaDesc: metaDesc || '',
      titleAr: titleAr || '',
      addressAr: addressAr || '',
      descriptionAr: descriptionAr || '',
    };

    if (assignedAgent) projectData.assignedAgent = assignedAgent;

    if (features && Array.isArray(features) && features.length > 0) {
      projectData.features = features
        .filter(f => f.labelEn || f.valueEn || f.label || f.value)
        .map(f => ({
          labelEn: f.labelEn || '',
          valueEn: f.valueEn || '',
          labelAr: f.labelAr || '',
          valueAr: f.valueAr || '',
          label: f.labelEn || f.label || '',
          value: f.valueEn || f.value || '',
        }));
    }

    const project = await Project.create(projectData);

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a vendor project
// @route   PUT /api/vendor/projects/:id
// @access  Private/Vendor
export const updateVendorProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      builder: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found or not authorized' });
    }

    const updatableFields = [
      'name', 'location', 'units', 'status', 'image', 'isActive', 'isFeatured',
      'minPrice', 'maxPrice', 'latitude', 'longitude', 'assignedAgent',
      'description', 'metaKeywords', 'metaDesc', 'titleAr', 'addressAr', 'descriptionAr',
    ];

    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'status') {
          let backendStatus = 'Under Construction';
          if (req.body.status === 'Complete') {
            backendStatus = 'Complete';
          } else if (req.body.status === 'Incomplete' || req.body.status === 'Ongoing' || req.body.status === 'Under Construction') {
            backendStatus = 'Under Construction';
          }
          project.status = backendStatus;
        } else {
          project[field] = req.body[field];
        }
      }
    });

    if (req.body.features && Array.isArray(req.body.features)) {
      project.features = req.body.features
        .filter(f => f.labelEn || f.valueEn || f.label || f.value)
        .map(f => ({
          labelEn: f.labelEn || '',
          valueEn: f.valueEn || '',
          labelAr: f.labelAr || '',
          valueAr: f.valueAr || '',
          label: f.labelEn || f.label || '',
          value: f.valueEn || f.value || '',
        }));
    }

    await project.save();
    res.json(project);
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
      .populate('sender', 'name email phone')
      .populate('property', 'name price')
      .sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a lead/message
// @route   DELETE /api/vendor/leads/:id
// @access  Private/Vendor
export const deleteVendorLead = async (req, res) => {
  try {
    const vendorId = req.user._id;

    // Verify the message belongs to a property owned by this vendor
    const message = await Message.findById(req.params.id).populate('property');
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check that the property belongs to this vendor (receiver is the vendor)
    if (message.receiver.toString() !== vendorId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this message' });
    }

    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reply to a lead/inquiry
// @route   POST /api/vendor/leads/:id/reply
// @access  Private/Vendor
export const replyVendorLead = async (req, res) => {
  try {
    const vendorId = req.user._id;
    const { text } = req.body;

    // Find the original message
    const originalMessage = await Message.findById(req.params.id);
    if (!originalMessage) {
      return res.status(404).json({ message: 'Original message not found' });
    }

    // Verify ownership
    if (originalMessage.receiver.toString() !== vendorId.toString()) {
      return res.status(403).json({ message: 'Not authorized to reply to this message' });
    }

    // Create reply message (vendor is sender, original sender is receiver)
    const replyMsg = await Message.create({
      sender: vendorId,
      receiver: originalMessage.sender,
      property: originalMessage.property,
      text,
    });

    const populated = await Message.findById(replyMsg._id)
      .populate('sender', 'name email phone')
      .populate('property', 'name price');

    res.status(201).json(populated);
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

// @desc    Update an agent status/details
// @route   PUT /api/vendor/agents/:id
// @access  Private/Vendor
export const updateVendorAgent = async (req, res) => {
  try {
    const agent = await User.findOne({ _id: req.params.id, role: 'agent' });
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    const { status, phone, username } = req.body;
    if (status !== undefined) agent.status = status;
    if (phone !== undefined) agent.phone = phone;
    if (username !== undefined) {
      agent.username = username;
      agent.name = username;
    }

    await agent.save();

    const agentData = agent.toObject();
    delete agentData.password;
    res.json(agentData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a vendor agent
// @route   DELETE /api/vendor/agents/:id
// @access  Private/Vendor
export const deleteVendorAgent = async (req, res) => {
  try {
    const agent = await User.findOne({ _id: req.params.id, role: 'agent' });
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Agent removed successfully' });
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

// @desc    Purchase/Subscribe to a package
// @route   POST /api/vendor/purchase-package
// @access  Private/Vendor
export const purchasePackage = async (req, res) => {
  try {
    const { packageId, paymentMethod } = req.body;
    
    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const txnId = 'TXN-' + Math.floor(100000000 + Math.random() * 900000000);

    const log = await PaymentLog.create({
      txn: txnId,
      user: req.user._id,
      amount: pkg.price.startsWith('$') ? pkg.price : `$${pkg.price}`,
      status: 'Success',
      method: paymentMethod || 'Online Gateway',
      package: pkg._id,
    });

    const populated = await PaymentLog.findById(log._id).populate('package', 'title');

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Stripe checkout session (simulated)
// @route   POST /api/vendor/create-checkout-session
// @access  Private/Vendor
export const createCheckoutSession = async (req, res) => {
  try {
    const { packageId } = req.body;
    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const sessionId = 'cs_test_' + Math.floor(1000000000000 + Math.random() * 9000000000000).toString(16);
    
    // Construct the checkout URL on our frontend checkout simulation page
    const checkoutUrl = `/stripe-checkout?session_id=${sessionId}&package_id=${pkg._id}&plan_name=${encodeURIComponent(pkg.title)}&price=${encodeURIComponent(pkg.price)}&term=${encodeURIComponent(pkg.term)}`;

    res.json({ url: checkoutUrl, sessionId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify checkout session and finalize purchase
// @route   POST /api/vendor/verify-checkout-session
// @access  Private/Vendor
export const verifyCheckoutSession = async (req, res) => {
  try {
    const { sessionId, packageId } = req.body;
    
    // Check if payment log already exists for this transaction session to avoid duplicates
    let existingLog = await PaymentLog.findOne({ txn: sessionId });
    if (existingLog) {
      const populated = await PaymentLog.findById(existingLog._id).populate('package', 'title');
      return res.json({ success: true, log: populated });
    }

    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Create a successful payment log
    const log = await PaymentLog.create({
      txn: sessionId,
      user: req.user._id,
      amount: pkg.price.startsWith('$') ? pkg.price : `$${pkg.price}`,
      status: 'Success',
      method: 'Stripe Credit Card',
      package: pkg._id,
    });

    const populated = await PaymentLog.findById(log._id).populate('package', 'title');
    res.json({ success: true, log: populated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
