import { supabase } from '../config/supabase'

export const getGalleryImages = async () => {
    try {
        const { data, error } = await supabase.storage
            .from('Gallery Image')
            .list('', {
                limit: 100,
                offset: 0,
                sortBy: { column: 'created_at', order: 'desc' }
            })

        if (error) {
            console.error('Error fetching gallery images:', error)
            return { success: false, error: error.message }
        }

        // Get public URLs for all images
        const imagesWithUrls = data.map((file, index) => {
            const { data: urlData } = supabase.storage
                .from('Gallery Image')
                .getPublicUrl(file.name)

            return {
                id: index + 1,
                name: file.name,
                url: urlData.publicUrl,
                size: file.metadata?.size || 0,
                type: file.metadata?.mimetype || 'image/jpeg',
                created_at: file.created_at
            }
        })

        return { success: true, images: imagesWithUrls }
    } catch (error) {
        console.error('Failed to fetch gallery images:', error)
        return { success: false, error: error.message }
    }
}

export const getPaginatedGalleryImages = async (page = 1, itemsPerPage = 9) => {
    try {
        const { data, error } = await supabase.storage
            .from('Gallery Image')
            .list('', {
                limit: 1000, // Get all images for pagination
                offset: 0,
                sortBy: { column: 'created_at', order: 'desc' }
            })

        if (error) {
            console.error('Error fetching gallery images:', error)
            return { success: false, error: error.message }
        }

        // Get public URLs for all images
        const allImages = data.map((file, index) => {
            const { data: urlData } = supabase.storage
                .from('Gallery Image')
                .getPublicUrl(file.name)

            return {
                id: index + 1,
                name: file.name,
                url: urlData.publicUrl,
                size: file.metadata?.size || 0,
                type: file.metadata?.mimetype || 'image/jpeg',
                created_at: file.created_at
            }
        })

        // Calculate pagination
        const totalImages = allImages.length
        const totalPages = Math.ceil(totalImages / itemsPerPage)
        const startIndex = (page - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        const paginatedImages = allImages.slice(startIndex, endIndex)

        return {
            success: true,
            images: paginatedImages,
            pagination: {
                currentPage: page,
                totalPages,
                totalImages,
                itemsPerPage,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        }
    } catch (error) {
        console.error('Failed to fetch paginated gallery images:', error)
        return { success: false, error: error.message }
    }
}

export const getGalleryImageUrl = (fileName) => {
    const { data } = supabase.storage
        .from('Gallery Image')
        .getPublicUrl(fileName)

    return data.publicUrl
}
