(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 4
        , y = this.game.height / 4;


      this.titleTxt = this.add.bitmapText(x - 20, y - 15, 'Flappy Zozio', {font: '25px minecraftia', align: 'left'});
      this.titleTxt = this.add.bitmapText(20, y + 60, 'Click / Tap to make the bird fly', {font: '14px minecraftia', align: 'center'});
      this.titleTxt = this.add.bitmapText(x, y + 90, 'Dodge the pipes', {font: '14px minecraftia', align: 'center'});

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
