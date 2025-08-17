import { useState, useEffect } from "react";
import { getPaginatedGalleryImages } from "../../services/galleryService";
import { RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageModal } from "../../components/ImageModal";

const ITEMS_PER_PAGE = 9;

export const GalleryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalImages: 0,
    itemsPerPage: ITEMS_PER_PAGE,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const result = await getPaginatedGalleryImages(currentPage, ITEMS_PER_PAGE);
        if (result.success) {
          setGalleryImages(result.images);
          setPagination(result.pagination);
        } else {
          console.error('Failed to fetch gallery images:', result.error);
        }
      } catch (error) {
        console.error('Failed to fetch gallery images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToNextPage = () => {
    if (pagination.hasNextPage) {
      goToPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (pagination.hasPrevPage) {
      goToPage(currentPage - 1);
    }
  };

  // Modal functions
  const openModal = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToNextImage = () => {
    if (selectedImageIndex < galleryImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const goToPrevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  // Generate page numbers with ellipsis for better UX
  const getPageNumbers = () => {
    const pages = [];
    const totalPages = pagination.totalPages;
    const current = currentPage;

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, last page, current page, and pages around current
      if (current <= 4) {
        // Near start
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (current >= totalPages - 3) {
        // Near end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="bg-[#FF976317] py-12 md:px-16 mt-10">
      {/* Heading */}
      <div className="mb-3 sm:mb-4 md:mb-6 mx-auto pl-[6rem]">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-semibold text-orange-600 leading-tight">
          Gallery
        </h2>
        {pagination.totalImages > 0 && (
          <p className="text-gray-600 mt-2">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, pagination.totalImages)} of {pagination.totalImages} images
          </p>
        )}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <RefreshCw className="h-8 w-8 text-orange-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading gallery...</span>
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <span className="text-gray-600">No images found</span>
          </div>
        ) : (
          galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="flex flex-col items-center justify-center group cursor-pointer"
              onClick={() => openModal(index)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <img
                  src={image.url}
                  alt={`Gallery image ${image.name}`}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />

                {/* Click indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-80 rounded-full p-2">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={goToPrevPage}
            disabled={!pagination.hasPrevPage}
            className="flex items-center gap-2 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' ? goToPage(page) : null}
                disabled={page === '...'}
                className={`py-2 px-3 rounded-md transition-all duration-200 ${page === currentPage
                  ? "bg-orange-700 text-white"
                  : page === '...'
                    ? "text-gray-400 cursor-default"
                    : "bg-white text-orange-600 border border-orange-600 hover:bg-orange-50"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={!pagination.hasNextPage}
            className="flex items-center gap-2 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        currentImage={galleryImages[selectedImageIndex]}
        images={galleryImages}
        currentIndex={selectedImageIndex}
        onNext={goToNextImage}
        onPrevious={goToPrevImage}
      />
    </div>
  );
};
