// Shared hash
let hash = tokenData.hash
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
}

// Shared palettes
var PALETTES = [
  ["#FAF5F5", "#E3392D"],
  ["#40C79A", "#4640C7"]
]

// Detect dimensions
var DIM = Math.min(window.innerWidth, window.innerHeight)

// Global scaler based on a default of 1000px
function n(x) {
  return x*DIM/1000
}

// Global RNG
var RandomShared = new Random(seed)

// Global variables
var PAL = PALETTES[RandomShared.random_int(0, PALETTES.length-1)]
var BG = "#000000"

// Compute and draw functions for each patch
PATCH_01_COMPUTE = function(x1, y1, x2, y2) {

  // Local RNG
  let RandomPatch = new Random(seed)

  // Local dimensions
  let p_dimx = x2-x1
  let p_dimy = y2-y1
  let p_dim = Math.min(p_dimx, p_dimy)

  // Local RNG determines pre-computed shapes
  let objects = []

  // Simple drawing of random squares
  let d = 10
  let step = p_dim / d
  for (let i=0; i < d; i++) {
    for (let j=0; j < d; j++) {
      
      // Locally random selection from the global palette
      let fill_color = PAL[RandomPatch.random_int(0, PAL.length-1)]

      // Scale stroke weight with the global scaler
      let stroke_weight = n(RandomPatch.random_num(0,3))

      objects.push({
        "x1" : x1 + (i * step),
        "y1" : y1 + (j * step),
        "x2" : x1 + ((i+1) * step),
        "y2" : y1 + ((j+1) * step),
        "fill" : fill_color,
        "stroke_weight" : stroke_weight
      })
    }
  }
  return objects
}

PATCH_01_DRAW = function(objects) {
  for (let obj of objects) {    
    // Access global background
    stroke(BG)
    // Access global frame count
    strokeWeight(obj.stroke_weight * (frameCount % 30) / 20)
    fill(obj.fill)
    beginShape()
    vertex(obj.x1, obj.y1)
    vertex(obj.x2, obj.y1)
    vertex(obj.x2, obj.y2)
    vertex(obj.x1, obj.y2)
    endShape(CLOSE)
  }
}

// Set the coordinates of this patch to grid (1, 1) 
// scaling to a 1000x1000 canvas
let PATCH_01_OBJ = PATCH_01_COMPUTE(n(250), n(250), n(500), n(500))

// Set the coordinates of this patch to grid (2, 3) 
// scaling to a 1000x1000 canvas
let PATCH_04_OBJ = PATCH_01_COMPUTE(n(500), n(750), n(750), n(1000))

function setup() {
  createCanvas(DIM, DIM)
  background(BG)
  frameRate(10)
}

function draw() {
  background(BG)
  // Computing section coordinates
  // Ignore this
  let sno = 4 // Number of sections
  let spx = DIM / sno // Pixel size of section
  for (let x=0; x < sno; x++) {
    for (let y=0; y < sno; y++) {
      let x1 = x * spx
      let x2 = x1 + spx
      let y1 = y * spx
      let y2 = y1 + spx
      noFill()
      stroke(255)
      strokeWeight(n(5))
      beginShape()
      vertex(x1, y1)
      vertex(x2, y1)
      vertex(x2, y2)
      vertex(x1, y2)
      endShape(CLOSE)
    }
  }
  // End ignore

  // Draw pre-computed objects for each patch
  PATCH_01_DRAW(PATCH_01_OBJ)
  PATCH_01_DRAW(PATCH_04_OBJ)
}
