<template>
  <div class="overlay overlay--green">
    <div class="overlay__content">
      <h1>Winner! 🎉</h1>
      <button class="share" @click="$emit('restart', true)">restart</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WinOverlay',
};
</script>

<style lang="scss" scoped></style>
