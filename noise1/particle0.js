class Particle0{
  constructor(_loc, _dir, _speed, _push, _color){
    this.noiseScale = 100;
    this.noiseStrength = 1;
    this.mouseDist = 100;

    this.loc = _loc;
    this.dir = _dir;
    this.speed = _speed;

    this.pushOn = _push;
    this.colorOn = _color;

    this.clrDis = 0;
  	this.clr = foreColor;

    this.partSize = 1.5;
    this.snkLength = 5;
    this.snk = [];

    this.type = 0;

    for(var m = 0; m < this.snkLength; m++){
      this.snk[m] = createVector(this.loc.x, this.loc.y);
    }

    this.border = 10;
  }

  run() {
    this.move();
    this.checkEdges();
    this.mouseCheck();
    this.update();
  }

  move(){
    let angle=noise(this.loc.x/this.noiseScale, this.loc.y/this.noiseScale, frameCount/this.noiseScale)*TWO_PI*this.noiseStrength; //0-2PI

    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    var vel = this.dir.copy();
    var d =1;  //direction change 
    vel.mult(this.speed*d); //vel = vel * (speed*d)
    this.loc.add(vel); //loc = loc + vel

    this.snk[0].set(this.loc.x, this.loc.y);
    for(var m = this.snkLength - 1; m > 0; m--){
      this.snk[m].set(this.snk[m-1]);
    }
  }
  
  checkEdges(){    
    if(this.loc.x < -this.border){
      this.loc.x = width + this.border;
      this.loc.y = random(height);
      
      this.reset();
    } else if(this.loc.x > width + this.border){
      this.loc.x = -this.border;
      this.loc.y = random(height);

      this.reset();
    } else if(this.loc.y > height + this.border){
      this.loc.x = random(width);
      this.loc.y = -this.border;

      this.reset();
    } else if(this.loc.y < -this.border){
      this.loc.x = random(width);
      this.loc.y = height + this.border;

      this.reset();
    }
  }
  
  reset(){
    this.clrDis = 0;
    for(var m = 0; m < this.snkLength; m++){
      this.snk[m] = createVector(this.loc.x, this.loc.y);
    }
  }

  mouseCheck(){
    if(mouseIsPressed && dist(mouseX, mouseY, this.loc.x, this.loc.y) < this.mouseDist){
      if(this.colorOn){
        let clrStr = map(dist(mouseX, mouseY, this.loc.x, this.loc.y), 0, this.mouseDist, 0.075, 0);

        this.clrDis += clrStr; 
      }

      if(this.pushOn){
        let angle = atan2(mouseY - this.loc.y, mouseX - this.loc.x);
        let strength = map(dist(mouseX, mouseY, this.loc.x, this.loc.y), 0, this.mouseDist, -10.0, 0);
        this.dir.x = cos(angle);
        this.dir.y = sin(angle);
        var vel = this.dir.copy();
        var d = strength;  //direction change 
        vel.mult(this.speed*d); //vel = vel * (speed*d)
        this.loc.add(vel); //loc = loc + vel
      }
    }
  }
  
  update(){
    if (this.clrDis < 0.4){
      this.clr = lerpColor(foreColor, colorA[0], this.clrDis/0.4);
    } else if(this.clrDis < 0.8){
      this.clr = lerpColor(colorA[0], colorA[1], (this.clrDis - 0.4)/0.4);
    } else {
      this.clr = lerpColor(colorA[1], colorA[2], (this.clrDis - 0.8)/0.2);
    }


    if(this.type == 0){
      fill(this.clr);
      noStroke();
      
      ellipse(this.loc.x, this.loc.y, this.partSize, this.partSize);
    } else if(this.type == 1){
      noFill();
      stroke(this.clr);
      strokeWeight(this.partSize);

      beginShape();
      for(var m = 0; m < this.snkLength; m++){
        vertex(this.snk[m].x, this.snk[m].y);
      }
      endShape();
    }
  }
}