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

      this.load.image('bottom', '/assets/bottom.png');
      this.load.image('top', '/assets/top.png');
      this.load.image('flappy', '/assets/flappy.png');
      this.load.image('tile', '/assets/tile.jpg');

      this.load.image('play', '/assets/play.png');
      this.load.image('score', '/assets/score.png');
      this.load.image('pause', '/assets/pause.jpg');
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
