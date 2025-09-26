const express = require('express');
const { body, validationResult } = require('express-validator');
const BlogPost = require('../models/BlogPost');

const router = express.Router();

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      tag, 
      featured, 
      published = true,
      search 
    } = req.query;

    const filter = { isPublished: published === 'true' };
    
    if (featured === 'true') filter.isFeatured = true;
    if (category) filter.category = category;
    if (tag) filter.tags = { $in: [tag] };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const blogPosts = await BlogPost.find(filter)
      .populate('author', 'firstName lastName email')
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await BlogPost.countDocuments(filter);

    res.json({
      success: true,
      data: {
        blogPosts,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts'
    });
  }
});

// Get featured blog posts
router.get('/featured', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find({ 
      isPublished: true, 
      isFeatured: true 
    })
    .populate('author', 'firstName lastName email')
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(6);

    res.json({
      success: true,
      data: blogPosts
    });
  } catch (error) {
    console.error('Get featured blog posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured blog posts'
    });
  }
});

// Get blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const blogPost = await BlogPost.findOne({ 
      slug: req.params.slug,
      isPublished: true 
    }).populate('author', 'firstName lastName email bio');

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment view count
    blogPost.views += 1;
    await blogPost.save();

    res.json({
      success: true,
      data: blogPost
    });
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post'
    });
  }
});

// Get blog posts by category
router.get('/category/:category', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10 
    } = req.query;

    const blogPosts = await BlogPost.find({ 
      category: req.params.category,
      isPublished: true 
    })
    .populate('author', 'firstName lastName email')
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const total = await BlogPost.countDocuments({ 
      category: req.params.category,
      isPublished: true 
    });

    res.json({
      success: true,
      data: {
        blogPosts,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get blog posts by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts by category'
    });
  }
});

// Search blog posts
router.get('/search', async (req, res) => {
  try {
    const { 
      q: query, 
      page = 1, 
      limit = 10 
    } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const blogPosts = await BlogPost.find({
      $and: [
        { isPublished: true },
        {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
            { excerpt: { $regex: query, $options: 'i' } },
            { tags: { $in: [new RegExp(query, 'i')] } }
          ]
        }
      ]
    })
    .populate('author', 'firstName lastName email')
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const total = await BlogPost.countDocuments({
      $and: [
        { isPublished: true },
        {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
            { excerpt: { $regex: query, $options: 'i' } },
            { tags: { $in: [new RegExp(query, 'i')] } }
          ]
        }
      ]
    });

    res.json({
      success: true,
      data: {
        blogPosts,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        },
        query
      }
    });
  } catch (error) {
    console.error('Search blog posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search blog posts'
    });
  }
});

// Create blog post (admin only)
router.post('/', [
  body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
  body('content').trim().isLength({ min: 100 }).withMessage('Content must be at least 100 characters'),
  body('excerpt').trim().isLength({ min: 50, max: 500 }).withMessage('Excerpt must be between 50 and 500 characters'),
  body('category').trim().isLength({ min: 2, max: 50 }).withMessage('Category must be between 2 and 50 characters'),
  body('tags').optional().isArray(),
  body('isPublished').optional().isBoolean(),
  body('isFeatured').optional().isBoolean(),
  body('featuredImage').optional().isURL(),
  body('author').isMongoId().withMessage('Valid author ID is required')
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

    // Generate slug from title
    const slug = req.body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    let uniqueSlug = slug;
    let counter = 1;
    while (await BlogPost.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const blogPost = new BlogPost({
      ...req.body,
      slug: uniqueSlug,
      publishedAt: req.body.isPublished ? new Date() : null
    });

    await blogPost.save();
    await blogPost.populate('author', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blogPost
    });
  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create blog post'
    });
  }
});

// Update blog post (admin only)
router.put('/:id', [
  body('title').optional().trim().isLength({ min: 5, max: 200 }),
  body('content').optional().trim().isLength({ min: 100 }),
  body('excerpt').optional().trim().isLength({ min: 50, max: 500 }),
  body('category').optional().trim().isLength({ min: 2, max: 50 }),
  body('tags').optional().isArray(),
  body('isPublished').optional().isBoolean(),
  body('isFeatured').optional().isBoolean(),
  body('featuredImage').optional().isURL()
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

    const blogPost = await BlogPost.findById(req.params.id);

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Update publishedAt if publishing for the first time
    if (req.body.isPublished && !blogPost.isPublished) {
      req.body.publishedAt = new Date();
    }

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'firstName lastName email');

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedBlogPost
    });
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blog post'
    });
  }
});

// Delete blog post (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog post'
    });
  }
});

module.exports = router;
