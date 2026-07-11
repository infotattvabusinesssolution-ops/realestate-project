import User from '../models/User.js';
import Property from '../models/Property.js';
import Ticket from '../models/Ticket.js';
import Project from '../models/Project.js';
import Message from '../models/Message.js';
import Settings from '../models/Settings.js';

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'customer' });
    const totalVendors = await User.countDocuments({ role: 'vendor' });
    const totalAgents = await User.countDocuments({ role: 'agent' });
    const totalProperties = await Property.countDocuments();
    const pendingApprovals = await Property.countDocuments({ status: 'Pending' });

    // Recent properties
    const recentPropertiesList = await Property.find()
      .populate('vendor', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentProperties = recentPropertiesList.map(p => ({
      id: p._id,
      name: p.name,
      price: p.price,
      vendor: p.vendor ? p.vendor.name : 'Unknown Vendor',
      status: p.status,
    }));

    // Recent vendors
    const recentVendorsList = await User.find({ role: 'vendor' })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentVendors = recentVendorsList.map(v => ({
      id: v._id,
      name: v.name,
      business: v.businessName || 'Independent Builder',
      properties: 0, // In full app, aggregate active properties
      rating: v.rating || '5.0★',
    }));

    res.json({
      totalUsers,
      totalVendors,
      totalAgents,
      totalProperties,
      monthlyRevenue: '$48,250',
      pendingApprovals,
      recentProperties,
      recentVendors,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all properties (for approval/management)
// @route   GET /api/admin/properties
// @access  Private/Admin
export const getAdminProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('vendor', 'name email');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve a property
// @route   PUT /api/admin/properties/:id/approve
// @access  Private/Admin
export const approveProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      property.status = 'Approved';
      const updatedProperty = await property.save();
      res.json(updatedProperty);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reject a property
// @route   PUT /api/admin/properties/:id/reject
// @access  Private/Admin
export const rejectProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      property.status = 'Rejected';
      const updatedProperty = await property.save();
      res.json(updatedProperty);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a property (Admin)
// @route   POST /api/admin/properties
// @access  Private/Admin
export const createProperty = async (req, res) => {
  try {
    const {
      name, title, price, type, propertyType, address, city,
      beds, baths, area, image, tag, description, amenities, category
    } = req.body;

    const property = await Property.create({
      name: name || title,
      title: title || name,
      price,
      type: type || 'Buy',
      propertyType: propertyType || 'Residential',
      address,
      city: city || '',
      beds: beds || 0,
      baths: baths || 0,
      area: area || '0 sqft',
      image,
      tag: tag || 'Property',
      description: description || '',
      amenities: amenities || [],
      category,
      vendor: req.user._id,
      status: 'Approved',
      isActive: true,
      isFeatured: false,
    });

    const populated = await Property.findById(property._id).populate('vendor', 'name email');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a property
// @route   PUT /api/admin/properties/:id
// @access  Private/Admin
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const fields = ['name', 'title', 'price', 'type', 'propertyType', 'address', 'city',
      'beds', 'baths', 'area', 'image', 'tag', 'description', 'status', 'isActive', 'isFeatured'];
    fields.forEach(f => {
      if (req.body[f] !== undefined) property[f] = req.body[f];
    });

    const updated = await property.save();
    const populated = await Property.findById(updated._id).populate('vendor', 'name email');
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a property
// @route   DELETE /api/admin/properties/:id
// @access  Private/Admin
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle property active status
// @route   PUT /api/admin/properties/:id/toggle-status
// @access  Private/Admin
export const togglePropertyStatus = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    property.isActive = req.body.isActive !== undefined ? req.body.isActive : !property.isActive;
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle property featured status
// @route   PUT /api/admin/properties/:id/toggle-featured
// @access  Private/Admin
export const togglePropertyFeatured = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    property.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : !property.isFeatured;
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users / filter by role
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const roleFilter = req.query.role;
    const query = roleFilter ? { role: roleFilter } : {};
    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a user (Admin dashboard feature)
// @route   POST /api/admin/users
// @access  Private/Admin
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, city, rating, experience, specialization, businessName } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      phone: phone || '',
      city: city || '',
      rating: rating || '5.0★',
      experience: experience || 'N/A',
      specialization: specialization || 'General',
      businessName: businessName || '',
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile or status
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const fields = [
      'name', 'email', 'phone', 'city', 'rating', 'experience',
      'specialization', 'businessName', 'status', 'avatar',
      'emailStatus', 'isEmailVerified'
    ];
    fields.forEach(f => {
      if (req.body[f] !== undefined) user[f] = req.body[f];
    });

    if (req.body.password) {
      user.password = req.body.password; // pre-save hook will hash it
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle user status
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isActive = req.body.isActive !== undefined ? req.body.isActive : !user.isActive;
    user.status = user.isActive ? 'Active' : 'Deactive';
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tickets
// @route   GET /api/admin/tickets
// @access  Private/Admin
export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('user', 'name email role');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reply on support ticket
// @route   POST /api/admin/tickets/:id/reply
// @access  Private/Admin
export const replyTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (ticket) {
      const responseMessage = {
        sender: req.user._id,
        senderName: req.user.name,
        text: req.body.text,
        timestamp: new Date(),
      };

      ticket.responses.push(responseMessage);
      ticket.status = req.body.status || 'In Progress';
      await ticket.save();

      // Return the updated ticket populated
      const updatedTicket = await Ticket.findById(req.params.id)
        .populate('user', 'name email')
        .populate('responses.sender', 'name role avatar');
      
      res.json(updatedTicket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update ticket status
// @route   PUT /api/admin/tickets/:id/status
// @access  Private/Admin
export const updateTicketStatus = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (ticket) {
      ticket.status = req.body.status;
      await ticket.save();
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// PROPERTY MESSAGES CONTROLLER
// ==========================================
export const getAdminMessages = async (req, res) => {
  try {
    const list = await Message.find()
      .populate('sender', 'name email phone')
      .populate('property', 'name')
      .sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAdminMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// SETTINGS CONTROLLERS
// ==========================================
export const getAdminSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        needsApproval: true,
        vendorNeedsApproval: true,
        vendorEmailVerification: true,
        vendorApprovalNotice: 'Your account is deactive or pending now please contact with admin.'
      });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdminSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        needsApproval: true,
        vendorNeedsApproval: true,
        vendorEmailVerification: true,
        vendorApprovalNotice: 'Your account is deactive or pending now please contact with admin.'
      });
    }

    const fields = [
      'needsApproval', 'needsProjectApproval', 'packageRemindDays',
      'vendorNeedsApproval', 'vendorEmailVerification', 'vendorApprovalNotice',
      'ticketsActive'
    ];

    fields.forEach(f => {
      if (req.body[f] !== undefined) {
        settings[f] = req.body[f];
      }
    });

    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
