import Language from '../models/Language.js';

// @desc    Get all languages
// @route   GET /api/admin/languages
export const getLanguages = async (req, res) => {
  try {
    const list = await Language.find().sort({ createdAt: 1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new language
// @route   POST /api/admin/languages
export const createLanguage = async (req, res) => {
  try {
    const { name, code, direction } = req.body;
    if (!name || !code) {
      return res.status(400).json({ message: 'Name and code are required' });
    }

    const exists = await Language.findOne({ code });
    if (exists) {
      return res.status(400).json({ message: 'Language code already exists' });
    }

    // Default keywords template (copying from existing default language if possible)
    let defaultKeywords = {};
    const defaultLang = await Language.findOne({ isDefault: true });
    if (defaultLang && defaultLang.keywords) {
      defaultKeywords = Object.fromEntries(defaultLang.keywords);
    }

    const lang = await Language.create({
      name,
      code,
      direction: direction || 'LTR',
      isDefault: false,
      keywords: defaultKeywords
    });

    res.status(201).json(lang);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update language details
// @route   PUT /api/admin/languages/:id
export const updateLanguage = async (req, res) => {
  try {
    const lang = await Language.findById(req.params.id);
    if (!lang) {
      return res.status(404).json({ message: 'Language not found' });
    }

    if (req.body.name) lang.name = req.body.name;
    if (req.body.code) lang.code = req.body.code;
    if (req.body.direction) lang.direction = req.body.direction;

    await lang.save();
    res.json(lang);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete language
// @route   DELETE /api/admin/languages/:id
export const deleteLanguage = async (req, res) => {
  try {
    const lang = await Language.findById(req.params.id);
    if (!lang) {
      return res.status(404).json({ message: 'Language not found' });
    }
    if (lang.isDefault) {
      return res.status(400).json({ message: 'Cannot delete default language' });
    }
    await Language.findByIdAndDelete(req.params.id);
    res.json({ message: 'Language removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Make language default website language
// @route   PUT /api/admin/languages/:id/default
export const makeDefaultLanguage = async (req, res) => {
  try {
    const target = await Language.findById(req.params.id);
    if (!target) {
      return res.status(404).json({ message: 'Language not found' });
    }

    // Set all to false
    await Language.updateMany({}, { isDefault: false });

    // Set target to true
    target.isDefault = true;
    await target.save();

    res.json({ message: `${target.name} set as default language` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add translation keyword globally
// @route   POST /api/admin/languages/keywords
export const addKeyword = async (req, res) => {
  try {
    const { keyword, value } = req.body;
    if (!keyword) {
      return res.status(400).json({ message: 'Keyword is required' });
    }

    const allLangs = await Language.find();
    for (let lang of allLangs) {
      if (!lang.keywords) {
        lang.keywords = new Map();
      }
      lang.keywords.set(keyword, value || keyword);
      await lang.save();
    }

    res.json({ message: `Keyword '${keyword}' added across all languages` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
