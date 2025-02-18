import axios from 'axios'

export default function useUnsplash() {
  return {
    getRandomPhoto: async () => {
      try {
        const response = await axios(
          'https://api.unsplash.com/search/photos?per_page=6&query=african',
          {
            headers: {
              'Accept-Version': 'v1',
              Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
            },
          },
        )
        const data = response.data
        return data
      } catch (error) {
        return null
      }
    },
    searchPhotos: async (searchTerm: string) => {
      try {
        const response = await axios(
          `https://api.unsplash.com/search/photos?per_page=6&query=${searchTerm}`,
          {
            headers: {
              'Accept-Version': 'v1',
              Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
            },
          },
        )
        const data = response.data
        return data
      } catch (error) {
        return null
      }
    },
  }
}
