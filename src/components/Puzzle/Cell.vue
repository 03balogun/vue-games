<template>
  <div
    class="game-board__cell"
    tabindex="0"
    :data-column="cellIndex"
    :data-row="rowNumber"
    :data-cell="cell"
    :class="{ emptyCell: emptyCell === cell, hoverAble: isStarted }"
    @click="handleCellClicked(cell, cellIndex, rowNumber)"
  >
    {{ cellLabel(cell) }}
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    boardCells: {
      type: Array,
      required: true,
    },
    grid: {
      type: Array,
      required: true,
    },
    cell: {
      type: Number,
      required: true,
    },
    cellIndex: {
      type: Number,
      required: true,
    },
    rowNumber: {
      type: Number,
      required: true,
    },
    cellRefs: {
      type: Object,
      required: true,
    },
    isStarted: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    emptyCell() {
      return this.boardCells.length;
    },
  },
  methods: {
    cellLabel(cell) {
      return cell !== this.boardCells.length ? cell : '';
    },
    handleCellClicked(selectedCell, selectedCellIndex, selectedCellRowNumber) {
      // When a cell is clicked there are couple of things we need to do.

      // When game is not started return void
      if (!this.isStarted) return;

      // assert that the clicked cell is not our empty cell
      if (selectedCell === this.emptyCell) return;

      const cellDetails = this.checkCell(selectedCell);

      if (cellDetails.isAdjacent === false) return;

      const gridData = [...this.grid];

      // Swap our current cell number with the position of the empty cell
      gridData[cellDetails.rowNumber][cellDetails.columnNumber] = selectedCell;

      gridData[selectedCellRowNumber][selectedCellIndex] =
        cellDetails.cellNumber;

      this.$emit('click', gridData);
    },
    checkCell(selectedCell) {
      // Get the row and position our empty cell
      const emptyCellRef = this.cellRefs[this.emptyCell][0];

      // We need to get the surrounding cells of our empty cell. We'll determine this using info from data attribute
      const rowNumber = parseInt(emptyCellRef.$el.getAttribute('data-row'));
      const columnNumber = parseInt(
        emptyCellRef.$el.getAttribute('data-column')
      );
      const cellNumber = parseInt(emptyCellRef.$el.getAttribute('data-cell'));

      // Get the top cell value
      const topCell = this.getAdjacentValue(rowNumber - 1, columnNumber);

      // Get the bottom cell value
      const bottomCell = this.getAdjacentValue(rowNumber + 1, columnNumber);

      // Get the left cell value
      const leftCell = this.getAdjacentValue(rowNumber, columnNumber - 1);

      // Get the right cell value
      const rightCell = this.getAdjacentValue(rowNumber, columnNumber + 1);

      // assert that the selected cell is adjacent of the empty cell
      const isAdjacent =
        selectedCell === topCell ||
        selectedCell === bottomCell ||
        selectedCell === leftCell ||
        selectedCell === rightCell;

      return {
        isAdjacent,
        rowNumber,
        columnNumber,
        cellNumber,
      };
    },
    getAdjacentValue(rowNumber, columnNumber) {
      return this.grid[rowNumber] ? this.grid[rowNumber][columnNumber] : null;
    },
  },
};
</script>

<style scoped></style>
