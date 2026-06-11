import Image from 'next/image'
import { FiX } from 'react-icons/fi'

interface ImageModalProps {
  imageSrc: string
  alt: string
  onClose: () => void
}

export const ImageModal = ({ imageSrc, alt, onClose }: ImageModalProps) => {
  return (
    <div 
      className="fixed inset-0 z-30 backdrop-blur-md bg-black/80"
      style={{ backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 z-10"
      >
        <FiX size={24} />
      </button>
      
      <div 
        className="flex items-center justify-center w-full"
        style={{ 
          height: 'calc(100vh - 10rem)',
          marginTop: '8rem',
          padding: '4rem 3rem 3rem 3rem'
        }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          width={800}
          height={600}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%'
          }}

        />
      </div>
    </div>
  )
}