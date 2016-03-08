class Game {
  constructor() {
    this.inputState = {
      buttons: {
        LEFT: false,
        RIGHT: false,
      }
    };
    this.gameStates = Object.freeze({
      TITLE_SCREEN: 0,
      PLAYING_GAME: 1,
    });
    this.currentState = this.gameStates.TITLE_SCREEN;
  }
  handleInput() {
    switch (this.currentState) {
      case this.gameStates.TITLE_SCREEN:
        if (this.inputState.buttons.LEFT) {
          this.inputState.buttons.LEFT = false;
          console.log("Switching to PLAYING_GAME");
          this.currentState = this.gameStates.PLAYING_GAME;
        }
        break;
      case this.gameStates.PLAYING_GAME:
        // this.renderGame();
        break;
      default:
    }
  }
  renderGame() {
    console.log("Rendering game screen!");
  }
  renderTitle() {
    console.log("Rendering title screen!");
  }
  loop() {
    this.handleInput();
    // update / stage
    // render
    switch (this.currentState) {
      case this.gameStates.TITLE_SCREEN:
        this.renderTitle();
        break;
      case this.gameStates.PLAYING_GAME:
        this.renderGame();
        break;
      default:
    }
    requestAnimationFrame(() => this.loop());
  }
  start() {
    console.log("Game start");
    // whatever setup
    this.loop()
  }
}

let game = new Game();
game.start();

window.addEventListener('click', function(e) {
  let point = new PIXI.Point(e.clientX, e.clientY);
  console.log("point!", point)
  game.inputState.buttons.LEFT = true;
});
