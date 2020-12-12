<template>
  <div id="app">
    <div v-if="puzzle.isStarted" class="controls my">
      <button @click="onGameStop">stop</button>
      <button @click="shuffleCells">re-start</button>
    </div>
    <board-settings
      v-if="!puzzle.isStarted"
      :board-size-settings="boardSizeSettings"
      @start="onGameStart"
    />
    <div
      v-if="puzzle.boardSize.row && puzzle.boardSize.column"
      class="game-board"
      :style="{
        gridTemplateColumns: `repeat(${puzzle.boardSize.column}, 1fr)`,
      }"
    >
      <start-overlay v-if="!puzzle.isStarted" @start="onGameStart" />
      <win-overlay v-if="isWinner" @restart="shuffleCells" />
      <template v-for="(columns, rowNumber) in puzzle.grid">
        <Cell
          v-for="(cell, cellIndex) in columns"
          :key="cell"
          :ref="cell"
          :cell-refs="$refs"
          :cell-index="cellIndex"
          :row-number="rowNumber"
          :cell="cell"
          :grid="puzzle.grid"
          :is-started="puzzle.isStarted"
          :board-cells="boardCells"
          @click="onCellClicked"
        />
      </template>
    </div>
    <div v-if="puzzle.showData" class="game_data my">
      GRID: {{ puzzle.grid }} <br />
    </div>
  </div>
</template>

<script>
import { _ } from 'vue-underscore';
import StartOverlay from '@/components/Puzzle/StartOverlay';
import WinOverlay from '@/components/Puzzle/WinOverlay';
import Cell from '@/components/Puzzle/Cell';
import BoardSettings from '@/components/Puzzle/BoardSettings';
import { get, store, remove } from '@/util/storage';
export default {
  name: 'PuzzleBoard',
  components: { BoardSettings, Cell, WinOverlay, StartOverlay },
  data: () => ({
    puzzle: {
      grid: [],
      isStarted: false,
      showData: false,
      boardSize: {
        column: 3,
        row: 3,
      },
    },
  }),
  computed: {
    boardCells() {
      return _.range(
        1,
        this.puzzle.boardSize.column * this.puzzle.boardSize.row + 1
      );
    },
    isWinner() {
      return (
        this.puzzle.isStarted === true &&
        this.boardCells.length > 0 &&
        JSON.stringify(_.flatten(this.puzzle.grid)) ===
          JSON.stringify(this.boardCells)
      );
    },
  },
  watch: {
    boardCells(newValue, oldValue) {
      if (this.puzzle.isStarted) return;
      if (this.puzzle.boardSize.column < 3 || this.puzzle.boardSize.row < 3)
        return;
      //
      if (newValue.length === oldValue.length) return;
      this.shuffleCells();
    },
    'puzzle.grid'() {
      // when game is in play, cache grid when a change occurs
      if (this.puzzle.isStarted) {
        store(this.puzzle);
      }
    },
  },
  created() {
    const cache = get('puzzle');
    if (cache) {
      this.$data.puzzle = cache;
      return;
    }
    this.shuffleCells();
  },
  methods: {
    //
    onCellClicked(newGrid) {
      this.puzzle.grid = newGrid;
    },
    shuffleCells() {
      this.puzzle.grid = _.chunk(
        _.shuffle(this.boardCells),
        this.puzzle.boardSize.column
      );
    },
    boardSizeSettings(event) {
      if (
        isNaN(event.target.value) ||
        event.target.value < 3 ||
        event.target.value > 5
      )
        return;
      this.puzzle.boardSize[event.target.name] = parseInt(event.target.value);
    },
    onGameStart() {
      this.puzzle.isStarted = true;
    },
    onGameStop() {
      this.puzzle.isStarted = false;
      this.puzzle.showData = false;
      remove();
    },
    onShowData() {
      this.puzzle.showData = !this.puzzle.showData;
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/puzzle';
</style>
