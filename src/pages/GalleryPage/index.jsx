import { useState, useEffect } from "react";
import { RefreshCw, X, Folder, FolderOpen } from "lucide-react";
import { supabaseStorageService } from "../../services/supabaseStorageService";

const ITEMS_PER_PAGE = 20;

export const GalleryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [loadingFolders, setLoadingFolders] = useState(true);

  const fetchFolders = async () => {
    setLoadingFolders(true);
    try {
      const result = await supabaseStorageService.getGalleryFolders();
      if (result.success && result.folders.length > 0) {
        setFolders(result.folders);
        // Set the first folder as selected by default
        setSelectedFolder(result.folders[0].name);
      }
    } catch (error) {
      console.error('Failed to fetch folders:', error);
    } finally {
      setLoadingFolders(false);
    }
  };

  const fetchImages = async (folder) => {
    if (!folder) return;

    setLoading(true);
    setError(null);
    try {
      const result = await supabaseStorageService.getImagesFromFolder(folder);

      if (result.success) {
        setGalleryImages(result.images);
      } else {
        setError(result.error || 'Failed to fetch images');
      }
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
      setError('Failed to fetch gallery images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    if (selectedFolder) {
      fetchImages(selectedFolder);
      setCurrentPage(1); // Reset to first page when folder changes
    }
  }, [selectedFolder]);

  const handleFolderChange = (folder) => {
    setSelectedFolder(folder);
  };

  const openImageDialog = (image) => {
    setSelectedImage(image);
    setShowDialog(true);
  };

  const closeImageDialog = () => {
    setShowDialog(false);
    setSelectedImage(null);
  };

  const totalPages = Math.ceil(galleryImages.length / ITEMS_PER_PAGE);
  const paginatedImages = galleryImages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getFolderIcon = (folderName) => {
    return selectedFolder === folderName ? <FolderOpen className="h-4 w-4" /> : <Folder className="h-4 w-4" />;
  };

  return (
    <div className="bg-[#FF976317] py-12 md:px-16 mt-10">
      {/* Heading */}
      <div className="mb-3 sm:mb-4 md:mb-6 mx-auto pl-[6rem]">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-semibold text-orange-600 leading-tight">
          Gallery
        </h2>
      </div>

      {/* Folder Selection */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Gallery Images</h3>
          <div className="flex flex-wrap gap-2">
            {loadingFolders ? (
              <div className="flex items-center gap-2 px-4 py-2 text-gray-500">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Loading folders...
              </div>
            ) : folders.length === 0 ? (
              <div className="text-gray-500 px-4 py-2">
                No folders found in gallery
              </div>
            ) : (
              folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => handleFolderChange(folder.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${selectedFolder === folder.name
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {getFolderIcon(folder.name)}
                  {folder.name}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}


      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
        {!selectedFolder ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Please select a folder to view images
          </div>
        ) : loading ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <RefreshCw className="h-8 w-8 text-orange-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading gallery...</span>
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No images found in {selectedFolder} folder
          </div>
        ) : (
          paginatedImages.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => openImageDialog(image)}
            >
              <div className="relative group">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg font-medium">
                    Click to view
                  </div>
                </div>
                {/* Folder indicator */}
                {image.folder && (
                  <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
                    {image.folder}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-2 rounded-md transition-colors ${currentPage === page
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Image Dialog */}
      {showDialog && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeImageDialog}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>

            {/* Image Info */}
            <div className="p-6 bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {selectedImage.name}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {selectedImage.folder && (
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    Folder: {selectedImage.folder}
                  </span>
                )}
                <span>Size: {selectedImage.formattedSize}</span>
                <span>Type: {selectedImage.type}</span>
                <span>Uploaded: {new Date(selectedImage.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
