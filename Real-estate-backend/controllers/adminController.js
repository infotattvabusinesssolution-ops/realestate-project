import User from '../models/User.js';
import Property from '../models/Property.js';
import Ticket from '../models/Ticket.js';
import Project from '../models/Project.js';
import Message from '../models/Message.js';
import Settings from '../models/Settings.js';
import BlogCategory from '../models/BlogCategory.js';
import BlogPost from '../models/BlogPost.js';
import FAQ from '../models/FAQ.js';
import Advertisement from '../models/Advertisement.js';
import AnnouncementPopup from '../models/AnnouncementPopup.js';
import AdminRole from '../models/AdminRole.js';

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
    const { name, username, email, password, role, phone, city, state, zip, address, avatar, status, rating, experience, specialization, businessName } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      username: username || '',
      email,
      password,
      role,
      phone: phone || '',
      city: city || '',
      state: state || '',
      zip: zip || '',
      address: address || '',
      avatar: avatar || undefined,
      status: status || 'Active',
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
      'name', 'username', 'email', 'phone', 'city', 'state', 'zip', 'address', 'rating', 'experience',
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

// @desc    Get support ticket detail
// @route   GET /api/admin/tickets/:id
// @access  Private/Admin
export const getTicketDetail = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('user', 'name email role')
      .populate('responses.sender', 'name role avatar');

    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
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
      ticket.status = req.body.status || 'Pending';
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
      'ticketsActive', 'adsensePublisherId'
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

// ==========================================
// BLOG CATEGORIES CONTROLLERS
// ==========================================
export const getBlogCategories = async (req, res) => {
  try {
    const { lang } = req.query;
    const filter = lang ? { language: lang } : {};
    const categories = await BlogCategory.find(filter).sort({ serialNumber: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlogCategory = async (req, res) => {
  try {
    const { lang, name, status, serialNumber } = req.body;
    
    // Check if category already exists
    const categoryExists = await BlogCategory.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await BlogCategory.create({
      name,
      status: status || 'Active',
      serialNumber: serialNumber !== undefined ? Number(serialNumber) : 0,
      language: lang || 'English'
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBlogCategory = async (req, res) => {
  try {
    const category = await BlogCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await BlogCategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// BLOG POSTS CONTROLLERS
// ==========================================
export const getBlogPosts = async (req, res) => {
  try {
    const { lang } = req.query;
    const filter = lang ? { language: lang } : {};
    const posts = await BlogPost.find(filter).sort({ serialNumber: 1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlogPost = async (req, res) => {
  try {
    const { serialNumber, status, title, category, author, content, metaKeywords, metaDescription, language, image } = req.body;

    const post = await BlogPost.create({
      title,
      category,
      content,
      author,
      image: image || undefined,
      serialNumber: serialNumber !== undefined ? Number(serialNumber) : 0,
      status: status || 'Active',
      metaKeywords: metaKeywords || '',
      metaDescription: metaDescription || '',
      language: language || 'English'
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog post removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// FAQ CONTROLLERS
// ==========================================
export const getFAQs = async (req, res) => {
  try {
    const { lang } = req.query;
    const filter = lang ? { language: lang } : {};
    const faqs = await FAQ.find(filter).sort({ serialNumber: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFAQ = async (req, res) => {
  try {
    const { lang, question, answer, serialNumber } = req.body;

    const faq = await FAQ.create({
      question,
      answer: answer || '',
      serialNumber: serialNumber !== undefined ? Number(serialNumber) : 0,
      language: lang || 'English'
    });

    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: 'FAQ removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// ADVERTISEMENTS CONTROLLERS
// ==========================================
export const getAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.find().sort({ createdAt: -1 });
    res.json(advertisements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAdvertisement = async (req, res) => {
  try {
    const { adType, resolution } = req.body;

    const advertisement = await Advertisement.create({
      adType,
      resolution
    });

    res.status(201).json(advertisement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAdvertisement = async (req, res) => {
  try {
    const advertisement = await Advertisement.findById(req.params.id);
    if (!advertisement) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }
    await Advertisement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Advertisement removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// ANNOUNCEMENT POPUPS CONTROLLERS
// ==========================================
export const getAnnouncementPopups = async (req, res) => {
  try {
    const { lang } = req.query;
    const filter = lang ? { language: lang } : {};
    const popups = await AnnouncementPopup.find(filter).sort({ serialNumber: -1 });
    res.json(popups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAnnouncementPopup = async (req, res) => {
  try {
    const { lang, name, bgColor, bgOpacity, title, text, btnText, btnColor, delay, serialNumber, image } = req.body;

    const popup = await AnnouncementPopup.create({
      name,
      bgColor,
      bgOpacity: bgOpacity !== undefined ? Number(bgOpacity) : 1.0,
      title,
      text,
      btnText: btnText || '',
      btnColor: btnColor || '',
      delay: delay !== undefined ? Number(delay) : 0,
      serialNumber: serialNumber !== undefined ? Number(serialNumber) : 0,
      language: lang || 'English',
      img: image || undefined
    });

    res.status(201).json(popup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAnnouncementPopup = async (req, res) => {
  try {
    const popup = await AnnouncementPopup.findById(req.params.id);
    if (!popup) {
      return res.status(404).json({ message: 'Announcement popup not found' });
    }
    await AnnouncementPopup.findByIdAndDelete(req.params.id);
    res.json({ message: 'Announcement popup removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// ADMIN ROLES CONTROLLERS
// ==========================================
export const getAdminRoles = async (req, res) => {
  try {
    const roles = await AdminRole.find().sort({ createdAt: -1 });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAdminRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Role name is required' });
    }
    const role = await AdminRole.create({ name, permissions });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAdminRole = async (req, res) => {
  try {
    const role = await AdminRole.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    await AdminRole.findByIdAndDelete(req.params.id);
    res.json({ message: 'Role removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// REGISTERED ADMINS CONTROLLERS
// ==========================================
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).sort({ createdAt: -1 });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { role, username, email, firstName, lastName, password, avatar, status } = req.body;

    if (!role || !username || !email || !firstName || !lastName || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const admin = await User.create({
      name: `${firstName} ${lastName}`,
      username,
      email,
      password,
      role: 'admin',
      adminRole: role,
      status: status || 'Active',
      avatar: avatar || undefined
    });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      username: admin.username,
      email: admin.email,
      role: admin.adminRole,
      status: admin.status,
      avatar: admin.avatar
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await User.findOne({ _id: req.params.id, role: 'admin' });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Admin removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
