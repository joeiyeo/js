class gameover extends Phaser.Scene {
  constructor() {
    super("gameover");
  }
  init(data) {
    this.lvl = data.lvl || 1; // Default to level 1 if data.lvl is missing
  }

  preload() {
    this.load.image("gameOver", "assets/gameover.png");
    // Preload any sound and music here
    this.load.audio('gameover', 'assets/gameover.mp3');
  }

  create() {
    console.log("*** Game Over Scene Loaded");

    // Play the winning sound when the scene is created
this.sound.add('gameover').setVolume(0.5).play();

    // Add the game over image to the scene
    this.add.image(0, 0, "gameOver").setOrigin(0, 0);

    // Detect spacebar keypress
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // Add an event listener for the spacebar
    spaceDown.on("down", () => {
      window.heart = 3;
      const level = this.lvl; // Use the fallback value from init()
      console.log("Starting level", level);
      this.scene.start("level" + level); // Dynamically generate scene key
    });
  }
}
