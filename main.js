var game = new Phaser.Game(480, 320, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var player;
var tube;
var gravity = 5;
var velocity = 0;
var mouseReleased = true;

var jumpDuration = 50;
var initialThrust = 15;

function preload(){

}

function create(){
  game.stage.backgroundColor = '#ff00ff';

  player = game.add.sprite(0,0,'player');
  tube = game.add.sprite(100,0,'tube');
}

function update(){

  if(velocity > 0){
    // duration of the parabole higher = longer
    velocity -= game.time.elapsed / jumpDuration;
  }else{
    velocity = 0;
  }

  player.body.y += gravity - velocity;
  // console.log(player.body.y);
  // player.body.gravity.y += gravity;
}

document.onclick = function(){
  velocity = initialThrust;
};