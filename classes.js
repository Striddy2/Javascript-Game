class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.onGround = "false";
  }

  draw() {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw();
    // if (this.position.y < 425) {
    //     //velocity changes a sprite position
    //     this.position.y += this.velocity.y
    //     this.velocity.y += gravity

    // } else if (this.onGround == "true"){
    //     this.position.y += this.velocity.y

    // } else if (this.position.y >= 425){
    //     this.onGround = "true"
    //     this.velocity.y = 0
    // }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 66) {
      this.velocity.y = 0;
      this.position.y = 360;
    } else {
      this.velocity.y += gravity;
    }
  }
}

class Scene {
  constructor(numberOfScene, position, imageSrc) {
    this.numberOfScene = numberOfScene;
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  drawEntity() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}
