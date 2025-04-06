var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 960,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
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
window.Item = 0;
window.totalItems = 3;
window.heart = 3



