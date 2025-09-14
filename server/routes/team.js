const express = require('express');
const { body, validationResult } = require('express-validator');
const TeamMember = require('../models/TeamMember');

const router = express.Router();

// Get all team members
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      featured, 
      active = true 
    } = req.query;

    const filter = { isActive: active === 'true' };
    
    if (featured === 'true') filter.isFeatured = true;

    const teamMembers = await TeamMember.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await TeamMember.countDocuments(filter);

    res.json({
      success: true,
      data: {
        teamMembers,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team members'
    });
  }
});

// Get featured team members
router.get('/featured', async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ 
      isActive: true, 
      isFeatured: true 
    })
    .sort({ order: 1, createdAt: -1 })
    .limit(6);

    res.json({
      success: true,
      data: teamMembers
    });
  } catch (error) {
    console.error('Get featured team members error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured team members'
    });
  }
});

// Get team member by ID
router.get('/:id', async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    console.error('Get team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team member'
    });
  }
});

// Create team member (admin only)
router.post('/', [
  body('firstName').trim().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
  body('lastName').trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
  body('position').trim().isLength({ min: 2, max: 100 }).withMessage('Position must be between 2 and 100 characters'),
  body('bio').trim().isLength({ min: 10, max: 1000 }).withMessage('Bio must be between 10 and 1000 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('specialties').optional().isArray(),
  body('certifications').optional().isArray(),
  body('education').optional().isArray(),
  body('experience.years').optional().isInt({ min: 0 }),
  body('socialLinks.linkedin').optional().isURL(),
  body('socialLinks.twitter').optional().isURL(),
  body('socialLinks.facebook').optional().isURL(),
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

    const teamMember = new TeamMember(req.body);
    await teamMember.save();

    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: teamMember
    });
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create team member'
    });
  }
});

// Update team member (admin only)
router.put('/:id', [
  body('firstName').optional().trim().isLength({ min: 2, max: 50 }),
  body('lastName').optional().trim().isLength({ min: 2, max: 50 }),
  body('position').optional().trim().isLength({ min: 2, max: 100 }),
  body('bio').optional().trim().isLength({ min: 10, max: 1000 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('phone').optional().isMobilePhone(),
  body('specialties').optional().isArray(),
  body('certifications').optional().isArray(),
  body('education').optional().isArray(),
  body('experience.years').optional().isInt({ min: 0 }),
  body('socialLinks.linkedin').optional().isURL(),
  body('socialLinks.twitter').optional().isURL(),
  body('socialLinks.facebook').optional().isURL(),
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

    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.json({
      success: true,
      message: 'Team member updated successfully',
      data: teamMember
    });
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update team member'
    });
  }
});

// Delete team member (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete team member'
    });
  }
});

module.exports = router;
