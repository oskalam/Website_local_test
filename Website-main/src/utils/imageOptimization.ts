/**
 * Image optimization utilities for better performance
 */

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
}

/**
 * Optimized image component props generator
 * Adds loading attributes and size optimization based on usage context
 */
export const getOptimizedImageProps = ({
  src,
  alt,
  className,
  loading = 'lazy',
  width,
  height,
}: ImageProps) => {
  return {
    src,
    alt,
    className,
    loading,
    ...(width && { width }),
    ...(height && { height }),
    // Add decoding attribute for better performance
    decoding: 'async' as const,
  };
};

/**
 * Check if image should use lazy loading based on position
 */
export const shouldLazyLoad = (isAboveFold: boolean): 'lazy' | 'eager' => {
  return isAboveFold ? 'eager' : 'lazy';
};

/**
 * Generate responsive image srcset (placeholder for future WebP/AVIF implementation)
 */
export const generateResponsiveSrc = (baseSrc: string) => {
  // Future: Add WebP/AVIF support
  return baseSrc;
};