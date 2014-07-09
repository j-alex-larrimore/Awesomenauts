/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


game.GameOver = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function(win) {
            console.log("Win? " + win); 
            me.game.world.addChild( new me.SpriteObject (0, 0, me.loader.getImage('game_over')), -10);
           // me.input.bindPointer(me.input.mouse.LEFT, "select");
           
            me.game.world.addChild(new (me.Renderable.extend ({
                init: function(){
                    this.parent(new me.Vector2d(270, 100), 510, 30);
                    this.font = new me.BitmapFont("32x32_font", 32);
                },
                
                draw: function(context){
                    //this.font.draw(context, "PRESS ENTER TO START A NEW GAME", 20, 240);
                    //this.font.draw(context, "PRESS 'L' TO LOAD YOUR PROFILE", 20, 340);
                    if(!win)
                        this.font.draw(context, "YOU LOSE. TRY AGAIN?", 210, 100);
                    else
                        this.font.draw(context, "BRILLIANT! REMATCH?", 220, 100);
                }
                
            })));
            
            me.game.world.addChild(new (me.Renderable.extend ({
                
                
                init: function(){
                    this.parent(new me.Vector2d(270, 240), 510, 30);
                    this.font = new me.BitmapFont("32x32_font", 32);
                    me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                },
                        
                update: function(dt){
                    return true;
                },
                
                draw: function(context){
                    //this.font.draw(context, "PRESS ENTER TO START A NEW GAME", 20, 240);
                    //this.font.draw(context, "PRESS 'L' TO LOAD YOUR PROFILE", 20, 340);
                    this.font.draw(context, "START A NEW GAME", 270, 240);
                },
                
                newGame: function(x){
                    console.log("New Game");
                    me.state.change(me.state.PLAY);
                    me.input.releasePointerEvent('pointerdown', this);
                }
                
            })));
            
           me.game.world.addChild(new (me.Renderable.extend ({
                
                
                init: function(){
                    this.parent(new me.Vector2d(350, 340), 350, 30);
                    this.font = new me.BitmapFont("32x32_font", 32);
                    me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                },
                        
                update: function(dt){
                    return true;
                },
                
                draw: function(context){
                    //this.font.draw(context, "PRESS ENTER TO START A NEW GAME", 20, 240);
                    //this.font.draw(context, "PRESS 'L' TO LOAD YOUR PROFILE", 20, 340);
                    this.font.draw(context, "LOAD A GAME", 350, 340);
                },
                
                newGame: function(x){
                    console.log("Load");
                    me.state.change(me.state.PLAY);
                    me.input.releasePointerEvent('pointerdown', this);
                    
                }
                
            })));
            
	},
                
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		//me.input.unbindPointer(me.input.mouse.LEFT); // TODO
	}
});