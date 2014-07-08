game.PlayerEntity = me.ObjectEntity.extend({
   init: function (x, y, settings){
       settings.image = "orcSpear";
       settings.spritewidth = "64";
       settings.spriteheight = "64";
       settings.width = 64;
       settings.height = 64;
       this.parent(x, y, settings);
       this.last = new Date().getTime();
       this.now = new Date().getTime();
       this.lastHit = new Date().getTime();
       this.facing = "right";
       this.type = "PlayerEntity";
       this.maxHealth = 100;
       this.health = 100;
       this.team = true;
       
       this.collidable = true;
       
       this.renderable.addAnimation("idle", [78]);
       this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
       this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
       this.renderable.setCurrentAnimation("idle");
       
       this.setVelocity(5, 20);
       
       me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
   }, 
           
   loseHealth: function(dmg){
       console.log("ouch");
       this.health = this.health - dmg;
   },
          
    
   update: function(delta){
         //console.log(this.pos.x + " " + this.pos.y);
         //console.log("now!");
       if(me.input.isKeyPressed("right")){
           this.facing = "right";
           this.vel.x += this.accel.x * me.timer.tick;
           this.flipX(true);
           
       }
       else if(me.input.isKeyPressed("left")){
           this.facing = "left";
           this.flipX(false);
           this.vel.x -= this.accel.x * me.timer.tick;
       }
       else{
           this.vel.x = 0;
       }
       
       if(this.vel.x !== 0){
            if(!this.renderable.isCurrentAnimation("run") && !this.renderable.isCurrentAnimation("attack")){
                this.renderable.setCurrentAnimation("run");
                this.renderable.setAnimationFrame();
           }
       }
       else if(!this.renderable.isCurrentAnimation("attack")){
           this.renderable.setCurrentAnimation("idle");
       }
       
       if(me.input.isKeyPressed("attack")){
           this.now = new Date().getTime();
           if(!this.renderable.isCurrentAnimation("attack") && (this.now-this.last >= 1000)){
               this.last = this.now;
               this.renderable.setCurrentAnimation("attack", "idle");
               this.renderable.setAnimationFrame();
           }
       }
       
       if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling){
            this.jumping = true;
            this.vel.y -= this.accel.y * me.timer.tick;
       }
       
       var collision = me.game.world.collide(this);
       
       if(collision){
           this.now = new Date().getTime();
           if(collision.obj.type === "EnemyBaseEntity"){
               var ydif = this.pos.y - collision.obj.pos.y;
               var xdif = this.pos.x - collision.obj.pos.x;
               if(ydif < -55 && (xdif < 60) && (xdif > -35)){
                   this.falling = false;
                   this.vel.y = 0;
                   this.pos.y = this.pos.y - 1;
               }
              else if((xdif > 0)&&(xdif < 60)&&(ydif > -55)){
                this.vel.x = 0;
                this.pos.x = this.pos.x + 1;
               }
               else if((xdif > -35) && (xdif < 0) &&(ydif > -55)){
                   this.vel.x = 0;
                   this.pos.x = this.pos.x - 1;
               }
               
//               if(ydif < -70){
//                   this.falling = false;
//                   this.vel.y = 0;
//                   this.pos.y = this.pos.y - 1;
//               }
//              else if((xdif > 0)&&(ydif > -70)){
//                this.vel.x = 0;
//                this.pos.x = this.pos.x + 1;
//               }
//               else if((xdif < 0)&&(ydif > -70)){
//                   this.vel.x = 0;
//                   this.pos.x = this.pos.x - 1;
//               }
                
               if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 800 && (Math.abs(this.pos.y-collision.obj.pos.y)<=40)){
                    if((this.facing === "left" && (this.pos.x > collision.obj.pos.x))||(this.facing === "right" && (this.pos.x < collision.obj.pos.x))){
                        this.lastHit = this.now;
                        collision.obj.loseHealth(20);
                    }
               }
           }
       }
       
       
       this.updateMovement();
       this.parent(delta);
       return true;
   } 
});

game.LevelTrigger = me.ObjectEntity.extend({
   init: function (x, y, settings){
       this.parent(x, y, settings);
       this.collidable = true;
       this.level = settings.level;
       this.xSpawn = settings.xSpawn;
       this.ySpawn = settings.ySpawn;
   },
           
   onCollision: function(){
       this.collidable = false;
       var x = this.xSpawn;
       var y = this.ySpawn;
       me.levelDirector.loadLevel(this.level);
       me.state.current().resetPlayer(x, y);
   }
   
   
});

game.PlayerBaseEntity = me.ObjectEntity.extend({
    
   init: function(x, y, settings){
       settings.image = "tower";
       settings.spritewidth = "100";
       settings.spriteheight = "100";
       settings.width = 100;
       settings.height = 100;
       this.parent(x, y, settings);
       this.broken = false;
       this.health = 100;
       this.collidable = true;
       this.team = false;
       this.alwaysUpdate = true;
       
       this.cacheBounds = new me.Rect(new me.Vector2d(), 0, 0);
       
       this.renderable.addAnimation("idle", [0]);
       this.renderable.addAnimation("broken", [1]);
       
       this.collidable = true;
       this.type = "PlayerBaseEntity";
   },
   
   update: function(){
       if (this.health <= 0){
           this.broken = true;
           me.state.change(me.state.GAMEOVER, false);
       }
       
       if(this.broken && !this.renderable.isCurrentAnimation("broken")){
           this.renderable.setCurrentAnimation("broken");
       }
       
       return true;
      
      
       
   },
           
   loseHealth: function(dmg){
       console.log("ouch" + this.health);
       this.health = this.health - dmg;
   },
   
   onCollision: function(object){
       if(object.type === me.game.PlayerEntity){
           
       }
           
   }
   
});

game.EnemyBaseEntity = me.ObjectEntity.extend({
    
   init: function(x, y, settings){
       settings.image = "tower";
       settings.spritewidth = "100";
       settings.spriteheight = "100";
       settings.width = 100;
       settings.height = 100;
       this.parent(x, y, settings);
       this.broken = false;
       this.health = 100;
       this.collidable = true;
       this.team = false;
       this.alwaysUpdate = true;
       
       this.cacheBounds = new me.Rect(new me.Vector2d(), 0, 0);
       
       this.renderable.addAnimation("idle", [0]);
       this.renderable.addAnimation("broken", [1]);
       
       this.collidable = true;
       this.type = "EnemyBaseEntity";
   },
   
   update: function(){
       if (this.health <= 0){
           this.broken = true;
           me.state.change(me.state.GAMEOVER, true);
       }
       
       if(this.broken && !this.renderable.isCurrentAnimation("broken")){
           this.renderable.setCurrentAnimation("broken");
       }
       
       return true;
      
      
       
   },
           
   loseHealth: function(dmg){
       console.log("ouch");
       this.health = this.health - dmg;
   },
   
   onCollision: function(object){
       if(object.type === me.game.PlayerEntity){
           
       }
           
   }
   
});

game.miniPlayerLocation = me.SpriteObject.extend({
   init : function (x, y, r, settings) {
       this.settings2 = settings;
       this.r = r;
       this.x = x;
       this.y = y;
       this.anchorPoint = new me.Vector2d(0, 0);
       this.loc = x, y;
       this.settings2.image = document.createElement("canvas");
       this.settings2.image.width = (r + 2) * 2;
       this.settings2.image.height = (r + 2) * 2;
       this.settings2.image.spriteheight = (r + 2) * 2;
       this.settings2.image.spritewidth = (r + 2) * 2;
       
       this.floating = true;
       this.z = 30;
       this.context = this.settings2.image.getContext("2d");
       
       var ctx = settings.image.getContext("2d");
       ctx.fillStyle = "rgba(0, 192, 32, 0.75)";
       ctx.strokeStyle = "blue";
       ctx.lineWidth = 2;
       
       ctx.arc(r + 2, r + 2, r, 0, Math.PI*2);
       ctx.fill();
       ctx.stroke();
       this.changeX;
       this.changeY;
       
       this.parent(x, y, this.settings2.image, this.settings2.spritewidth, this.settings2.spriteheight);
   },
           
   update: function(){
       
        this.pos.x = (10 + (game.data.player.pos.x *0.062));
        this.pos.y = (10 + (game.data.player.pos.y *0.06));
        
        return true;
   } 
   
});

game.MiniMap = me.ObjectEntity.extend({
    
    init: function (x, y, settings){
        
       settings.image = "miniMap2";
       settings.spritewidth = "701";
       settings.spriteheight = "115";
       settings.width = 701;
       settings.height = 115;
       this.parent(x, y, settings);
        
        
       this.floating = true;
        this.anchorPoint = new me.Vector2d(0,0);
        this.last = new Date().getTime();
        this.now = new Date().getTime();
    },
            
    
    
    /*draw : function(context){

        context.save();

//      context.beginPath();
//
//      context.arc(10,10,100,0,Math.PI*2,true);
        context.rect(10, 10, 200, 200);

        context.clip();

        this.parent(context);

        context.restore();

    }*/
    
     update: function (){
    }
});

game.EnemyCreep = me.ObjectEntity.extend({
    init: function(x, y, settings){
       settings.image = "creep2";
       settings.spritewidth = "32";
       settings.spriteheight = "64";
       settings.width = 32;
       settings.height = 64;
       this.parent(x, y, settings);
       this.last = new Date().getTime();
       this.now = new Date().getTime();
       this.collidable = true;
       this.alwaysUpdate = true;
       this.attack = false;
       this.jumping = false;
       this.health = 10;
       
       this.lastHit = new Date().getTime();
       
       this.setVelocity(3, 20);
       
       this.renderable.addAnimation("idle", [0]);
       this.renderable.addAnimation("attack", [0]);
       this.renderable.addAnimation("walk", [3, 4, 5]);
       
       this.renderable.setCurrentAnimation("walk");
    },
            
   loseHealth: function(dmg){
       console.log("ouch");
       this.health = this.health - dmg;
   },
    
    update: function(){
        var collision = me.game.world.collide(this);
        
        if(collision && collision.obj.type === "PlayerBaseEntity"){
            this.now = new Date().getTime();
            console.log("Boing1");
            this.attack = true;
            this.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            if((this.now-this.lastHit >= 1000)){
                this.lastHit = this.now;
                collision.obj.loseHealth(1);
            }
        }
        else if(collision && collision.obj.type === "PlayerEntity"){
            this.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            this.attack = true;
        }
        else if(collision && collision.obj.type === "PlayerCreep"){
            this.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            this.attack = false;
        }
        else{
            this.vel.x -= this.accel.x * me.timer.tick;
            this.attack = false;
        }
        
        if(this.vel.x === 0 && this.attack === false&& !this.jumping && !this.falling){
                this.jumping = true;
                this.vel.y -= this.accel.y * me.timer.tick;
            
        }
        
        this.updateMovement();
    }
});

game.PlayerCreep = me.ObjectEntity.extend({
    init: function(x, y, settings){
       settings.image = "creep1";
       settings.spritewidth = "100";
       settings.spriteheight = "85";
       settings.width = 100;
       settings.height = 85;
       this.parent(x, y, settings);
       this.last = new Date().getTime();
       this.now = new Date().getTime();
       this.alwaysUpdate = true;
       this.collidable = true;
       this.health = 10;
       
       this.setVelocity(3, 20);
       
       this.renderable.addAnimation("idle", [0]);
    },
    
     loseHealth: function(dmg){
       console.log("ouch");
       this.health = this.health - dmg;
   },
    
    update: function(){
        
        this.vel.x += this.accel.x * me.timer.tick;
        this.updateMovement();
    }
});

game.GameManager = me.ObjectEntity.extend({
   init: function (x, y, settings){
       this.last = new Date().getTime();
       this.lastCreep = new Date().getTime();
       this.lastPause = new Date().getTime();
       this.now = new Date().getTime();
       this.toggle = true;
       this.paused = false;
       this.alwaysUpdate = true;
       this.updateWhenPaused = true;
       this.pausePos = 0, 0;
       this.screenDrawn = false;
       
       settings.width = 701;
       settings.height = 115;
       
       this.parent(x, y, settings);
   },
   
   update: function(delta){
        this.now = new Date().getTime();
                
                if((Math.round(this.now/1000))%10 === 0 && (this.now - this.lastCreep >= 1000)){
                        this.lastCreep = this.now;
                        game.data.creepe = me.pool.pull("creepE", 1900, 1670, {});
                        me.game.world.addChild(game.data.creepe, 31);
                }   

                if(me.input.isKeyPressed("toggleMap")){
                    if (this.toggle === true && (this.now-this.last >= 1000)){       
                        this.last = this.now;
                        this.toggle = false;
                        me.game.world.removeChild(game.data.minimap);
                        me.game.world.removeChild(game.data.miniplayer);

                    }
                    else if(this.toggle === false && this.now-this.last >= 1000){
                        this.last = this.now;
                        this.toggle = true;       
                        game.data.minimap = me.pool.pull("miniMap", 10, 10, {});
                        game.data.miniplayer = me.pool.pull("miniPlayer", 10, 10, 5, {});
                        me.game.world.addChild(game.data.minimap, 30);
                        me.game.world.addChild(game.data.miniplayer, 31);

                    }
                }
                
                if(me.input.isKeyPressed("buy")){
                    me.state.change(me.state.SPENDGOLD);
                }
                
                if(me.input.isKeyPressed("pause") && !this.paused && this.now-this.lastPause >= 1000){
                    this.paused = true;
                    this.pausePos = me.game.viewport.localToWorld(0, 0);
                    console.log(this.pausePos.x + " " + this.pausePos.y);
                    game.data.pausescreen = new me.SpriteObject (this.pausePos.x, this.pausePos.y, me.loader.getImage('pause'));
                    this.drawPause();
                    this.lastPause = this.now;
                    if(this.screenDrawn){
                        this.pause();
                    }
                }
                else if(me.input.isKeyPressed("pause") && this.paused && this.now-this.lastPause >= 1000){
                    this.paused = false;
                    me.state.resume(me.state.PLAY);
                    this.lastPause = this.now;
                    this.screenDrawn = false;
                    me.game.world.removeChild(game.data.pausescreen);
                }
                
            this.parent(delta);
            return true;
   },    
           
    drawPause: function(){
        console.log("Drawn?");
        me.game.world.addChild( game.data.pausescreen, 20000);
        this.screenDrawn = true;
    },       
   
    pause: function(){
        console.log("pause");
        me.state.pause(me.state.PLAY);
    },
});