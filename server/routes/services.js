const express = require('express');
const { body, validationResult } = require('express-validator');
const Service = require('../models/Service');

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      featured, 
      search,
      active = true 
    } = req.query;

    const filter = { isActive: active === 'true' };
    
    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    
    let query = Service.find(filter);

    // Add search functionality
    if (search) {
      query = query.find({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } }
        ]
      });
    }

    const services = await query
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-content'); // Exclude full content for list view

    const total = await Service.countDocuments(filter);

    res.json({
      success: true,
      data: {
        services,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services'
    });
  }
});

// Get featured services
router.get('/featured', async (req, res) => {
  try {
    const services = await Service.find({ 
      isActive: true, 
      isFeatured: true 
    })
    .sort({ createdAt: -1 })
    .limit(6)
    .select('-content');

    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Get featured services error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured services'
    });
  }
});

// Get service by slug
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ 
      slug: req.params.slug,
      isActive: true 
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service'
    });
  }
});

// Get services by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const services = await Service.find({ 
      category,
      isActive: true 
    })
    .sort({ isFeatured: -1, createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select('-content');

    const total = await Service.countDocuments({ 
      category,
      isActive: true 
    });

    res.json({
      success: true,
      data: {
        services,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get services by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services by category'
    });
  }
});

// Create new service (admin only)
router.post('/', [
  body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
  body('content').trim().isLength({ min: 50 }).withMessage('Content must be at least 50 characters'),
  body('category').isIn(['investment', 'planning', 'risk', 'tax', 'estate', 'business']).withMessage('Invalid category'),
  body('icon').optional().trim(),
  body('image').optional().trim(),
  body('features').optional().isArray(),
  body('pricing.startingFrom').optional().isNumeric(),
  body('pricing.currency').optional().isIn(['USD', 'EUR', 'GBP']),
  body('pricing.pricingModel').optional().isIn(['hourly', 'project', 'retainer', 'percentage']),
  body('isFeatured').optional().isBoolean(),
  body('metaTitle').optional().trim().isLength({ max: 60 }),
  body('metaDescription').optional().trim().isLength({ max: 160 })
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

    const service = new Service(req.body);
    await service.save();

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create service'
    });
  }
});

// Update service (admin only)
router.put('/:id', [
  body('title').optional().trim().isLength({ min: 5, max: 100 }),
  body('description').optional().trim().isLength({ min: 10, max: 500 }),
  body('content').optional().trim().isLength({ min: 50 }),
  body('category').optional().isIn(['investment', 'planning', 'risk', 'tax', 'estate', 'business']),
  body('icon').optional().trim(),
  body('image').optional().trim(),
  body('features').optional().isArray(),
  body('pricing.startingFrom').optional().isNumeric(),
  body('pricing.currency').optional().isIn(['USD', 'EUR', 'GBP']),
  body('pricing.pricingModel').optional().isIn(['hourly', 'project', 'retainer', 'percentage']),
  body('isActive').optional().isBoolean(),
  body('isFeatured').optional().isBoolean(),
  body('metaTitle').optional().trim().isLength({ max: 60 }),
  body('metaDescription').optional().trim().isLength({ max: 160 })
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

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update service'
    });
  }
});

// Delete service (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete service'
    });
  }
});

// Get service categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Service.distinct('category', { isActive: true });
    
    const categoryInfo = {
      investment: { name: 'Investment Management', count: 0 },
      planning: { name: 'Financial Planning', count: 0 },
      risk: { name: 'Risk Assessment', count: 0 },
      tax: { name: 'Tax Planning', count: 0 },
      estate: { name: 'Estate Planning', count: 0 },
      business: { name: 'Business Consulting', count: 0 }
    };

    // Get counts for each category
    for (const category of categories) {
      const count = await Service.countDocuments({ 
        category, 
        isActive: true 
      });
      if (categoryInfo[category]) {
        categoryInfo[category].count = count;
      }
    }

    res.json({
      success: true,
      data: categoryInfo
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
});

module.exports = router;
