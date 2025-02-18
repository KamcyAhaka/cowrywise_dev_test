<script setup lang="ts">
import { RouterView } from 'vue-router'
import SearchInput from '@/components/SearchInput.vue'

const handleSearchInput = (searchText: string) => {
  console.log(searchText)
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
