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
