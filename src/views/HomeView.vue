<script setup lang="ts">
import SkeletonLoader from '@/components/SkeletonLoader.vue'
import SearchInput from '@/components/SearchInput.vue'
import useUnsplash from '@/composables/useUnsplash'
import { useUnsplashStore } from '@/store/unsplash'
import { onMounted, ref } from 'vue'
import MagnifyingGlass from '@/components/icons/MagnifyingGlass.vue'
import ImageModal from '@/components/ImageModal.vue'
import UnsplashImageResult from '@/types/UnsplashImageResult'

const unsplash = useUnsplash()
const unsplashStore = useUnsplashStore()
const isLoading = ref(false)
const showInput = ref(true)
const searchTerm = ref('')
const showModal = ref(false)

const selectedPhoto = ref<UnsplashImageResult>()

onMounted(async () => {
  isLoading.value = true
  const data = await unsplash.getRandomPhoto()
  isLoading.value = false
  unsplashStore.photos = data.results
})

// Function to check if an item is the center one in each row of 3
const isMiddleItem = (index: number) => index % 3 === 1

const handleSearchInput = async (searchText: string) => {
  isLoading.value = true
  showInput.value = false
  const data = await unsplash.searchPhotos(searchText)
  isLoading.value = false
  unsplashStore.photos = data.results
}

const openModal = (image: UnsplashImageResult) => {
  selectedPhoto.value = image
  showModal.value = true
}
</script>

<template>
  <header class="site-header">
    <SearchInput v-model="searchTerm" v-if="showInput" @search="handleSearchInput" />
    <template v-else>
      <h1 v-if="isLoading">
        Searching for <span>"{{ searchTerm }}"</span>
      </h1>
      <h1 v-else>
        Search Results for <span>"{{ searchTerm }}"</span>
        <button class="show-input-btn" @click="showInput = true">
          <MagnifyingGlass />
        </button>
      </h1>
    </template>
  </header>
  <main>
    <div class="image-grid-container">
      <template v-if="isLoading">
        <SkeletonLoader
          class="image-grid-item"
          v-for="(image, index) in 6"
          :class="{ tall: isMiddleItem(index) }"
          :key="image"
        />
      </template>
      <template v-else>
        <div
          v-for="(image, index) in unsplashStore.photos"
          :key="image.id"
          class="image-grid-item"
          :class="{ tall: isMiddleItem(index) }"
          @click="openModal(image)"
        >
          <img :src="image.urls.thumb" alt="" />
          <div class="overlay">
            <h2>{{ image.user.name }}</h2>
            <span>{{ image.user.location }}</span>
          </div>
        </div>
      </template>
    </div>
    <transition name="modal">
      <ImageModal
        v-if="showModal && selectedPhoto"
        :photo="selectedPhoto"
        @close-modal="showModal = false"
      />
    </transition>
  </main>
</template>

<style scoped lang="scss">
h1 {
  color: #23345c;
  font-weight: bold;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  font-size: clamp(1.25rem, 1.25rem + 1vw, 2rem);

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25em;

  @media screen and (min-width: 1024px) {
    padding-left: 5rem;
  }

  @media screen and (min-width: 1400px) {
    padding-left: 10rem;
  }

  .show-input-btn {
    margin-left: auto;
    background: none;
    box-shadow: none;
    outline: none;
    border: none;
    cursor: pointer;
  }

  svg {
    color: #23345c;
  }

  span {
    color: #737d96;
  }
}

.image-grid-container {
  max-width: 900px;
  margin: 0 auto;
  translate: 0 -50px;
  padding-inline: 2rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  place-content: center;
  place-items: center;
  grid-auto-rows: 30px;
  row-gap: 2rem;
  column-gap: 3rem;

  & > div {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 1em;
    grid-row: span 6;
    position: relative;
    isolation: isolate;

    .overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 30%;
      width: 100%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.01));
      z-index: 1;
      padding: 1em 2em;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h2 {
        color: white;
        font-size: clamp(12px, 12px + 1vw, 16px);
      }

      span {
        color: white;
        font-size: clamp(10px, 10px + 1vw, 14px);
        font-weight: lighter;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &.tall {
      grid-row: span 8;
    }
  }

  .image-grid-item {
    cursor: pointer;
  }

  @media screen and (min-width: 1400px) {
    padding-inline: 0;
  }
}

/* Enter Animation */
.modal-enter-active {
  animation: fadeInScale 0.3s ease-out forwards;
}

/* Leave Animation */
.modal-leave-active {
  animation: fadeOutScale 0.2s ease-in forwards;
}

/* Keyframes for entering */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Keyframes for leaving */
@keyframes fadeOutScale {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}
</style>
