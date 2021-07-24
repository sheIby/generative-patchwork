let patch03 = (width, height, palette, randomGenerator, position) => {
  let strokeColor = palette[0]
  let stroke_weight = scale(randomGenerator.random_num(0, 3))

  let points = []
  let xCenter = width / 2
  let yCenter = height / 2

  let vertices = randomGenerator.random_int(10, 50)
  let angle = radians(360 / vertices)
  let rotation = radians(randomGenerator.random_dec(0, 360))
  let radius = Math.min(xCenter, yCenter)

  for (let i = 0; i < vertices; i++) {
    let x = cos(angle * i + rotation) * radius
    let y = sin(angle * i + rotation) * radius
    points.push({ x, y })
  }

  // patch has to return a draw function
  return () => {
    noStroke()
    fill(0, 10)
    rect(0, 0, width, height)

    noFill()
    strokeWeight(stroke_weight)
    stroke(strokeColor)

    translate(xCenter, yCenter)
    rotate(radians(frameCount / 10))

    for (let point of points) {
      line(0, 0, point.x, point.y)
    }
  }
}
