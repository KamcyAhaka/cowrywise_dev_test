import type UnsplashImageResult from '@/types/UnsplashImageResult'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUnsplashStore = defineStore('unsplash', () => {
  const photos = ref<UnsplashImageResult[]>([])

  return {
    photos,
  }
})
