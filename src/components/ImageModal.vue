<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { decode } from 'blurhash'
import UnsplashImageResult from '@/types/UnsplashImageResult'
import XMark from './icons/XMark.vue'
import useBlurHash from '@/composables/useBlurHash'

const emits = defineEmits(['close-modal'])

const props = defineProps<{ photo: UnsplashImageResult }>()

const blurDataUrl = ref<string | null>(null)
const imageLoaded = ref(false)

const { generateBlurHash } = useBlurHash()

onMounted(() => {
  blurDataUrl.value = generateBlurHash(props.photo) as string
})
</script>

<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div class="image-container">
        <!-- Show the blur image initially -->
        <img
          v-if="blurDataUrl"
          :src="blurDataUrl"
          :alt="photo.alt_description"
          class="modal-image blur-image"
          :class="{ hidden: imageLoaded }"
        />
        <!-- Main image with loading handler -->
        <img
          :src="photo.urls.regular"
          :alt="photo.alt_description"
          class="modal-image"
          @load="imageLoaded = true"
          :class="{ hidden: !imageLoaded }"
        />
      </div>
      <div class="modal-footer">
        <h2>{{ photo.user.name }}</h2>
        <p>{{ photo.user.location }}</p>
      </div>
    </div>
    <button class="close-modal-btn" @click="emits('close-modal')">
      <XMark />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.modal-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  background-color: rgba($color: #000000, $alpha: 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    width: 70%;
    height: 50%;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 1024px) {
      width: 80%;
      height: 70%;
    }

    @media screen and (min-width: 1400px) {
      width: 80%;
      height: 85%;
    }
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .modal-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.5s ease-in-out;
  }

  .blur-image {
    filter: blur(10px);
    position: absolute;
    top: 0;
    left: 0;
  }

  .hidden {
    opacity: 0;
  }

  .modal-footer {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 20%;

    @media screen and (min-width: 1024px) {
      padding-inline: 4rem;
    }
  }

  .close-modal-btn {
    background: none;
    color: white;
    border: none;
    outline: none;
    position: absolute;
    top: 10%;
    right: 10%;
    cursor: pointer;

    @media screen and (min-width: 1024px) {
      top: 8%;
      right: 5%;
    }

    @media screen and (min-width: 1400px) {
      top: 5%;
    }
  }
}
</style>
