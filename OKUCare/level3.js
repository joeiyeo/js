class level3 extends Phaser.Scene {
  constructor() {
    super({ key: "level3" });
    // Main scene setup
    this.playerCanMove = true;
    this.showingDialog = false;
    this.transitionStarted = false;
  }

  preload() {
    this.load.audio("collect","assets/collecting.mp3");
    this.load.audio("damage", "assets/damage.mp3");

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
    console.log(">>> Level 3 started. window.item before reset:", window.item);
window.item = 0;
console.log(">>> window.item after reset:", window.item);

this.collectItemSnd = this.sound.add("collect").setVolume(0.4);
this.globalHitFire3Snd = this.sound.add("damage").setVolume(1);

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
    let blindNPC = map.findObject(
      "objectLayer",
      (obj) => obj.name === "blindNPC"
    );

    // Add main player here with physics.add.sprite
    this.player = this.physics.add.sprite(start.x, start.y, "mainChar");

    // Adjust the width & height of bounding box
    this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.4);
    this.player.setCollideWorldBounds(true);

    // Add enemy to Scene
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

    this.redCar.setSize(this.redCar.width * 1, this.redCar.height * 0.5);

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

    this.redCar2.setSize(this.redCar2.width * 1, this.redCar2.height * 0.5);

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

    //add collectables to scene
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

    // Create NPC with improved settings similar to level2
    this.blindNPC = this.physics.add
      .sprite(blindNPC.x, blindNPC.y, "blindNPC")
      .setScale(1);

    // Create a smaller sensor area for NPC
    this.blindNPC.body.setSize(this.blindNPC.width * 0.4, this.blindNPC.height * 0.4);
    // Make NPC not block player movement
    this.blindNPC.body.immovable = true;
    this.blindNPC.body.moves = false;
    this.blindNPC.play("blindNPCAnim"); // Play the animation

    // Create dialog text similar to level2
    this.dialogText = this.add
      .text(blindNPC.x, blindNPC.y - 50, "Please help me!", { 
        font: "16px Arial Black", 
        fill: "#ff00ff", 
        stroke: '#000000', 
        strokeThickness: 4,
        backgroundColor: '#ffffff80',
        padding: { x: 8, y: 4 }
      })
      .setOrigin(0.5)  // Center the text
      .setDepth(100)   // Make sure it's above other elements
      .setVisible(false); // Hide it initially

      this.itemCountText = this.add
  .text(800, 50, "Items: 0/3", { 
    font: "20px Arial Black", 
    fill: "#ffffff", 
    stroke: '#000000', 
    strokeThickness: 4,
    backgroundColor: '#00000080',
    padding: { x: 10, y: 5 },
    borderRadius: 5
  })
  .setScrollFactor(0)  // Fixed to camera
  .setDepth(100);      // Make sure it's above other elements

    // Initialize item counter if not already set
    if (window.item === undefined) {
      window.item = 0;
    }

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

    // Use overlap for NPC interaction instead of collision
    this.physics.add.overlap(
      this.player,
      this.blindNPC,
      this.checkNPCProximity,
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
      this.globalHitFire3,
      null,
      this
    );
  }

  globalHitFire3(player,item) {
    console.log("*** player overlap fire");
   
    this.globalHitFire3Snd.play();


    // Shake screen
   this.cameras.main.shake(100);
   //this.hitenemySnd.play();
  
    // deduct heart
    window.heart--;
    item.disableBody(true, true);
    
    // Call globalFunctions.js updateInventory
    updateInventory.call(this)
  
  if (window.heart == 0){
    console.log("*** player gameosver");
    this.scene.start("gameover");
    //this.loselifeSnd.play();
  }
  }

  collectItem(player, item) {

    // play the sound
	this.collectItemSnd.play()

    item.disableBody(true, true);
  
    if (typeof window.item !== 'number') {
      window.item = 0;
    }
  
    window.item++;
  
    this.itemCountText.setText("Items: " + window.item + "/3");
    console.log("Item collected! Total: " + window.item);
  
    this.time.addEvent({
      delay: 100,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
    });
  }

  checkNPCProximity(player, NPC) {
    // Calculate distance between player and NPC
    const distance = Phaser.Math.Distance.Between(
      player.x, player.y,
      NPC.x, NPC.y
    );
    
    // Show dialog if player is within range
    if (distance < 100) {
      // Make sure window.item is initialized
      window.item = window.item || 0;
      
      // Show dialog text above NPC
      this.dialogText.setPosition(NPC.x, NPC.y - 50);
      this.dialogText.setVisible(true);
      
      // Check if all items are collected
      if (window.item >= 3) {
        this.dialogText.setText("Thank you for your help!");
        
        // Move to next scene after a short delay
        if (!this.transitionStarted) {
          this.transitionStarted = true;
          this.time.delayedCall(1000, () => {
            window.heart = 3;
            window.collectItem = 0;
            this.scene.start("winningScr");
          });
        }
      } else {
        // Show how many items are still needed
        const remaining = 3 - window.item;
        this.dialogText.setText(`Help me! I need ${remaining} more item${remaining !== 1 ? 's' : ''}`);
      }
    } else {
      // Hide dialog if player moves away
      this.dialogText.setVisible(false);
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

    // Update dialog position if it's visible
    if (this.dialogText.visible) {
      this.dialogText.setPosition(this.blindNPC.x, this.blindNPC.y - 50);
    }
  }
}
/////////////////// end of update //////////////////////////////

//////////// end of class world ////////////////////////