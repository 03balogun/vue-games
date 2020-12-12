<template>
  <div class="game__settings my">
    <div class="fields">
      <div style="display: flex">
        <div>
          <label for="row" style="display: block">Row:</label>
          <input
            id="row"
            aria-label="Enter row size"
            type="number"
            min="3"
            max="5"
            name="row"
            value="3"
            @input="boardSizeSettings"
          />
        </div>
        <span>x</span>
        <div>
          <label for="column" style="display: block">Column:</label>
          <input
            id="column"
            aria-label="Enter column size"
            type="number"
            min="3"
            max="5"
            name="column"
            value="3"
            @input="boardSizeSettings"
          />
        </div>
      </div>
      <button class="game__settings--start" @click="$emit('start', true)">
        Start
      </button>
    </div>
    <small>minimum of 3 and maximum of 5</small>
  </div>
</template>

<script>
export default {
  name: 'BoardSettings',
  props: {
    boardSizeSettings: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
