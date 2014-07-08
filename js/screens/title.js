game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent : function() {	
            me.game.world.addChild( new me.SpriteObject (0, 0, me.loader.getImage('title')), -10);
            
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
                    me.state.change(me.state.PLAY);
                    me.input.releasePointerEvent('pointerdown', this);
                    
                }
                
            })));     
            
//            me.input.bindKey(me.input.KEY.ENTER, "enter", true);
//            me.input.bindKey(me.input.KEY.L, "L", true);
//            console.log("Keys bound");
            
//            this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
//            if (action === "enter") {
//                console.log("New Game");
//               // me.state.change(me.state.PLAY);
//            }
//            else if (action === "L"){
//                console.log("Load");
//            }
//        });
            

            
	},
                
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent : function() {
            
		//me.input.unbindPointer(me.input.mouse.LEFT); // TODO
	}
});

//var MenuButton = me.GUI_OBJECT.extend({
//    
//    init: function(x, y, settings){
//        this.parent (true);
//    },
//    
//   "onClick" : function(){
//       console.log("part1");
//       me.state.change(me.state.PLAY);
//       return true;
//   } 
//    
//});

//game.TitleScreen = me.ScreenObject.extend({
//onResetEvent : function () {
//// Create menus
//this.rootMenu = new game.Menu();
//var signedInMenu = new game.Menu();
//var signUpMenu = new game.Menu();
//var achievementsMenu = new game.Menu();
// 
//// Add menu items to root menu
//this.rootMenu.addMenuItem({
//x : 20,
//y : 20,
//image : "signInButton",
//subMenu : signedInMenu
//});
//this.rootMenu.addMenuItem({
//x : 20,
//y : 100,
//image : "signUpButton",
//subMenu : signUpMenu
//});
// 
//// Add menu items to signedInMenu
//signedInMenu.addMenuItem({
//x : 20,
//y : 20,
//image : "playButton",
//callback : function () {
//me.state.change(me.state.PLAY);
//}
//});
//signedInMenu.addMenuItem({
//x : 20,
//y : 100,
//image : "achievementsButton",
//subMenu : achievementsMenu
//});
//signedInMenu.addMenuItem({
//x : 20,
//y : 180,
//image : "goBackButton",
//callback : signedInMenu.goBack
//});
// 
//// ... Add more menu items
// 
//// Add the root menu to the game entity manager
//me.game.world.addChild(this.rootMenu);
//}
//});