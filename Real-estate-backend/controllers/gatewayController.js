import OnlineGateway from '../models/OnlineGateway.js';
import OfflineGateway from '../models/OfflineGateway.js';

// ==========================================
// ONLINE GATEWAYS
// ==========================================

// @desc    Get online gateway settings
// @route   GET /api/admin/gateways/online
export const getOnlineGateway = async (req, res) => {
  try {
    let settings = await OnlineGateway.findOne();
    if (!settings) {
      settings = await OnlineGateway.create({
        paypalStatus: 'Active',
        paypalTestMode: 'Active',
        paypalClientId: 'AVYKfEW63FLDl9aeYOe9biyifNl56s2Ik2F1Us11hWoY5GMuegip',
        paypalClientSecret: 'EJY0qOKlVg7wKsR3uPN7Ingr9rL1N7q1WV0FuiT1h4Fw3_eSItv1',
        instaStatus: 'Active',
        instaTestMode: 'Active',
        instaApiKey: 'test_172371aa837ae5cad6047dc3052',
        instaAuthToken: 'test_4ac5a785c25fc596b67dbc5c267',
        paytmStatus: 'Active',
        paytmEnv: 'Local',
        paytmMerchantKey: 'LhNGUUKE9xCQ9xY8',
        paytmMerchantMid: 'tkogux19985017638244',
        paytmWebsite: 'WEBSTAGING',
        paytmIndustry: 'Retail',
      });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update online gateway settings
// @route   PUT /api/admin/gateways/online
export const updateOnlineGateway = async (req, res) => {
  try {
    let settings = await OnlineGateway.findOne();
    if (!settings) {
      settings = await OnlineGateway.create({});
    }

    const fields = [
      'paypalStatus', 'paypalTestMode', 'paypalClientId', 'paypalClientSecret',
      'instaStatus', 'instaTestMode', 'instaApiKey', 'instaAuthToken',
      'paytmStatus', 'paytmEnv', 'paytmMerchantKey', 'paytmMerchantMid',
      'paytmWebsite', 'paytmIndustry'
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
// OFFLINE GATEWAYS
// ==========================================

// @desc    Get all offline gateways
// @route   GET /api/admin/gateways/offline
export const getOfflineGateways = async (req, res) => {
  try {
    const list = await OfflineGateway.find().sort({ serialNumber: 1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create offline gateway
// @route   POST /api/admin/gateways/offline
export const createOfflineGateway = async (req, res) => {
  try {
    const { name, shortDescription, instructions, status, serialNumber } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Gateway name is required' });
    }
    const gateway = await OfflineGateway.create({
      name,
      shortDescription,
      instructions,
      status: status || 'Active',
      serialNumber: serialNumber !== undefined ? Number(serialNumber) : 1
    });
    res.status(201).json(gateway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update offline gateway
// @route   PUT /api/admin/gateways/offline/:id
export const updateOfflineGateway = async (req, res) => {
  try {
    const gateway = await OfflineGateway.findById(req.params.id);
    if (!gateway) {
      return res.status(404).json({ message: 'Gateway not found' });
    }

    const fields = ['name', 'shortDescription', 'instructions', 'status', 'serialNumber'];
    fields.forEach(f => {
      if (req.body[f] !== undefined) {
        gateway[f] = req.body[f];
      }
    });

    await gateway.save();
    res.json(gateway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete offline gateway
// @route   DELETE /api/admin/gateways/offline/:id
export const deleteOfflineGateway = async (req, res) => {
  try {
    const gateway = await OfflineGateway.findById(req.params.id);
    if (!gateway) {
      return res.status(404).json({ message: 'Gateway not found' });
    }
    await OfflineGateway.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gateway removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
