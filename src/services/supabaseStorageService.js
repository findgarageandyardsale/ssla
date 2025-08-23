import { supabase } from '../config/supabase'

const BUCKET_NAME = 'Gallery Image'

export const supabaseStorageService = {
    // Get all images from the Gallery Image bucket
    async getGalleryImages() {
        try {
            // Add cache-busting timestamp
            const timestamp = Date.now()

            const { data, error } = await supabase.storage
                .from(BUCKET_NAME)
                .list('', {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'created_at', order: 'desc' }
                })

            if (error) {
                console.error('Error fetching gallery images:', error)
                throw error
            }

            if (!data || data.length === 0) {
                return {
                    success: true,
                    images: []
                }
            }

            // Transform the data to include public URLs with cache-busting
            const imagesWithUrls = await Promise.all(
                data
                    .filter(file => file.metadata?.mimetype?.startsWith('image/'))
                    .map(async (file) => {
                        const { data: urlData } = supabase.storage
                            .from(BUCKET_NAME)
                            .getPublicUrl(file.name)

                        // Add cache-busting parameter to URL
                        const cacheBustedUrl = `${urlData.publicUrl}?t=${timestamp}`

                        return {
                            id: file.id || file.name,
                            name: file.name,
                            size: file.metadata?.size || 0,
                            type: file.metadata?.mimetype || 'image/jpeg',
                            created_at: file.created_at,
                            updated_at: file.updated_at,
                            url: cacheBustedUrl,
                            // Format file size for display
                            formattedSize: formatFileSize(file.metadata?.size || 0)
                        }
                    })
            )

            return {
                success: true,
                images: imagesWithUrls
            }
        } catch (error) {
            console.error('Failed to fetch gallery images:', error)
            return {
                success: false,
                error: error.message,
                images: []
            }
        }
    },

    // Get all folders in the Gallery Image bucket
    async getGalleryFolders() {
        try {
            const { data, error } = await supabase.storage
                .from(BUCKET_NAME)
                .list('', {
                    limit: 100,
                    offset: 0
                })

            if (error) {
                console.error('Error fetching gallery folders:', error)
                throw error
            }

            if (!data || data.length === 0) {
                return {
                    success: true,
                    folders: []
                }
            }

            // Filter only folders (items without metadata.mimetype are folders)
            const folders = data.filter(item => !item.metadata?.mimetype)

            return {
                success: true,
                folders: folders.map(folder => ({
                    id: folder.id || folder.name,
                    name: folder.name,
                    created_at: folder.created_at,
                    updated_at: folder.updated_at
                }))
            }
        } catch (error) {
            console.error('Failed to fetch gallery folders:', error)
            return {
                success: false,
                error: error.message,
                folders: []
            }
        }
    },

    // Get images from a specific folder
    async getImagesFromFolder(folderName) {
        try {
            // Add cache-busting timestamp
            const timestamp = Date.now()

            const { data, error } = await supabase.storage
                .from(BUCKET_NAME)
                .list(folderName, {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'created_at', order: 'desc' }
                })

            if (error) {
                console.error(`Error fetching images from folder ${folderName}:`, error)
                throw error
            }

            if (!data || data.length === 0) {
                return {
                    success: true,
                    images: [],
                    folder: folderName
                }
            }

            // Transform the data to include public URLs with cache-busting
            const imagesWithUrls = await Promise.all(
                data
                    .filter(file => file.metadata?.mimetype?.startsWith('image/'))
                    .map(async (file) => {
                        const { data: urlData } = supabase.storage
                            .from(BUCKET_NAME)
                            .getPublicUrl(`${folderName}/${file.name}`)

                        // Add cache-busting parameter to URL
                        const cacheBustedUrl = `${urlData.publicUrl}?t=${timestamp}`

                        return {
                            id: file.id || file.name,
                            name: file.name,
                            size: file.metadata?.size || 0,
                            type: file.metadata?.mimetype || 'image/jpeg',
                            created_at: file.created_at,
                            updated_at: file.updated_at,
                            url: cacheBustedUrl,
                            folder: folderName,
                            // Format file size for display
                            formattedSize: formatFileSize(file.metadata?.size || 0)
                        }
                    })
            )

            return {
                success: true,
                images: imagesWithUrls,
                folder: folderName
            }
        } catch (error) {
            console.error(`Failed to fetch images from folder ${folderName}:`, error)
            return {
                success: false,
                error: error.message,
                images: [],
                folder: folderName
            }
        }
    },

    // Get images from the Grad2025 folder specifically
    async getGrad2025Images() {
        return this.getImagesFromFolder('Grad2025')
    },

    // Get all images from all folders including root
    async getAllGalleryImages() {
        try {
            // First get all folders
            const foldersResult = await this.getGalleryFolders()
            if (!foldersResult.success) {
                throw new Error(foldersResult.error)
            }

            // Get images from root folder
            const rootImagesResult = await this.getGalleryImages()
            if (!rootImagesResult.success) {
                throw new Error(rootImagesResult.error)
            }

            let allImages = [...rootImagesResult.images]

            // Get images from each folder
            for (const folder of foldersResult.folders) {
                const folderImagesResult = await this.getImagesFromFolder(folder.name)
                if (folderImagesResult.success) {
                    allImages = [...allImages, ...folderImagesResult.images]
                }
            }

            // Sort all images by creation date (newest first)
            allImages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

            return {
                success: true,
                images: allImages,
                totalCount: allImages.length
            }
        } catch (error) {
            console.error('Failed to fetch all gallery images:', error)
            return {
                success: false,
                error: error.message,
                images: []
            }
        }
    }
}

// Helper function to format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
