var game = new Phaser.Game(320, 480, Phaser.AUTO, 'wrapper', {preload: preload, create: create, update: update});

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

var frontLayer;
var tubeLayer;
var collision;

var overlay = document.getElementById('overlay');
var firstFrameTouched = false;

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

  tubeLayer = game.add.group();
  frontLayer = game.add.group();

  frontLayer.add(tilesprite);
  frontLayer.add(player);

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
    tilesprite.tilePosition.x -= game.width * game.time.elapsed / ( 1000 * secondsBetweenTubes ) ;
  }

  frontLayer.bringToTop(tilesprite);
  frontLayer.bringToTop(player);

  // player.body.gravity.y += gravity;
  game.physics.overlap(player, tubeLayer, collisionTube, null, this);
  // game.physics.overlap(player, tilesprite, collisionFloor, null, this);

  if(player.body.y + player.body.height >= game.height - 52){
    if(!firstFrameTouched){
      console.log('floor');
      overlay.style.display = 'block';
      firstFrameTouched = true;
    }
    collision = true;
  }else{
    player.body.y += gravity - velocity;
  }
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
  // var placement = Math.floor( Math.random() * ( tubeHeight + spaceBetweenTubes - 150) ) + 150;

  /*
    min placement = 82 
    max placement = 232
  */
  var placement = 130;
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

function collisionTube(obj1, obj2){
  if(!firstFrameTouched){
    console.log('tube');
    overlay.style.display = 'block';
    firstFrameTouched = true;
  }
  collision = true;
}

function collisionFloor(obj1, obj2) {
  // if(!firstFrameTouched){
  //   console.log('floor');
  //   overlay.style.display = 'block';
  //   firstFrameTouched = true;
  // }
  // collision = true;
}