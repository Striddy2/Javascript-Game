class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.width = 50;
    this.height = 50;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 10;
    this.offset = offset;
  }

  draw() {
    context.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }

  //DONT DELETE THIS MIGHT NEED
  // animateObject() {
  //   let object;
  //   for (let i = 0; i < this.objects.length; i++) {
  //     object = this.objects[i];
  //     this.image.src = object[1];
  //     context.drawImage(this.image, object[0].x, object[0].y);
  //   }
  // }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
    });

    this.velocity = velocity;
    this.height = 50;
    this.onGround = "false";
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 10;
    this.sprites = sprites;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();
    this.animateFrames();

    // if (this.velocity.y > 0) {
    //   this.velocity.y = Math.floor(this.velocity.y);
    // }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      this.position.y + this.height + this.velocity.y >=
      !canvas.height - 145
    ) {
      this.velocity.y += gravity;
    }
  }

  switchSprite(sprite) {
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "idleLeft":
        if (this.image !== this.sprites.idleLeft.image) {
          this.image = this.sprites.idleLeft.image;
          this.framesMax = this.sprites.idleLeft.framesMax;
          this.framesCurrent = 0;
        }

        break;

      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "runLeft":
        if (this.image !== this.sprites.runLeft.image) {
          this.image = this.sprites.runLeft.image;
          this.framesMax = this.sprites.runLeft.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "jumpLeft":
        if (this.image !== this.sprites.jumpLeft.image) {
          this.image = this.sprites.jumpLeft.image;
          this.framesMax = this.sprites.jumpLeft.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "fallLeft":
        if (this.image !== this.sprites.fallLeft.image) {
          this.image = this.sprites.fallLeft.image;
          this.framesMax = this.sprites.fallLeft.framesMax;
          this.framesCurrent = 0;
        }
        break;
    }
  }
}

class Scene {
  constructor(numberOfScene, objects) {
    this.numberOfScene = numberOfScene;
    this.objects = objects;
    this.image = new Image();
  }

  drawScene() {
    let object;
    for (let i = 0; i < this.objects.length; i++) {
      object = this.objects[i];
      this.image.src = object[1];
      context.drawImage(this.image, object[0].x, object[0].y);
    }
  }
}

// Below is old code that Ian wrote and might need

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
// this.position.x += this.velocity.x;
// this.position.y += this.velocity.y;

// if (this.position.y + this.height + this.velocity.y >= canvas.height - 70) {
//   this.velocity.y = 0;
//   this.position.y = 775;
//   this.onGround = "true";
// } else {
//   this.velocity.y += gravity;
// }
