<script setup lang="ts">
import MagnifyingGlass from './icons/MagnifyingGlass.vue'
import ReturnIcon from './icons/ReturnIcon.vue';

const emits = defineEmits(['search'])

const searchText = defineModel()

const { placeholder = 'Search for photo' } = defineProps<{
  placeholder?: string
}>()

const emitSearch = async (event: Event) => {
  emits('search', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="search-input-container">
    <MagnifyingGlass />
    <input
      v-model="searchText"
      type="search"
      name="image-search"
      id="image-search"
      autofocus
      :placeholder="placeholder"
      @keyup.enter="emitSearch"
    />
    <button @click="emitSearch">
      <ReturnIcon />
    </button>
  </div>
</template>

<style lang="scss" scoped>

button {
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
}

.search-input-container {
  height: auto;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  background-color: #f3f3f3;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.75rem;
  transition: background-color .3s ease;

  &:has(input:focus) {
    background-color: #ffffff;
  }

  svg {
    color: #23345c;
  }

  input {
    border: none;
    outline: none;
    width: 100%;
    font-weight: bold;
    font-size: clamp(14px, 14px + 0.1vw, 20px);
    color: #23345c;
    padding-block: .5em;
    background-color: transparent;

    input::placeholder {
      color: #23345c;
    }
  }
}
</style>
