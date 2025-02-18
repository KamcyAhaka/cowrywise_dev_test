<script setup lang="ts">
import useBlurHash from '@/composables/useBlurHash'
import UnsplashImageResult from '@/types/UnsplashImageResult'
import { ref, onMounted } from 'vue'

const props = defineProps<{
  image: UnsplashImageResult
}>()

const blurDataUrl = ref<string | null>(null)
const imageLoaded = ref(false)

const { generateBlurHash } = useBlurHash()

onMounted(() => {
  blurDataUrl.value = generateBlurHash(props.image) as string
})
</script>
<template>
  <img
    v-if="blurDataUrl"
    :src="blurDataUrl"
    :alt="image.alt_description"
    class="modal-image blur-image"
    :class="{ hidden: imageLoaded }"
  />
  <!-- Main image with loading handler -->
  <img
    :src="image.urls.small"
    :alt="image.alt_description"
    class="modal-image"
    @load="imageLoaded = true"
    :class="{ hidden: !imageLoaded }"
  />
</template>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
</style>
