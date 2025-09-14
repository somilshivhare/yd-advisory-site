#!/bin/bash

# MongoDB Setup Script for YD Advisory
echo "🗄️  Setting up MongoDB for YD Advisory..."

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "❌ MongoDB is not installed. Please install MongoDB first."
    echo "   Visit: https://docs.mongodb.com/manual/installation/"
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "🔄 Starting MongoDB service..."
    
    # Try to start MongoDB (different commands for different systems)
    if command -v brew &> /dev/null; then
        # macOS with Homebrew
        brew services start mongodb-community
    elif command -v systemctl &> /dev/null; then
        # Linux with systemd
        sudo systemctl start mongod
    elif command -v service &> /dev/null; then
        # Linux with service command
        sudo service mongod start
    else
        echo "⚠️  Please start MongoDB manually"
        echo "   On Windows: Start MongoDB service from Services"
        echo "   On macOS: brew services start mongodb-community"
        echo "   On Linux: sudo systemctl start mongod"
    fi
    
    # Wait a moment for MongoDB to start
    sleep 3
fi

# Check if MongoDB is now running
if pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB is running"
    
    # Create database and collections
    echo "📊 Creating database and collections..."
    
    # Connect to MongoDB and create the database
    mongosh --eval "
        use yd-advisory;
        print('✅ Connected to yd-advisory database');
        
        // Create collections with sample data
        db.services.insertMany([
            {
                title: 'Investment Management',
                description: 'Professional portfolio management and investment strategies tailored to your risk tolerance.',
                shortDescription: 'Expert portfolio management for optimal returns',
                icon: 'FiTrendingUp',
                category: 'investment',
                isFeatured: true,
                isActive: true,
                createdAt: new Date()
            },
            {
                title: 'Financial Planning',
                description: 'Comprehensive financial planning services to help you achieve your financial goals.',
                shortDescription: 'Complete financial roadmap for your future',
                icon: 'FiTarget',
                category: 'planning',
                isFeatured: true,
                isActive: true,
                createdAt: new Date()
            },
            {
                title: 'Risk Assessment',
                description: 'Comprehensive risk analysis and mitigation strategies to protect your assets.',
                shortDescription: 'Protect your wealth with expert risk analysis',
                icon: 'FiShield',
                category: 'risk',
                isFeatured: true,
                isActive: true,
                createdAt: new Date()
            }
        ]);
        
        print('✅ Services collection created with sample data');
        
        // Create other collections
        db.contacts.createIndex({ email: 1 });
        db.team.createIndex({ isActive: 1, isFeatured: 1 });
        db.blog.createIndex({ isPublished: 1, publishedAt: -1 });
        db.portfolio.createIndex({ isActive: 1, isFeatured: 1 });
        
        print('✅ All collections created with indexes');
        print('🎉 Database setup complete!');
    "
    
    if [ $? -eq 0 ]; then
        echo "🎉 MongoDB setup completed successfully!"
        echo "📝 You can now start the server with: npm run dev"
    else
        echo "❌ Error setting up database"
        exit 1
    fi
else
    echo "❌ MongoDB is not running. Please start it manually."
    echo "   On Windows: Start MongoDB service from Services"
    echo "   On macOS: brew services start mongodb-community"
    echo "   On Linux: sudo systemctl start mongod"
    exit 1
fi
