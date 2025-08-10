import { useState, useEffect } from "react";
import { ScrollToTopLink } from "../../../components/common/ScrollToTopLink";
// import { getGalleryImages } from "../../../services/cloudinaryService";
import { RefreshCw } from "lucide-react";

// Fallback images if Cloudinary is not available
import image_1 from "../../../assets/gallery/1.jpeg";
import image_2 from "../../../assets/gallery/2.jpeg";
import image_3 from "../../../assets/gallery/3.jpeg";
import image_4 from "../../../assets/gallery/4.jpeg";
import image_5 from "../../../assets/gallery/5.jpeg";
import image_6 from "../../../assets/gallery/6.jpeg";

const fallback_images = [
  { id: 1, image: image_1 },
  { id: 2, image: image_2 },
  { id: 3, image: image_3 },
  { id: 4, image: image_4 },
  { id: 5, image: image_5 },
  { id: 6, image: image_6 },
];
export const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState(fallback_images);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     setLoading(true);
  //     try {
  //       const result = await getGalleryImages();
  //       if (result.success && result.images.length > 0) {
  //         // Take only the first 6 images for the home page gallery
  //         setGalleryImages(result.images.slice(0, 6));
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
          galleryImages.map((image) => (
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
      <div className="flex justify-center items-center mt-8">
        <ScrollToTopLink
          to="/gallery"
          className="bg-orange-600 text-white py-2 px-6 rounded-md hover:bg-orange-700 transition-colors duration-300"
        >
          More
        </ScrollToTopLink>
      </div>
    </div>
  );
};
