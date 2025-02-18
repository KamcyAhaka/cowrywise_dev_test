<template>
  <div class="loader-bg">
    <h2 class="loader-name"></h2>
    <span class="loader-location"></span>
  </div>
</template>

<style lang="scss" scoped>
.loader-bg {
  background-color: #f6f6f6;
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;
  height: 100%;

  .loader-name,
  .loader-location {
    animation: pulse 1.5s infinite ease-in-out;
    border-radius: 4px;
  }

  .loader-name {
    height: 0.75em;
    width: 50%;
  }

  .loader-location {
    height: 1em;
    width: 30%;
  }
}

@keyframes pulse {
  0% {
    background-color: #e7e7e7;
  }
  50% {
    background-color: #d1d1d1;
  }
  100% {
    background-color: #e7e7e7;
  }
}
</style>
