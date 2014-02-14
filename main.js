var game = new Phaser.Game(480, 320, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var player;
var velocity = 5;

function preload(){

}

function create(){
  game.stage.backgroundColor = '#ff00ff';
  player = game.add.sprite(0,0,'player');
}

function update(){
  player.body.velocity.y += velocity;

  
  // player
}