///* 
// * To change this template, choose Tools | Templates
// * and open the template in the editor.
// */
//
//
//game.PauseScreen = me.ScreenObject.extend({
//	/**	
//	 *  action to perform on state change
//	 */
////        init: function(){
////            this.parent(true);
////        },
//        
//	onResetEvent: function() {	
//            console.log("paused");
//            me.game.world.addChild( new me.SpriteObject (0, 0, me.loader.getImage('pause')), -11);
//            //me.input.bindPointer(me.input.mouse.LEFT, "select");
//            
//            me.game.world.addChild(new (me.Renderable.extend ({
//                
//                
//                init: function(){
//                    this.parent(new me.Vector2d(270, 240), me.game.viewport.width, me.game.viewport.height);
//                    this.font = new me.BitmapFont("32x32_font", 32);
//                    //me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
//                    me.input.bindKey(me.input.KEY.U, "unpause", true);
//                },
//                        
//                update: function(dt){
//                    return true;
//                },
//                
//                draw: function(context){
//                    //this.font.draw(context, "PRESS ENTER TO START A NEW GAME", 20, 240);
//                    //this.font.draw(context, "PRESS 'L' TO LOAD YOUR PROFILE", 20, 340);
//                    //this.font.draw(context, "START A NEW GAME", 270, 240);
//                    this.font.draw(context, "PRESS 'U' TO UNPAUSE", 270, 240);
//                },
//            })), -1);         
//            
////            console.log("Keys bound");
//            
//            this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
//                if (action === "unpause") {
//                    console.log("Unpause!");
//                    me.state.resume(me.state.PLAY);
//                    //me.state.change(me.state.PLAY);
//                }
//                
////                newGame: function(x){
////                    console.log("Unpause");
////                    me.state.change(me.state.PLAY);
////                    //me.input.releasePointerEvent('pointerdown', this);
////                }
//                
//            
//            
//            });
//                
//        },
//	/**	
//	 *  action to perform when leaving this screen (state change)
//	 */
//	onDestroyEvent: function() {
//            console.log("Destroy pause");
//            me.input.unbindKey(me.input.KEY.U, "unpause", true);
//		//me.input.unbindPointer(me.input.mouse.LEFT); // TODO
//	}
//});