(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GameStateManager = require('./game_screens.js').GameStateManager;
var TitleScreen = require('./game_screens.js').TitleScreen;

var Game = (function () {
  function Game() {
    _classCallCheck(this, Game);

    this.inputState = {
      buttons: {
        LEFT: false,
        RIGHT: false,
        ESC: false
      }
    };
    this.stateManager = new GameStateManager();
  }

  _createClass(Game, [{
    key: 'loop',
    value: function loop() {
      var _this = this;

      var currentState = this.stateManager.peek();
      if (currentState != null) {
        currentState.input();
        currentState.update();
        currentState.render();
      }
      requestAnimationFrame(function () {
        return _this.loop();
      });
    }
  }, {
    key: 'start',
    value: function start() {
      console.log("Start Game");
      this.stateManager.push(new TitleScreen(this.inputState, this.stateManager));
      this.loop();
    }
  }]);

  return Game;
})();

var game = new Game();
game.start();

var keyConfig = {
  65: "LEFT",
  83: "DOWN",
  68: "RIGHT",
  87: "UP",
  37: "CAMLEFT",
  39: "CAMRIGHT",
  32: "SPACE",
  90: "ZOOM",
  27: "ESC"
};

window.addEventListener('click', function (e) {
  var point = new PIXI.Point(e.clientX, e.clientY);
  console.log("point!", point);
  game.inputState.buttons.LEFT = true;
});

window.addEventListener('keyup', function (e) {
  var key = keyConfig[e.keyCode];

  if (key != undefined) {
    game.inputState.buttons[key] = false;
  }
});

window.addEventListener('keydown', function (e) {
  var key = keyConfig[e.keyCode];

  if (key != undefined) {
    game.inputState.buttons[key] = true;
  }
});

},{"./game_screens.js":2}],2:[function(require,module,exports){
// how should it look:
// update() // update your screen as needed
// inputs() // only collect input you want
// render() // handle on render
// onEnter?
// onLeave?
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GameStateManager = (function () {
  function GameStateManager() {
    _classCallCheck(this, GameStateManager);

    this.gameStates = [];
    this.renderer = PIXI.autoDetectRenderer(1000, 800);
    document.body.appendChild(this.renderer.view);
  }

  // switchState(gameState) {
  //
  // }

  _createClass(GameStateManager, [{
    key: 'pop',
    value: function pop() {
      return this.gameStates.pop();
    }
  }, {
    key: 'push',
    value: function push(gameState) {
      this.gameStates.push(gameState);
    }
  }, {
    key: 'peek',
    value: function peek() {
      var state = this.gameStates[this.gameStates.length - 1];
      if (state != undefined) {
        return state;
      } else {
        return null; // return null state?
      }
    }
  }]);

  return GameStateManager;
})();

var TitleScreen = (function () {
  function TitleScreen(inputState, stateManager) {
    _classCallCheck(this, TitleScreen);

    this.inputState = inputState;
    this.stateManager = stateManager;
    this.font = 'bold italic 60px Avro';

    // this.renderer = PIXI.autoDetectRenderer(1000, 800);
    // document.body.appendChild(this.renderer.view);
    this.stage = new PIXI.Container();

    this.startText = new PIXI.Text("Elevator Rush!\nClick to start!", {
      font: this.font,
      fill: '#FF4136',
      align: 'center'
    });
    this.startText.position = new PIXI.Point(500, 400);
    this.startText.anchor.x = 0.5; //, this.startText.anchor.y = 0.5;
    this.stage.addChild(this.startText);
  }

  _createClass(TitleScreen, [{
    key: 'update',
    value: function update() {}
  }, {
    key: 'input',
    value: function input() {
      if (this.inputState.buttons.LEFT) {
        this.inputState.buttons.LEFT = false; // should clear elsewhere?
        console.log("Switching to PLAYING_GAME");
        this.stateManager.push(new GameScreen(this.inputState, this.stateManager));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      console.log("Rendering title screen!");
      this.stateManager.renderer.render(this.stage);
    }
  }]);

  return TitleScreen;
})();

var GameScreen = (function () {
  function GameScreen(inputState, stateManager) {
    _classCallCheck(this, GameScreen);

    this.inputState = inputState;
    this.stateManager = stateManager;
    // this.renderer = PIXI.autoDetectRenderer(1000, 800);
    // document.body.appendChild(this.renderer.view);
    this.stage = new PIXI.Container();

    this.gfx = new PIXI.Graphics();
    this.stage.addChild(this.gfx);
  }

  _createClass(GameScreen, [{
    key: 'update',
    value: function update() {}
  }, {
    key: 'input',
    value: function input() {
      if (this.inputState.buttons.LEFT) {
        this.inputState.buttons.LEFT = false; // should clear elsewhere?
        console.log("Clicked Left");
      }
      if (this.inputState.buttons.ESC) {
        console.log("Exiting game");
        this.stateManager.pop();
      }
    }
  }, {
    key: 'render',
    value: function render() {
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
  }]);

  return GameScreen;
})();

module.exports = {
  GameStateManager: GameStateManager,
  TitleScreen: TitleScreen,
  GameScreen: GameScreen
};

},{}]},{},[1])