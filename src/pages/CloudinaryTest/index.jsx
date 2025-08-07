import { useState } from 'react';
import { uploadImage } from '../../services/cloudinaryService';

export const CloudinaryTest = () => {
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setUploadResult(null);

    try {
      console.log('Starting upload...');
      console.log('File:', file);
      console.log('Environment variables:');
      console.log('Cloud Name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      console.log('API Key:', import.meta.env.VITE_CLOUDINARY_API_KEY);
      console.log('Upload Preset:', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const result = await uploadImage(file);
      
      console.log('Upload result:', result);
      
      if (result.success) {
        setUploadResult(result);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FF976317] py-12 md:px-16 mt-10 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-8">Cloudinary Test Page</h1>
        
        {/* Environment Variables Display */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Cloud Name:</strong> {import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'Not set'}</p>
            <p><strong>API Key:</strong> {import.meta.env.VITE_CLOUDINARY_API_KEY ? 'Set' : 'Not set'}</p>
            <p><strong>API Secret:</strong> {import.meta.env.VITE_CLOUDINARY_API_SECRET ? 'Set' : 'Not set'}</p>
            <p><strong>Upload Preset:</strong> {import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'Not set'}</p>
          </div>
        </div>

        {/* Upload Test */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload Test</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={loading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
          />
          
          {loading && (
            <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded">
              Uploading...
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {uploadResult && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded">
              <strong>Success!</strong>
              <div className="mt-2">
                <p><strong>URL:</strong> {uploadResult.url}</p>
                <p><strong>Public ID:</strong> {uploadResult.public_id}</p>
                <p><strong>Dimensions:</strong> {uploadResult.width} × {uploadResult.height}</p>
              </div>
              {uploadResult.url && (
                <img 
                  src={uploadResult.url} 
                  alt="Uploaded" 
                  className="mt-2 max-w-xs rounded"
                />
              )}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">Troubleshooting</h2>
          <ul className="list-disc list-inside space-y-2 text-yellow-700">
            <li>Make sure you have a `.env` file in your project root</li>
            <li>Check that all environment variables are set correctly</li>
            <li>Verify your Cloudinary upload preset is set to "unsigned"</li>
            <li>Check browser console for detailed error messages</li>
            <li>Ensure your Cloudinary account is active</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 