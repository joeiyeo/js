class preload extends Phaser.Scene {
    constructor() {
        super('preload');
    }

    // incoming data from scene below
    init(data) {
        this.player = data.player;
        this.inventory = data.inventory;
    }

    preload() {
       

        // Main character graphics (only load once)
        this.load.spritesheet("mainChar", "assets/mainChar.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

        // Enemies
        this.load.spritesheet("redCar", "assets/redCar_spritesheet.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("orangeCar", "assets/orangeCar_spritesheet.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("antQueen", "assets/antQueen.png", {
            frameWidth: 48,
            frameHeight: 64,
        });
        this.load.spritesheet("cockroach", "assets/cockroach.png", {
            frameWidth: 96,
            frameHeight: 96,
        });

        // Collectables
        this.load.spritesheet("watch", "assets/watch_spritesheet.png", {
            frameWidth: 134,
            frameHeight: 134,
        });
        this.load.spritesheet("pedLights", "assets/pedLights_spritesheet.png", {
            frameWidth: 134,
            frameHeight: 134,
        });
        this.load.spritesheet("handSign", "assets/handSigns_spritesheet.png", {
            frameWidth: 276,
            frameHeight: 267,
        });
        this.load.spritesheet("tactilePave", "assets/tactile_spritesheet.png", {
            frameWidth: 276,
            frameHeight: 267,
        });
        this.load.spritesheet("cane", "assets/cane_spritesheet.png", {
            frameWidth: 267,
            frameHeight: 267,
        });
        this.load.spritesheet("guideDog", "assets/guideDog_spritesheet.png", {
            frameWidth: 267,
            frameHeight: 267,
        });
        this.load.spritesheet("notePen", "assets/notePen_spritesheet.png", {
            frameWidth: 134,
            frameHeight: 134,
        });

        // NPCs
        this.load.spritesheet("deafNPC", "assets/deafNPC.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("muteNPC", "assets/muteNPC.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("blindNPC", "assets/blindNPC.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
    }
    
    create() {
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
        
        // Enemy animations
        this.anims.create({
            key: 'redCarLeftAnim',
            frames: this.anims.generateFrameNumbers('redCar', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'redCarRightAnim',
            frames: this.anims.generateFrameNumbers('redCar', { start: 2, end: 3 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'orangeCarLeftAnim',
            frames: this.anims.generateFrameNumbers('orangeCar', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'orangeCarRightAnim',
            frames: this.anims.generateFrameNumbers('orangeCar', { start: 2, end: 3 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'antQueenAnim',
            frames: this.anims.generateFrameNumbers('antQueen', { start: 3, end: 8 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'cockroachAnim',
            frames: this.anims.generateFrameNumbers('cockroach', { start: 3, end: 7 }),
            frameRate: 3,
            repeat: -1
        });

        // Collectables animations
        this.anims.create({
            key: "watchAnim",
            frames: this.anims.generateFrameNumbers("watch", { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: "pedLightsAnim",
            frames: this.anims.generateFrameNumbers("pedLights", { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: "handSignAnim",
            frames: this.anims.generateFrameNumbers("handSign", { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: 'tactilePaveAnim',
            frames: this.anims.generateFrameNumbers('tactilePave', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'guideDogAnim',
            frames: this.anims.generateFrameNumbers('guideDog', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'caneAnim',
            frames: this.anims.generateFrameNumbers('cane', { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'notePenAnim',
            frames: this.anims.generateFrameNumbers('notePen', { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        });

        // NPC animations
        this.anims.create({
            key: "deafNPCAnim",
            frames: this.anims.generateFrameNumbers("deafNPC", { start: 25, end: 31 }),
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: "muteNPCAnim",
            frames: this.anims.generateFrameNumbers("muteNPC", { start: 25, end: 31 }),
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: 'blindNPCAnim',
            frames: this.anims.generateFrameNumbers('blindNPC', { start: 25, end: 31 }),
            frameRate: 3,
            repeat: -1
        });

        this.scene.start("main");
    }
}