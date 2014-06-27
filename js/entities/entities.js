game.PlayerEntity = me.ObjectEntity.extend({
   init: function (x, y, settings){
       settings.image = "player-img";
       settings.spritewidth = "70";
       settings.spriteheight = "80";
       settings.width = 70;
       settings.height = 80;
       this.parent(x, y, settings);
       
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
           this.vel.x += this.accel.x * me.timer.tick;
           this.flipX(false);
       }
       else if(me.input.isKeyPressed("left")){
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
           if(!this.renderable.isCurrentAnimation("attack")){
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
           if(collision.obj.type === me.game.BaseEntity){
               if(this.renderable.isCurrentAnimation("attack")){
                   console.log("ouch1");
                   //me.game.BaseEntity.loseHealth(1);
                  // base.loseHealth(1);
                  collision.obj.loseHealth(1);
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
   }
   
});