import { useState, useEffect } from "react";
import { ScrollToTopLink } from "../../../components/common/ScrollToTopLink";
import { supabaseStorageService } from "../../../services/supabaseStorageService";
import { RefreshCw, Folder, FolderOpen } from "lucide-react";

export const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const result = await supabaseStorageService.getGalleryFolders();
        if (result.success && result.folders.length > 0) {
          setFolders(result.folders);
          // Set the first folder as selected by default
          setSelectedFolder(result.folders[0].name);
        }
      } catch (error) {
        console.error('Failed to fetch folders:', error);
      }
    };

    fetchFolders();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      if (!selectedFolder) return;

      setLoading(true);
      setGalleryImages([]); // Clear previous images
      try {
        const result = await supabaseStorageService.getImagesFromFolder(selectedFolder);

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
  }, [selectedFolder]);

  const handleFolderChange = (folder) => {
    setSelectedFolder(folder);
  };

  const getFolderIcon = (folderName) => {
    return selectedFolder === folderName ? <FolderOpen className="h-4 w-4" /> : <Folder className="h-4 w-4" />;
  };

  return (
    <div className="bg-[#FF976317] py-5 md:px-16">
      <div className="mb-3 sm:mb-4 md:mb-6 mx-auto pl-[6rem]">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-semibold text-orange-600 inline-block relative leading-tight">
          Gallery
        </h2>
      </div>

      {/* Folder Selection for Home Gallery */}
      {folders.length > 0 && (
        <div className="max-w-6xl mx-auto mb-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {folders.slice(0, 3).map((folder) => (
              <button
                key={folder.id}
                onClick={() => handleFolderChange(folder.name)}
                className={`flex items-center gap-2 px-3 py-1 text-sm rounded-md transition-colors ${selectedFolder === folder.name
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                {getFolderIcon(folder.name)}
                {folder.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
        {!selectedFolder ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Loading folders...
          </div>
        ) : loading ? (
          <div className="col-span-full flex justify-center items-center py-8">
            <RefreshCw className="h-8 w-8 text-orange-600 animate-spin" />
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No images found in {selectedFolder} folder
          </div>
        ) : (
          galleryImages.map((image) => (
            <div
              key={image.id}
              className="flex flex-col items-center justify-center relative"
            >
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              />
              {/* Folder indicator */}
              {image.folder && (
                <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
                  {image.folder}
                </div>
              )}
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
