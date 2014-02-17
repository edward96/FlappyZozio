<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title></title>
  <style>
    #wrapper {
      position: relative;
    }

    #game {
      float: left;
    }

    #scores {
      float: left;
      border: 2px solid #453939;
      margin-left: 10px;
      height: 480px;
      width: 320px;
    }

    #top {
      display: none;
      position: absolute;
      top: 10px;
      left: 20px;
      width: 250px;
      background: #e9e18e;
      border: 2px solid #453939;
      padding: 4px;
    }

    .top-inside {
      padding: 10px;
    }

    label {
      display: block;
      width: 100%;
      text-align: center;
    }

    input {
      display: block;
      border: 2px solid #deb357;
      border-top: none;
      background: none;
      width: 100%;
    }

    a {
      text-decoration: none;
      background: #deb357;
      display: block;
      text-align: center;
      width: 50%;
      color: #444;
      padding: 5px;
      border: 2px solid #453939;
      margin: 15px auto;
    }
  </style>
  <script type="text/javascript">
    var Clay = Clay || {};
    Clay.gameKey = "flappyZozio";
    Clay.options = { debug: true };
    Clay.readyFunctions = [];
    Clay.ready = function( fn ) {
        Clay.readyFunctions.push( fn );
    };
    ( function() {
        var clay = document.createElement("script"); clay.async = true;
        clay.src = ( "https:" == document.location.protocol ? "https://" : "http://" ) + "clay.io/api/api.js"; 
        var tag = document.getElementsByTagName("script")[0]; tag.parentNode.insertBefore(clay, tag);
    } )();
  </script>
</head>

<body>
  
  <div id="wrapper">
    <div id="top">
      <div id="top-inside">
        <label for="name">Your name :</label>
        <input type="text" name="name" id="name" />
      </div>
      <a href="#" id="submitEntry">Submit</a>
    </div>
    <div id="game"></div>
  </div>

  <script src="js/lib/phaser.js"></script>
  <script src="js/boot.js"></script>
  <script src="js/preloader.js"></script>
  <script src="js/menu.js"></script>
  <script src="js/game.js"></script>
  <script src="js/main.js"></script>
  
</body>
</html>