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
  	this.clr = color(foreColor);  

    this.colA = color(255,72,66);
    this.colB = color(0,181,247);
    this.colC = color(105,92,253);
    this.colD = color(foreColor);
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
  }
  
  checkEdges(){    
    if(this.loc.x < -5){
      this.loc.x = width + 5;
      this.loc.y = random(height);
      
      this.clrDis = 0;
    } else if(this.loc.x > width + 5){
      this.loc.x = -5;
      this.loc.y = random(height);

      this.clrDis = 0;
    } else if(this.loc.y > height + 5){
      this.loc.x = random(width);
      this.loc.y = -5;

      this.clrDis = 0;
    } else if(this.loc.y < -5){
      this.loc.x = random(width);
      this.loc.y = height + 5;

      this.clrDis = 0;
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
      this.clr = lerpColor(this.colD, this.colC, this.clrDis/0.4);
    } else if(this.clrDis < 0.8){
      this.clr = lerpColor(this.colC, this.colB, (this.clrDis - 0.4)/0.4);
    } else {
      this.clr = lerpColor(this.colB, this.colA, (this.clrDis - 0.8)/0.2);
    }

    fill(this.clr);
    ellipse(this.loc.x, this.loc.y, 1, 1);
  }
}