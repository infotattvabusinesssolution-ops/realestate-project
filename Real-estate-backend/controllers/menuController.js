import Menu from '../models/Menu.js';

// @desc    Get all website menu items ordered
// @route   GET /api/admin/menus
export const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find().sort({ order: 1 });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Bulk sync/save all menu items
// @route   POST /api/admin/menus/sync
export const syncMenus = async (req, res) => {
  try {
    const { menus } = req.body;
    if (!Array.isArray(menus)) {
      return res.status(400).json({ message: 'Menus must be an array' });
    }

    // Clear existing menus
    await Menu.deleteMany();

    // Map and insert new list
    const itemsToInsert = menus.map((m, index) => ({
      name: m.name,
      url: m.url || '',
      target: m.target || 'Self',
      isExpandable: m.isExpandable || false,
      isCustom: m.isCustom || false,
      order: index,
    }));

    const inserted = await Menu.insertMany(itemsToInsert);
    res.status(201).json(inserted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
