#!/bin/bash

# Simple deployment script for Vue.js app
# This script should be run on your server

set -e

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /path/to/your/project

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building application..."
npm run build

# Copy built files to web server directory
echo "📋 Copying files to web directory..."
sudo cp -r dist/* /var/www/html/

# Reload nginx (adjust based on your web server)
echo "🔄 Reloading web server..."
sudo systemctl reload nginx

echo "✅ Deployment completed successfully!"
