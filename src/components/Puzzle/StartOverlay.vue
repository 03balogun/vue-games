<template>
  <div class="overlay overlay--orange">
    <div class="content">
      <button class="btn" @click="$emit('start', true)">Start</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WinOverlay',
};
</script>

<style lang="scss" scoped>
.btn {
  padding: 1rem;
}
</style>
