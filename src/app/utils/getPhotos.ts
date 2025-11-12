import fs from 'fs'
import path from 'path'

export function getPhotos(): string[] {
  // Fallback for build time if file system access fails
  const fallbackPhotos = [
    '/images/photos-compressed/DSC02254.jpeg',
    '/images/photos-compressed/DSC02267.jpeg',
    '/images/photos-compressed/DSC02324.jpeg',
    '/images/photos-compressed/DSC02334.jpeg',
    '/images/photos-compressed/DSC02378.jpeg',
    '/images/photos-compressed/DSC02389.jpeg',
    '/images/photos-compressed/DSC02471.jpeg',
    '/images/photos-compressed/DSC02855.jpeg',
    '/images/photos-compressed/DSC02877.jpeg',
    '/images/photos-compressed/DSC02987.jpeg',
    '/images/photos-compressed/DSC03275.jpeg',
    '/images/photos-compressed/DSC03402.jpeg',
    '/images/photos-compressed/DSC03429.jpeg'
  ]

  try {
    const photosDir = path.join(process.cwd(), 'public/images/photos-compressed')

    // Check if we can access the directory
    if (!fs.existsSync(photosDir)) {
      return fallbackPhotos
    }

    const files = fs.readdirSync(photosDir)
    const photos = files
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort()
      .map(file => `/images/photos-compressed/${file}`)

    return photos.length > 0 ? photos : fallbackPhotos
  } catch (error) {
    console.warn('Could not read photos directory, using fallback:', error)
    return fallbackPhotos
  }
}