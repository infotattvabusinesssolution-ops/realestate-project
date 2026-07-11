import Property from '../models/Property.js';
import User from '../models/User.js';
import Ticket from '../models/Ticket.js';
import Message from '../models/Message.js';

// @desc    Get customer dashboard stats
// @route   GET /api/customer/stats
// @access  Private/Customer
export const getCustomerStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const wishlistCount = user.wishlist.length;
    const ticketsCount = await Ticket.countDocuments({ user: req.user._id });
    const messagesCount = await Message.countDocuments({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    });

    res.json({
      wishlistCount,
      savedPropertiesCount: wishlistCount + 1, // mock padding
      appointmentsCount: 2,
      messagesCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all approved properties
// @route   GET /api/customer/properties
// @access  Public
export const getPublicProperties = async (req, res) => {
  try {
    const properties = await Property.find({ status: 'Approved' }).populate('vendor', 'name email');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get property detail & increment views
// @route   GET /api/customer/properties/:id
// @access  Public
export const getPropertyDetail = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('vendor', 'name email phone avatar businessName');

    if (property) {
      property.views = (property.views || 0) + 1;
      await property.save();
      res.json(property);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get customer wishlist
// @route   GET /api/customer/wishlist
// @access  Private/Customer
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'wishlist',
      populate: { path: 'vendor', select: 'name' }
    });
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add property to wishlist
// @route   POST /api/customer/wishlist/:id
// @access  Private/Customer
export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const propertyId = req.params.id;

    if (!user.wishlist.includes(propertyId)) {
      user.wishlist.push(propertyId);
      await user.save();
    }
    
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove property from wishlist
// @route   DELETE /api/customer/wishlist/:id
// @access  Private/Customer
export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const propertyId = req.params.id;

    user.wishlist = user.wishlist.filter(id => id.toString() !== propertyId);
    await user.save();

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get customer tickets
// @route   GET /api/customer/tickets
// @access  Private/Customer
export const getCustomerTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create support ticket
// @route   POST /api/customer/tickets
// @access  Private/Customer
export const createCustomerTicket = async (req, res) => {
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
// @route   GET /api/customer/tickets/:id
// @access  Private/Customer
export const getCustomerTicketDetail = async (req, res) => {
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
// @route   POST /api/customer/tickets/:id/reply
// @access  Private/Customer
export const replyCustomerTicket = async (req, res) => {
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
      ticket.status = 'Open'; // re-open or keep open
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

// @desc    Submit inquiry/message on property (creates lead)
// @route   POST /api/customer/inquire
// @access  Private/Customer
export const createInquiry = async (req, res) => {
  try {
    const { propertyId, text } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Recipient is the property vendor
    const message = await Message.create({
      sender: req.user._id,
      receiver: property.vendor,
      property: propertyId,
      text,
    });

    // Increment leads count for property
    property.leadsCount = (property.leadsCount || 0) + 1;
    await property.save();

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
