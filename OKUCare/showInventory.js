﻿class showInventory extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'showInventory',
        active: false });
    }

    init(data) {
        this.player = data.player;
        this.inventory = data.inventory;
    }

    preload(){
        //Load heart image
        this.load.image('heart', 'assets/heart.png');
        
    }
 
   create () {

        //Place hearts at the top screen
        console.log("***showInventory");
        this.scene.bringToTop("showInventory");

        // //black bar
        // var rect = new Phaser.Geom.Rectangle(10, 10, 500, 65);
        // var graphics = this.add.graphics({ fillStyle: { color: 'ed00ac' } });
        // graphics.fillRectShape(rect).setScrollFactor(0)

       // Setup heart but visible to false
       this.heartimg1 = this.add.image (100,43,'heart').setScrollFactor(0).setVisible(true).setScale(0.2);
       this.heartimg2 = this.add.image (170,43,'heart').setScrollFactor(0).setVisible(true).setScale(0.2);
       this.heartimg3 = this.add.image (240,43,'heart').setScrollFactor(0).setVisible(true).setScale(0.2);

    //    this.item = this.add.image (370, 50, 'collectItem').setScrollFactor(0).setVisible(true);

               
       // Recv an event, call the method
       this.events.on('inventory', this.updateScreen, this)

       //Setup key
      
       this.itemNum = this.add.text(450, 23, window.item, {font: '50px Futura PT Medium', fill: '#272e66'}).setScrollFactor(0);
        
    } //end of create

    updateScreen(data){
        console.log('Received event inventory', data);

        this.itemNum.setText(data.item);

        switch ( data.heart ) {

            case 3: 
                this.heartimg1.setVisible(true)
                this.heartimg2.setVisible(true)
                this.heartimg3.setVisible(true)
                break;
    
            case 2:
                this.heartimg1.setVisible(true)
                this.heartimg2.setVisible(true)
                this.heartimg3.setVisible(false)
                break;
    
            case 1:
                this.heartimg1.setVisible(true)
                this.heartimg2.setVisible(false)
                this.heartimg3.setVisible(false)
                break;
             
            case 0:
                this.heartimg1.setVisible(false)
                this.heartimg2.setVisible(false)
                this.heartimg3.setVisible(false)
                break;    
    
            default:
            break;
        }
    
    }

} // end of class



