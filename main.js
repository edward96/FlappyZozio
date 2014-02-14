var game = new Phaser.Game(320, 480, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var player;
var gravity = 5;
var velocity = 0;
var mouseReleased = true;
var tilesprite;

var tube;
var tubeHeight = 250;
var tubeTab = [];

/* MAGIC VALUES ALMOST VERY GOOD FEELING */
var jumpDuration = 38;
var initialThrust = 13;
var spaceBetweenTubes = 50;
var secondsBetweenTubes = 2.5;

var layer;

function preload(){
  game.load.image('bottom', 'bottom.png');
  game.load.image('top', 'top.png');
  game.load.image('flappy', 'flappy.png');
  game.load.image('tile', 'tile.jpg');
}

function create(){
  game.stage.backgroundColor = '#53bece';

  player = game.add.sprite(50,0,'flappy');
  tilesprite = game.add.tileSprite(0, game.height - 50, game.width, 50, 'tile');

  layer = game.add.group();

  layer.add(player);
  layer.add(tilesprite);

  game.time.events.loop(Phaser.Timer.SECOND * secondsBetweenTubes / 2, createTube, this);
  game.time.events.loop(Phaser.Timer.SECOND * secondsBetweenTubes / 2, removeTubes, this);
}

function update(){
  tilesprite.tilePosition.x -= game.width * game.time.elapsed / ( 1000 * secondsBetweenTubes ) ;
  gravity += 0.05;

  if(velocity > 0){
    // duration of the parabole higher = longer
    velocity -= game.time.elapsed / jumpDuration;
  }else{
    velocity = 0;
  }

  player.body.y += gravity - velocity;

  for (var i = 0, il = tubeTab.length; i < il; i++) {
    tubeTab[i].body.x -= game.width * game.time.elapsed / ( 1000 * secondsBetweenTubes );
  }

  layer.bringToTop(tilesprite);
  // console.log(player.body.y);
  // player.body.gravity.y += gravity;
}

document.onclick = function(){
  velocity = initialThrust;
  gravity = 5;
  // player.rotation = -0.5;
  // player.anchor.setTo(1, 0);
  // console.log(player.body.rotation);
};

function createTube(){

  //              round to <     random                  until           from
  var placement = Math.floor( Math.random() * ( tubeHeight + spaceBetweenTubes - 150) ) + 150;

  /*
    min placement = 88  = (spaceBetweenTubes + 100 - 8) ( idk why )
    max placement = 232 = (200 + spaceBetweenTubes) = (height of tube + ( space between placement and tube / 2 ) )
  */

  var tube1 = game.add.sprite(game.width, placement + spaceBetweenTubes, 'bottom');
  var tube2 = game.add.sprite(game.width, placement - spaceBetweenTubes - tubeHeight, 'top');

  layer.add(tube1);
  layer.add(tube2);

  tubeTab.push(tube1);
  tubeTab.push(tube2);
}

function removeTubes(){
  
}