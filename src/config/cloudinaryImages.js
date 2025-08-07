// Cloudinary Image Configuration
// Add your known Cloudinary image URLs here

export const CLOUDINARY_IMAGES = [
  // Add your Cloudinary image URLs here
  // Your cloud name is: dxphpim2o
  // Example format:
  // 'https://res.cloudinary.com/dxphpim2o/image/upload/v1/hp_school_gallery/image1.jpg',
  // 'https://res.cloudinary.com/dxphpim2o/image/upload/v1/hp_school_gallery/image2.png',
  
  // Replace with your actual image URLs from Cloudinary
  // You can get these URLs from your Cloudinary dashboard
  
  // EXAMPLE (replace with your actual URLs):
  // 'https://res.cloudinary.com/dxphpim2o/image/upload/v1/hp_school_gallery/school1.jpg',
  // 'https://res.cloudinary.com/dxphpim2o/image/upload/v1/hp_school_gallery/school2.png',
  
  // TEMPORARY: Add your actual image URLs here
  // Go to your Cloudinary dashboard, click on each image, and copy the "Secure URL"
  // Then uncomment and replace the examples below:
  
  // 'https://res.cloudinary.com/dxphpim2o/image/upload/v1/hp_school_gallery/YOUR_ACTUAL_IMAGE1.jpg',
  // 'https://res.cloudinary.com/dxphpim2o/image/upload/v1/hp_school_gallery/YOUR_ACTUAL_IMAGE2.png',
];

// Alternative: If you know the folder structure, you can construct URLs
export const CLOUDINARY_FOLDER_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  folder: 'hp_school_gallery',
  // Add known filenames here
  knownFilenames: [
    // 'gallery_1703123456789.jpg',
    // 'gallery_1703123456790.png',
    // Add your actual filenames here
    
    // EXAMPLE (replace with your actual filenames):
    // 'school1.jpg',
    // 'school2.png',
    
    // TEMPORARY: Add your actual filenames here
    // Go to your Cloudinary dashboard, find the filenames in the hp_school_gallery folder
    // Then uncomment and replace the examples below:
    
    // 'YOUR_ACTUAL_FILENAME1.jpg',
    // 'YOUR_ACTUAL_FILENAME2.png',
  ]
};

// Helper function to construct URLs from known filenames
export const constructImageUrls = () => {
  const { cloudName, folder, knownFilenames } = CLOUDINARY_FOLDER_CONFIG;
  
  if (!cloudName || knownFilenames.length === 0) {
    return [];
  }

  return knownFilenames.map(filename => 
    `https://res.cloudinary.com/${cloudName}/image/upload/v1/${folder}/${filename}`
  );
};

// Helper function to get URLs from localStorage (if you have any stored images)
export const getStoredImageUrls = () => {
  try {
    const stored = localStorage.getItem('cloudinary_gallery_images');
    if (stored) {
      const storedImages = JSON.parse(stored);
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      
      return storedImages.map(imageInfo => 
        `https://res.cloudinary.com/${cloudName}/image/upload/v1/hp_school_gallery/${imageInfo.filename}`
      );
    }
  } catch (error) {
    console.error('Error getting stored image URLs:', error);
  }
  return [];
};

// Helper function to get the most recently uploaded image URL
export const getLatestUploadedImageUrl = () => {
  try {
    const stored = localStorage.getItem('cloudinary_gallery_images');
    if (stored) {
      const storedImages = JSON.parse(stored);
      if (storedImages.length > 0) {
        // Get the most recent image (last in the array)
        const latestImage = storedImages[storedImages.length - 1];
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        return `https://res.cloudinary.com/${cloudName}/image/upload/v1/hp_school_gallery/${latestImage.filename}`;
      }
    }
  } catch (error) {
    console.error('Error getting latest image URL:', error);
  }
  return null;
}; 