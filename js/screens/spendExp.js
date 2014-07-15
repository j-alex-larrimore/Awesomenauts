/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
            me.game.world.addChild( new me.SpriteObject (0, 0, me.loader.getImage('spend')), -10);
            //me.input.bindPointer(me.input.mouse.LEFT, "select");
            console.log("SpendEXP");
            
            me.game.world.addChild( new (me.Renderable.extend ({
                        init: function(){
                            this.parent(new me.Vector2d(0, 0), 1, 1);
                            this.font = new me.BitmapFont("32x32_font", 32);
                            this.updateWhenPaused = true;
                            this.alwaysUpdate = true;
                        },

                        draw: function(context){    
                            this.font.draw(context, "PRESS F1-F4 TO BUY, F5 TO SKIP", 10, 10);
                            this.font.draw(context, "CURRENT EXP: " + game.data.exp.toString(), 200, 50);
                        }

                    }))); 
            
            
            
            me.game.world.addChild(new (me.Renderable.extend ({
                init: function(){
                    this.parent(new me.Vector2d(270, 100), 510, 30);
                    this.font = new me.Font("Arial", 24, "white");
                },
                
                draw: function(context){
                    //this.font.draw(context, "PRESS ENTER TO START A NEW GAME", 20, 240);
                    //this.font.draw(context, "PRESS 'L' TO LOAD YOUR PROFILE", 20, 340);
                    if(game.data.exp1 === 0){
                        this.font.draw(context, "EXP1: Level1 - More Money More Problems (increase starting gold) Cost: 10", 10, 200);
                    }
                    else if(game.data.exp1 === 1){
                        this.font.draw(context, "EXP1: Level2 - More Money More Problems (increase starting gold) Cost: 20", 10, 200);
                    }
                    else if(game.data.exp1 === 2){
                        this.font.draw(context, "EXP1: Level3 - More Money More Problems (increase starting gold) Cost: 30", 10, 200);
                    }
                    else if(game.data.exp1 === 3){
                       this.font.draw(context, "EXP1: Level4 - More Money More Problems (increase starting gold) Cost: 40", 10, 200);
                    }
                    else{
                        console.log("EXP1 Maxed");
                    }
                    
                    if(game.data.exp2 === 0){
                        this.font.draw(context, "EXP2: Level1 - All About the Benjamins (increase gold rate) Cost: 10", 10, 250);
                    }
                    else if(game.data.exp2 === 1){
                        this.font.draw(context, "EXP2: Level2 - All About the Benjamins (increase gold rate) Cost: 20", 10, 250);
                    }
                    else if(game.data.exp2 === 2){
                        this.font.draw(context, "EXP2: Level3 - All About the Benjamins (increase gold rate) Cost: 30", 10, 250);
                    }
                    else if(game.data.exp2 === 3){
                       this.font.draw(context, "EXP2: Level4 - All About the Benjamins (increase gold rate) Cost: 40", 10, 250);
                    }
                    else{
                        console.log("EXP2 Maxed");
                    }
                    
                    if(game.data.exp3 === 0){
                        this.font.draw(context, "EXP3: Level1 - The Wheelhouse is Growing (increase damage) Cost: 10", 10, 300);
                    }
                    else if(game.data.exp3 === 1){
                        this.font.draw(context, "EXP3: Level2 - The Wheelhouse is Growing (increase damage) Cost: 20", 10, 300);
                    }
                    else if(game.data.exp3 === 2){
                        this.font.draw(context, "EXP3: Level3 - The Wheelhouse is Growing (increase damage) Cost: 30", 10, 300);
                    }
                    else if(game.data.exp3 === 3){
                       this.font.draw(context, "EXP3: Level4 - The Wheelhouse is Growing (increase damage) Cost: 40", 10, 300);
                    }
                    else{
                        console.log("EXP3 Maxed");
                    }
                    
                    if(game.data.exp4 === 0){
                        this.font.draw(context, "EXP4: Level1 - I Got This (health +) Cost: 10", 10, 350);
                    }
                    else if(game.data.exp4 === 1){
                        this.font.draw(context, "EXP4: Level2 - I Got This (health +) Cost: 20", 10, 350);
                    }
                    else if(game.data.exp4 === 2){
                        this.font.draw(context, "EXP4: Level3 - I Got This (health +) Cost: 30", 10, 350);
                    }
                    else if(game.data.exp4 === 3){
                       this.font.draw(context, "EXP4: Level4 - I Got This (health +) Cost: 40", 10, 350);
                    }
                    else{
                        console.log("EXP4 Maxed");
                    }
                    
                }
                
            })));
            
            me.input.bindKey(me.input.KEY.F1, "F1", true);
            me.input.bindKey(me.input.KEY.F2, "F2", true);
            me.input.bindKey(me.input.KEY.F3, "F3", true);
            me.input.bindKey(me.input.KEY.F4, "F4", true);
            me.input.bindKey(me.input.KEY.F5, "F5", true);
            
            this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {                
                if (action === "F1") {
                    if(game.data.exp1 === 0 && game.data.exp >= 10){
                        game.data.exp1 += 1;
                        game.data.exp -= 10;
                        me.state.change(me.state.CHARSELECT);
                    }
                    else if(game.data.exp1 === 1 && game.data.exp >= 20){
                        game.data.exp1 += 1;
                        game.data.exp -= 20;
                        me.state.change(me.state.CHARSELECT);
                    }
                    else if(game.data.exp1 === 2 && game.data.exp >= 30){
                        game.data.exp1 += 1;
                        game.data.exp -= 30;
                        me.state.change(me.state.CHARSELECT);
                    }
                    else if(game.data.exp1 === 3 && game.data.exp >= 40){
                        game.data.exp1 += 1;
                        game.data.exp -= 40;
                        me.state.change(me.state.CHARSELECT);
                    }
                }
                else if(action === "F2"){
                    if(game.data.exp2 === 0 && game.data.exp >= 10){
                        game.data.exp2 += 1;
                        game.data.exp -= 10;
                        me.state.change(me.state.CHARSELECT);
                    }
                    else if(game.data.exp2 === 1 && game.data.exp >= 20){
                        game.data.exp2 += 1;
                        game.data.exp -= 20;
                        me.state.change(me.state.CHARSELECT);
                    }
                    else if(game.data.exp2 === 2 && game.data.exp >= 30){
                        game.data.exp2 += 1;
                        game.data.exp -= 30;
                        me.state.change(me.state.CHARSELECT);
                    }
                    else if(game.data.exp2 === 3 && game.data.exp >= 40){
                        game.data.exp2 += 1;
                        game.data.exp -= 40;
                        me.state.change(me.state.CHARSELECT);
                    }
                }
                else if(action === "F3"){
                    if(game.data.exp3 === 0 && game.data.exp >= 10){
                        game.data.exp3 += 1;
                        game.data.exp -= 10;
                        me.state.change(me.state.CHARSELECT);
                    }
                    else if(game.data.exp3 === 1 && game.data.exp >= 20){
                        game.data.exp3 += 1;
                        game.data.exp -= 20;
                        me.state.change(me.state.CHARSELECT);
                    }
                    else if(game.data.exp3 === 2 && game.data.exp >= 30){
                        game.data.exp3 += 1;
                        game.data.exp -= 30;
                        me.state.change(me.state.CHARSELECT);
                    }
                    else if(game.data.exp3 === 3 && game.data.exp >= 40){
                        game.data.exp3 += 1;
                        game.data.exp -= 40;
                        me.state.change(me.state.CHARSELECT);
                    }
                }  
                else if(action === "F4"){
                    if(game.data.exp4 === 0 && game.data.exp >= 10){
                        game.data.exp4 += 1;
                        game.data.exp -= 10;
                        me.state.change(me.state.CHARSELECT);
                    }
                    else if(game.data.exp4 === 1 && game.data.exp >= 20){
                        game.data.exp4 += 1;
                        game.data.exp -= 20;
                        me.state.change(me.state.CHARSELECT);
                    }
                    else if(game.data.exp4 === 2 && game.data.exp >= 30){
                        game.data.exp4 += 1;
                        game.data.exp -= 30;
                        me.state.change(me.state.CHARSELECT);
                    }
                    else if(game.data.exp4 === 3 && game.data.exp >= 40){
                        game.data.exp4 += 1;
                        game.data.exp -= 40;
                        me.state.change(me.state.CHARSELECT);
                    }
                } 
                else if(action === "F5"){
                    me.state.change(me.state.CHARSELECT);
                }  
                });
            
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