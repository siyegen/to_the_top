let GameStateManager = require('./game_screens.js').GameStateManager;
let TitleScreen = require('./game_screens.js').TitleScreen;

class Game {
  constructor() {
    this.inputState = {
      buttons: {
        LEFT: false,
        RIGHT: false,
        ESC: false,
      }
    };
    this.stateManager = new GameStateManager();
  }
  loop() {
    let currentState = this.stateManager.peek();
    if (currentState != null) {
      currentState.input();
      currentState.update();
      currentState.render();
    }
    requestAnimationFrame(() => this.loop());
  }
  start() {
    console.log("Start Game");
    this.stateManager.push(new TitleScreen(this.inputState, this.stateManager));
    this.loop()
  }
}

let game = new Game();
game.start();

let keyConfig = {
  65: "LEFT",
  83: "DOWN",
  68: "RIGHT",
  87: "UP",
  37: "CAMLEFT",
  39: "CAMRIGHT",
  32: "SPACE",
  90: "ZOOM",
  27: "ESC",
};

window.addEventListener('click', function(e) {
  let point = new PIXI.Point(e.clientX, e.clientY);
  console.log("point!", point)
  game.inputState.buttons.LEFT = true;
});

window.addEventListener('keyup', function(e) {
  let key = keyConfig[e.keyCode];

  if (key != undefined) {
    game.inputState.buttons[key] = false;
  }
});

window.addEventListener('keydown', function(e) {
  let key = keyConfig[e.keyCode];

  if (key != undefined) {
    game.inputState.buttons[key] = true;
  }
});
