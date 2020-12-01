<template>
  <div id="app">
    <div class="my">
      <span v-if="!winner">
        Player <strong>{{ currentPlayer }}</strong> is playing
      </span>
      <span v-else>
        Player <strong>{{ winner }}</strong> wins this round.
        <a href="javascript:" @click.prevent="resetGame">Reset the game</a> to play another round
      </span>
    </div>
    <div class="grid-container">
      <div class="grid-item"
           @click="handleBoxClicked(index)"
           v-for="(square, index) in squares"
           :class="{'winning-cell': winningBoxes.includes(index)}"
           :key="index">
        {{ history[index] }}
      </div>
    </div>
    <button class="my" @click="resetGame">reset game</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  created() {},
  data: () => ({
    squares: Array(9).fill(null),
    history: {},
    xIsPlaying: true,
    winningBoxes: [],
    winner: null
  }),
  computed: {
    currentPlayer() {
      return this.xIsPlaying ? 'X' : 'O'
    }
  },
  methods: {
    handleBoxClicked(position) {
      // When the cell has already been clicked or we have a winner
      if (this.history[position] || this.winner) return;

      // Store the position played by the current play in history
      this.history[position] = this.currentPlayer

      // Check if the current player wins
      this.checkWinner()

      // Update next player
      this.xIsPlaying = !this.xIsPlaying
    },
    checkWinner() {
      // Predefined list of winning cells
      const winningCells = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      for (let i = 0; i < winningCells.length; i++) {

        // Destructure each cell index
        const [cell1, cell2, cell3] = winningCells[i];

        // Check if the current player has a matching winning cell
        if (this.history[cell1] === this.currentPlayer
            && this.history[cell2] === this.currentPlayer
            && this.history[cell3] === this.currentPlayer) {

          // Update our winning cells and winner
          this.winningBoxes = winningCells[i];
          console.log(this.winningBoxes)
          this.winner = this.currentPlayer;
          break
        }
      }
      
    },
    resetGame() {
      this.history = {}
      this.winner = null
      this.winningBoxes = []
    }
  }
}
</script>

<style lang="scss">
$primary-color: #2c3e50;
$border-size: solid 1px $primary-color;

* {
  box-sizing: border-box;
}

a {
  color: $primary-color;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primary-color;
  margin-top: 60px;
}

.my{
  margin: 10px 0;
}

.grid-container {
  width: 300px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1px;
  background-color: $primary-color;
  border: $border-size;

  .grid-item {
    background-color: #fff;
    height: 80px;
    text-align: center;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;

    &.winning-cell {
      border: 1px solid darkgreen;
    }
  }
}
</style>
