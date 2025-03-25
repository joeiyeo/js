class level1 extends Phaser.Scene {
  constructor() {
    super({ key: "level1" });
    // Main scene setup
  }

  preload() {
    // Game map data
    this.load.tilemapTiledJSON("level1", "assets/OKUCity.tmj");

    // City graphics
    this.load.image("cityPropsImg", "assets/3_City_Props_32x32.png");
    this.load.image(
      "genericBuildingImg",
      "assets/4_Generic_Buildings_32x32.png"
    );
    // this.load.image("streetImg", "assets/Street32x32.png");
    this.load.image("streetImg", "assets/Street.png");


  }

  create() {
    console.log("*** world scene");

    // Create game world from map file
    let map = this.make.tilemap({ key: "level1" });

   

    // Load different city parts
    const tilesets = [
      map.addTilesetImage("3_City_Props_32x32", "cityPropsImg"),
      map.addTilesetImage("4_Generic_Buildings_32x32", "genericBuildingImg"),
      map.addTilesetImage("Street", "streetImg"),
    ];

    // Build map layers
    this.groundLayer = map.createLayer("groundLayer", tilesets);
    this.buildingsLayer = map.createLayer("buildingsLayer", tilesets);
    this.itemLayer = map.createLayer("itemLayer", tilesets);
    this.treeLayer = map.createLayer("treeLayer", tilesets);
    this.plantsLayer = map.createLayer("plantsLayer", tilesets);

    // // Character animations setup
    // this.anims.create({
    //   key: "up",
    //   frames: this.anims.generateFrameNumbers("mainChar", {
    //     start: 105,
    //     end: 112,
    //   }),
    //   frameRate: 5,
    //   repeat: -1,
    // });
    // this.anims.create({
    //   key: "left",
    //   frames: this.anims.generateFrameNumbers("mainChar", {
    //     start: 118,
    //     end: 125,
    //   }),
    //   frameRate: 5,
    //   repeat: -1,
    // });
    // this.anims.create({
    //   key: "down",
    //   frames: this.anims.generateFrameNumbers("mainChar", {
    //     start: 131,
    //     end: 138,
    //   }),
    //   frameRate: 5,
    //   repeat: -1,
    // });
    // this.anims.create({
    //   key: "right",
    //   frames: this.anims.generateFrameNumbers("mainChar", {
    //     start: 144,
    //     end: 151,
    //   }),
    //   frameRate: 5,
    //   repeat: -1,
    // });

    //object layer
    let start = map.findObject("objectLayer", (obj) => obj.name === "start");
    let redCar = map.findObject("objectLayer", (obj) => obj.name === "redCar");
    let orangeCar = map.findObject(
      "objectLayer",
      (obj) => obj.name === "orangeCar"
    );
    let watch = map.findObject("objectLayer", (obj) => obj.name === "watch");
    let notePen = map.findObject(
      "objectLayer",
      (obj) => obj.name === "notePen"
    );
    let pedLights = map.findObject(
      "objectLayer",
      (obj) => obj.name === "pedLights"
    );
    let deafNPC = map.findObject(
      "objectLayer",
      (obj) => obj.name === "deafNPC"
    );
    let exit = map.findObject("objectLayer", (obj) => obj.name === "exit");

    // //enemy & collect anim & NPC
    // this.anims.create({
    //   key:'redCarLeftAnim',
    //   frames:this.anims.generateFrameNumbers('redCar',
    //   { start:0, end:1 }),
    //   frameRate:3,
    //   repeat:-1
    // });
    // this.anims.create({
    //   key:'redCarRightAnim',
    //   frames:this.anims.generateFrameNumbers('redCar',
    //   { start:2, end:3 }),
    //   frameRate:3,
    //   repeat:-1
    // });

    // this.anims.create({
    //   key:'orangeCarLeftAnim',
    //   frames:this.anims.generateFrameNumbers('orangeCar',
    //   { start:0, end:1 }),
    //   frameRate:3,
    //   repeat:-1
    // });
    // this.anims.create({
    //   key:'orangeCarRightAnim',
    //   frames:this.anims.generateFrameNumbers('orangeCar',
    //   { start:2, end:3 }),
    //   frameRate:3,
    //   repeat:-1
    // });
  
    // this.anims.create({
    //   key: "watchAnim",
    //   frames: this.anims.generateFrameNumbers("watch", { start: 0, end: 3 }),
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
    //   key: "pedLightsAnim",
    //   frames: this.anims.generateFrameNumbers("pedLights", {
    //     start: 0,
    //     end: 4,
    //   }),
    //   frameRate: 3,
    //   repeat: -1,
    // });
    // this.anims.create({
    //   key: "deafNPCAnim",
    //   frames: this.anims.generateFrameNumbers("deafNPC", {
    //     start: 25,
    //     end: 31,
    //   }),
    //   frameRate: 3,
    //   repeat: -1,
    // });

    // Add main player here with physics.add.sprite
    this.player = this.physics.add.sprite(start.x, start.y, "mainChar");

    this.player.setCollideWorldBounds(true);

    // Add enemy to Scene
    this.redCar = this.physics.add
      .sprite(redCar.x, redCar.y, "redCar")
      .setScale(1.5);
    this.redCar.play("redCarAnim"); // Play the animation
    this.tweens.add({
      targets: this.redCar,
      x: 900, // Moves to the right
      duration: 2500,
      yoyo: true,
      repeat: -1,
      onYoyo: () => {
        this.redCar.play("redCarLeftAnim");
      },
      onRepeat: () => {
        this.redCar.play("redCarRightAnim");
      }
    });

    this.orangeCar = this.physics.add
      .sprite(orangeCar.x, orangeCar.y, "orangeCar")
      .setScale(1.5);
    this.orangeCar.play("orangeCarAnim"); // Play the animation
    this.tweens.add({
      targets: this.orangeCar,
      y: 1000,
      flipY: true,
      yoyo: true,
      duration: 2500,
      repeat: -1,

      onYoyo: () => {
        this.orangeCar.play("orangeCarLeftAnim");
      },
      onRepeat: () => {
        this.orangeCar.play("orangeCarRightAnim");
      }
    });

    //add colletables to scene
    this.watch = this.physics.add
      .sprite(watch.x, watch.y, "watch")
      .setScale(0.3);
    this.watch.play("watchAnim"); // Play the animation

    this.notePen = this.physics.add
      .sprite(notePen.x, notePen.y, "notePen")
      .setScale(0.3);
    this.notePen.play("notePenAnim"); // Play the animation

    this.pedLights = this.physics.add
      .sprite(pedLights.x, pedLights.y, "pedLights")
      .setScale(0.3);
    this.pedLights.play("pedLightsAnim"); // Play the animation

    this.deafNPC = this.physics.add
      .sprite(deafNPC.x, deafNPC.y, "deafNPC")
      .setScale(1);
    this.deafNPC.play("deafNPCAnim"); // Play the animation

    // Keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera follows player
    this.cameras.main.startFollow(this.player);

    // Enable Layer Collisions
    this.buildingsLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.buildingsLayer);

    // Add collisions for other layers that should block the player
    this.treeLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.treeLayer);

    // Add collisions with enemies
    this.physics.add.collider(this.player, this.redCar);
    this.physics.add.collider(this.player, this.orangeCar);

    
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
  [this.redCar, this.orangeCar],
  globalHitFire,
  null,
  this
);
    // Add collectibles overlap
    this.physics.add.overlap(
      this.player,
      this.watch,
      this.collectItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.notePen,
      this.collectItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.pedLights,
      this.collectItem,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.deafNPC,
      this.helpNPC,
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
      this.scene.start("lvl2Scr");
    }
     // Call to update inventory items
     this.time.addEvent({
      delay: 100,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
    });
    
    // start another scene in parallel
    this.scene.launch("showInventory");
    
   

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
