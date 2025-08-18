import { useState, useEffect } from "react";
import { ScrollToTopLink } from "../../../components/common/ScrollToTopLink";
import { supabaseStorageService } from "../../../services/supabaseStorageService";
import { RefreshCw } from "lucide-react";

export const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setGalleryImages([]); // Clear previous images
      try {
        const result = await supabaseStorageService.getGalleryImages();
        if (result.success && result.images.length > 0) {
          // Take only the first 10 images for the home page gallery
          setGalleryImages(result.images.slice(0, 10));
        }
      } catch (error) {
        console.error('Failed to fetch gallery images:', error);
        // Keep empty array if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

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
        ) : galleryImages.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No images found in gallery
          </div>
        ) : (
          galleryImages.map((image) => (
            <div
              key={image.id}
              className="flex flex-col items-center justify-center"
            >
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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
