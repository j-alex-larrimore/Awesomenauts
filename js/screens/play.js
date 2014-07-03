game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		
                me.levelDirector.loadLevel("mainMap");
            
                // reset the score
		game.data.score = 0;
                
                this.resetPlayer(30, 420);

		// add our HUD to the game world
                
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
                
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
        
        resetPlayer: function(x, y){
                game.data.player = me.pool.pull("player", x, y, {});
                game.data.miniplayer = me.pool.pull("miniPlayer", 10, 10, 5, {});
                game.data.minimap = me.pool.pull("miniMap", 10, 10, {});
                
                me.game.world.addChild(game.data.player, 4);
                me.game.world.addChild(game.data.miniplayer, 31);
                me.game.world.addChild(game.data.minimap, 30);
        }
});


