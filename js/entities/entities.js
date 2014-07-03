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
       this.maxHealth = 10;
       this.health = 10;
       this.team = true;
       
       this.collidable = true;
       
       this.renderable.addAnimation("idle", [78]);
       this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
       this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
       this.renderable.setCurrentAnimation("idle");
       
       this.setVelocity(5, 20);
       
       me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
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
                        collision.obj.loseHealth(1);
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
       this.health = 5;
       this.collidable = true;
       this.team = false;
       
       this.cacheBounds = new me.Rect(new me.Vector2d(), 0, 0);
       
       this.renderable.addAnimation("idle", [0]);
       this.renderable.addAnimation("broken", [1]);
       
       this.collidable = true;
       this.type = "PlayerBaseEntity";
   },
   
   update: function(){
       if (this.health <= 0){
           this.broken = true;
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

game.EnemyBaseEntity = me.ObjectEntity.extend({
    
   init: function(x, y, settings){
       settings.image = "tower";
       settings.spritewidth = "100";
       settings.spriteheight = "100";
       settings.width = 100;
       settings.height = 100;
       this.parent(x, y, settings);
       this.broken = false;
       this.health = 5;
       this.collidable = true;
       this.team = false;
       
       this.cacheBounds = new me.Rect(new me.Vector2d(), 0, 0);
       
       this.renderable.addAnimation("idle", [0]);
       this.renderable.addAnimation("broken", [1]);
       
       this.collidable = true;
       this.type = "EnemyBaseEntity";
   },
   
   update: function(){
       if (this.health <= 0){
           this.broken = true;
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
       
       this.setVelocity(3, 20);
       
       this.renderable.addAnimation("idle", [0]);
    },
    
    update: function(){
        
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
       this.collidable = true;
       
       this.setVelocity(3, 20);
       
       this.renderable.addAnimation("idle", [0]);
    },
    
    update: function(){
        
    }
});