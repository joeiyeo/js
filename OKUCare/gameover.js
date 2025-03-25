class gameover extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data) {
    console.log(data);
    this.lvl = data.lvl; // Store level from data
  }

  preload() {
    this.load.image("gameOver", "assets/gameover.png");
  }

  create() {
    console.log("*** gameover scene");
    this.scene.bringToTop("gameover");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, "gameOver").setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, restart the correct level
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to main scene");

        window.heart = 3; // Reset hearts

        // Use this.lvl instead of this.level
        if (this.lvl == 1) {
          this.scene.start("level1");
        } else if (this.lvl == 2) {
          this.scene.start("level2");
        } else if (this.lvl == 3) {
          this.scene.start("level3");
        }
      },
      this
    );
  }
}
