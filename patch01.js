// to be exported

let patch01 = (width, height, palette, randomGenerator, position) => {
  // Local RNG determines pre-computed shapes
  let objects = []

  // Simple drawing of random squares
  let d = 10
  let stepWidth = width / d
  let stepHeight = height / d
  for (let i=0; i < d; i++) {
    for (let j=0; j < d; j++) {
      
      // Locally random selection from the global palette
      let fill = randomGenerator.random_element(palette)

      // Scale stroke weight with the global scaler
      let stroke_weight = scale(randomGenerator.random_num(0,3))

      objects.push({
        x1: i * stepWidth,
        y1: j * stepHeight,
        x2: (i+1) * stepWidth,
        y2: (j+1) * stepHeight,
        fill,
        stroke_weight
      })
    }
  }

  // patch has to return a draw function
  return () => {
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
}
