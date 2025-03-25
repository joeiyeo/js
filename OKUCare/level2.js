class level2 extends Phaser.Scene {
  constructor() {
    super({ key: "level2" });
    // Main scene setup
  }

  preload() {
    // Game map data
    this.load.tilemapTiledJSON("level2", "assets/OKUCity2.tmj");

    // City graphics
    this.load.image("buildingImg", "assets/Building.png");
    this.load.image("groundTilesImg", "assets/ground_tiles.png");
    this.load.image("streetImg", "assets/Street.png");

    
  }

  create() {
    console.log("*** world scene");

    // Create game world from map file
    let map = this.make.tilemap({ key: "level2" });

    // Load different city parts
    const tilesets = [
      map.addTilesetImage("ground_tiles", "groundTilesImg"),
      map.addTilesetImage("Building", "buildingImg"),
      map.addTilesetImage("Street", "streetImg"),
    ];

    // Build map layers
    this.groundLayer = map.createLayer("groundLayer", tilesets);
    this.groundLayer2 = map.createLayer("groundLayer2", tilesets);
    this.buildingLayer = map.createLayer("buildingLayer", tilesets);
    this.itemLayer = map.createLayer("itemLayer", tilesets);
    // this.treeLayer = map.createLayer("treeLayer", tilesets);
    // this.plantsLayer = map.createLayer("plantsLayer", tilesets);

    // // Create player and collisions
    // this.player = this.physics.add.sprite(, 'mainChar');
    // this.physics.add.collider(this.player, this.buildingsLayer);

    // Character animations setup
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("mainChar", {
        start: 105,
        end: 112,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("mainChar", {
        start: 118,
        end: 125,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("mainChar", {
        start: 131,
        end: 138,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("mainChar", {
        start: 144,
        end: 151,
      }),
      frameRate: 5,
      repeat: -1,
    });

    //object layer
    let start = map.findObject("objectLayer", (obj) => obj.name === "start");
    let antQueen = map.findObject(
      "objectLayer",
      (obj) => obj.name === "antQueen"
    );
    let antQueen2 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "antQueen2"
    );
    let cockroach = map.findObject(
      "objectLayer",
      (obj) => obj.name === "cockroach"
    );
    let cockroach2 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "cockroach2"
    );
    let handSign = map.findObject(
      "objectLayer",
      (obj) => obj.name === "handSign"
    );
    let notePen = map.findObject(
      "objectLayer",
      (obj) => obj.name === "notePen"
    );
    let notePen2 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "notePen2"
    );
    // let otherNPC = map.findObject("objectLayer", obj => obj.name === "otherNPC");
    let muteNPC = map.findObject(
      "objectLayer",
      (obj) => obj.name === "muteNPC"
    );
    // let exit = map.findObject("objectLayer", obj => obj.name === "exit");

    // // enemy & collect anim & NPC
    // this.anims.create({
    //   key: "antQueenAnim",
    //   frames: this.anims.generateFrameNumbers("antQueen", { start: 3, end: 8 }),
    //   frameRate: 3,
    //   repeat: -1,
    // });
    // this.anims.create({
    //   key: "cockroachAnim",
    //   frames: this.anims.generateFrameNumbers("cockroach", {
    //     start: 3,
    //     end: 7,
    //   }),
    //   frameRate: 3,
    //   repeat: -1,
    // });
    // this.anims.create({
    //   key: "handSignAnim",
    //   frames: this.anims.generateFrameNumbers("handSign", { start: 0, end: 4 }),
    //   frameRate: 3,
    //   repeat: -1,
    // });
    // this.anims.create({
    //   key: "notePenAnim",
    //   frames: this.anims.generateFrameNumbers("notePen", { start: 0, end: 4 }),
    //   frameRate: 3,
    //   repeat: -1,
    // });

    // this.anims.create({
    //   key: "muteNPCAnim",
    //   frames: this.anims.generateFrameNumbers("muteNPC", {
    //     start: 25,
    //     end: 31,
    //   }),
    //   frameRate: 3,
    //   repeat: -1,
    // });

    // Add main player here with physics.add.sprite
    this.player = this.physics.add.sprite(start.x, start.y, "mainChar");

    // this.player.setCollideWorldBounds(true)

    // // Add enemy to Scene
    this.antQueen = this.physics.add
      .sprite(antQueen.x, antQueen.y, "antQueen")
      .setScale(1.5);
    this.antQueen.play("antQueenAnim"); // Play the animation
    this.tweens.add({
      targets: this.antQueen,
      x: 280,
      flipX: true,
      yoyo: true,
      duration: 1800,
      repeat: -1
    })

    this.antQueen2 = this.physics.add
      .sprite(antQueen2.x, antQueen2.y, "antQueen")
      .setScale(1.5);
    this.antQueen2.play("antQueenAnim"); // Play the animation
    this.tweens.add({
      targets: this.antQueen2,
      x: 280,
      flipX: true,
      yoyo: true,
      duration: 1800,
      repeat: -1
    })

    this.cockroach = this.physics.add
      .sprite(cockroach.x, cockroach.y, "cockroach")
      .setScale(1);
    this.cockroach.play("cockroachAnim"); // Play the animation
    this.tweens.add({
      targets: this.cockroach,
      x: 280,
      flipX: true,
      yoyo: true,
      duration: 1800,
      repeat: -1
    })

    this.cockroach2 = this.physics.add
      .sprite(cockroach2.x, cockroach2.y, "cockroach")
      .setScale(1);
    this.cockroach2.play("cockroachAnim"); // Play the animation
    this.tweens.add({
      targets: this.cockroach2,
      y: 280,
      flipY: true,
      yoyo: true,
      duration: 1800,
      repeat: -1
    })

    //add colletables to scene

    this.notePen = this.physics.add
      .sprite(notePen.x, notePen.y, "notePen")
      .setScale(0.3);
    this.notePen.play("notePenAnim"); // Play the animation
    this.notePen2 = this.physics.add
      .sprite(notePen2.x, notePen2.y, "notePen")
      .setScale(0.3);
    this.notePen2.play("notePenAnim"); // Play the animation

    this.handSign = this.physics.add
      .sprite(handSign.x, handSign.y, "handSign")
      .setScale(0.3);
    this.handSign.play("handSignAnim"); // Play the animation

    this.muteNPC = this.physics.add
      .sprite(muteNPC.x, muteNPC.y, "muteNPC")
      .setScale(1);
    this.muteNPC.play("muteNPCAnim"); // Play the animation

    // Keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera follows player
    this.cameras.main.startFollow(this.player);

    // Enable Layer Collisions
    this.buildingLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.buildingLayer);

    this.physics.add.overlap(
      this.player,
      [this.antQueen, this.antQueen2, this.cockroach, this.cockroach2],
      globalHitFire,
      null,
      this
    );
    // collect item
    this.physics.add.overlap(
      this.player,
      this.notePen,
      this.collectItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.handSign,
      this.collectItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.notePen2,
      this.collectItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.muteNPC,
      this.helpNPC,
      null,
      this
    );

    // *** ADDED: Update inventory items
 this.time.addEvent({
  delay: 100,
  callback: updateInventory,
  callbackScope: this,
  loop: false,
});

// *** ADDED: Launch inventory scene
this.scene.launch("showInventory");

// *** ADDED: Overlap for enemies using globalHitFire
this.physics.add.overlap(
  this.player,
  [this.antQueen, this.antQueen2, this.cockroach, this.cockroach2],
  globalHitFire,
  null,
  this
);
  }
  collectItem(player, item) {
    // Remove the item
    item.disableBody(true, true);

    window.item++;

    // You can add score or other effects here
    console.log("Item collected!");
  }
  helpNPC(player, NPC) {
    if (window.item >= 3) {
      window.heart = 3
      this.scene.start("lvl3Scr");
    }
    

  }

  update() {
    // Movement settings
    const moveSpeed = 200;

    // Left/right movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-moveSpeed);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(moveSpeed);
      this.player.anims.play("right", true);
    } else {
      this.player.body.setVelocityX(0);
    }

    // Up/down movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-moveSpeed);
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(moveSpeed);
      this.player.anims.play("down", true);
    } else {
      this.player.body.setVelocityY(0);
    }

    // Stop animations when not moving
    if (
      this.player.body.velocity.x === 0 &&
      this.player.body.velocity.y === 0
    ) {
      this.player.anims.stop();
    }
  }
}
/////////////////// end of update //////////////////////////////

//////////// end of class world ////////////////////////
