import { useState, useEffect } from "react";
import { RefreshCw, X } from "lucide-react";
import { supabaseStorageService } from "../../services/supabaseStorageService";

const ITEMS_PER_PAGE = 9;

export const GalleryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDialog, setShowDialog] = useState(false);



  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await supabaseStorageService.getGalleryImages();
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
    fetchImages();
  }, []);
  
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

  return (
    <div className="bg-[#FF976317] py-12 md:px-16 mt-10">
      {/* Heading */}
      <div className="mb-3 sm:mb-4 md:mb-6 mx-auto pl-[6rem]">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-semibold text-orange-600 leading-tight">
          Gallery
        </h2>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <RefreshCw className="h-8 w-8 text-orange-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading gallery...</span>
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No images found in gallery
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
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg font-medium">
                    Click to view
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => goToPage(index + 1)}
              className={`py-2 px-4 rounded-md ${currentPage === index + 1
                ? "bg-orange-700 text-white"
                : "bg-white text-orange-600 border border-orange-600 hover:bg-orange-50"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
