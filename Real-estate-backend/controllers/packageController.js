import Package from '../models/Package.js';
import Settings from '../models/Settings.js';

// ==========================================
// PACKAGE CRUD
// ==========================================

// @desc    Get all packages
// @route   GET /api/admin/packages
export const getPackages = async (req, res) => {
  try {
    const pkgs = await Package.find().sort({ createdAt: -1 });
    res.json(pkgs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a package
// @route   POST /api/admin/packages
export const createPackage = async (req, res) => {
  try {
    const {
      title, price, term, agents, properties,
      galleryPerProp, featuresPerProp, projects,
      typesPerProj, galleryPerProj, featuresPerProj, status
    } = req.body;

    const pkg = await Package.create({
      title,
      price,
      term: term || 'Lifetime',
      agents: Number(agents) || 0,
      properties: Number(properties) || 0,
      galleryPerProp: Number(galleryPerProp) || 0,
      featuresPerProp: Number(featuresPerProp) || 0,
      projects: Number(projects) || 0,
      typesPerProj: Number(typesPerProj) || 0,
      galleryPerProj: Number(galleryPerProj) || 0,
      featuresPerProj: Number(featuresPerProj) || 0,
      status: status || 'Active',
    });

    res.status(201).json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a package
// @route   PUT /api/admin/packages/:id
export const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const fields = [
      'title', 'price', 'term', 'agents', 'properties',
      'galleryPerProp', 'featuresPerProp', 'projects',
      'typesPerProj', 'galleryPerProj', 'featuresPerProj', 'status'
    ];

    fields.forEach(f => {
      if (req.body[f] !== undefined) {
        if (typeof pkg[f] === 'number') {
          pkg[f] = Number(req.body[f]);
        } else {
          pkg[f] = req.body[f];
        }
      }
    });

    await pkg.save();
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a package
// @route   DELETE /api/admin/packages/:id
export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// PACKAGE SETTINGS
// ==========================================

// @desc    Get package settings
// @route   GET /api/admin/packages/settings
export const getPackageSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ packageRemindDays: 3 });
    }
    res.json({
      packageRemindDays: settings.packageRemindDays !== undefined ? settings.packageRemindDays : 3,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update package settings
// @route   PUT /api/admin/packages/settings
export const updatePackageSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ packageRemindDays: 3 });
    }
    if (req.body.packageRemindDays !== undefined) {
      settings.packageRemindDays = Number(req.body.packageRemindDays);
    }
    await settings.save();
    res.json({
      packageRemindDays: settings.packageRemindDays,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
