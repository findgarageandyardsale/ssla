import { useState, useEffect } from "react";
import { getGalleryImages } from "../../services/cloudinaryService";
import { RefreshCw } from "lucide-react";

// Fallback images if Cloudinary is not available
import image_1 from "../../assets/gallery/1.jpeg";
import image_2 from "../../assets/gallery/2.jpeg";
import image_3 from "../../assets/gallery/3.jpeg";
import image_4 from "../../assets/gallery/4.jpeg";
import image_5 from "../../assets/gallery/5.jpeg";
import image_6 from "../../assets/gallery/6.jpeg";
import image_7 from "../../assets/gallery/7.jpeg";
import image_8 from "../../assets/gallery/8.jpeg";
import image_9 from "../../assets/gallery/9.jpeg";
import image_10 from "../../assets/gallery/10.jpeg";
import image_11 from "../../assets/gallery/11.jpeg";
import image_12 from "../../assets/gallery/12.jpeg";
import image_13 from "../../assets/gallery/13.jpeg";
import image_14 from "../../assets/gallery/14.jpeg";
import image_15 from "../../assets/gallery/15.jpeg";
import image_16 from "../../assets/gallery/16.jpeg";
import image_17 from "../../assets/gallery/17.jpeg";
import image_18 from "../../assets/gallery/18.jpeg";

const fallback_images = [
  { id: 1, image: image_1 },
  { id: 2, image: image_2 },
  { id: 3, image: image_3 },
  { id: 4, image: image_4 },
  { id: 5, image: image_5 },
  { id: 6, image: image_6 },
  { id: 7, image: image_7 },
  { id: 8, image: image_8 },
  { id: 9, image: image_9 },
  { id: 10, image: image_10 },
  { id: 11, image: image_11 },
  { id: 12, image: image_12 },
  { id: 13, image: image_13 },
  { id: 14, image: image_14 },
  { id: 15, image: image_15 },
  { id: 16, image: image_16 },
  { id: 17, image: image_17 },
  { id: 18, image: image_18 },
];

const ITEMS_PER_PAGE = 9;

export const GalleryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [galleryImages, setGalleryImages] = useState(fallback_images);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     setLoading(true);
  //     try {
  //       const result = await getGalleryImages();
  //       if (result.success && result.images.length > 0) {
  //         setGalleryImages(result.images);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch gallery images:', error);
  //       // Keep fallback images if fetch fails
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchImages();
  // }, []);

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

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <RefreshCw className="h-8 w-8 text-orange-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading gallery...</span>
          </div>
        ) : (
          paginatedImages.map((image) => (
            <div
              key={image.id}
              className="flex flex-col items-center justify-center"
            >
              <img
                src={image.image}
                alt={`Gallery image ${image.id}`}
                className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              />
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
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
    </div>
  );
};
