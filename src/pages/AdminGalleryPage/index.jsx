import { useState, useEffect } from 'react';
import { ImageUpload } from '../../components/ImageUpload';
import { getGalleryImages, deleteImage, debugLocalStorage, clearLocalStorage } from '../../services/cloudinaryService';
import { Trash2, RefreshCw, AlertCircle, CheckCircle, Bug } from 'lucide-react';
// import ProtectedRoute from '../../components/ProtectedRoute';

export const AdminGalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showUpload, setShowUpload] = useState(false);



  const fetchImages = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getGalleryImages();
      if (result.success) {
        setImages(result.images);
      } else {
        setError(result.error || 'Failed to fetch images');
      }
    } catch {
      setError('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUploadSuccess = () => {
    setSuccessMessage('Image uploaded successfully to local storage!');

    // Refresh the images list to get the updated data
    fetchImages();

    setShowUpload(false);

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleUploadError = (error) => {
    setError(error);

    // Clear error after 5 seconds
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const handleDeleteImage = async (publicId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      const result = await deleteImage(publicId);
      if (result.success) {
        setSuccessMessage('Image removed from gallery!');
        // Refresh the images list
        fetchImages();
      } else {
        setError(result.error || 'Failed to delete image');
      }

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch {
      setError('Failed to delete image');
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccessMessage('');
  };

  return (
    // <ProtectedRoute requireAdmin={true}>
    <div className="bg-[#FF976317] py-12 md:px-16 mt-10 min-h-screen">
      {/* Header */}
      <div className="mb-8 mx-auto pl-[6rem]">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-semibold text-orange-600 inline-block relative leading-tight">
          Local Storage Gallery Management
          <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-10 sm:w-12 md:w-16 lg:w-20 h-[2px] sm:h-[3px] bg-orange-500"></span>
          <span className="absolute -bottom-1 sm:-bottom-2 left-12 sm:left-16 md:left-20 lg:left-24 w-2 sm:w-3 md:w-4 lg:w-6 h-[2px] sm:h-[3px] bg-orange-500"></span>
        </h2>
      </div>

      {/* Messages */}
      {(error || successMessage) && (
        <div className="max-w-6xl mx-auto mb-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
              <button
                onClick={clearMessages}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>{successMessage}</span>
              <button
                onClick={clearMessages}
                className="ml-auto text-green-500 hover:text-green-700"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
          >
            {showUpload ? 'Cancel Upload' : 'Upload Image'}
          </button>
          <button
            onClick={fetchImages}
            disabled={loading}
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>


        </div>

        <div className="text-sm text-gray-600">
          {images.length} image{images.length !== 1 ? 's' : ''} in local storage
          {images.length > 0 && (
            <span className="ml-2 text-xs text-gray-500">
              (Source: {images[0]?.source || 'localStorage'})
            </span>
          )}
        </div>
      </div>

      {/* Upload Section */}
      {showUpload && (
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload New Image to Local Storage</h3>
            <ImageUpload
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
            />
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="mx-auto h-8 w-8 text-orange-600 animate-spin" />
            <p className="mt-2 text-gray-600">Loading local storage gallery...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No images in local storage yet.</p>
            <button
              onClick={() => setShowUpload(true)}
              className="mt-4 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
            >
              Upload First Image
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative group">
                  <img
                    src={image.image}
                    alt={`Gallery image ${image.id}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => handleDeleteImage(image.public_id)}
                      className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-300"
                      title="Delete image"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-600 truncate">
                    Uploaded: {new Date(image.uploaded_at).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {image.width} × {image.height}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    // </ProtectedRoute>
  );
}; 