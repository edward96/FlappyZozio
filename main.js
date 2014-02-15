function Game(){
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
}

Game.prototype = {

  preload: function(){
    game.load.image('bottom', 'bottom.png');
    game.load.image('top', 'top.png');
    game.load.image('flappy', 'flappy.png');
    game.load.image('tile', 'tile.jpg');

    game.load.image('play', 'play.png');
    game.load.image('score', 'score.png');
    game.load.image('pause', 'pause.jpg');
  },

  create: function(){
    game.stage.backgroundColor = '#53bece';

    this.player = game.add.sprite(50,0,'flappy');
    this.tilesprite = game.add.tileSprite(0, game.height - 50, game.width, 50, 'tile');

    this.btnPlay = game.add.button(34, game.height - 132, 'play', this.btnPlay, gameState);
    this.btnPlay.alpha = 0;
    this.btnScore = game.add.button(160, game.height - 132, 'score', this.btnScore, gameState);
    this.btnScore.alpha = 0;
    this.btnPause = game.add.button(10, 10, 'pause', this.btnPause, this);

    this.tubeLayer = game.add.group();
    this.btnsLayer = game.add.group();
    this.frontLayer = game.add.group();
    
    this.frontLayer.add(this.tilesprite);
    this.frontLayer.add(this.player);

    this.btnsLayer.add(this.playGame);
    // this.btnsLayer.add(this.scoreGame);
    // this.btnsLayer.add(this.pauseGame);

    game.time.events.loop(Phaser.Timer.SECOND * this.secondsBetweenTubes / 2, this.createTube, this);
    game.time.events.loop(Phaser.Timer.SECOND, this.removeTubes, this);
  },

  update: function(){
    if(this.firstFrameTouched){
      this.overlay.style.display = 'none';
    }

    this.gravity += 0.05;

    if(this.velocity > 0){
      this.velocity -= game.time.elapsed / this.jumpDuration;
    }else{
      this.velocity = 0;
    }


    if(!this.collision){
      for (var i = 0, il = this.tubeTab.length; i < il; i++) {
        this.tubeTab[i].body.x -= game.width * game.time.elapsed / ( 1000 * this.secondsBetweenTubes );
      }
      this.tilesprite.tilePosition.x -= game.width * game.time.elapsed / ( 1000 * this.secondsBetweenTubes );
    }

    this.frontLayer.bringToTop(this.tilesprite);
    this.frontLayer.bringToTop(this.player);

    game.physics.overlap(this.player, this.tubeLayer, this.endGame, null, this);

    if(this.player.body.y + this.player.body.height >= game.height - 52){
      this.endGame();
    }else{
      this.player.body.y += this.gravity - this.velocity;
    }
  },

  createTube: function(){
    var minPlacement = 100,
        maxPlacement = 300,
        placement = Math.floor( Math.random() * ( maxPlacement - minPlacement )  ) + minPlacement;

    var tube1 = game.add.sprite(game.width, placement + this.spaceBetweenTubes, 'bottom');
    var tube2 = game.add.sprite(game.width, placement - this.spaceBetweenTubes - this.tubeHeight, 'top');

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

  onClickTap: function(){
    this.velocity = this.initialThrust;
    this.gravity = 5;
    console.log(this);
    // this.player.rotation = -0.5;
    // this.player.anchor.setTo(1, 0);
    // console.log(this.player.body.rotation);
  },


  pauseGame: function(){
    game.paused = (this.paused) ? false : true ;
  },

  fadeButtons: function(){
    game.add.tween(this.btnPlay).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
    game.add.tween(this.btnScore).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
  },

  endGame: function(){
    if(!this.firstFrameTouched){
      this.overlay.style.display = 'block';
      this.firstFrameTouched = true;
      game.time.events.add(Phaser.Timer.SECOND / 2, this.fadeButtons, this);
    }
    this.collision = true;

  }

};

var gameState = new Game();

var game = new Phaser.Game(320, 480, Phaser.AUTO, 'wrapper', {preload: gameState.preload, create: gameState.create, update: gameState.update});

game.state.add('Game', Game);

game.state.start('Game');

document.onclick = gameState.onClickTap.bind(gameState);