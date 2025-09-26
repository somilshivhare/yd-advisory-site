const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  longDescription: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: 'Please provide a valid image URL'
    }
  },
  images: [{
    url: {
      type: String,
      validate: {
        validator: function(v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
        },
        message: 'Please provide a valid image URL'
      }
    },
    alt: String,
    caption: String
  }],
  client: {
    type: String,
    trim: true,
    maxlength: 100
  },
  projectDate: {
    type: Date
  },
  technologies: [{
    type: String,
    trim: true
  }],
  projectUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Please provide a valid project URL'
    }
  },
  githubUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/github\.com\/.+/.test(v);
      },
      message: 'Please provide a valid GitHub URL'
    }
  },
  features: [{
    title: String,
    description: String
  }],
  challenges: [{
    title: String,
    description: String,
    solution: String
  }],
  results: {
    metrics: [{
      label: String,
      value: String,
      description: String
    }],
    description: String
  },
  testimonial: {
    text: String,
    author: String,
    position: String,
    company: String,
    avatar: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
portfolioSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
portfolioSchema.index({ category: 1, isActive: 1, isFeatured: 1 });
portfolioSchema.index({ createdAt: -1 });
portfolioSchema.index({ order: 1 });

// Virtual for full name
portfolioSchema.virtual('fullTitle').get(function() {
  return `${this.title}${this.client ? ` - ${this.client}` : ''}`;
});

// Method to get public data (exclude sensitive fields)
portfolioSchema.methods.toPublicJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Portfolio', portfolioSchema);
