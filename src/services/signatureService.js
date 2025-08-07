// Cloudinary configuration
const CLOUDINARY_UPLOAD_PRESET = 'ssla-configure'; // Replace with your upload preset
const CLOUDINARY_CLOUD_NAME = 'dxphpim2o'; // Replace with your cloud name

// Upload signature to Cloudinary
const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'signatures');

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.secure_url) {
      return {
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        imageInfo: result
      };
    } else {
      throw new Error(result.error?.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Upload signature to Cloudinary and store in localStorage
export const uploadSignature = async (signatureData, signatureType = 'signature') => {
  try {
    console.log('Uploading signature:', signatureType);

    // Convert dataURL to File object
    const response = await fetch(signatureData);
    const blob = await response.blob();
    const file = new File([blob], `${signatureType}_${Date.now()}.png`, { type: 'image/png' });

    // Upload to Cloudinary
    const result = await uploadToCloudinary(file);

    if (result.success) {
      // Store signature info in localStorage for form data
      const signatureInfo = {
        id: Date.now(),
        type: signatureType,
        public_id: result.public_id,
        url: result.url,
        uploaded_at: new Date().toISOString(),
        imageInfo: result.imageInfo
      };

      // Add to signatures localStorage
      const existingSignatures = JSON.parse(localStorage.getItem('form_signatures') || '[]');
      existingSignatures.push(signatureInfo);
      localStorage.setItem('form_signatures', JSON.stringify(existingSignatures));

      console.log('Signature uploaded successfully:', signatureInfo);
      
      return {
        success: true,
        signatureInfo: signatureInfo,
        url: result.url,
        public_id: result.public_id
      };
    } else {
      throw new Error(result.error || 'Upload failed');
    }
  } catch (error) {
    console.error('Signature upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get all signatures from localStorage
export const getStoredSignatures = () => {
  try {
    const stored = localStorage.getItem('form_signatures');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting stored signatures:', error);
    return [];
  }
};

// Get signature by type (student, parent, etc.)
export const getSignatureByType = (type) => {
  const signatures = getStoredSignatures();
  return signatures.find(sig => sig.type === type);
};

// Delete signature from localStorage
export const deleteSignature = (signatureId) => {
  try {
    const signatures = getStoredSignatures();
    const updatedSignatures = signatures.filter(sig => sig.id !== signatureId);
    localStorage.setItem('form_signatures', JSON.stringify(updatedSignatures));
    
    console.log('Signature deleted:', signatureId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting signature:', error);
    return { success: false, error: error.message };
  }
};

// Clear all signatures from localStorage
export const clearAllSignatures = () => {
  try {
    localStorage.removeItem('form_signatures');
    console.log('All signatures cleared');
    return { success: true };
  } catch (error) {
    console.error('Error clearing signatures:', error);
    return { success: false, error: error.message };
  }
};

// Validate signature data
export const validateSignature = (signatureData) => {
  if (!signatureData) {
    return { valid: false, error: 'No signature data provided' };
  }

  if (!signatureData.startsWith('data:image/')) {
    return { valid: false, error: 'Invalid signature format' };
  }

  // Check if signature has enough content (not empty)
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  return new Promise((resolve) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let hasContent = false;
      
      // Check if there are any non-transparent pixels
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] > 0) { // Alpha channel > 0
          hasContent = true;
          break;
        }
      }
      
      if (hasContent) {
        resolve({ valid: true });
      } else {
        resolve({ valid: false, error: 'Signature appears to be empty' });
      }
    };
    
    img.onerror = () => {
      resolve({ valid: false, error: 'Invalid image data' });
    };
    
    img.src = signatureData;
  });
}; 