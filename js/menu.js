(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
    this.tilesprite = null;
    this.bg = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 4,
          y = this.game.height / 4;

      this.stage.backgroundColor = '#53bece';

      this.tilesprite = this.add.tileSprite(0, this.game.height - 50, this.game.width, 50, 'tile');
      this.bg = this.add.sprite(0, this.game.height - 50 - 100, 'bg');

      this.titleTxt = this.add.bitmapText(x - 20, y - 15, 'minecraftia', 'Flappy Zozio', 25);
      this.titleTxt = this.add.bitmapText(20, y + 60, 'minecraftia', 'Click / Tap to make the bird fly', 14);
      this.titleTxt = this.add.bitmapText(x, y + 90, 'minecraftia', 'Dodge the pipes', 14);

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window[''] = window[''] || {};
  window[''].Menu = Menu;

}());
