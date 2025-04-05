class level1 extends Phaser.Scene {
  constructor() {
    super({ key: "level1" });
    // Main scene setup
    this.playerCanMove = true;
    this.showingDialog = false;
  }

  preload() {

    //audios 
    this.load.audio("collect","assets/collecting.mp3");
    this.load.audio("damage", "assets/damage.mp3");


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

    // Reset item counter at start of level
    window.item = 0;

    // Create game world from map file
    let map = this.make.tilemap({ key: "level1" });

    this.collectItemSnd = this.sound.add("collect").setVolume(0.4);
    this.globalHitFire1Snd = this.sound.add("damage").setVolume(1);

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

    // //object layer
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

    // Add main player here with physics.add.sprite
    this.player = this.physics.add.sprite(start.x, start.y, "mainChar");

    //adjust the width & height of bouding box
    this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.4);

    this.player.setCollideWorldBounds(true);

    // Add enemy to Scene
    this.redCar = this.physics.add
      .sprite(redCar.x, redCar.y, "redCar")
      .setScale(1.5);

    this.redCar.setSize(this.redCar.width * 1, this.redCar.height * 0.5);

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
      },
    });

    this.orangeCar = this.physics.add
      .sprite(orangeCar.x, orangeCar.y, "orangeCar")
      .setScale(1.5);

    //adjust the width & height of bouding box
    this.orangeCar.setSize(
      this.orangeCar.width * 0.5,
      this.orangeCar.height * 1
    );

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
      },
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

    // Create NPC but don't add collision with player
    this.deafNPC = this.physics.add
      .sprite(deafNPC.x, deafNPC.y, "deafNPC")
      .setScale(1);

    // Create a smaller sensor area for NPC instead of making it a barrier
    this.deafNPC.body.setSize(
      this.deafNPC.width * 0.2,
      this.deafNPC.height * 0.2
    );
    // Make NPC not block player movement
    this.deafNPC.body.immovable = true;
    this.deafNPC.body.moves = false;

    this.deafNPC.play("deafNPCAnim"); // Play the animation

    // Create dialog text
    this.dialogText = this.add
      .text(deafNPC.x, deafNPC.y - 50, "Help me!", {
        font: "16px Arial Black",
        fill: "#ff00ff",
        stroke: "#000000",
        strokeThickness: 4,
        backgroundColor: "#ffffff80",
        padding: { x: 8, y: 4 },
      })
      .setOrigin(0.5) // Center the text
      .setDepth(100) // Make sure it's above other elements
      .setVisible(false); // Hide it initially

    // Create item counter text - ADD THIS NEW CODE
    this.itemCountText = this.add
      .text(800, 50, "Items: 0/3", {
        font: "20px Arial Black",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        backgroundColor: "#00000080",
        padding: { x: 10, y: 5 },
        borderRadius: 5,
      })
      .setScrollFactor(0) // Fixed to camera
      .setDepth(100); // Make sure it's above other elements

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
      globalHitFire1,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      [this.collectItem, this.collectItem],
      globalCollectItem,
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

    // Create a proximity detection for NPC instead of collision
    this.physics.add.overlap(
      this.player,
      this.deafNPC,
      this.checkNPCProximity,
      null,
      this
    );

    var spaceDown = this.input.keyboard.addKey("SPACE");

    let key1 = this.input.keyboard.addKey(49);
    let key2 = this.input.keyboard.addKey(50);
    let key3 = this.input.keyboard.addKey(51);

    key1.on(
      "down",
      function () {
        this.scene.start("level1");
      },
      this
    );

    key2.on(
      "down",
      function () {
        this.scene.start("level2");
      },
      this
    );

    key3.on(
      "down",
      function () {
        this.scene.start("level3");
      },
      this
    );
  }

  globalHitFire1(player, enemy) {
    // Play the sound when hit
    this.globalHitFire1Snd.play()
  }

  collectItem(player, item) {

    // play the sound
	this.collectItemSnd.play()

    // Remove the item
    item.disableBody(true, true);

    // Increment item counter
    window.item = window.item || 0;
    window.item++;

    // Update the item counter text
    this.itemCountText.setText("Items: " + window.item + "/3");

    // You can add score or other effects here
    console.log("Item collected! Total: " + window.item);

    // Call to update inventory items
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
      player.x,
      player.y,
      NPC.x,
      NPC.y
    );

    // Show dialog if player is within range
    if (distance < 100) {
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

            this.scene.start("lvl2Scr");
          });
        }
      } else {
        // Show how many items are still needed
        const remaining = 3 - (window.item || 0);
        this.dialogText.setText(
          `Help me! I need ${remaining} more item${remaining !== 1 ? "s" : ""}`
        );
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
      this.dialogText.setPosition(this.deafNPC.x, this.deafNPC.y - 50);
    }

    // Make sure the item counter stays up to date
    this.itemCountText.setText("Items: " + (window.item || 0) + "/3");
  }
}
