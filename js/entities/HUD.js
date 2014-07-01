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
		
                 //var range = new CanvasEntity(40, 400, 10, {});
                this.last = new Date().getTime();
                this.now = new Date().getTime();
                this.toggle = true;
                
                this.map = new game.HUD.MiniMap(10, 10, me.loader.getImage("miniMap2"));      
               
                //game.data.minimap = new game.HUD.MiniMap(10, 10, me.loader.getImage("miniMap2"));
                game.data.miniplayer = new miniPlayerLocation(10, 10, 5, {});
                
                // game.data.minimap = new game.HUD.MiniMap(10, 10, me.loader.getImage("miniMap2"));
		// add our child score object at the top left corner
		this.addChild(new game.HUD.ScoreItem(5, 5));
                this.addChild(new game.HUD.MiniMap(10, 10, me.loader.getImage("miniMap2")));
                this.addChild(game.data.miniplayer);
	},
                
//        update: function (){
//        this.now = new Date().getTime();
//        
//        if(me.input.isKeyPressed("toggleMap")){
//            if (this.toggle === true && (this.now-this.last >= 1000)){
//                this.last = this.now;
//                this.toggle = false;
//                //this.removeChild(this);
//            }
//            else if(this.now-this.last >= 1000){
//                this.last = this.now;
//                this.toggle = true;
//            }
//        }
//    }
});


/** 
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y) {
		
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
		return false;
	},

	/**
	 * draw the score
	 */
	draw : function (context) {
		// draw it baby !
	}

});

game.HUD.MiniMap = me.SpriteObject.extend({
    
    init: function (x, y, image){
        this.toggle = true;
        this.parent(x, y, image);
        this.x = x;
        this.y = y;
        this.z = 10;
        this.floating = true;
        this.anchorPoint = new me.Vector2d(0,0);
    }
            
    
    
    /*draw : function(context){

        context.save();

//      context.beginPath();
//
//      context.arc(10,10,100,0,Math.PI*2,true);
        context.rect(10, 10, 200, 200);

        context.clip();

        this.parent(context);

        context.restore();

    }*/
    
});


