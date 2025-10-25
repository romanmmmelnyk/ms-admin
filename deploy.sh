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

# Install PM2 and serve if not already installed
echo "📦 Setting up PM2..."
npm install -g pm2 serve 2>/dev/null || true

# Stop existing PM2 process if running
echo "🛑 Stopping existing PM2 process..."
pm2 delete ms-admin 2>/dev/null || true

# Copy built files to current directory (already done by rsync in CI/CD)
echo "📋 Files already in place via rsync..."

# Start PM2 service on port 9200
echo "🚀 Starting PM2 service on port 9200..."
pm2 serve . 9200 --name ms-admin --spa

# Setup PM2 to start on boot
echo "⚙️ Setting up PM2 startup..."
pm2 startup systemd -u $USER --hp $HOME 2>/dev/null || true
pm2 save

echo "🌐 App is now running on port 9200"

echo "✅ Deployment completed successfully!"
