/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


game.LoadProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
            me.game.world.addChild( new me.SpriteObject (0, 0, me.loader.getImage('load')), 1);
           // me.input.bindPointer(me.input.mouse.LEFT, "select");
            console.log("LoadProfile");
            me.game.world.addChild( new (me.Renderable.extend ({
                        init: function(){
                            this.parent(new me.Vector2d(0, 0), 1, 1);
                            this.font = new me.BitmapFont("32x32_font", 32);
                            this.updateWhenPaused = true;
                            this.alwaysUpdate = true;
                        },

                        draw: function(context){    
                            this.font.draw(context, "ENTER YOUR USERNAME AND PASSWORD", 0, 0);
                        }

                    })));
             
//             me.game.world.addChild( new (me.Renderable.extend ({
//                init : function (x, y, type, length) {
//                        this.$input = $('<input type="' + type + '" required>').css({
//                            "left" : x,
//                            "top" : y
//                        });
//
//                        switch (type) {
//                        case "text":
//                            this.$input
//                                .attr("maxlength", length)
//                                .attr("pattern", "[a-zA-Z0-9_\-]+");
//                            break;
//                        case "number":
//                            this.$input.attr("max", length);
//                            break;
//                        }
//
//                        $(me.video.getWrapper()).append(this.$input);
//                    },
//
//                    destroy : function () {
//                        this.$input.remove();
//                    }
//             })));
                
                
            
	},
                
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		//me.input.unbindPointer(me.input.mouse.LEFT); // TODO
	}
});