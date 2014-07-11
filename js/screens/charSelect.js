/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


game.CharSelect = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
            me.game.world.addChild( new me.SpriteObject (0, 0, me.loader.getImage('char_select')), -10);
           // me.input.bindPointer(me.input.mouse.LEFT, "select");
           me.game.world.addChild( new (me.Renderable.extend ({
                        init: function(){
                            this.parent(new me.Vector2d(0, 0), 1, 1);
                            this.font = new me.BitmapFont("32x32_font", 32);
                            this.updateWhenPaused = true;
                            this.alwaysUpdate = true;
                        },

                        draw: function(context){    
                            this.font.draw(context, "PRESS F1-F5 TO CHOOSE YOUR HERO", 70, 10);
                        }

                    }))); 
                me.game.world.addChild(new me.SpriteObject (100, 250, me.loader.getImage('archerIcon')));
                me.game.world.addChild(new me.SpriteObject (300, 250, me.loader.getImage('darkelfIcon')));
                me.game.world.addChild(new me.SpriteObject (500, 250, me.loader.getImage('orcSpearIcon')));
                me.game.world.addChild(new me.SpriteObject (700, 250, me.loader.getImage('wizardIcon')));
                me.game.world.addChild(new me.SpriteObject (900, 250, me.loader.getImage('skeletonBigswordIcon')));

                me.input.bindKey(me.input.KEY.F1, "F1", true);
                me.input.bindKey(me.input.KEY.F2, "F2", true);
                me.input.bindKey(me.input.KEY.F3, "F3", true);
                me.input.bindKey(me.input.KEY.F4, "F4", true);
                me.input.bindKey(me.input.KEY.F5, "F5", true);

                this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
                if (action === "F1") {
                    game.data.character = 1;
                    me.state.change(me.state.PLAY);
                }
                else if(action === "F2"){
                    game.data.character = 2;
                    me.state.change(me.state.PLAY);
                }
                else if(action === "F3"){
                    game.data.character = 3;
                    me.state.change(me.state.PLAY);
                }  
                else if(action === "F4"){
                    game.data.character = 4;
                    me.state.change(me.state.PLAY);
                }  
                else if(action === "F5"){
                    game.data.character = 5;
                    me.state.change(me.state.PLAY);
                }  
                });
            
//            me.game.world.addChild(new (me.Renderable.extend ({
//                init: function(){
//                    
//                }
                
//                init: function (x, y, settings){
//       settings.image = "orcSpear";
//       settings.spritewidth = "64";
//       settings.spriteheight = "64";
//       settings.width = 64;
//       settings.height = 64;
//            })));
            
            
            
	},
                
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.F1);
                me.input.unbindKey(me.input.KEY.F2);
                me.input.unbindKey(me.input.KEY.F3);
                me.input.unbindKey(me.input.KEY.F4);
                me.input.unbindKey(me.input.KEY.F5);
                me.event.unsubscribe(this.handler);
	}
});