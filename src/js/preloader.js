(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');

      this.load.image('bottom', 'assets/bottom.png');
      this.load.image('top', 'assets/top.png');
      this.load.image('flappy', 'assets/flappy.png');
      this.load.image('tile', 'assets/tile.jpg');
      this.load.image('finalResult', 'assets/final.jpg');
      this.load.image('bg', 'assets/bg.jpg');

      this.load.spritesheet('play', 'assets/play.png', 106, 52);
      this.load.spritesheet('score', 'assets/score.png', 106, 52);
      this.load.image('pause', 'assets/pause.jpg');
      this.load.spritesheet('submit', 'assets/submit.jpg', 200, 42);

      this.load.audio('coin', 'assets/coin.wav');
      this.load.audio('collision_hurt', 'assets/collision_hurt.wav');
      this.load.audio('flap', 'assets/flap.wav');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window[''] = window[''] || {};
  window[''].Preloader = Preloader;

}());
