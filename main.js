var game = new Phaser.Game(480, 320, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var player;
var gravity = 5;
var velocity = 0;
var mouseReleased = true;

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
}

function create(){
  game.stage.backgroundColor = '#ff00ff';

  player = game.add.sprite(0,0,'flappy');

  game.time.events.loop(Phaser.Timer.SECOND * secondsBetweenTubes, createTube, this);
}

function update(){

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