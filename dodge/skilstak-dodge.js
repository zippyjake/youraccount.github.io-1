
'use strict'

var DogeDodge = {};

DogeDodge.Play = function () {};

DogeDodge.Play.prototype = {

  init: function () {
    console.log("%c~~~ Booting DogeDodge ~~~\n Compliments of SkilStak",
                "color:#fdf6e3; background:#073642");
  },

  preload: function () {
    this.load.image('background','background.png');
    this.load.spritesheet('dodger','dodger.png',46,64,2); // (w,h,f)
    this.load.spritesheet('dodge','doge.png',64,64,1); // (w,h,f)
  },

  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // background
    this.background = this.add.tileSprite(0,0,320,568,'background');
    this.background.autoScroll(0,700);
    this.background.scale.set(1);

    // dodger
    this.dodger = this.add.sprite(160,510,'dodger');
    //this.dodger.smoothed = false; 
    //this.dodger.scale.set(1);
    this.dodger.anchor.set(0.5,0.5);
    this.dodger.animations.add('blink');
    this.dodger.animations.play('blink',2,true); // (name,fps,loop)
    game.physics.arcade.enable(this.dodger);
    this.dodger.body.collideWorldBounds = true;
    this.dodger.body.bounce.setTo(0.3);
    this.dodger.body.drag.setTo(3000);

    // dodge
    this.dodge = this.add.sprite(160,-32,'dodge');
    //this.dodge.smoothed = false; 
    //this.dodge.scale.set(1);
    this.dodge.anchor.set(0.5,0.5);
    //this.dodge.animations.add('blink');
    //this.dodge.animations.play('blink',2,true); // (name,fps,loop)
    game.physics.arcade.enable(this.dodge);
    this.dodge.body.gravity.y = 8000;
    //this.dodge.body.velocity.y = 1300;


    // movement keys
    this.cursors = game.input.keyboard.createCursorKeys();
  },

  update: function() {
    if (this.cursors.left.isDown) {
      this.dodger.body.velocity.x = -800;
    }
    if (this.cursors.right.isDown) {
      this.dodger.body.velocity.x = 800;
    }
    if (this.dodge.y >= 568) {
      this.dodge.y = -32;
      this.dodge.body.velocity.y = 0;
      this.dodge.x = game.rnd.integerInRange(0,320);
    }
    game.physics.arcade.collide(this.dodge,this.dodger,this.handleCollision);
  },

  handleCollision: function() {
    console.log("OUUCHH");
    game.state.start('Play')
  }

};

//---------------------------------------------------------------------------------

var game = new Phaser.Game(320,568);
game.state.add('Play', DogeDodge.Play);
game.state.start('Play');
