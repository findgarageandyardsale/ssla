import { CLOUDINARY_IMAGES, constructImageUrls, getStoredImageUrls } from '../config/cloudinaryImages';



// Upload image to localStorage (simulated Cloudinary upload)
export const uploadImage = async (file) => {
  try {
    console.log('Uploading image to localStorage:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

    // Generate a unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `gallery_${timestamp}.${fileExtension}`;

    // Convert file to base64 for localStorage storage
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // Create image info object
    const imageInfo = {
      id: Date.now(),
      public_id: `hp_school_gallery/${uniqueFileName}`,
      filename: uniqueFileName,
      originalName: file.name,
      width: 800, // Default values
      height: 600,
      uploaded_at: new Date().toISOString(),
      base64Data: base64Data,
      fileSize: file.size,
      fileType: file.type
    };

    // Add to localStorage
    const existingImages = JSON.parse(localStorage.getItem('cloudinary_gallery_images') || '[]');
    existingImages.push(imageInfo);
    localStorage.setItem('cloudinary_gallery_images', JSON.stringify(existingImages));
    
    console.log('Image stored in localStorage:', {
      id: imageInfo.id,
      filename: imageInfo.filename,
      size: imageInfo.fileSize
    });
    
    return {
      success: true,
      url: base64Data, // Use base64 data as URL
      public_id: imageInfo.public_id,
      width: imageInfo.width,
      height: imageInfo.height,
      imageInfo: imageInfo,
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Get all images from localStorage
export const getGalleryImages = async () => {
  try {
    console.log('Fetching images from localStorage...');

    // Get images from localStorage
    const stored = localStorage.getItem('cloudinary_gallery_images');
    console.log('Raw localStorage data:', stored);
    
    const storedImages = stored ? JSON.parse(stored) : [];
    console.log('Parsed stored images:', storedImages);
    
    if (storedImages.length > 0) {
      console.log('Found', storedImages.length, 'images in localStorage');
      
      const imagesWithUrls = storedImages.map(imageInfo => {
        // Use base64 data as image URL
        const imageUrl = imageInfo.base64Data || `data:image/jpeg;base64,${imageInfo.base64Data}`;
        
        return {
          id: imageInfo.id,
          image: imageUrl,
          public_id: imageInfo.public_id,
          width: imageInfo.width,
          height: imageInfo.height,
          uploaded_at: imageInfo.uploaded_at,
          filename: imageInfo.filename,
          originalName: imageInfo.originalName,
          fileSize: imageInfo.fileSize,
          fileType: imageInfo.fileType
        };
      });
      
      console.log('Final images array:', imagesWithUrls.length, 'images');
      
      return {
        success: true,
        images: imagesWithUrls,
        source: 'localStorage'
      };
    } else {
      console.log('No images found in localStorage');
      return {
        success: true,
        images: [],
        source: 'empty',
        message: 'No images uploaded yet'
      };
    }

  } catch (error) {
    console.error('Fetch error:', error);
    return {
      success: false,
      images: [],
      source: 'error',
      error: error.message
    };
  }
};



// Delete image from localStorage
export const deleteImage = async (publicId) => {
  try {
    console.log('Delete image from localStorage:', publicId);
    
    // Remove from localStorage
    const stored = localStorage.getItem('cloudinary_gallery_images');
    const storedImages = stored ? JSON.parse(stored) : [];
    const updatedImages = storedImages.filter(img => img.public_id !== publicId);
    localStorage.setItem('cloudinary_gallery_images', JSON.stringify(updatedImages));
    
    console.log('Image removed from localStorage. Remaining images:', updatedImages.length);
    
    return {
      success: true,
      message: 'Image removed from gallery!',
    };
  } catch (error) {
    console.error('Delete error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Debug function to check localStorage
export const debugLocalStorage = () => {
  try {
    const stored = localStorage.getItem('cloudinary_gallery_images');
    console.log('=== localStorage Debug ===');
    console.log('Raw data:', stored);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('Parsed data:', parsed);
      console.log('Number of images:', parsed.length);
    } else {
      console.log('No data in localStorage');
    }
    console.log('========================');
  } catch (error) {
    console.error('Debug error:', error);
  }
};

// Clear localStorage function
export const clearLocalStorage = () => {
  try {
    localStorage.removeItem('cloudinary_gallery_images');
    console.log('localStorage cleared');
    return { success: true, message: 'localStorage cleared' };
  } catch (error) {
    console.error('Clear error:', error);
    return { success: false, error: error.message };
  }
}; 