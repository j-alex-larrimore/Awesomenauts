/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
            me.game.world.addChild( new me.SpriteObject (0, 0, me.loader.getImage('spend')), 1);
            //me.input.bindPointer(me.input.mouse.LEFT, "select");
            
            
            
	},
                
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		//me.input.unbindPointer(me.input.mouse.LEFT); // TODO
	}
});