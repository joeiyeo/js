var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 960,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#1128a9',
    pixelArt: true,
    scene: [preload, main , lvl1Scr, lvl2Scr, lvl3Scr, level1, level2, level3, winningScr, gameover, showInventory]
 
};

var game = new Phaser.Game(config);
window.item = 0
window.heart = 3
window.key = 0


