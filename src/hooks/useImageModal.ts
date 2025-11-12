"use client"

import { useState } from 'react'

export const useImageModal = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [images, setImages] = useState<string[]>([])

  const openModal = (imageSrc: string, imageList?: string[]) => {
    setSelectedImage(imageSrc)
    if (imageList) {
      setImages(imageList)
      setCurrentIndex(imageList.indexOf(imageSrc))
    } else {
      setImages([imageSrc])
      setCurrentIndex(0)
    }
  }

  const closeModal = () => {
    setSelectedImage(null)
    setImages([])
    setCurrentIndex(0)
  }

  const navigateToImage = (index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index)
      setSelectedImage(images[index])
    }
  }

  return {
    selectedImage,
    currentIndex,
    images,
    openModal,
    closeModal,
    navigateToImage,
    isOpen: selectedImage !== null,
  }
}