function toggleFade(){
  fadeBkgd = !fadeBkgd;
}

function reRoll(){
  var newNoiseScale = random(50, 200);
  var newNoiseStrength = random(0.25, 3);

  for (let i=0; i<num; i++) {
    particles[i].noiseScale = newNoiseScale;
    particles[i].noiseStrength = newNoiseStrength;
  }
}

function toggleColorOn(){
  clickColorOn = !clickColorOn;

  for (let i=0; i<num; i++) {
    particles[i].colorOn = clickColorOn;
  }
}

function togglePushOn(){
  clickPushOn = !clickPushOn;

  for (let i=0; i<num; i++) {
    particles[i].pushOn = clickPushOn;
  }
}
