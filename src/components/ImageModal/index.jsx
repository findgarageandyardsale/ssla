import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const ImageModal = ({
    isOpen,
    onClose,
    currentImage,
    images,
    currentIndex,
    onNext,
    onPrevious
}) => {
    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !currentImage) return null;

    const hasMultipleImages = images && images.length > 1;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
                aria-label="Close modal"
            >
                <X className="h-6 w-6" />
            </button>

            {/* Navigation arrows */}
            {hasMultipleImages && (
                <>
                    <button
                        onClick={onPrevious}
                        disabled={currentIndex === 0}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                        onClick={onNext}
                        disabled={currentIndex === images.length - 1}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </>
            )}

            {/* Image container */}
            <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
                <img
                    src={currentImage.url}
                    alt={`Gallery image ${currentImage.name}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                />

                {/* Image info overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
                    <p className="text-sm font-medium">{currentImage.name}</p>
                    {hasMultipleImages && (
                        <p className="text-xs text-gray-300 mt-1">
                            {currentIndex + 1} of {images.length}
                        </p>
                    )}
                </div>
            </div>

            {/* Click outside to close */}
            <div
                className="absolute inset-0 -z-10"
                onClick={onClose}
                aria-label="Click outside to close"
            />
        </div>
    );
};
