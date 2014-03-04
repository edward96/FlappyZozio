(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.bg = null;
    this.gravity = 5;
    this.velocity = 0;
    this.tilesprite = null;

    this.tube = null;
    this.tubeHeight = 300;
    this.tubeTab = [];

    /* MAGIC VALUES ALMOST VERY GOOD FEELING */
    this.jumpDuration = 38;
    this.initialThrust = 13;
    this.spaceBetweenTubes = 55;
    this.secondsBetweenTubes = 2.5;

    this.frontLayer = null;
    this.tubeLayer = null;
    this.collision = null;

    this.firstFrameTouched = false;
    this.paused = false;

    this.btnPlay = null;
    this.btnScore = null;
    this.btnPause = null;
    this.btnSubmit = null;
    this.btnsLayer = null;

    this.timerEvents = [];
    this.scoreTxt = null;
    this.scoreCounter = 0;
    this.bestScore = 0;
    this.bestScoreTxt = 0;
    this.finalResult = null;
    this.ended = false;
    this.scoreAdded = false;

    this.soundHurtPlayed = false;
  }

  Game.prototype = {

    create: function () {
      this.stage.backgroundColor = '#53bece';
      this.gravity = 5;
      this.scoreTxt = this.add.bitmapText(this.game.width / 2, 10, '' + this.scoreCounter, {font: '20px minecraftia', align: 'center'});

      this.player = this.add.sprite(50,50,'flappy');
      this.tilesprite = this.add.tileSprite(0, this.game.height - 50, this.game.width, 50, 'tile');
      this.bg = this.add.sprite(0, this.game.height - 50 - 100, 'bg');

      this.btnPause = this.add.button(10, 10, 'pause', this.pauseGame, this);

      this.tubeLayer = this.add.group();
      this.btnsLayer = this.add.group();
      this.frontLayer = this.add.group();
      
      this.frontLayer.add(this.tilesprite);
      this.frontLayer.add(this.scoreTxt);
      this.frontLayer.add(this.player);

      this.btnsLayer.add(this.btnPause);

      this.timerEvents[0] = this.game.time.events.loop(Phaser.Timer.SECOND * this.secondsBetweenTubes / 2, this.createTube, this);
      this.timerEvents[1] = this.game.time.events.loop(Phaser.Timer.SECOND, this.removeTubes, this);

      this.input.onDown.add(this.onInputDown, this);
    },

    update: function () {
      if(this.firstFrameTouched){
        // this.overlay.style.display = 'none';
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
          if(this.player.body.x > this.tubeTab[i].body.x && this.player.body.x + this.player.body.width <= this.tubeTab[i].body.x + this.tubeTab[i].body.width ){
            if(this.tubeTab[i].passed !== undefined){
              if(!this.tubeTab[i].passed){
                this.addScore();
                this.tubeTab[i].passed = true;
              }
            }
          }
        }
        this.tilesprite.tilePosition.x -= this.game.width * this.time.elapsed / ( 1000 * this.secondsBetweenTubes );
      }

      this.frontLayer.bringToTop(this.player);
      this.frontLayer.bringToTop(this.tilesprite);
      this.frontLayer.bringToTop(this.scoreTxt);

      this.physics.overlap(this.player, this.tubeLayer, this.endGame, null, this);
      if(this.player.body.y <= 0){
        this.player.body.y = 1;
      }
      if(this.player.body.y + this.player.body.height >= this.game.height - 52){
        this.endGame();
      }else{
        this.player.body.y += this.gravity - this.velocity;
      }
    },

    onInputDown: function () {
      this.velocity = this.initialThrust;
      this.gravity = 5;
      this.game.sound.play('flap');
    },

    createTube: function(){
      var minPlacement = 100,
          maxPlacement = 300,
          placement = Math.floor( Math.random() * ( maxPlacement - minPlacement )  ) + minPlacement;

      var tube1 = this.add.sprite(this.game.width, placement + this.spaceBetweenTubes, 'bottom');
      tube1.passed = false;
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
      this.btnPlay.kill();
      this.btnScore.kill();

      this.btnsLayer.removeAll();

      for (var i = 0, il = this.tubeTab.length; i < il; i++) {
        this.tubeTab[i].kill();
        this.tubeLayer.remove(this.tubeTab[i]);
      }

      this.tubeTab = [];
      this.tubeLayer = this.game.add.group();

      this.collision = false;
      this.firstFrameTouched = false;
      this.soundHurtPlayed = false;
      this.scoreCounter = 0;
      this.scoreAdded = false;

      // this.btnPlay.kill();
      // this.btnScore.kill();
      this.ended = false;
      this.game.state.start('game');
    },

    addScore: function(){
      this.scoreCounter++;
      this.scoreTxt.setText('' + this.scoreCounter);
      this.game.sound.play('coin');
    },

    scoreGame: function(){
      Clay.ready( function() {
        var leaderboard = new Clay.Leaderboard( { id: 2853 } );
        leaderboard.show();
      } );
    },

    submitScore: function(){
      if(!this.scoreAdded){
        this.scoreAdded = true;
        var bestScore = this.bestScore;
        
        Clay.ready( function() {
          var leaderboard = new Clay.Leaderboard( { id: 2853 } );
          leaderboard.post( {score: bestScore } );
        });
      }
    },

    pauseGame: function(){
      this.game.paused = (this.paused) ? false : true ;
    },

    fadeButtons: function(){

      this.btnPlay = this.add.button(34, this.game.height - 132, 'play', this.playGame, this, 1, 0);
      this.btnPlay.alpha = 0;

      this.btnScore = this.add.button(160, this.game.height - 132, 'score', this.scoreGame, this, 1, 0);
      this.btnScore.alpha = 0;

      this.btnSubmit = this.add.button(this.game.width / 2 - 110, this.game.height / 2 + 48, 'submit', this.submitScore, this, 1, 0);
      this.btnSubmit.alpha = 0;

      this.finalResult = this.add.sprite(this.game.width / 2 - 110, this.game.height / 2 - 50, 'finalResult');
      this.finalResult.alpha = 0;

      this.btnsLayer.add(this.btnPlay);
      this.btnsLayer.add(this.btnScore);
      this.btnsLayer.add(this.btnSubmit);
      this.btnsLayer.add(this.finalResult);

      this.add.tween(this.btnPlay).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
      this.add.tween(this.btnScore).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
      this.add.tween(this.btnSubmit).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
      this.add.tween(this.finalResult).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);

      this.add.tween(this.scoreTxt).to( {  x : this.game.width / 2 - 55, y: this.game.height / 2}, 200, Phaser.Easing.Linear.None, true);
      this.bestScoreTxt = this.add.bitmapText(this.game.width / 2 + 35, this.game.height / 2, '' + this.bestScore, {font: '20px minecraftia', align: 'center'});

      this.frontLayer.add(this.bestScoreTxt);
    },

    endGame: function(){
      if(!this.ended){
        this.ended = true;
        if(!this.soundHurtPlayed){
          this.game.sound.play('collision_hurt');
          this.soundHurtPlayed = true;
        }
        if(this.scoreCounter > this.bestScore){
          this.bestScore = this.scoreCounter;
        }
        this.game.input.onDown.remove(this.onInputDown, this);


        this.game.time.events.remove(this.timerEvents[0]);
        this.game.time.events.remove(this.timerEvents[1]);

        if(!this.firstFrameTouched){
          this.firstFrameTouched = true;
          this.time.events.add(Phaser.Timer.SECOND, this.fadeButtons, this);
        }
        this.collision = true;
      }
    }
  };
  window[''] = window[''] || {};
  window[''].Game = Game;

}());
