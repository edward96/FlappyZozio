(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.gravity = 5;
    this.velocity = 0;
    this.tilesprite = null;

    this.tube = null;
    this.tubeHeight = 300;
    this.tubeTab = [];

    /* MAGIC VALUES ALMOST VERY GOOD FEELING */
    this.jumpDuration = 38;
    this.initialThrust = 13;
    this.spaceBetweenTubes = 50;
    this.secondsBetweenTubes = 2.5;

    this.frontLayer = null;
    this.tubeLayer = null;
    this.collision = null;

    this.overlay = document.getElementById('overlay');
    this.firstFrameTouched = false;
    this.paused = false;

    this.btnPlay = null;
    this.btnScore = null;
    this.btnPause = null;
    this.btnsLayer = null;

    this.timerEvents = [];
  }

  Game.prototype = {

    create: function () {
      this.stage.backgroundColor = '#53bece';

      this.player = this.add.sprite(50,50,'flappy');
      this.tilesprite = this.add.tileSprite(0, this.game.height - 50, this.game.width, 50, 'tile');

      this.btnPlay = this.add.button(34, this.game.height - 132, 'play', this.playGame, this);
      // this.btnPlay.alpha = 0;
      this.btnScore = this.add.button(160, this.game.height - 132, 'score', this.scoreGame, this);
      // this.btnScore.alpha = 0;
      this.btnPause = this.add.button(10, 10, 'pause', this.pauseGame, this);

      this.tubeLayer = this.add.group();
      this.btnsLayer = this.add.group();
      this.frontLayer = this.add.group();
      
      this.frontLayer.add(this.tilesprite);
      this.frontLayer.add(this.player);

      this.btnsLayer.add(this.btnPlay);
      this.btnsLayer.add(this.btnScore);
      this.btnsLayer.add(this.btnPause);

      this.timerEvents[0] = this.game.time.events.loop(Phaser.Timer.SECOND * this.secondsBetweenTubes / 2, this.createTube, this);
      this.timerEvents[1] = this.game.time.events.loop(Phaser.Timer.SECOND, this.removeTubes, this);

      this.input.onDown.add(this.onInputDown, this);
    },

    update: function () {
      if(this.firstFrameTouched){
        this.overlay.style.display = 'none';
      }

      this.gravity += 0.05;

      if(this.velocity > 0){
        this.velocity -= this.time.elapsed / this.jumpDuration;
      }else{
        this.velocity = 0;
      }


      if(!this.collision){
        for (var i = 0, il = this.tubeTab.length; i < il; i++) {
          this.tubeTab[i].body.x -= this.game.width * this.time.elapsed / ( 1000 * this.secondsBetweenTubes );
        }
        this.tilesprite.tilePosition.x -= this.game.width * this.time.elapsed / ( 1000 * this.secondsBetweenTubes );
      }

      this.frontLayer.bringToTop(this.tilesprite);
      this.frontLayer.bringToTop(this.player);

      this.physics.overlap(this.player, this.tubeLayer, this.endGame, null, this);

      if(this.player.body.y + this.player.body.height >= this.game.height - 52){
        this.endGame();
      }else{
        this.player.body.y += this.gravity - this.velocity;
      }
    },

    onInputDown: function () {
      this.velocity = this.initialThrust;
        this.gravity = 5;
      // this.player.rotation = -0.5;
      // this.player.anchor.setTo(1, 0);
      // console.log(this.player.body.rotation);
    },

    createTube: function(){
      var minPlacement = 100,
          maxPlacement = 300,
          placement = Math.floor( Math.random() * ( maxPlacement - minPlacement )  ) + minPlacement;

      var tube1 = this.add.sprite(this.game.width, placement + this.spaceBetweenTubes, 'bottom');
      var tube2 = this.add.sprite(this.game.width, placement - this.spaceBetweenTubes - this.tubeHeight, 'top');

      this.tubeLayer.add(tube1);
      this.tubeLayer.add(tube2);

      this.tubeTab.push(tube1);
      this.tubeTab.push(tube2);
    },

    removeTubes: function(){
      if(this.tubeTab.length){
        if(this.tubeTab[0].body.x < -54 ){
          this.tubeTab[0].kill();
          this.tubeLayer.remove(this.tubeTab[0]);
          this.tubeTab.splice(0, 1);
        }
        if(this.tubeTab[1].body.x < -54){
          this.tubeTab[1].kill();
          this.tubeLayer.remove(this.tubeTab[1]);
          this.tubeTab.splice(1, 1);
        }
      }
    },

    playGame: function(){
      for (var i = 0, il = this.tubeTab.length; i < il; i++) {
        this.tubeTab[i].kill();
        this.tubeLayer.remove(this.tubeTab[i]);
      }

      this.tubeTab = [];
      this.tubeLayer = this.game.add.group();


      this.collision = false;
      this.firstFrameTouched = false;

      // this.btnPlay.kill();
      // this.btnScore.kill();
      console.log(this.tubeTab, this.tubeLayer);
      this.game.state.start('game');
    },

    scoreGame: function(){
    },

    pauseGame: function(){
      this.paused = (this.paused) ? false : true ;
    },

    fadeButtons: function(){
      this.add.tween(this.btnPlay).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
      this.add.tween(this.btnScore).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
    },

    endGame: function(){
      this.game.time.events.remove(this.timerEvents[0]);
      this.game.time.events.remove(this.timerEvents[1]);

      if(!this.firstFrameTouched){
        this.overlay.style.display = 'block';
        this.firstFrameTouched = true;
        this.time.events.add(Phaser.Timer.SECOND / 2, this.fadeButtons, this);
      }
      this.collision = true;

    }

  };

  window[''] = window[''] || {};
  window[''].Game = Game;

}());
