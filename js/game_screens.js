// how should it look:
// update() // update your screen as needed
// inputs() // only collect input you want
// render() // handle on render
// onEnter?
// onLeave?
class GameStateManager {
  constructor() {
    this.gameStates = [];
    this.renderer = PIXI.autoDetectRenderer(1000, 800);
    document.body.appendChild(this.renderer.view);
  }
  // switchState(gameState) {
  //
  // }
  pop() {
    return this.gameStates.pop();
  }
  push(gameState) {
    this.gameStates.push(gameState);
  }
  peek() {
    let state = this.gameStates[this.gameStates.length-1];
    if (state != undefined) {
      return state;
    } else {
      return null; // return null state?
    }
  }
}

class TitleScreen {
  constructor(inputState, stateManager) {
    this.inputState = inputState;
    this.stateManager = stateManager;
    this.font = 'bold italic 60px Avro';

    // this.renderer = PIXI.autoDetectRenderer(1000, 800);
    // document.body.appendChild(this.renderer.view);
    this.stage = new PIXI.Container();

    this.startText = new PIXI.Text("Elevator Rush!\nClick to start!", {
      font: this.font,
      fill: '#FF4136',
      align: 'center',
    });
    this.startText.position = new PIXI.Point(500, 400);
    this.startText.anchor.x = 0.5;//, this.startText.anchor.y = 0.5;
    this.stage.addChild(this.startText);
  }
  update() {

  }
  input() {
    if (this.inputState.buttons.LEFT) {
      this.inputState.buttons.LEFT = false; // should clear elsewhere?
      console.log("Switching to PLAYING_GAME");
      this.stateManager.push(new GameScreen(this.inputState, this.stateManager));
    }
  }
  render() {
    console.log("Rendering title screen!");
    this.stateManager.renderer.render(this.stage);
  }
}

class GameScreen {
  constructor(inputState, stateManager) {
    this.inputState = inputState;
    this.stateManager = stateManager;
    // this.renderer = PIXI.autoDetectRenderer(1000, 800);
    // document.body.appendChild(this.renderer.view);
    this.stage = new PIXI.Container();

    this.gfx = new PIXI.Graphics();
    this.stage.addChild(this.gfx);
  }
  update() {

  }
  input() {
    if (this.inputState.buttons.LEFT) {
      this.inputState.buttons.LEFT = false; // should clear elsewhere?
      console.log("Clicked Left");
    }
    if (this.inputState.buttons.ESC) {
      console.log("Exiting game");
      this.stateManager.pop();
    }
  }
  render() {
    // this.renderer.render(this.stage);
    this.stateManager.renderer.render(this.stage);
    this.gfx.clear();

    // draw 3 'buildings'
    this.gfx.beginFill(0xdddcdc, 1);
    this.gfx.drawRect(60, 300, 125, 450);
    this.gfx.drawRect(430, 250, 170, 500);
    this.gfx.drawRect(730, 300, 120, 430);
    this.gfx.endFill();
    console.log("Rendering game screen! So pretty!");
  }
}

module.exports = {
  GameStateManager: GameStateManager,
  TitleScreen: TitleScreen,
  GameScreen: GameScreen,
};
