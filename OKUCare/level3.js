class level3 extends Phaser.Scene {
  constructor() {
    super({ key: "level3" });
    // Main scene setup
  }

  preload() {
    // Game map data
    this.load.tilemapTiledJSON("level3", "assets/OKUCity3.tmj");

    // City graphics
    this.load.image("buildingImg", "assets/Building.png");
    this.load.image("lampAltImg", "assets/Lamp_alternative.png");
    this.load.image("laserfenceImg", "assets/Laserfence.png");
    this.load.image("pipesWallsImg", "assets/Pipes-RustyWalls.png");
    this.load.image("streetImg", "assets/Street.png");
  }

  create() {
    console.log("*** world scene");

    // Create game world from map file
    let map = this.make.tilemap({ key: "level3" });

    // Load different city parts
    const tilesets = [
      map.addTilesetImage("Lamp_alternative", "lampAltImg"),
      map.addTilesetImage("Building", "buildingImg"),
      map.addTilesetImage("Street", "streetImg"),
      map.addTilesetImage("Laserfence", "laserfenceImg"),
      map.addTilesetImage("Pipes-RustyWalls", "pipesWallsImg"),
    ];

    // Build map layers
    this.groundLayer = map.createLayer("groundLayer", tilesets);
    this.groundLayer2 = map.createLayer("groundLayer2", tilesets);
    this.buildingLayer = map.createLayer("buildingLayer", tilesets);
    this.itemLayer = map.createLayer("itemLayer", tilesets);
    // this.treeLayer = map.createLayer("treeLayer", tilesets);
    // this.plantsLayer = map.createLayer("plantsLayer", tilesets);
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

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
    let redCar = map.findObject("objectLayer", (obj) => obj.name === "redCar");
    let redCar2 = map.findObject(
      "objectLayer",
      (obj) => obj.name === "redCar2"
    );
    let tactilePave = map.findObject(
      "objectLayer",
      (obj) => obj.name === "tactilePave"
    );
    let cane = map.findObject("objectLayer", (obj) => obj.name === "cane");
    let guideDog = map.findObject(
      "objectLayer",
      (obj) => obj.name === "guideDog"
    );
    // let otherNPC = map.findObject("objectLayer", obj => obj.name === "otherNPC");
    let blindNPC = map.findObject(
      "objectLayer",
      (obj) => obj.name === "blindNPC"
    );
    // let exit = map.findObject("objectLayer", obj => obj.name === "exit");

    //     // enemy & collect anim & NPC
    //     this.anims.create({
    //       key:'redCarLeftAnim',
    //       frames:this.anims.generateFrameNumbers('redCar',
    //       { start:0, end:1 }),
    //       frameRate:3,
    //       repeat:-1
    //     });
    //     this.anims.create({
    //       key:'redCarRightAnim',
    //       frames:this.anims.generateFrameNumbers('redCar',
    //       { start:2, end:3 }),
    //       frameRate:3,
    //       repeat:-1
    //     });
    // this.anims.create({
    //   key:'antQueenAnim',
    //   frames:this.anims.generateFrameNumbers('antQueen',
    //   { start:3, end:8 }),
    //   frameRate:3,
    //   repeat:-1
    // });
    // this.anims.create({
    //   key:'cockroachAnim',
    //   frames:this.anims.generateFrameNumbers('cockroach',
    //   { start:3, end:7 }),
    //   frameRate:3,
    //   repeat:-1
    // });
    // this.anims.create({
    //   key:'tactilePaveAnim',
    //   frames:this.anims.generateFrameNumbers('tactilePave',
    //   { start:0, end:1 }),
    //   frameRate:3,
    //   repeat:-1
    // });
    // this.anims.create({
    //   key:'guideDogAnim',
    //   frames:this.anims.generateFrameNumbers('guideDog',
    //   { start:0, end:3 }),
    //   frameRate:3,
    //   repeat:-1
    // });
    // this.anims.create({
    //   key:'caneAnim',
    //   frames:this.anims.generateFrameNumbers('cane',
    //   { start:0, end:4 }),
    //   frameRate:3,
    //   repeat:-1
    // });

    // this.anims.create({
    //   key:'blindNPCAnim',
    //   frames:this.anims.generateFrameNumbers('blindNPC',
    //   { start:25, end:31 }),
    //   frameRate:3,
    //   repeat:-1
    // });

    // Add main player here with physics.add.sprite
    this.player = this.physics.add.sprite(start.x, start.y, "mainChar");

    this.player.setCollideWorldBounds(true);
    // // Add enemy to Scene
    this.antQueen = this.physics.add
      .sprite(antQueen.x, antQueen.y, "antQueen")
      .setScale(1.2);
    this.antQueen.play("antQueenAnim"); // Play the animation
    this.tweens.add({
      targets: this.antQueen,
      x: 1000,
      flipX: true,
      yoyo: true,
      duration: 1800,
      repeat: -1,
    });

    this.antQueen2 = this.physics.add
      .sprite(antQueen2.x, antQueen2.y, "antQueen")
      .setScale(1.2);
    this.antQueen2.play("antQueenAnim"); // Play the animation
    this.tweens.add({
      targets: this.antQueen2,
      x: 1800,
      flipX: true,
      yoyo: true,
      duration: 1800,
      repeat: -1,
    });

    this.redCar = this.physics.add
      .sprite(redCar.x, redCar.y, "redCar")
      .setScale(2.5);
    this.redCar.play("redCarAnim"); // Play the animation
    this.tweens.add({
      targets: this.redCar,
      x: 280,
      flipX: true,
      yoyo: true,
      duration: 1800,
      repeat: -1,
    });
    this.redCar2 = this.physics.add
      .sprite(redCar2.x, redCar2.y, "redCar")
      .setScale(2.5);
    this.redCar2.play("redCarAnim"); // Play the animation
    this.tweens.add({
      targets: this.redCar2,
      x: 1200,
      flipX: true,
      yoyo: true,
      duration: 2000,
      repeat: -1,
    });

    this.cockroach = this.physics.add
      .sprite(cockroach.x, cockroach.y, "cockroach")
      .setScale(1);
    this.cockroach.play("cockroachAnim"); // Play the animation
    this.tweens.add({
      targets: this.cockroach,
      y: 100,
      flipY: false,
      yoyo: true,
      duration: 4000,
      repeat: -1,

      onYoyo: () => {
        console.log("onYoyo, play cockroachAnim");
        this.cockroach.play("cockroachAnim");
      },
      onRepeat: () => {
        console.log("onRepeat, play cockroachAnim");
        this.cockroach.play("cockroachAnim");
      },
    });

    this.cockroach2 = this.physics.add
      .sprite(cockroach2.x, cockroach2.y, "cockroach")
      .setScale(1);
    this.cockroach2.play("cockroachAnim"); // Play the animation
    this.tweens.add({
      targets: this.cockroach2,
      y: 70,
      flipY: false,
      yoyo: true,
      duration: 4000,
      repeat: -1,

      onYoyo: () => {
        console.log("onYoyo, play cockroachAnim");
        this.cockroach2.play("cockroachAnim");
      },
      onRepeat: () => {
        console.log("onRepeat, cockroachAnim");
        this.cockroach2.play("cockroachAnim");
      },
    });

    //add colletables to scene

    this.tactilePave = this.physics.add
      .sprite(tactilePave.x, tactilePave.y, "tactilePave")
      .setScale(0.3);
    this.tactilePave.play("tactilePaveAnim"); // Play the animation

    this.guideDog = this.physics.add
      .sprite(guideDog.x, guideDog.y, "guideDog")
      .setScale(0.2);
    this.guideDog.play("guideDogAnim"); // Play the animation

    this.cane = this.physics.add.sprite(cane.x, cane.y, "cane").setScale(0.2);
    this.cane.play("caneAnim"); // Play the animation

    this.blindNPC = this.physics.add
      .sprite(blindNPC.x, blindNPC.y, "blindNPC")
      .setScale(1);
    this.blindNPC.play("blindNPCAnim"); // Play the animation

    // Keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera follows player
    this.cameras.main.startFollow(this.player);

    // Enable Layer Collisions
    this.buildingLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.buildingLayer);

    // Add collectibles overlap
    this.physics.add.overlap(
      this.player,
      this.guideDog,
      this.collectItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.cane,
      this.collectItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.tactilePave,
      this.collectItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.blindNPC,
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
    this.physics.add.overlap(
      this.player,
      [
        this.redCar,
        this.redCar2,
        this.antQueen,
        this.antQueen2,
        this.cockroach,
        this.cockroach2,
      ],
      globalHitFire,
      null,
      this
    );
  }

  collectItem(player, item) {
    // Remove the item
    item.disableBody(true, true);

    // You can add score or other effects here
    console.log("Item collected!");
  }
    helpNPC(player, NPC) {
      if (window.item >= 3) {
        window.heart = 3
        this.scene.start("winningScr");
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
