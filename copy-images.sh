#!/bin/bash

# Copy Images Script for YD Advisory
echo "📸 Copying images from assets to React public folder..."

# Create images directory in public folder
mkdir -p client/public/images

# Copy all images from assets to public
echo "📁 Copying images..."
cp -r assets/images/* client/public/images/

# Copy logo to root of public folder
echo "🏷️  Copying logo..."
cp assets/images/logo.png client/public/

echo "✅ Images copied successfully!"
echo "📂 Images are now available at:"
echo "   - /images/logo.png (logo)"
echo "   - /images/slider/ (hero backgrounds)"
echo "   - /images/services/ (service images)"
echo "   - /images/team/ (team member photos)"
echo "   - /images/blog/ (blog post images)"
echo "   - /images/about-pic.jpg (about section)"
echo "   - /images/contact-section-bg.jpg (contact background)"
echo "   - /images/pg-title-bg.jpg (page titles)"
echo ""
echo "🎉 All images are ready to use in your React components!"
