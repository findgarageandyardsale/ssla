#!/bin/bash

# Build the production version using .env file
echo "Building production version using .env file..."
npm run build

echo "Build completed! Check the dist/ folder for your production files."
