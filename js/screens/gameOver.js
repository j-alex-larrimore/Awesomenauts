/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


game.GameOver = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function(win) {
            me.game.world.addChild( new me.SpriteObject (0, 0, me.loader.getImage('game_over')), -10);
           // me.input.bindPointer(me.input.mouse.LEFT, "select");
           if(win){
               game.data.exp = game.data.exp + 10;
           }
           else{
               game.data.exp = game.data.exp + 1;
           }
           me.save.exp = game.data.exp;
           me.save.exp1 = game.data.exp1;
           me.save.exp2 = game.data.exp2;
           me.save.exp3 = game.data.exp3;
           me.save.exp4 = game.data.exp4;
           
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
                    me.state.change(me.state.CHARSELECT);
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
                    this.font.draw(context, "CONTINUE", 350, 340);
                },
                
                newGame: function(x){
                    me.state.change(me.state.CHARSELECT);
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