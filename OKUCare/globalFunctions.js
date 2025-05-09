﻿////////////////////////////////////////////////////////
//
// access this function using updateInventory.call(this)
// Uses a JS function to prevent repeated codes
// 
///////////////////////////////////////////////////////
function updateInventory() {
    console.log("*** updateInventory()")
    // Emit events showInventory
    this.inventory = {}
    this.inventory.heart = window.heart
     
    console.log('*** updateInventory() Emit event', this.inventory)
    this.invEvent = (event, data) =>  { 
			    this.scene.get('showInventory').events.emit(event, data); 
		    }
    this.invEvent("inventory", this.inventory);
  }
  
  ////////////////////////////////////////////////////////
  //
  // access this function with globalHitFire
  // Uses a JS function to prevent repeated codes
  // 
  ///////////////////////////////////////////////////////
  function globalHitFire1(player,item) {
      console.log("*** player overlap fire");
     
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


  function globalHitFire2(player,item) {
    console.log("*** player overlap fire");
   
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

function globalHitFire3(player,item) {
  console.log("*** player overlap fire");
 
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
  
  ////////////////////////////////////////////////////////
  //
  // access this function with globalCollectKey
  // Uses a JS function to prevent repeated codes
  // 
  /////////////////////////////////////////////////////// 
 function globalCollectItem(player,Item) {
    console.log("*** player overlap key");
   
    // Shake screen
   this.cameras.main.shake(100);

   //this.hitenemySnd.play();

	// increase key count
    window.collectItem++;
    item.disableBody(true, true);
    updateInventory.call(this)
}
