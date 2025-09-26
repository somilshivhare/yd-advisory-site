const express = require('express');
const { body, validationResult } = require('express-validator');
const Portfolio = require('../models/Portfolio');

const router = express.Router();

// Get all portfolio items
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      featured, 
      active = true 
    } = req.query;

    const filter = { isActive: active === 'true' };
    
    if (featured === 'true') filter.isFeatured = true;
    if (category) filter.category = category;

    const portfolioItems = await Portfolio.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Portfolio.countDocuments(filter);

    res.json({
      success: true,
      data: {
        portfolioItems,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get portfolio items error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch portfolio items'
    });
  }
});

// Get featured portfolio items
router.get('/featured', async (req, res) => {
  try {
    const portfolioItems = await Portfolio.find({ 
      isActive: true, 
      isFeatured: true 
    })
    .sort({ order: 1, createdAt: -1 })
    .limit(6);

    res.json({
      success: true,
      data: portfolioItems
    });
  } catch (error) {
    console.error('Get featured portfolio items error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured portfolio items'
    });
  }
});

// Get portfolio item by ID
router.get('/:id', async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    res.json({
      success: true,
      data: portfolioItem
    });
  } catch (error) {
    console.error('Get portfolio item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch portfolio item'
    });
  }
});

// Create portfolio item (admin only)
router.post('/', [
  body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
  body('category').trim().isLength({ min: 2, max: 50 }).withMessage('Category must be between 2 and 50 characters'),
  body('image').isURL().withMessage('Please provide a valid image URL'),
  body('client').optional().trim().isLength({ max: 100 }),
  body('projectDate').optional().isISO8601().withMessage('Please provide a valid date'),
  body('technologies').optional().isArray(),
  body('projectUrl').optional().isURL(),
  body('githubUrl').optional().isURL(),
  body('isActive').optional().isBoolean(),
  body('isFeatured').optional().isBoolean(),
  body('order').optional().isInt()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const portfolioItem = new Portfolio(req.body);
    await portfolioItem.save();

    res.status(201).json({
      success: true,
      message: 'Portfolio item created successfully',
      data: portfolioItem
    });
  } catch (error) {
    console.error('Create portfolio item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create portfolio item'
    });
  }
});

// Update portfolio item (admin only)
router.put('/:id', [
  body('title').optional().trim().isLength({ min: 5, max: 100 }),
  body('description').optional().trim().isLength({ min: 10, max: 500 }),
  body('category').optional().trim().isLength({ min: 2, max: 50 }),
  body('image').optional().isURL(),
  body('client').optional().trim().isLength({ max: 100 }),
  body('projectDate').optional().isISO8601(),
  body('technologies').optional().isArray(),
  body('projectUrl').optional().isURL(),
  body('githubUrl').optional().isURL(),
  body('isActive').optional().isBoolean(),
  body('isFeatured').optional().isBoolean(),
  body('order').optional().isInt()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const portfolioItem = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    res.json({
      success: true,
      message: 'Portfolio item updated successfully',
      data: portfolioItem
    });
  } catch (error) {
    console.error('Update portfolio item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update portfolio item'
    });
  }
});

// Delete portfolio item (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findByIdAndDelete(req.params.id);

    if (!portfolioItem) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    res.json({
      success: true,
      message: 'Portfolio item deleted successfully'
    });
  } catch (error) {
    console.error('Delete portfolio item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete portfolio item'
    });
  }
});

module.exports = router;
