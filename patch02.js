let patch02 = (width, height, palette, randomGenerator, position) => {
  let objects = []

  let d = 10
  let stepWidth = width / d
  let stepHeight = height / d
  for (let i=0; i < d; i++) {
    for (let j=0; j < d; j++) {
      
      let stroke = randomGenerator.random_element(palette)
      let strokeWeight = scale(randomGenerator.random_num(0,3))
      let delay = Math.min(stepWidth, stepHeight) * randomGenerator.random_dec(.3, 1)

      objects.push({
        x: (i + .5) * stepWidth,
        y: (j + .5) * stepHeight,
        delay,
        stroke,
        strokeWeight
      })
    }
  }

  // patch has to return a draw function
  return () => {
    noStroke();
    fill(0, 10);
    rect(0, 0, width, height);

    for (let obj of objects) {
      let speed = frameCount / 20 + obj.delay

      noFill()
      strokeWeight(obj.strokeWeight)
      stroke(obj.stroke)
      
      push()
      translate(obj.x, obj.y)
      ellipse(0, 0, speed % stepWidth, speed % stepHeight)
      pop()
    }
  }
}
