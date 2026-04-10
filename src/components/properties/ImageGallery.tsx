import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function ImageGallery({ images, className = '' }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div className={`grid grid-cols-4 gap-2 ${className}`}>
        {/* Main Image */}
        <motion.div
          className="col-span-4 md:col-span-2 row-span-2 cursor-pointer overflow-hidden rounded-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0]?.src}
            alt={images[0]?.alt}
            decoding="async"
            width={800}
            height={800}
            className="w-full h-full object-cover aspect-[4/3] md:aspect-square"
          />
        </motion.div>

        {/* Thumbnail Grid */}
        {images.slice(1, 5).map((image, index) => (
          <motion.div
            key={index + 1}
            className="col-span-2 md:col-span-1 cursor-pointer overflow-hidden rounded-lg relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => openLightbox(index + 1)}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              width={400}
              height={400}
              className="w-full h-full object-cover aspect-square"
            />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  +{images.length - 5} more
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image and Caption Container */}
            <div className="flex flex-col items-center justify-center h-full pb-32">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[currentIndex]?.src}
                  alt={images[currentIndex]?.alt}
                  decoding="async"
                  className="max-w-[90vw] max-h-[60vh] object-contain rounded-lg"
                />
                {/* Image Caption from Hostaway */}
                {images[currentIndex]?.alt && (
                  <p className="text-white/90 text-center mt-4 text-base font-light max-w-2xl px-4 bg-black/40 py-2 rounded-lg">
                    {images[currentIndex].alt}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Counter */}
            <div className="absolute bottom-[88px] left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 transition-all ${index === currentIndex ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
