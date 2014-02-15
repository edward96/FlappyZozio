var game = new Phaser.Game(320, 480, Phaser.AUTO, 'wrapper', {preload: preload, create: create, update: update});

var player;
var gravity = 5;
var velocity = 0;
var mouseReleased = true;
var tilesprite;

var tube;
var tubeHeight = 300;
var tubeTab = [];

/* MAGIC VALUES ALMOST VERY GOOD FEELING */
var jumpDuration = 38;
var initialThrust = 13;
var spaceBetweenTubes = 50;
var secondsBetweenTubes = 2.5;

var frontLayer;
var tubeLayer;
var collision;

var overlay = document.getElementById('overlay');
var firstFrameTouched = false;
var paused = false;

var btnPlay;
var btnScore;
var btnPause;
var btnsLayer;

function preload(){
  game.load.image('bottom', 'bottom.png');
  game.load.image('top', 'top.png');
  game.load.image('flappy', 'flappy.png');
  game.load.image('tile', 'tile.jpg');

  game.load.image('play', 'play.png');
  game.load.image('score', 'score.png');
  game.load.image('pause', 'pause.jpg');
}

function create(){
  game.stage.backgroundColor = '#53bece';

  player = game.add.sprite(50,0,'flappy');
  tilesprite = game.add.tileSprite(0, game.height - 50, game.width, 50, 'tile');

  btnPlay = game.add.button(34, game.height - 132, 'play', playGame, this);
  btnPlay.alpha = 0;
  btnScore = game.add.button(160, game.height - 132, 'score', scoreGame, this);
  btnScore.alpha = 0;
  btnPause = game.add.button(10, 10, 'pause', pauseGame, this);

  tubeLayer = game.add.group();
  btnsLayer = game.add.group();
  frontLayer = game.add.group();
  
  frontLayer.add(tilesprite);
  frontLayer.add(player);

  btnsLayer.add(btnPlay);
  btnsLayer.add(btnScore);
  btnsLayer.add(btnPause);

  game.time.events.loop(Phaser.Timer.SECOND * secondsBetweenTubes / 2, createTube, this);
  game.time.events.loop(Phaser.Timer.SECOND, removeTubes, this);
}

function update(){


  if(firstFrameTouched){
    overlay.style.display = 'none';
  }

  gravity += 0.05;

  if(velocity > 0){
    velocity -= game.time.elapsed / jumpDuration;
  }else{
    velocity = 0;
  }


  if(!collision){
    for (var i = 0, il = tubeTab.length; i < il; i++) {
      tubeTab[i].body.x -= game.width * game.time.elapsed / ( 1000 * secondsBetweenTubes );
    }
    tilesprite.tilePosition.x -= game.width * game.time.elapsed / ( 1000 * secondsBetweenTubes );
  }

  frontLayer.bringToTop(tilesprite);
  frontLayer.bringToTop(player);

  game.physics.overlap(player, tubeLayer, endGame, null, this);

  if(player.body.y + player.body.height >= game.height - 52){
    endGame();
  }else{
    player.body.y += gravity - velocity;
  }
}


function createTube(){
  var minPlacement = 100,
      maxPlacement = 300,
      placement = Math.floor( Math.random() * ( maxPlacement - minPlacement )  ) + minPlacement;

  var tube1 = game.add.sprite(game.width, placement + spaceBetweenTubes, 'bottom');
  var tube2 = game.add.sprite(game.width, placement - spaceBetweenTubes - tubeHeight, 'top');

  tubeLayer.add(tube1);
  tubeLayer.add(tube2);

  tubeTab.push(tube1);
  tubeTab.push(tube2);
}

function removeTubes(){
  if(tubeTab.length){
    if(tubeTab[0].body.x < -54 ){
      tubeTab[0].kill();
      tubeLayer.remove(tubeTab[0]);
      tubeTab.splice(0, 1);
    }
    if(tubeTab[1].body.x < -54){
      tubeTab[1].kill();
      tubeLayer.remove(tubeTab[1]);
      tubeTab.splice(1, 1);
    }
  }
}

function pauseGame(){
  game.paused = (paused) ? false : true ;
}

function fadeButtons(){
  game.add.tween(btnPlay).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
  game.add.tween(btnScore).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
}

function endGame(){
  document.onclick = function(){};
  if(!firstFrameTouched){
    overlay.style.display = 'block';
    firstFrameTouched = true;
    game.time.events.add(Phaser.Timer.SECOND / 2, fadeButtons, this);
  }
  collision = true;
}

function playGame(){
  btnPlay.alpha = 0;
  btnScore.alpha = 0;
  tubeTab = [];
  tubeLayer.removeAll();
  collision = false;
  firstFrameTouched = false;

  document.onclick = onclicktap;
  console.log(player.body.y);
  player.body.y = 0;
}

function scoreGame(){
}

function onclicktap(){
    velocity = initialThrust;
    gravity = 5;
    // player.rotation = -0.5;
    // player.anchor.setTo(1, 0);
    // console.log(player.body.rotation);
}

document.onclick = onclicktap;