import { useState, useEffect } from "react";
import { ScrollToTopLink } from "../../../components/common/ScrollToTopLink";
import { getGalleryImages } from "../../../services/galleryService";
import { RefreshCw } from "lucide-react";
import { ImageModal } from "../../../components/ImageModal";

// Fallback images if Supabase is not available
import image_1 from "../../../assets/gallery/1.jpeg";
import image_2 from "../../../assets/gallery/2.jpeg";
import image_3 from "../../../assets/gallery/3.jpeg";
import image_4 from "../../../assets/gallery/4.jpeg";
import image_5 from "../../../assets/gallery/5.jpeg";
import image_6 from "../../../assets/gallery/6.jpeg";

const fallback_images = [
  { id: 1, image: image_1, url: image_1, name: "Gallery Image 1" },
  { id: 2, image: image_2, url: image_2, name: "Gallery Image 2" },
  { id: 3, image: image_3, url: image_3, name: "Gallery Image 3" },
  { id: 4, image: image_4, url: image_4, name: "Gallery Image 4" },
  { id: 5, image: image_5, url: image_5, name: "Gallery Image 5" },
  { id: 6, image: image_6, url: image_6, name: "Gallery Image 6" },
];

export const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState(fallback_images);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const result = await getGalleryImages();
        if (result.success && result.images.length > 0) {
          // Take only the first 6 images for the home page gallery
          setGalleryImages(result.images.slice(0, 6));
        }
      } catch (error) {
        console.error('Failed to fetch gallery images:', error);
        // Keep fallback images if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

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

  return (
    <div className="bg-[#FF976317] py-5 md:px-16">
      <div className="mb-3 sm:mb-4 md:mb-6 mx-auto pl-[6rem]">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-semibold text-orange-600 inline-block relative leading-tight">
          Gallery
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-8">
            <RefreshCw className="h-8 w-8 text-orange-600 animate-spin" />
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
                  src={image.url || image.image}
                  alt={`Gallery image ${image.name || image.id}`}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
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
      <div className="flex justify-center items-center mt-8">
        <ScrollToTopLink
          to="/gallery"
          className="bg-orange-600 text-white py-2 px-6 rounded-md hover:bg-orange-700 transition-colors duration-300"
        >
          More
        </ScrollToTopLink>
      </div>

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
