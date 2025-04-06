class level2 extends Phaser.Scene {
  constructor() {
    super({ key: "level2" });
    // Main scene setup
    this.playerCanMove = true;
    this.showingDialog = false;
    this.transitionStarted = false;
  }

  preload() {

    this.load.audio("collect","assets/collecting.mp3");
    this.load.audio("damage", "assets/damage.mp3");

    // Game map data
    this.load.tilemapTiledJSON("level2", "assets/OKUCity2.tmj");

    // City graphics
    this.load.image("buildingImg", "assets/Building.png");
    this.load.image("groundTilesImg", "assets/ground_tiles.png");
    this.load.image("streetImg", "assets/Street.png");
  }

  create() {

    console.log(">>> Level 2 started. window.item before reset:", window.item);
window.item = 0;
console.log(">>> window.item after reset:", window.item);

    // Create game world from map file
    let map = this.make.tilemap({ key: "level2" });

    this.collectItemSnd = this.sound.add("collect").setVolume(0.4);
    this.globalHitFire2Snd = this.sound.add("damage").setVolume(1);

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
    let muteNPC = map.findObject(
      "objectLayer",
      (obj) => obj.name === "muteNPC"
    );

    // Add main player here with physics.add.sprite
    this.player = this.physics.add.sprite(start.x, start.y, "mainChar");

    //adjust the width & height of bouding box
    this.player.body.setSize(this.player.width * 0.4, this.player.height * 0.4);

    // Add enemy to Scene
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
    });

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
    });

    this.cockroach = this.physics.add
      .sprite(cockroach.x, cockroach.y, "cockroach")
      .setScale(1);
    this.cockroach.play("cockroachAnim"); // Play the animation
    this.tweens.add({
      targets: this.cockroach,
      x: 1100,
      flipX: true,
      yoyo: true,
      duration: 1800,
      repeat: -1
    });

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
    });

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

    // Create NPC but don't add collision with player
    this.muteNPC = this.physics.add
      .sprite(muteNPC.x, muteNPC.y, "muteNPC")
      .setScale(1);

    // Create a smaller sensor area for NPC
    this.muteNPC.body.setSize(this.muteNPC.width * 0.2, this.muteNPC.height * 0.2);
    // Make NPC not block player movement
    this.muteNPC.body.immovable = true;
    this.muteNPC.body.moves = false;

    this.muteNPC.play("muteNPCAnim"); // Play the animation

    // Create dialog text
    this.dialogText = this.add
      .text(muteNPC.x, muteNPC.y - 50, "Please help me!", { 
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

    // Keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera follows player
    this.cameras.main.startFollow(this.player);

    // Enable Layer Collisions
    this.buildingLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.buildingLayer);

    // Add collisions for enemies
    this.physics.add.overlap(
      this.player,
      [this.antQueen, this.antQueen2, this.cockroach, this.cockroach2],
      this.globalHitFire2,
      null,
      this
    );
    
    // Add collectibles overlap
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
    
    // Create a proximity detection for NPC instead of collision
    this.physics.add.overlap(
      this.player,
      this.muteNPC,
      this.checkNPCProximity,
      null,
      this
    );

    var spaceDown = this.input.keyboard.addKey('SPACE');

    let key1 = this.input.keyboard.addKey(49);
    let key2 = this.input.keyboard.addKey(50);
    let key3 = this.input.keyboard.addKey(51);

    key1.on('down', function(){
      this.scene.start("level1");
    }, this); 
    
    key2.on('down', function(){
      this.scene.start("level2");
    }, this);
    
    key3.on('down', function(){
      this.scene.start("level3");
    }, this);

    // *** ADDED: Update inventory items
    this.time.addEvent({
      delay: 100,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
    });

    // *** ADDED: Launch inventory scene
    this.scene.launch("showInventory");
  }

  globalHitFire2(player,item) {
    console.log("*** player overlap fire");
    this.globalHitFire2Snd.play();

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
            this.scene.start("lvl3Scr");
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
      this.dialogText.setPosition(this.muteNPC.x, this.muteNPC.y - 50);
    }
  }
}
/////////////////// end of update //////////////////////////////

//////////// end of class world ////////////////////////