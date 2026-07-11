import Project from '../models/Project.js';
import ProjectType from '../models/ProjectType.js';
import Settings from '../models/Settings.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

// ==========================================
// PROJECT CRUD
// ==========================================

// @desc    Get all projects
// @route   GET /api/admin/projects
export const getAdminProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('builder', 'name email')
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a project
// @route   POST /api/admin/projects
export const createProject = async (req, res) => {
  try {
    const {
      name, location, units, status, description,
      minPrice, maxPrice, latitude, longitude,
      isFeatured, builder, features
    } = req.body;

    let imageUrl = '';
    let galleryUrls = [];
    let floorPlanUrls = [];
    let docUrls = [];

    // 1. Process single feature image
    if (req.files && req.files['image'] && req.files['image'][0]) {
      imageUrl = await uploadToCloudinary(req.files['image'][0].buffer, 'projects/images');
    } else if (req.body.image) {
      imageUrl = req.body.image;
    }

    // 2. Process gallery images
    if (req.files && req.files['gallery']) {
      const uploadPromises = req.files['gallery'].map(file =>
        uploadToCloudinary(file.buffer, 'projects/gallery')
      );
      galleryUrls = await Promise.all(uploadPromises);
    } else if (req.body.gallery) {
      galleryUrls = Array.isArray(req.body.gallery) ? req.body.gallery : JSON.parse(req.body.gallery || '[]');
    }

    // 3. Process floor plan images
    if (req.files && req.files['floorPlans']) {
      const uploadPromises = req.files['floorPlans'].map(file =>
        uploadToCloudinary(file.buffer, 'projects/floorplans')
      );
      floorPlanUrls = await Promise.all(uploadPromises);
    } else if (req.body.floorPlans) {
      floorPlanUrls = Array.isArray(req.body.floorPlans) ? req.body.floorPlans : JSON.parse(req.body.floorPlans || '[]');
    }

    // 4. Process documents
    if (req.files && req.files['documents']) {
      const uploadPromises = req.files['documents'].map(async (file) => {
        const url = await uploadToCloudinary(file.buffer, 'projects/documents');
        return { name: file.originalname, url };
      });
      docUrls = await Promise.all(uploadPromises);
    } else if (req.body.documents) {
      docUrls = Array.isArray(req.body.documents) ? req.body.documents : JSON.parse(req.body.documents || '[]');
    }

    // Parse features if it's sent as a JSON string
    let parsedFeatures = [];
    if (features) {
      try {
        parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
      } catch (e) {
        console.error('Failed to parse features:', e);
      }
    }

    const project = await Project.create({
      name,
      builder: builder || req.user._id,
      location,
      units: units || '0 Units',
      status: status || 'Under Construction',
      approvalStatus: 'Approved',
      isFeatured: isFeatured === 'true' || isFeatured === true,
      isActive: true,
      description,
      minPrice,
      maxPrice,
      latitude,
      longitude,
      features: parsedFeatures,
      image: imageUrl || undefined,
      gallery: galleryUrls,
      floorPlans: floorPlanUrls,
      documents: docUrls
    });

    const populated = await Project.findById(project._id).populate('builder', 'name email');
    res.status(201).json(populated);
  } catch (error) {
    console.error('Project create error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/admin/projects/:id
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const {
      name, location, units, status, approvalStatus,
      isFeatured, isActive, description, minPrice, maxPrice,
      latitude, longitude, features, builder
    } = req.body;

    // Process new files if uploaded
    if (req.files && req.files['image'] && req.files['image'][0]) {
      project.image = await uploadToCloudinary(req.files['image'][0].buffer, 'projects/images');
    } else if (req.body.image !== undefined) {
      project.image = req.body.image;
    }

    if (req.files && req.files['gallery']) {
      const uploadPromises = req.files['gallery'].map(file =>
        uploadToCloudinary(file.buffer, 'projects/gallery')
      );
      const newGallery = await Promise.all(uploadPromises);
      project.gallery = [...project.gallery, ...newGallery];
    } else if (req.body.gallery !== undefined) {
      project.gallery = Array.isArray(req.body.gallery) ? req.body.gallery : JSON.parse(req.body.gallery || '[]');
    }

    if (req.files && req.files['floorPlans']) {
      const uploadPromises = req.files['floorPlans'].map(file =>
        uploadToCloudinary(file.buffer, 'projects/floorplans')
      );
      const newFloorPlans = await Promise.all(uploadPromises);
      project.floorPlans = [...project.floorPlans, ...newFloorPlans];
    } else if (req.body.floorPlans !== undefined) {
      project.floorPlans = Array.isArray(req.body.floorPlans) ? req.body.floorPlans : JSON.parse(req.body.floorPlans || '[]');
    }

    if (req.files && req.files['documents']) {
      const uploadPromises = req.files['documents'].map(async (file) => {
        const url = await uploadToCloudinary(file.buffer, 'projects/documents');
        return { name: file.originalname, url };
      });
      const newDocs = await Promise.all(uploadPromises);
      project.documents = [...project.documents, ...newDocs];
    } else if (req.body.documents !== undefined) {
      project.documents = Array.isArray(req.body.documents) ? req.body.documents : JSON.parse(req.body.documents || '[]');
    }

    if (name !== undefined) project.name = name;
    if (location !== undefined) project.location = location;
    if (units !== undefined) project.units = units;
    if (status !== undefined) project.status = status;
    if (approvalStatus !== undefined) project.approvalStatus = approvalStatus;
    if (isFeatured !== undefined) project.isFeatured = isFeatured === 'true' || isFeatured === true;
    if (isActive !== undefined) project.isActive = isActive === 'true' || isActive === true;
    if (description !== undefined) project.description = description;
    if (minPrice !== undefined) project.minPrice = minPrice;
    if (maxPrice !== undefined) project.maxPrice = maxPrice;
    if (latitude !== undefined) project.latitude = latitude;
    if (longitude !== undefined) project.longitude = longitude;
    if (builder !== undefined) project.builder = builder;

    if (features !== undefined) {
      try {
        project.features = typeof features === 'string' ? JSON.parse(features) : features;
      } catch (e) {
        console.error('Failed to parse features:', e);
      }
    }

    await project.save();
    const populated = await Project.findById(project._id).populate('builder', 'name email');
    res.json(populated);
  } catch (error) {
    console.error('Project update error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/admin/projects/:id
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle project approval status
// @route   PUT /api/admin/projects/:id/approval
export const toggleProjectApproval = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.approvalStatus = req.body.approvalStatus || 'Approved';
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle project featured
// @route   PUT /api/admin/projects/:id/toggle-featured
export const toggleProjectFeatured = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : !project.isFeatured;
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle project status (Under Construction/Complete)
// @route   PUT /api/admin/projects/:id/toggle-status
export const toggleProjectStatus = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.status = req.body.status || project.status;
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// PROJECT TYPES CRUD
// ==========================================

// @desc    Get all project types
// @route   GET /api/admin/projects/types
export const getProjectTypes = async (req, res) => {
  try {
    const types = await ProjectType.find().sort({ createdAt: -1 });
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a project type
// @route   POST /api/admin/projects/types
export const createProjectType = async (req, res) => {
  try {
    const { name, minPrice, minArea, totalUnit } = req.body;
    const projectType = await ProjectType.create({
      name,
      minPrice: minPrice || '$0.00',
      minArea: minArea || '0',
      totalUnit: parseInt(totalUnit) || 0,
    });
    res.status(201).json(projectType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a project type
// @route   PUT /api/admin/projects/types/:id
export const updateProjectType = async (req, res) => {
  try {
    const pType = await ProjectType.findById(req.params.id);
    if (!pType) {
      return res.status(404).json({ message: 'Project type not found' });
    }
    if (req.body.name !== undefined) pType.name = req.body.name;
    if (req.body.minPrice !== undefined) pType.minPrice = req.body.minPrice;
    if (req.body.minArea !== undefined) pType.minArea = req.body.minArea;
    if (req.body.totalUnit !== undefined) pType.totalUnit = parseInt(req.body.totalUnit) || 0;
    if (req.body.status !== undefined) pType.status = req.body.status;
    await pType.save();
    res.json(pType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a project type
// @route   DELETE /api/admin/projects/types/:id
export const deleteProjectType = async (req, res) => {
  try {
    const pType = await ProjectType.findById(req.params.id);
    if (!pType) {
      return res.status(404).json({ message: 'Project type not found' });
    }
    await ProjectType.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project type removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// PROJECT SETTINGS
// ==========================================

// @desc    Get project settings
// @route   GET /api/admin/projects/settings
export const getProjectSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ needsApproval: true, needsProjectApproval: true });
    }
    res.json({
      needsProjectApproval: settings.needsProjectApproval !== undefined ? settings.needsProjectApproval : true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update project settings
// @route   PUT /api/admin/projects/settings
export const updateProjectSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ needsApproval: true, needsProjectApproval: true });
    }
    if (req.body.needsProjectApproval !== undefined) {
      settings.needsProjectApproval = req.body.needsProjectApproval;
    }
    await settings.save();
    res.json({
      needsProjectApproval: settings.needsProjectApproval,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
