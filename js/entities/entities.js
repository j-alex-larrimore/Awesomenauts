game.PlayerEntity = me.ObjectEntity.extend({
   init: function (x, y, settings){
       settings.image = "player-img";
       settings.spritewidth = "70";
       settings.spriteheight = "80";
       settings.width = 70;
       settings.height = 80;
       this.parent(x, y, settings);
       this.last = new Date().getTime();
       this.now = new Date().getTime();
       this.lastHit = new Date().getTime();
       this.facing = "right";
       this.type = me.game.PlayerEntity;
       this.maxHealth = 10;
       this.health = 10;
       
       this.collidable = true;
       
       this.renderable.addAnimation("idle", [0]);
       this.renderable.addAnimation("attack", [4, 5, 6, 7], 80);
       //this.renderable.addAnimation("run", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 30);
       this.renderable.setCurrentAnimation("idle");
       
       this.setVelocity(5, 20);
       
       me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
   }, 
           
  
          
    
   update: function(delta){
         
       if(me.input.isKeyPressed("right")){
           this.facing = "right";
           this.vel.x += this.accel.x * me.timer.tick;
           this.flipX(false);
           
       }
       else if(me.input.isKeyPressed("left")){
           this.facing = "left";
           this.flipX(true);
           this.vel.x -= this.accel.x * me.timer.tick;
       }
       else{
           this.vel.x = 0;
       }
       
       if(this.vel.x !== 0){
         //   if(!this.renderable.isCurrentAnimation("run")){
         //       this.renderable.setCurrentAnimation("run");
         //       this.renderable.setAnimationFrame();
         //  }
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
           if(collision.obj.type === me.game.BaseEntity){
               var ydif = this.pos.y - collision.obj.pos.y;
               var xdif = this.pos.x - collision.obj.pos.x;
               if(ydif < -70){
                   this.falling = false;
                   this.vel.y = 0;
                   this.pos.y = this.pos.y - 1;
               }
              else if((xdif > 0)&&(ydif > -70)){
                this.vel.x = 0;
                this.pos.x = this.pos.x + 1;
               }
               else if((xdif < 0)&&(ydif > -70)){
                   this.vel.x = 0;
                   this.pos.x = this.pos.x - 1;
               }
               
               if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 800 && (Math.abs(this.pos.y-collision.obj.pos.y)<=30)){
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

game.BaseEntity = me.ObjectEntity.extend({
    
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
       
       this.cacheBounds = new me.Rect(new me.Vector2d(), 0, 0);
       
       this.renderable.addAnimation("idle", [0]);
       this.renderable.addAnimation("broken", [1]);
       
       this.collidable = true;
       this.type = me.game.BaseEntity;
   },
   
   update: function(){
       if (this.health <= 0){
           this.broken = true;
       }
       
       if(this.broken && !this.renderable.isCurrentAnimation("broken")){
           this.renderable.setCurrentAnimation("broken");
       }
      
      
       
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

var miniPlayerLocation = me.SpriteObject.extend({
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
   } 
   
});