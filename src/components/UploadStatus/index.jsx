import { useState, useEffect } from 'react';
import { getStoredImageUrls } from '../../config/cloudinaryImages';

export const UploadStatus = () => {
  const [storedUrls, setStoredUrls] = useState([]);
  const [localStorageData, setLocalStorageData] = useState(null);

  const refreshData = () => {
    // Get stored image URLs
    const urls = getStoredImageUrls();
    setStoredUrls(urls);

    // Get raw localStorage data
    try {
      const stored = localStorage.getItem('cloudinary_gallery_images');
      if (stored) {
        setLocalStorageData(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error reading localStorage:', error);
    }
  };

  useEffect(() => {
    refreshData();
    
    // Refresh every 2 seconds to catch new uploads
    const interval = setInterval(refreshData, 2000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const clearLocalStorage = () => {
    if (window.confirm('Are you sure you want to clear all stored images?')) {
      localStorage.removeItem('cloudinary_gallery_images');
      refreshData();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Upload Status</h2>
        <div className="flex gap-2">
          <button
            onClick={refreshData}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Refresh
          </button>
          <button
            onClick={clearLocalStorage}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear All
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Upload Status */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Uploaded Images ({storedUrls.length})
          </h3>
          {storedUrls.length > 0 ? (
            <div className="space-y-4">
              {storedUrls.map((url, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={url} 
                      alt={`Uploaded ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 break-all">{url}</p>
                      <button
                        onClick={() => copyToClipboard(url)}
                        className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                      >
                        Copy URL
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No uploaded images found.</p>
              <p className="text-sm text-gray-400">
                Upload an image first, then it will appear here automatically.
              </p>
            </div>
          )}
        </div>

        {/* localStorage Data */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Raw Data (localStorage)
          </h3>
          {localStorageData ? (
            <div className="bg-gray-50 p-4 rounded">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {JSON.stringify(localStorageData, null, 2)}
              </pre>
              <button
                onClick={() => copyToClipboard(JSON.stringify(localStorageData, null, 2))}
                className="mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
              >
                Copy JSON
              </button>
            </div>
          ) : (
            <p className="text-gray-500">No localStorage data found.</p>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-green-50 p-4 rounded">
          <h3 className="text-lg font-semibold text-green-800 mb-2">✅ How It Works</h3>
          <ol className="text-green-700 space-y-1 text-sm">
            <li>1. Upload an image using the upload form</li>
            <li>2. Image gets stored in localStorage automatically</li>
            <li>3. Image appears in your gallery immediately</li>
            <li>4. Images persist across page refreshes</li>
          </ol>
        </div>
      </div>
    </div>
  );
}; 