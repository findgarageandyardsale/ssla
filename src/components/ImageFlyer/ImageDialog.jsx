import { X } from "lucide-react";

export const ImageDialog = ({setIsOpenModal, imageSrc, imageAlt, title }) => {
  const onClose = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#6FA1F8] bg-opacity-75 transition-opacity"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-2">
        <div className="relative max-w-7xl w-full max-h-[98vh] overflow-hidden">
          {/* Image Content */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              <img
                src={imageSrc}
                alt={imageAlt || "Dialog image"}
                className="max-w-full max-h-[95vh] object-contain rounded-lg"
              />
              {/* Close Button on Image */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 