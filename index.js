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

const scenes = [
  new Scene(1, [
    [{ x: 550, y: -25 }, "./resources/platform.png"],
    [{ x: 100, y: 0 }, "./resources/platform.png"],
    [{ x: 450, y: 350 }, "./resources/platform.png"],
  ]),
  new Scene(2, [
    [{ x: 250, y: 100 }, "./resources/platform.png"],
    [{ x: 150, y: 200 }, "./resources/platform.png"],
    [{ x: 50, y: 300 }, "./resources/platform.png"],
  ]),
];

function checkIntersection(object1, object2) {
  if (object1.x >= object2.x + object2.width) {
    return false;
  } else if (object1.x + object1.width <= object2.x) {
    return false;
  } else if (object1.y >= object2.y + object2.height) {
    return false;
  } else if (object1.y + object1.height <= object2.y) {
    return false;
  } else {
    return true;
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
  scenes[0].drawScene();

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
