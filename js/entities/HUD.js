/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		// call the constructor
		this.parent();
		
		// persistent across level change
		this.isPersistent = true;
		
		// non collidable
		this.collidable = false;
		
		// make sure our object is always draw first
		this.z = Infinity;

		// give a name
		this.name = "HUD";
                
                this.last = new Date().getTime();
                this.now = new Date().getTime();
                this.toggle = true;
		
                 //var range = new CanvasEntity(40, 400, 10, {});
                
                //this.minimap = new game.HUD.MiniMap(10, 10, me.loader.getImage("miniMap2"));
                  
               
                //game.data.minimap = new game.HUD.MiniMap(10, 10, me.loader.getImage("miniMap2"));
                //game.data.miniplayer = new miniPlayerLocation(10, 10, 5, {});
                
                //game.data.minimap = new game.HUD.MiniMap(10, 10, me.loader.getImage("miniMap2"));
		// add our child score object at the top left corner
		this.addChild(new game.HUD.ScoreItem(5, 5)); 
                //this.addChild(game.data.minimap);
                //this.addChild(new game.HUD.MiniMap(10, 10, me.loader.getImage("miniMap2")));
                //this.addChild(this.minimap);
                //this.addChild(game.data.miniplayer);
	}
                
                
                
      
});


/** 
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y) {
		
                this.last = new Date().getTime();
                this.now = new Date().getTime();
                this.toggle = true;
                
		// call the parent constructor 
		// (size does not matter here)
		this.parent(new me.Vector2d(x, y), 10, 10); 
		
		// local copy of the global score
		this.score = -1;

		// make sure we use screen coordinates
		this.floating = true;
	},

	/**
	 * update function
	 */
	update : function () {
		// we don't do anything fancy here, so just
		// return true if the score has been updated
		if (this.score !== game.data.score) {	
			this.score = game.data.score;
			return true;
		}
		
                
                this.now = new Date().getTime();
                            
        console.log("In update");
        if(me.input.isKeyPressed("toggleMap")){
            if (this.toggle === true && (this.now-this.last >= 1000)){       
                this.last = this.now;
                this.toggle = false;
                me.game.world.removeChild(game.data.minimap);
                me.game.world.removeChild(game.data.miniplayer);
               
            }
            else if(this.toggle === false && this.now-this.last >= 1000){
                this.last = this.now;
                this.toggle = true;       
                game.data.minimap = me.pool.pull("miniMap", 10, 10, {});
                game.data.miniplayer = me.pool.pull("miniPlayer", 10, 10, 5, {});
                me.game.world.addChild(game.data.minimap, 30);
                me.game.world.addChild(game.data.miniplayer, 31);
                
            }
        }
        
            return false;
	},

	/**
	 * draw the score
	 */
	draw : function (context) {
		// draw it baby !
	}

});


  


