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

  console.log("NoiseScale: " + newNoiseScale + " & NoiseStrength: " + newNoiseStrength);
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

function setFore(val){
  foreColor = color(val);
}

function setBkgd(val){
  bkgdColor = color(val);
}

function setColorA(select, val){
  colorA[select] = color(val);
  if(select == 0){
    document.getElementById('colorA0').value = val;
  } else if(select == 1){
    document.getElementById('colorA1').value = val;
  } else if(select == 2){
    document.getElementById('colorA2').value = val;
  } else if(select == 3){
    document.getElementById('colorA3').value = val;
  }
}

function setPartType(val){
  for (let i=0; i<num; i++) {
    particles[i].type = val;
  }
}

function setPartSize(val){
  var newPartSize = map(val, 0, 100, 1, 10);

  for (let i=0; i<num; i++) {
    particles[i].partSize = newPartSize;
  }
}