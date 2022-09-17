//Selects the canvas tag from the HTML document to attach to the canvas variable.
const canvas = document.querySelector("canvas");

//Creates a 2d workspace for Java to create graphics in.
const context = canvas.getContext("2d");

//Sets the size of the 2d workspace / canvas.
canvas.width = 1900;
canvas.height = 895;

//Fills the created canvas with a rectangle.
context.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.2;

// Creates a new sprite named "player". This will be the main sprite used by the user.
const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  imageSrc: "resources/120x80_PNGSheets/_Idle.png",
  framesMax: 10,
  scale: 3,
  offset: {
    x: 80,
    y: 120,
  },
  sprites: {
    idle: {
      imageSrc: "resources/120x80_PNGSheets/_Idle.png",
      framesMax: 10,
    },
    idleLeft: {
      imageSrc: "resources/120x80_PNGSheets/_IdleLeft.png",
      framesMax: 10,
    },
    run: {
      imageSrc: "resources/120x80_PNGSheets/_Run.png",
      framesMax: 10,
    },
    runLeft: {
      imageSrc: "resources/120x80_PNGSheets/_RunLeft.png",
      framesMax: 10,
    },
    jump: {
      imageSrc: "resources/120x80_PNGSheets/_Jump.png",
      framesMax: 3,
    },
    jumpLeft: {
      imageSrc: "resources/120x80_PNGSheets/_JumpLeft.png",
      framesMax: 3,
    },
    fall: {
      imageSrc: "resources/120x80_PNGSheets/_Fall.png",
      framesMax: 3,
    },
    fallLeft: {
      imageSrc: "resources/120x80_PNGSheets/_FallLeft.png",
      framesMax: 3,
    },
  },
});

const bonefire = new Sprite({
  position: {
    x: 170,
    y: 660,
  },
  imageSrc: "./resources/bonfire.png",
  scale: 2,
  framesMax: 20,
});

// Sets Character Animations
function charAnimation() {
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprite("runLeft");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else {
    player.velocity.x = 0;
    if (player.lastKey === "a") {
      player.switchSprite("idleLeft");
    } else if (player.lastKey === "d") {
      player.switchSprite("idle");
    }
  }
  if (player.velocity.y < 0) {
    if (player.lastKey === "a") {
      player.switchSprite("jumpLeft");
    } else if (player.lastKey === "d") {
      player.switchSprite("jump");
    }
  } else if (player.velocity.y > 0) {
    if (player.lastKey === "a") {
      player.switchSprite("fallLeft");
    } else if (player.lastKey === "d") {
      player.switchSprite("fall");
    }
  }
}

// ***WILL NEED TO BE IMPLEMENTED***
const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
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

function horizontalCollision() {
  let horizontalRect = {
    x: player.position.x + player.velocity.x,
    y: player.position.y,
    width: player.width,
    height: player.height,
  };

  for (let i = 0; i < borders.length; i++) {
    let borderRect = {
      x: borders[i].x,
      y: borders[i].y,
      width: borders[i].width,
      height: borders[i].height,
    };
    if (checkIntersection(horizontalRect, borderRect)) {
      player.position.x = player.position.x - player.velocity.x;
    }
  }
}

function verticalCollision() {
  let verticalRect = {
    x: player.position.x,
    y: player.position.y + player.velocity.y,
    width: player.width,
    height: player.height,
  };

  for (let i = 0; i < borders.length; i++) {
    let borderRect = {
      x: borders[i].x,
      y: borders[i].y,
      width: borders[i].width,
      height: borders[i].height,
    };

    if (checkIntersection(verticalRect, borderRect)) {
      if (player.position.y >= borderRect.y) {
        player.position.y = player.position.y - player.velocity.y;
      }
      player.velocity.y = 0;
      player.onGround = "true";
    }
  }

  for (let i = 0; i < platformBorders.length; i++) {
    let platformBorderRect = {
      x: platformBorders[i].x,
      y: platformBorders[i].y,
      width: platformBorders[i].width,
      height: platformBorders[i].height,
    };

    if (player.position.y <= platformBorderRect.y - 50) {
      if (checkIntersection(verticalRect, platformBorderRect)) {
        player.velocity.y = 0;
        player.onGround = "true";
      }
    }
  }
}

let currentScene = 0;

function updateScene() {
  if (player.position.x > 1900) {
    player.position.x = 0;
    player.position.y = 550;
    currentScene++;
  }
}

function checkForDeath() {
  if (player.position.y > 1500) {
    isDead();
  }
}

function isDead() {
  player.position.x = 0;
  player.position.y = 550;
}

// Sets background
const background = [
  //Scene 1 Background
  new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: "./resources/backgroundTest.png",
  }),
  //Scene 2 Background
  new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: "./resources/backgroundTest.png",
  }),
  //Scene 3 Background
  new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: "./resources/scene 3.png",
  }),
  //Scene 4 Background
  new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: "./resources/scene 4.png",
  }),
  //Scene 5 Background
  new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: "./resources/scene 4.png",
  }),
];

const foregroundObjects = [
  new Scene(1, [[{ x: 0, y: 745 }, "./resources/frontGrass.png"]]),
  new Scene(2, [
    [{ x: 1500, y: 340 }, "./resources/small tree.png"],
    [{ x: 400, y: 770 }, "./resources/small tree.png"],
    [{ x: 1200, y: 540 }, "./resources/small tree 2.png"],
    [{ x: 200, y: 500 }, "./resources/small tree 2.png"],
    [{ x: 0, y: 745 }, "./resources/frontGrass.png"],
  ]),
  new Scene(3, [
    [{ x: 1400, y: 417 }, "./resources/small tree 2.png"],
    [{ x: 100, y: 417 }, "./resources/small tree 2.png"],
    [{ x: 150, y: 753 }, "./resources/extragrass.png"],
    [{ x: 1400, y: 753 }, "./resources/extragrass.png"],
    [{ x: 1600, y: 753 }, "./resources/extragrass.png"],
  ]),
  new Scene(4, [
    [{ x: 200, y: 417 }, "./resources/small tree 2.png"],
    [{ x: 250, y: 694 }, "./resources/squarebush.png"],
    [{ x: 150, y: 753 }, "./resources/extragrass.png"],
    [{ x: 1700, y: 753 }, "./resources/extragrass.png"],
  ]),
  new Scene(5, [
    [{ x: 1400, y: 417 }, "./resources/small tree 2.png"],
    [{ x: 100, y: 417 }, "./resources/small tree 2.png"],
    [{ x: 150, y: 753 }, "./resources/extragrass.png"],
    [{ x: 1400, y: 753 }, "./resources/extragrass.png"],
    [{ x: 1600, y: 753 }, "./resources/extragrass.png"],
  ]),
];

let borders = [];
let platformBorders = [];

const sceneObjects = [
  new Scene(1, [[{ x: 370, y: 500 }, "./controls/wasd.png"]]),
  new Scene(2, [
    [{ x: 889, y: 720 }, "./resources/towerFiller.png"],
    [{ x: 889, y: 770 }, "./resources/towerFiller.png"],
    [{ x: 870, y: 595 }, "./resources/tower.png"],
    [{ x: 600, y: 320 }, "./resources/small tree.png"],
    [{ x: 630, y: 790 }, "./resources/extragrass.png"],
    [{ x: 230, y: 790 }, "./resources/extragrass.png"],
    [{ x: 830, y: 790 }, "./resources/extragrass.png"],
    [{ x: 889, y: 770 }, "./resources/small tree.png"],
  ]),
  new Scene(3, [
    [{ x: 300, y: 284 }, "./resources/small tree.png"],
    [{ x: 300, y: 753 }, "./resources/extragrass.png"],
  ]),
  new Scene(4, [
    [{ x: 300, y: 753 }, "./resources/extragrass.png"],
    [{ x: 700, y: 553 }, "./resources/small platform.png"],
    [{ x: 400, y: 323 }, "./resources/platform.png"],
    [{ x: 325, y: -210 }, "./resources/bigtree.png"],
  ]),
  new Scene(5, [
    [{ x: 300, y: 284 }, "./resources/small tree.png"],
    [{ x: 300, y: 753 }, "./resources/extragrass.png"],
  ]),
];

//border is always x-75 y-70 height +60 compared to the actually drawn object
function updateBorders() {
  switch (currentScene) {
    case 0:
      borders = [
        //{ x: 450, y: 500, width: 200, height: 100 },
        { x: -115, y: 0, width: 50, height: 895 },
        { x: -75, y: 750, width: 1950, height: 10 },
      ];
      break;
    case 1:
      borders = [
        // { x: 450, y: 500, width: 200, height: 100 },
        { x: -115, y: 0, width: 50, height: 895 },
        { x: -75, y: 750, width: 1950, height: 10 },
        { x: 816, y: 525, width: 150, height: 240 },
      ];
      // platformBorders = [{ x: 700, y: 500, width: 200, height: 100 }];
      break;
    case 2:
      borders = [
        { x: -115, y: 0, width: 50, height: 895 },
        { x: -75, y: 698, width: 490, height: 140 },
        { x: 1210, y: 698, width: 700, height: 140 },
      ];
      platformBorders = [
        { x: 760, y: 442, width: 185, height: 10 },
        { x: 502, y: 506, width: 125, height: 10 },
        { x: 1080, y: 522, width: 125, height: 10 },
      ];
      break;
    case 3:
      borders = [
        { x: -115, y: 0, width: 50, height: 895 },
        { x: -75, y: 698, width: 490, height: 140 },
        { x: 1575, y: 698, width: 700, height: 140 },
      ];
      platformBorders = [
        { x: 760, y: 442, width: 185, height: 10 },
        { x: 625, y: 484, width: 125, height: 10 },
        { x: 1080, y: 522, width: 125, height: 10 },
      ];
      break;
    case 4:
      borders = [
        { x: -115, y: 0, width: 50, height: 895 },
        { x: -75, y: 698, width: 490, height: 140 },
        { x: 1210, y: 698, width: 700, height: 140 },
      ];
      platformBorders = [
        { x: 760, y: 442, width: 185, height: 10 },
        { x: 602, y: 506, width: 125, height: 10 },
        { x: 1080, y: 522, width: 125, height: 10 },
      ];
      break;
  }
}

context.fillStyle = "blue";
function showBorders(currentScene) {
  switch (currentScene) {
    case 0:
      //floor
      context.fillStyle = "blue";
      context.fillRect(0, 820, 1950, 40);
      context.fillRect(-40, 0, 50, 895);
      break;
    case 1:
      context.fillRect(0, 820, 1950, 40);
      context.fillRect(-40, 0, 50, 895);
      context.fillRect(891, 595, 150, 240);
      break;
    case 2:
      context.fillRect(0, 768, 490, 140);
      context.fillRect(1285, 768, 700, 140);
      context.fillRect(-40, 0, 50, 895);
      context.fillRect(835, 512, 185, 10);
      context.fillRect(577, 576, 125, 10);
      context.fillRect(1155, 592, 125, 10);
      break;
    case 3:
      context.fillRect(0, 768, 490, 140);
      context.fillRect(1650, 768, 700, 140);
      context.fillRect(-40, 0, 50, 895);
      context.fillRect(835, 512, 185, 10);
      context.fillRect(700, 554, 125, 10);
      context.fillRect(1155, 592, 125, 10);
      break;
  }
}

//TO BE IMPLEMENTED!!!!!!!!!!!!
// const animatedObjects = [
//   new Fighter(
//     {
//       imageSrc: "resources/120x80_PNGSheets/_Idle.png",
//       framesMax: 10,
//     }
//     [{ x: 100, y: 0 }, "./resources/platform.png"],
//     [{ x: 450, y: 350 }, "./resources/platform.png"],
//   ),
//   new Sprite(2, [
//     [{ x: 250, y: 100 }, "./resources/platform.png"],
//     [{ x: 150, y: 200 }, "./resources/platform.png"],
//     [{ x: 50, y: 300 }, "./resources/platform.png"],
//   ]),
// ];

function animate() {
  window.requestAnimationFrame(animate);
  updateBorders();
  background[currentScene].update();
  // createScene(currentScene);
  if (currentScene == 0) {
    bonefire.update();
  }
  sceneObjects[currentScene].drawScene();
  //animatedObjects[0].update();
  player.update();
  foregroundObjects[currentScene].drawScene();
  //enemy.update();
  //platform.drawEntity();
  //enemy.update();
  verticalCollision();
  horizontalCollision();
  charAnimation();
  updateScene();
  checkForDeath();
  showBorders(currentScene);
}

animate();
