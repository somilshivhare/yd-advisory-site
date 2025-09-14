#!/bin/bash

# YD Advisory - Development Setup Script
# This script helps set up the development environment

echo "🚀 YD Advisory - Setting up development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v14 or higher) first."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   On macOS: brew services start mongodb-community"
    echo "   On Ubuntu: sudo systemctl start mongod"
    echo "   On Windows: Start MongoDB service"
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Create environment files if they don't exist
echo "⚙️  Setting up environment files..."

# Server .env
if [ ! -f server/.env ]; then
    echo "Creating server/.env..."
    cat > server/.env << EOL
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/yd-advisory
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
EOL
fi

# Client .env
if [ ! -f client/.env ]; then
    echo "Creating client/.env..."
    cat > client/.env << EOL
REACT_APP_API_URL=http://localhost:5000/api
EOL
fi

echo "✅ Setup complete!"
echo ""
echo "🎉 You can now start the development server:"
echo "   npm run dev"
echo ""
echo "📱 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "📚 For more information, check the README.md file"
