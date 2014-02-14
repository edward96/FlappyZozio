var game = new Phaser.Game(480, 320, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var player;
var tube;
var gravity = 5;
var velocity = 0;
var mouseReleased = true;

var tubeTab = [];

var jumpDuration = 50;
var initialThrust = 15;
var secondsBetweenTubes = 2;

function preload(){

}

function create(){
  game.stage.backgroundColor = '#ff00ff';

  player = game.add.sprite(0,0,'player');

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
  };
  // console.log(player.body.y);
  // player.body.gravity.y += gravity;
}

document.onclick = function(){
  velocity = initialThrust;
};

function createTube(){
  tubeTab.push(game.add.sprite(game.width - 32, 0, 'tube'));
  tubeTab.push(game.add.sprite(game.width -32, game.height - 32, 'tube'));
}