class Sprite {
  constructor({ position, velocity,}) {
    this.position = position;
    this.velocity = velocity;
    this.height = 50;
    this.onGround = "false";
    this.image = new Image();
    this.image.src = './resources/120x80_PNGSheets/_Idle.png';

  }

  draw() {
    // context.fillStyle = "red";
    // context.fillRect(this.position.x, this.position.y, 50, this.height);

    context.drawImage(this.image, this.position.x, this.position.y);
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

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 70) {
      this.velocity.y = 0;
      this.position.y = 775;
      this.onGround = "true";
    } else {
      this.velocity.y += gravity;
    }
  }
}

class backgroundElements {
  constructor({ position, imageSrc}) {
    this.position = position;
    this.image = new Image()
    this.image.src = imageSrc

  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y)
  }

  update() {
    this.draw();
  }
}

class Fighter {
  constructor({ position, velocity,}) {
    this.position = position;
    this.velocity = velocity;
    this.height = 50;
    this.onGround = "false";
    this.image = new Image();
    this.image.src = './resources/120x80_PNGSheets/_Idle.png';

  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
      this.velocity.y = 0;
      this.position.y = 750;
      this.onGround = "true";
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
