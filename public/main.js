(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = (function () {
  function Game() {
    _classCallCheck(this, Game);

    this.inputState = {
      buttons: {
        LEFT: false,
        RIGHT: false
      }
    };
    this.gameStates = Object.freeze({
      TITLE_SCREEN: 0,
      PLAYING_GAME: 1
    });
    this.currentState = this.gameStates.TITLE_SCREEN;
  }

  _createClass(Game, [{
    key: "handleInput",
    value: function handleInput() {
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
  }, {
    key: "renderGame",
    value: function renderGame() {
      console.log("Rendering game screen!");
    }
  }, {
    key: "renderTitle",
    value: function renderTitle() {
      console.log("Rendering title screen!");
    }
  }, {
    key: "loop",
    value: function loop() {
      var _this = this;

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
      requestAnimationFrame(function () {
        return _this.loop();
      });
    }
  }, {
    key: "start",
    value: function start() {
      console.log("Game start");
      // whatever setup
      this.loop();
    }
  }]);

  return Game;
})();

var game = new Game();
game.start();

window.addEventListener('click', function (e) {
  var point = new PIXI.Point(e.clientX, e.clientY);
  console.log("point!", point);
  game.inputState.buttons.LEFT = true;
});

},{}]},{},[1])