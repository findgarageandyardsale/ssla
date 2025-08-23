import { useState, useEffect } from "react";
import { RefreshCw, X, GraduationCap, Calendar, Users } from "lucide-react";
import { supabaseStorageService } from "../../services/supabaseStorageService";

const ITEMS_PER_PAGE = 12;

export const Grad2025Page = () => {
    const [gradImages, setGradImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchGradImages = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await supabaseStorageService.getGrad2025Images();
            if (result.success) {
                setGradImages(result.images);
            } else {
                setError(result.error || 'Failed to fetch graduation images');
            }
        } catch (error) {
            console.error('Failed to fetch graduation images:', error);
            setError('Failed to fetch graduation images');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGradImages();
    }, []);

    const openImageDialog = (image) => {
        setSelectedImage(image);
        setShowDialog(true);
    };

    const closeImageDialog = () => {
        setShowDialog(false);
        setSelectedImage(null);
    };

    const totalPages = Math.ceil(gradImages.length / ITEMS_PER_PAGE);
    const paginatedImages = gradImages.slice(
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
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 py-12 md:px-16 mt-10 min-h-screen">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto mb-8 text-center">
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-orange-100 p-4 rounded-full">
                            <GraduationCap className="h-12 w-12 text-orange-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Graduation 2025
                    </h1>
                    <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                        Celebrate the achievements of our graduating class with these special moments captured during their journey at SSLA.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Class of 2025</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{gradImages.length} Photos</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {loading ? (
                    <div className="col-span-full flex justify-center items-center py-16">
                        <RefreshCw className="h-12 w-12 text-orange-600 animate-spin" />
                        <span className="ml-3 text-xl text-gray-600">Loading graduation photos...</span>
                    </div>
                ) : gradImages.length === 0 ? (
                    <div className="col-span-full text-center py-16">
                        <div className="bg-white rounded-lg p-8 shadow-md">
                            <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Photos Yet</h3>
                            <p className="text-gray-500">Graduation photos will be available soon!</p>
                        </div>
                    </div>
                ) : (
                    paginatedImages.map((image) => (
                        <div
                            key={image.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                            onClick={() => openImageDialog(image)}
                        >
                            <div className="relative group">
                                <img
                                    src={image.url}
                                    alt={image.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                                    <div className="p-4 text-white">
                                        <p className="font-medium text-sm">Click to view</p>
                                    </div>
                                </div>
                                {/* Grad2025 Badge */}
                                <div className="absolute top-3 left-3 bg-orange-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                                    Grad 2025
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-gray-600 truncate">{image.name}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(image.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-2">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        Previous
                    </button>

                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`px-4 py-3 rounded-lg transition-colors font-medium ${currentPage === page
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Image Dialog */}
            {showDialog && selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
                    <div className="relative max-w-5xl max-h-[95vh] bg-white rounded-2xl overflow-hidden">
                        {/* Close Button */}
                        <button
                            onClick={closeImageDialog}
                            className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
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
                        <div className="p-8 bg-gradient-to-r from-orange-50 to-yellow-50">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Graduation 2025
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {selectedImage.name}
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                <div className="bg-white p-3 rounded-lg">
                                    <span className="font-medium text-gray-700">Size:</span> {selectedImage.formattedSize}
                                </div>
                                <div className="bg-white p-3 rounded-lg">
                                    <span className="font-medium text-gray-700">Type:</span> {selectedImage.type}
                                </div>
                                <div className="bg-white p-3 rounded-lg">
                                    <span className="font-medium text-gray-700">Uploaded:</span> {new Date(selectedImage.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
