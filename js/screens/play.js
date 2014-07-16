game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		
                me.levelDirector.loadLevel("mainMap");
            
                // reset the score
		game.data.score = 0;
                
                this.resetPlayer(2000, 420);

		// add our HUD to the game world
                
                //me.audio.playTrack("oldschool");
                
                if(me.save.exp != null){
                    console.log("Loading exp = " + me.save.exp);
                    game.data.exp = me.save.exp;
                }
                else{
                    console.log("no save data");
                }
                game.data.gold = 10;
                
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
                
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
                //me.audio.stopTrack();
		me.game.world.removeChild(this.HUD);
	},
        
        resetPlayer: function(x, y){
                game.data.player = me.pool.pull("player", 10, 150, {});
                game.data.miniplayer = me.pool.pull("miniPlayer", 10, 10, 5, {});
                game.data.minimap = me.pool.pull("miniMap", 10, 10, {});
                game.data.gamemanager = me.pool.pull("gameManager", 0, 0, {});
                game.data.teammate1 = me.pool.pull("playerTeammate", 10, 150, {});
                game.data.teammate2 = me.pool.pull("playerTeammate", 10, 150, {});
                game.data.enemy1 = me.pool.pull("enemyEntity", 11000, 150, {});
                game.data.enemy2 = me.pool.pull("enemyEntity", 11000, 150, {});
                game.data.enemy3 = me.pool.pull("enemyEntity", 11000, 150, {});
                
                me.game.world.addChild(game.data.enemy1, 4);
                me.game.world.addChild(game.data.enemy2, 4);
                me.game.world.addChild(game.data.enemy3, 4);
                me.game.world.addChild(game.data.teammate1, 4);
                me.game.world.addChild(game.data.teammate2, 4);
                me.game.world.addChild(game.data.gamemanager, 0);
                me.game.world.addChild(game.data.player, 4);
                me.game.world.addChild(game.data.miniplayer, 31);
                me.game.world.addChild(game.data.minimap, 30);
        }
});


