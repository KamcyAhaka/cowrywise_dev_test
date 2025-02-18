<script setup lang="ts">
import { RouterView } from 'vue-router'
import SearchInput from '@/components/SearchInput.vue'
import { onMounted } from 'vue';

onMounted(() => {
  document.title = 'Cowrywise Dev Test || By Divine Ahaka'
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
