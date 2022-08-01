//Selects the canvas tag from the HTML document to attach to the canvas variable.
const canvas = document.querySelector("canvas");

//Creates a 2d workspace for Java to create graphics in.
const context = canvas.getContext("2d");

//Sets the size of the 2d workspace / canvas.
canvas.width = 1024;
canvas.height = 576;

//Fills the created canvas with a rectangle.
context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

// Creates a new sprite named "player". This will be the main sprite used by the user.
const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
});

// ***WILL NEED TO BE IMPLEMENTED***
const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 10,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      if (player.onGround == "true") {
        player.velocity.y = -10;
      }
      player.onGround = "false";

      console.log(player.velocity.y);
      console.log(player.onGround);
      break;
    case " ":
      player.attack();
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
});

const platform = new Scene(1, { x: 250, y: 100 }, "./resources/platform.png");

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
  platform.drawEntity();

  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    //player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    //player.switchSprite('run')
  } else {
    player.velocity.x = 0;
    //player.switchSprite('idle')
  }
}

animate();

console.log(player.onGround);
