import Category from '../models/Category.js';
import Amenity from '../models/Amenity.js';
import Country from '../models/Country.js';
import State from '../models/State.js';
import City from '../models/City.js';

// ==========================================
// CATEGORIES CONTROLLERS
// ==========================================
export const getCategories = async (req, res) => {
  try {
    const list = await Category.find().sort({ serial: 1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { type, name, nameAr, image, status, serial } = req.body;
    const cat = await Category.create({ type, name, nameAr, image, status, serial });
    res.status(201).json(cat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategoryStatus = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (cat) {
      cat.status = req.body.status || cat.status;
      await cat.save();
      res.json(cat);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const cat = await Category.findByIdAndDelete(req.params.id);
    if (cat) {
      res.json({ message: 'Category deleted' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// AMENITIES CONTROLLERS
// ==========================================
export const getAmenities = async (req, res) => {
  try {
    const list = await Amenity.find().sort({ serial: 1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAmenity = async (req, res) => {
  try {
    const { iconName, name, status, serial } = req.body;
    const am = await Amenity.create({ iconName, name, status, serial });
    res.status(201).json(am);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAmenityStatus = async (req, res) => {
  try {
    const am = await Amenity.findById(req.params.id);
    if (am) {
      am.status = req.body.status || am.status;
      await am.save();
      res.json(am);
    } else {
      res.status(404).json({ message: 'Amenity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAmenity = async (req, res) => {
  try {
    const am = await Amenity.findByIdAndDelete(req.params.id);
    if (am) {
      res.json({ message: 'Amenity deleted' });
    } else {
      res.status(404).json({ message: 'Amenity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// COUNTRIES CONTROLLERS
// ==========================================
export const getCountries = async (req, res) => {
  try {
    const list = await Country.find().sort({ serial: 1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCountry = async (req, res) => {
  try {
    const { name, slug, status, serial } = req.body;
    const item = await Country.create({ name, slug: slug || name.toLowerCase(), status, serial });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCountryStatus = async (req, res) => {
  try {
    const item = await Country.findById(req.params.id);
    if (item) {
      item.status = req.body.status || item.status;
      await item.save();
      res.json(item);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCountry = async (req, res) => {
  try {
    const item = await Country.findByIdAndDelete(req.params.id);
    if (item) {
      res.json({ message: 'Country deleted' });
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// STATES CONTROLLERS
// ==========================================
export const getStates = async (req, res) => {
  try {
    const list = await State.find().populate('country', 'name').sort({ serial: 1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createState = async (req, res) => {
  try {
    const { country, name, slug, status, serial } = req.body;
    const item = await State.create({ country, name, slug: slug || name.toLowerCase(), status, serial });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStateStatus = async (req, res) => {
  try {
    const item = await State.findById(req.params.id);
    if (item) {
      item.status = req.body.status || item.status;
      await item.save();
      res.json(item);
    } else {
      res.status(404).json({ message: 'State not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteState = async (req, res) => {
  try {
    const item = await State.findByIdAndDelete(req.params.id);
    if (item) {
      res.json({ message: 'State deleted' });
    } else {
      res.status(404).json({ message: 'State not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// CITIES CONTROLLERS
// ==========================================
export const getCities = async (req, res) => {
  try {
    const list = await City.find()
      .populate('country', 'name')
      .populate('state', 'name')
      .sort({ serial: 1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCity = async (req, res) => {
  try {
    const { country, state, name, slug, status, serial } = req.body;
    const item = await City.create({ country, state, name, slug: slug || name.toLowerCase(), status, serial });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCityStatus = async (req, res) => {
  try {
    const item = await City.findById(req.params.id);
    if (item) {
      item.status = req.body.status || item.status;
      await item.save();
      res.json(item);
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCity = async (req, res) => {
  try {
    const item = await City.findByIdAndDelete(req.params.id);
    if (item) {
      res.json({ message: 'City deleted' });
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
