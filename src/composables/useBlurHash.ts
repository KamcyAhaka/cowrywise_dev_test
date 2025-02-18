import { decode } from 'blurhash'

import type UnsplashImageResult from '@/types/UnsplashImageResult'

export default function useBlurHash() {
  return {
    // Function to decode blurhash into a base64 image
    generateBlurHash: (image: UnsplashImageResult) => {
      if (!image.blur_hash) return

      const width = 32
      const height = 32
      const pixels = decode(image.blur_hash, width, height)

      // Convert the decoded pixels into an ImageData object
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')

      if (ctx) {
        const imageData = ctx.createImageData(width, height)
        imageData.data.set(new Uint8ClampedArray(pixels))
        ctx.putImageData(imageData, 0, 0)
        return canvas.toDataURL()
      }
    },
  }
}
