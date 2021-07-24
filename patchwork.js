// Using const to avoid accidental override by patches

// patches should be imported from external file
const patches = [patch01, patch02, patch03, patch01]
const columns = Math.round(Math.sqrt(patches.length))
let rows = Math.round(patches.length / columns)
if (columns * rows < patches.length) rows++

// Standard scale
const RESOLUTION = 2048
// Detect dimensions
const DIM = Math.min(window.innerWidth, window.innerHeight)
const UNIT = DIM / RESOLUTION
const patchWidth = DIM / columns
const patchHeight = DIM / rows

// Global scaler based on resolution
const scale = (x) => x * UNIT

// Shared palettes
const PALETTES = [
  ['#fff', '#000'],
  ['#32936f', '#395e66', '#387d7a', '#26a96c', '#2bc016'],
  ['#f02d3a', '#273043', '#9197ae', '#eff6ee', '#dd0426']
]

// Shared hash
let { hash } = tokenData
let seed = parseInt(hash.slice(0, 16), 16)

// Shared PRNG class
class Random {
  constructor(seed) {
    this.seed = seed
  }
  random_dec() {
    // RNG TBD
    return Math.random()
  }
  random_num(a, b) {
    return a+(b-a)*this.random_dec()
  }
  random_int(a, b) {
    return Math.floor(this.random_num(a, b+1))
  }
  random_element(array) {
    return array[this.random_int(0, array.length - 1)]
  }
  // Add gaussian?
}

// Global RNG
const RandomShared = new Random(seed)

// Global variables
const PAL = RandomShared.random_element(PALETTES)
const BG = "#000000"

let patchGrid = []

setup = () => {
  createCanvas(DIM, DIM)
  background(BG)
  frameRate(30)

  // initialize patches
  let row = 0;
  let column = 0;

  for (let patch of patches) {
    if (!patchGrid[row]) {
      patchGrid[row] = []
    }

    patchGrid[row].push(patch(
      patchWidth,
      patchHeight,
      PAL,
      new Random(seed),
      [row, column]
    ));

    column++
    if (column === columns) {
      column = 0
      row++
    }
  }
}

// To be removed
const drawGrid = () => {
  // Computing section coordinates
  noFill()
  stroke(0, 255, 0, 150)
  strokeWeight(scale(5))

  for (let column = 0; column <= columns; column++) {
    line(patchWidth * column, 0, patchWidth * column, height);
  }

  for (let row = 0; row <= rows; row++) {
    line(0, patchHeight * row, width, patchHeight * row);
  }
}

draw = () => {
  // draw each patch in the grid
  for (let row = 0; row < patchGrid.length; row++) {
    for (let column = 0; column < patchGrid[row].length; column++) {
      // isolate drawing styles & transformations
      push()
      // move drawing area to patch
      translate(column * patchWidth, row * patchHeight)

      // draw patch
      patchGrid[row][column]()
      pop()
    }
  }

  // To be removed
  drawGrid()
}
