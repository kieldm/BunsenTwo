class Particle{
  constructor(_loc,_dir,_speed){
    this.loc = _loc;
    this.dir = _dir;
    this.speed = _speed;

    this.mouseDist = 100;

    this.clrDis = 0;
  	this.clr = color(255);  

    this.colA = color(255,72,66);
    this.colB = color(0,181,247);
    this.colC = color(105,92,253);
    this.colD = color(255);
  }

  run() {
    this.move();
    this.checkEdges();
    this.mouseCheck();
    this.update();
  }
  move(){
    // let angle=noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale)*TWO_PI*noiseStrength; //0-2PI
    let angle=noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale)*TWO_PI*noiseStrength; //0-2PI

    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    var vel = this.dir.copy();
    var d =1;  //direction change 
    vel.mult(this.speed*d); //vel = vel * (speed*d)
    this.loc.add(vel); //loc = loc + vel
  }
  checkEdges(){
    //float distance = dist(width/2, height/2, loc.x, loc.y);
    //if (distance>150) {
    // if (this.loc.x<0 || this.loc.x>width || this.loc.y<0 || this.loc.y>height) {    
    //   this.loc.x = random(width*1.2);
    //   this.loc.y = random(height);
    // }
    
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
      // let angle = atan2(mouseY - this.loc.y, mouseX - this.loc.x);
      // let strength = map(dist(mouseX, mouseY, this.loc.x, this.loc.y), 0, this.mouseDist, -10.0, 0);
      let clrStr = map(dist(mouseX, mouseY, this.loc.x, this.loc.y), 0, this.mouseDist, 0.05, 0);

      // this.dir.x = cos(angle);
      // this.dir.y = sin(angle);
      // var vel = this.dir.copy();
      // var d = strength;  //direction change 
      // vel.mult(this.speed*d); //vel = vel * (speed*d)
      // this.loc.add(vel); //loc = loc + vel

      this.clrDis += clrStr;
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