var game = new Phaser.Game(320, 480, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var player;
var gravity = 5;
var velocity = 0;
var mouseReleased = true;
var tilesprite;

var tube;
var tubeHeight = 200;
var tubeTab = [];

var jumpDuration = 50;
var initialThrust = 15;
var spaceBetweenTubes = 32;
var secondsBetweenTubes = 2;

function preload(){
  game.load.image('bottom', 'bottom.png');
  game.load.image('top', 'top.png');
  game.load.image('flappy', 'flappy.png');
  game.load.image('tile', 'tile.jpg');
}

function create(){
  game.stage.backgroundColor = '#ff00ff';

  player = game.add.sprite(50,0,'flappy');
  tilesprite = game.add.tileSprite(0, game.height - 50, game.width, 50, 'tile');

  game.time.events.loop(Phaser.Timer.SECOND * secondsBetweenTubes, createTube, this);
}

function update(){
  tilesprite.tilePosition.x -= game.width * game.time.elapsed / 1000 / secondsBetweenTubes / secondsBetweenTubes;

  if(velocity > 0){
    // duration of the parabole higher = longer
    velocity -= game.time.elapsed / jumpDuration;
  }else{
    velocity = 0;
  }

  player.body.y += gravity - velocity;

  for (var i = 0, il = tubeTab.length; i < il; i++) {
    tubeTab[i].body.x -= game.width * game.time.elapsed / 1000 / secondsBetweenTubes / secondsBetweenTubes;
  }
  // console.log(player.body.y);
  // player.body.gravity.y += gravity;
}

document.onclick = function(){
  velocity = initialThrust;
  player.rotation = -0.5;
  player.anchor.setTo(1, 0);
  console.log(player.body.rotation);
};

function createTube(){

  //              round to <     random                  until           from
  var placement = Math.floor( Math.random() * ( tubeHeight + spaceBetweenTubes - 88) ) + 88;

  /*
    min placement = 88  = (32 + 64 - 8) ( idk why )
    max placement = 232 = (200 + 32) = (height of tube + ( space between placement and tube / 2 ) )
  */

  tubeTab.push(game.add.sprite(game.width, placement - spaceBetweenTubes - tubeHeight, 'top'));
  tubeTab.push(game.add.sprite(game.width, placement + spaceBetweenTubes, 'bottom'));
}