import FeaturedPricing from '../models/FeaturedPricing.js';
import FeaturedRequest from '../models/FeaturedRequest.js';
import Property from '../models/Property.js';

// ==========================================
// FEATURED PRICING CRUD
// ==========================================

// @desc    Get all featured pricing tiers
// @route   GET /api/admin/featured/pricing
export const getFeaturedPricing = async (req, res) => {
  try {
    const pricing = await FeaturedPricing.find().sort({ days: -1 });
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a featured pricing tier
// @route   POST /api/admin/featured/pricing
export const createFeaturedPricing = async (req, res) => {
  try {
    const { days, cost, status } = req.body;
    const pricing = await FeaturedPricing.create({
      days,
      cost,
      status: status || 'Active',
    });
    res.status(201).json(pricing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a featured pricing tier
// @route   PUT /api/admin/featured/pricing/:id
export const updateFeaturedPricing = async (req, res) => {
  try {
    const pricing = await FeaturedPricing.findById(req.params.id);
    if (!pricing) {
      return res.status(404).json({ message: 'Pricing not found' });
    }
    if (req.body.days !== undefined) pricing.days = req.body.days;
    if (req.body.cost !== undefined) pricing.cost = req.body.cost;
    if (req.body.status !== undefined) pricing.status = req.body.status;
    await pricing.save();
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a featured pricing tier
// @route   DELETE /api/admin/featured/pricing/:id
export const deleteFeaturedPricing = async (req, res) => {
  try {
    const pricing = await FeaturedPricing.findById(req.params.id);
    if (!pricing) {
      return res.status(404).json({ message: 'Pricing not found' });
    }
    await FeaturedPricing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pricing removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// FEATURED REQUESTS CRUD
// ==========================================

// @desc    Get featured requests (with optional status filter)
// @route   GET /api/admin/featured/requests?status=all|Pending|Featured|Rejected
export const getFeaturedRequests = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status && status !== 'all') {
      filter.featuredStatus = status;
    }
    const requests = await FeaturedRequest.find(filter)
      .populate('property', 'name title')
      .populate('vendor', 'name email')
      .populate('pricing', 'days cost')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update featured request status (approve/reject)
// @route   PUT /api/admin/featured/requests/:id
export const updateFeaturedRequest = async (req, res) => {
  try {
    const request = await FeaturedRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (req.body.featuredStatus !== undefined) {
      request.featuredStatus = req.body.featuredStatus;
    }
    if (req.body.paymentStatus !== undefined) {
      request.paymentStatus = req.body.paymentStatus;
    }
    await request.save();

    // If approved, mark the property as featured
    if (request.featuredStatus === 'Featured') {
      await Property.findByIdAndUpdate(request.property, { isFeatured: true });
    } else if (request.featuredStatus === 'Rejected') {
      await Property.findByIdAndUpdate(request.property, { isFeatured: false });
    }

    const populated = await FeaturedRequest.findById(request._id)
      .populate('property', 'name title')
      .populate('vendor', 'name email')
      .populate('pricing', 'days cost');
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a featured request
// @route   DELETE /api/admin/featured/requests/:id
export const deleteFeaturedRequest = async (req, res) => {
  try {
    const request = await FeaturedRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    await FeaturedRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Request removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
