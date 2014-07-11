game.PlayerEntity = me.ObjectEntity.extend({
   init: function (x, y, settings){
       settings.spritewidth = "64";
       settings.spriteheight = "64";
       settings.width = 64;
       settings.height = 64;
       
       if(game.data.character === 1){           
           console.log("archer");
           settings.image = "archer";
           this.parent(x, y, settings);
           this.maxHealth = 1;
           this.attack = 20;
           this.defense = 0;
           this.setVelocity(20, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(game.data.character === 2){
           console.log("darkelf");
           settings.image = "darkelf";
           this.parent(x, y, settings);
           this.maxHealth = 1;
           this.attack = 20;
           this.defense = 0;
           this.setVelocity(20, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);                    //ASK MOISES
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(game.data.character === 3){
           console.log("orc");
           settings.image = "orcSpear";
           this.parent(x, y, settings);
           this.maxHealth = 100;
           this.attack = 20;
           this.defense = 0;
           this.setVelocity(20, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(game.data.character === 4){
           console.log("wizard");
           settings.image = "wizard";
           this.parent(x, y, settings);
           this.maxHealth = 100;
           this.attack = 20;
           this.defense = 0;
           this.setVelocity(20, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [169, 170, 171, 172, 173, 174], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(game.data.character === 5){
           console.log("skeleton");
           settings.image = "skeletonBigSword";
           this.parent(x, y, settings);
           this.maxHealth = 100;
           this.attack = 20;
           this.defense = 0;
           this.setVelocity(20, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);        //ASK MOISES
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else{
           console.log("Character select ERROR");
       }
       
       this.deathtimer = new Date().getTime();
       this.last = new Date().getTime();
       this.now = new Date().getTime();
       this.lastHit = new Date().getTime();
       this.dead = false;
       this.health = this.maxHealth;
       this.facing = "right";
       this.type = "PlayerEntity";
       this.team = true;
       
       this.collidable = true;
       
       me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
   }, 
           
   loseHealth: function(dmg){
       this.health = this.health - dmg;
   }, 
          
    
   update: function(delta){
           this.now = new Date().getTime();
         
       if (this.health <= 0){
           if(this.dead === false){
                this.deathtimer = new Date().getTime();
                this.renderable.setCurrentAnimation("die");
                this.renderable.setAnimationFrame();
                this.dead = true;
           }
           else if(this.now - this.deathtimer > 480){
               this.renderable.setCurrentAnimation("idle");
               this.pos.x = 10;
               this.pos.y = 150;
               this.health = this.maxHealth;
               this.dead = false;
           }
           else{
           }
           
           
           //me.state.change(me.state.GAMEOVER, false);
       }
         
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
       else if(!this.renderable.isCurrentAnimation("attack") && !this.renderable.isCurrentAnimation("die")){
           this.renderable.setCurrentAnimation("idle");
       }
       
       if(me.input.isKeyPressed("attack")){
           if(!this.renderable.isCurrentAnimation("attack") && !this.renderable.isCurrentAnimation("die") && (this.now-this.last >= 1000)){
               this.last = this.now;
               this.renderable.setCurrentAnimation("attack", "idle");
               this.renderable.setAnimationFrame();
           }
       }
       
       if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling){
            this.jumping = true;
            this.vel.y -= this.accel.y * me.timer.tick;
       }
       
       //var collision = me.game.world.collide(this);
        var bcollision = me.game.world.collideType(this, "EnemyBaseEntity");
        var pcollision = me.game.world.collideType(this, "EnemyEntity");
        var ccollision = me.game.world.collideType(this, "EnemyCreep");
        this.now = new Date().getTime();
       
        if(bcollision){
            var ydif = this.pos.y - bcollision.obj.pos.y;
            var xdif = this.pos.x - bcollision.obj.pos.x;
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
        
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 800 && (Math.abs(this.pos.y-bcollision.obj.pos.y)<=40)){
                if((this.facing === "left" && (this.pos.x > bcollision.obj.pos.x))||(this.facing === "right" && (this.pos.x < bcollision.obj.pos.x))){
                    this.lastHit = this.now;
                    bcollision.obj.loseHealth(20);
                }
            }
       }
       
       if(pcollision){
           
       }
       
       if(ccollision){
           var ydif = this.pos.y - ccollision.obj.pos.y;
           var xdif = this.pos.x - ccollision.obj.pos.x;
           if(xdif > 0){
               this.vel.x = 0;
               this.pos.x = this.pos.x + 1;
           }
           else{
               this.vel.x = 0;
               this.pos.x = this.pos.x - 1;
           }
           
           if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000 && (Math.abs(this.pos.y-ccollision.obj.pos.y)<=40)){
                if((this.facing === "left" && (this.pos.x > ccollision.obj.pos.x))||(this.facing === "right" && (this.pos.x < ccollision.obj.pos.x))){
                    this.lastHit = this.now;
                    ccollision.obj.loseHealth(10);
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

game.miniEnemyLocation = me.SpriteObject.extend({
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
       ctx.fillStyle = "red";
       ctx.strokeStyle = "yellow";
       ctx.lineWidth = 2;
       
       ctx.arc(r + 2, r + 2, r, 0, Math.PI*2);
       ctx.fill();
       ctx.stroke();
       this.changeX;
       this.changeY;
       
       this.parent(x, y, this.settings2.image, this.settings2.spritewidth, this.settings2.spriteheight);
   },
           
   updateMini: function(x, y){
       
        this.pos.x = (10 + (x * 0.062));
        this.pos.y = (10 + (y * 0.06));
        
        return true;
   } 
   
});

game.miniTeammateLocation = me.SpriteObject.extend({
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
       ctx.fillStyle = "green";
       ctx.strokeStyle = "blue";
       ctx.lineWidth = 2;
       
       ctx.arc(r + 2, r + 2, r, 0, Math.PI*2);
       ctx.fill();
       ctx.stroke();
       this.changeX;
       this.changeY;
       
       this.parent(x, y, this.settings2.image, this.settings2.spritewidth, this.settings2.spriteheight);
   },
           
   updateMini: function(x, y){
       
        this.pos.x = (10 + (x * 0.062));
        this.pos.y = (10 + (y * 0.06));
        
        return true;
   } 
   
});

game.miniPCreepLocation = me.SpriteObject.extend({
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
       ctx.fillStyle = "green";
       ctx.strokeStyle = "blue";
       ctx.lineWidth = 1;
       
       ctx.arc(r + 2, r + 2, r, 0, Math.PI*2);
       ctx.fill();
       ctx.stroke();
       this.changeX;
       this.changeY;
       
       this.parent(x, y, this.settings2.image, this.settings2.spritewidth, this.settings2.spriteheight);
   },
           
   updateMini: function(x, y){
        this.pos.x = (10 + (x * 0.062));
        this.pos.y = (10 + (y * 0.06));
       
//        this.pos.x = (10 + (game.data.player.pos.x *0.062));
//        this.pos.y = (10 + (game.data.player.pos.y *0.06));
        
        return true;
   } 
   
});

game.miniECreepLocation = me.SpriteObject.extend({
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
       ctx.fillStyle = "red";
       ctx.strokeStyle = "yellow";
       ctx.lineWidth = 1;
       
       ctx.arc(r + 2, r + 2, r, 0, Math.PI*2);
       ctx.fill();
       ctx.stroke();
       this.changeX;
       this.changeY;
       
       this.parent(x, y, this.settings2.image, this.settings2.spritewidth, this.settings2.spriteheight);
   },
           
   updateMini: function(x, y){
       
       this.pos.x = (10 + (x * 0.062));
       this.pos.y = (10 + (y * 0.06));
       
//        this.pos.x = (10 + (game.data.player.pos.x *0.062));
//        this.pos.y = (10 + (game.data.player.pos.y *0.06));
        
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
       this.type = "EnemyCreep";
       this.lastPosX = x;
       
       this.lastHit = new Date().getTime();
       
       this.setVelocity(7, 20);
       
       //this.mini = new game.miniECreepLocation(10, 10, 3, {}); //game.data.miniplayer = me.pool.pull("miniPlayer", 10, 10, 5, {});
       this.mini = me.pool.pull("miniECreep", 10, 10, 3, {});
       me.game.world.addChild(this.mini, 31);
       
       this.renderable.addAnimation("idle", [0]);
       this.renderable.addAnimation("attack", [0]);
       this.renderable.addAnimation("walk", [3, 4, 5]);
       
       this.renderable.setCurrentAnimation("walk");
    },
            
   loseHealth: function(dmg){
       this.health = this.health - dmg;
   },
    
   update: function(delta){
       this.now = new Date().getTime();
       this.mini.updateMini(this.pos.x, this.pos.y);
       
        if (this.health <= 0){
           me.game.world.removeChild(this.mini); 
           me.game.world.removeChild(this);
        }
        
        var bcollision = me.game.world.collideType(this, "PlayerBaseEntity");
        var pcollision = me.game.world.collideType(this, "PlayerEntity");
        var ccollision = me.game.world.collideType(this, "PlayerCreep");
        var tcollision = me.game.world.collideType(this, "PlayerTeammate");
        
        if(bcollision){
            this.attack = true;
            this.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            if((this.now-this.lastHit >= 1000)){
                this.lastHit = this.now;
                bcollision.obj.loseHealth(1);
            }
        }
        else if(pcollision){
             var ydif = this.pos.y - pcollision.obj.pos.y;
             var xdif = this.pos.x - pcollision.obj.pos.x;
             this.vel.x = 0;             
             this.attack = true; 
             if((this.now-this.lastHit >= 1000) && !pcollision.obj.renderable.isCurrentAnimation("attack")){
                this.lastHit = this.now;
                pcollision.obj.loseHealth(1);
             }
             
             if(xdif > 0){
                 this.pos.x = this.pos.x + 1;
             }
             else{
                 this.pos.x = this.pos.x - 1;
             }
                 
        }
        else if(tcollision){
             var ydif = this.pos.y - tcollision.obj.pos.y;
             var xdif = this.pos.x - tcollision.obj.pos.x;
             this.vel.x = 0;             
             this.attack = true; 
             if((this.now-this.lastHit >= 1000) && !tcollision.obj.renderable.isCurrentAnimation("attack")){
                this.lastHit = this.now;
                tcollision.obj.loseHealth(1);
             }
             
             if(xdif > 0){
                 this.pos.x = this.pos.x + 1;
             }
             else{
                 this.pos.x = this.pos.x - 1;
             }
                 
        }
        else if(ccollision){
            this.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            this.attack = true;
            if((this.now-this.lastHit >= 1000)){
                this.lastHit = this.now;
                ccollision.obj.loseHealth(1);
             }
        }
        else{
            this.vel.x -= this.accel.x * me.timer.tick;
        }        

        if(this.pos.x === this.lastPosX && this.attack === false && !this.jumping && !this.falling && (this.now-this.lastHit >= 3000)){
                this.jumping = true;
                this.vel.y -= this.accel.y * me.timer.tick;
                //this.vel.x -= this.accel.x * me.timer.tick;
            
        }
        this.attack = false;
        this.lastPosX = this.pos.x;
        this.parent(delta);
        this.updateMovement();
        return true;
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
       this.lastHit = new Date().getTime();
       this.alwaysUpdate = true;
       this.collidable = true;
       this.health = 5;
       this.type = "PlayerCreep";
       this.lastPosX = x;
       
       this.setVelocity(3, 20);
       
       //this.mini = new game.miniPCreepLocation(10, 10, 3, {}); //game.data.miniplayer = me.pool.pull("miniPlayer", 10, 10, 5, {});
       this.mini = me.pool.pull("miniPCreep", 10, 10, 3, {});
       me.game.world.addChild(this.mini, 31);
       
       this.flipX(true);
       this.renderable.addAnimation("idle", [0]);
       this.renderable.addAnimation("move", [0, 1, 2, 3, 4]);
       this.renderable.addAnimation("attack", [6, 7, 8, 9]);
       this.renderable.setCurrentAnimation("move");
       this.renderable.setAnimationFrame();
    },
    
     loseHealth: function(dmg){
       this.health = this.health - dmg;
   },
    
    update: function(delta){
       this.now = new Date().getTime();
       this.mini.updateMini(this.pos.x, this.pos.y);
       
        if (this.health <= 0){
           me.game.world.removeChild(this.mini); 
           me.game.world.removeChild(this);
        }
        
        var bcollision = me.game.world.collideType(this, "EnemyBaseEntity");
        var pcollision = me.game.world.collideType(this, "EnemyEntity");
        var ccollision = me.game.world.collideType(this, "EnemyCreep");
        
        if(bcollision){
            this.attack = true;
            this.vel.x = 0;
            this.pos.x = this.pos.x - 1;
            if((this.now-this.lastHit >= 1000)){
                this.lastHit = this.now;
                bcollision.obj.loseHealth(this.attack);
                if(!this.renderable.isCurrentAnimation("attack")){
                    this.renderable.setCurrentAnimation("attack", "move");
                    this.renderable.setAnimationFrame();
                }
            }
        }
        else if(pcollision){
             var ydif = this.pos.y - pcollision.obj.pos.y;
             var xdif = this.pos.x - pcollision.obj.pos.x;
             this.vel.x = 0;             
             this.attack = true; 
             if((this.now-this.lastHit >= 1000) && !pcollision.obj.renderable.isCurrentAnimation("attack")){
                this.lastHit = this.now;
                pcollision.obj.loseHealth(this.attack);
             }
             
             if(xdif > 0){
                 this.pos.x = this.pos.x + 1;
             }
             else{
                 this.pos.x = this.pos.x - 1;
             }
        }
        else if(ccollision){
            this.vel.x = 0;
            this.pos.x = this.pos.x - 1;
            this.attack = true;
            if((this.now-this.lastHit >= 1000)){
                this.lastHit = this.now;
                ccollision.obj.loseHealth(this.attack);
                if(!this.renderable.isCurrentAnimation("attack")){
                    this.renderable.setCurrentAnimation("attack", "move");
                    this.renderable.setAnimationFrame();
                }
             }
        }
        else{
            this.vel.x += this.accel.x * me.timer.tick;
        }        

        if(this.pos.x === this.lastPosX && this.attack === false && !this.jumping && !this.falling && (this.now-this.lastHit >= 3000)){
                this.jumping = true;
                this.vel.y -= this.accel.y * me.timer.tick;
                //this.vel.x -= this.accel.x * me.timer.tick;
            
        }
        this.attack = false;
        this.lastPosX = this.pos.x;
        this.parent(delta);
        this.updateMovement();
        return true;
    }
});

game.EnemyEntity = me.ObjectEntity.extend({
    init: function(x, y, settings){
       settings.spritewidth = "64";
       settings.spriteheight = "64";
       settings.width = 64;
       settings.height = 64;
       var char = Math.floor(Math.random()* 5)+1;
       
       
       if(char === 1){           
           console.log("archer");
           settings.image = "archer";
           this.parent(x, y, settings);
           this.maxHealth = 1;
           this.attack = 20;
           this.defense = 0;
           this.setVelocity(4, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 2){
           console.log("darkelf");
           settings.image = "darkelf";
           this.parent(x, y, settings);
           this.maxHealth = 1;
           this.attack = 20;
           this.defense = 0;
           this.setVelocity(5, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);                    //ASK MOISES
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 3){
           console.log("orc");
           settings.image = "orcSpear";
           this.parent(x, y, settings);
           this.maxHealth = 100;
           this.attack = 20;
           this.defense = 0;
           this.setVelocity(6, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 4){
           console.log("wizard");
           settings.image = "wizard";
           this.parent(x, y, settings);
           this.maxHealth = 100;
           this.attack = 20;
           this.defense = 0;
           this.setVelocity(3, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [169, 170, 171, 172, 173, 174], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 5){
           console.log("skeleton");
           settings.image = "skeletonBigSword";
           this.parent(x, y, settings);
           this.maxHealth = 100;
           this.attack = 20;
           this.defense = 0;
           this.setVelocity(2, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);        //ASK MOISES
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else{
           console.log("Character select ERROR");
       }
       
       this.renderable.setCurrentAnimation("run");
       this.deathtimer = new Date().getTime();
       this.last = new Date().getTime();
       this.now = new Date().getTime();
       this.lastHit = new Date().getTime();
       this.dead = false;
       this.health = this.maxHealth;
       this.type = "EnemyEntity";
       this.alwaysUpdate = true;
       this.collidable = true;
       this.lastPosX = this.pos.x;
       
       //this.mini = new game.miniEnemyLocation(10, 10, 5, {}); //game.data.miniplayer = me.pool.pull("miniPlayer", 10, 10, 5, {});
       this.mini = me.pool.pull("miniEnemy", 10, 10, 5, {});
       me.game.world.addChild(this.mini, 31);
       
       //this.flipX(true);
    },
    
     loseHealth: function(dmg){
       this.health = this.health - dmg;
   },
    
    update: function(delta){
       this.now = new Date().getTime();
       this.mini.updateMini(this.pos.x, this.pos.y);
       
        if (this.health <= 0){
            if(this.dead === false){
                this.deathtimer = new Date().getTime();
                this.renderable.setCurrentAnimation("die");
                this.renderable.setAnimationFrame();
                this.dead = true;
           }
           else if(this.now - this.deathtimer > 480){
               this.renderable.setCurrentAnimation("run");
               this.pos.x = 10;
               this.pos.y = 150;
               this.health = this.maxHealth;
               this.dead = false;
           }
           else{
           }
           
           
            
//           me.game.world.removeChild(this.mini); 
//           me.game.world.removeChild(this);
        }
        
        var bcollision = me.game.world.collideType(this, "PlayerBaseEntity");
        var pcollision = me.game.world.collideType(this, "PlayerEntity");
        var ccollision = me.game.world.collideType(this, "PlayerCreep");
        var tcollision = me.game.world.collideType(this, "PlayerTeammate");
        
        if(bcollision){
            this.attack = true;
            this.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            if((this.now-this.lastHit >= 1000)){
                this.lastHit = this.now;
                bcollision.obj.loseHealth(this.attack);
                if(!this.renderable.isCurrentAnimation("attack")){
                    this.renderable.setCurrentAnimation("attack", "run");
                    this.renderable.setAnimationFrame();
                }
            }
        }
        else if(pcollision){
            var ydif = this.pos.y - pcollision.obj.pos.y;
            var xdif = this.pos.x - pcollision.obj.pos.x;
             this.vel.x = 0;
             this.pos.x = this.pos.x - 1;
             this.attack = true; 
             if((this.now-this.lastHit >= 1000)){
                this.lastHit = this.now;
                pcollision.obj.loseHealth(this.attack);
                if(!this.renderable.isCurrentAnimation("attack")){
                    this.renderable.setCurrentAnimation("attack", "run");
                    this.renderable.setAnimationFrame();
                }
             }
        }
        else if(tcollision){
             var ydif = this.pos.y - tcollision.obj.pos.y;
             var xdif = this.pos.x - tcollision.obj.pos.x;
             this.vel.x = 0;             
             this.attack = true; 
             if((this.now-this.lastHit >= 1000) && !tcollision.obj.renderable.isCurrentAnimation("attack")){
                this.lastHit = this.now;
                tcollision.obj.loseHealth(this.attack);
             }
             
             if(xdif > 0){
                 this.pos.x = this.pos.x + 1;
             }
             else{
                 this.pos.x = this.pos.x - 1;
             }
                 
        }
        else if(ccollision){
            this.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            this.attack = true;
            if((this.now-this.lastHit >= 1000)){
                this.lastHit = this.now;
                ccollision.obj.loseHealth(this.attack);
                if(!this.renderable.isCurrentAnimation("attack")){
                    this.renderable.setCurrentAnimation("attack", "run");
                    this.renderable.setAnimationFrame();
                }
             }
        }
        else{
            this.vel.x -= this.accel.x * me.timer.tick;
        }        

        if(this.pos.x === this.lastPosX && this.attack === false && !this.jumping && !this.falling && (this.now-this.lastHit >= 3000)){
                this.jumping = true;
                this.vel.y -= this.accel.y * me.timer.tick;
                //this.vel.x -= this.accel.x * me.timer.tick;
            
        }
        this.attack = false;
        this.lastPosX = this.pos.x;
        this.parent(delta);
        this.updateMovement();
        return true;
    }
});

game.PlayerTeammate = me.ObjectEntity.extend({
    init: function(x, y, settings){
       settings.spritewidth = "64";
       settings.spriteheight = "64";
       settings.width = 64;
       settings.height = 64;
       var char = Math.floor(Math.random()* 5)+1;
       
       
       if(char === 1){           
           console.log("archer");
           settings.image = "archer";
           this.parent(x, y, settings);
           this.maxHealth = 1;
           this.attack = 20;
           this.defense = 0;
           this.setVelocity(4, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 2){
           console.log("darkelf");
           settings.image = "darkelf";
           this.parent(x, y, settings);
           this.maxHealth = 1;
           this.attack = 20;
           this.defense = 0;
           this.setVelocity(5, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);                    //ASK MOISES
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 3){
           console.log("orc");
           settings.image = "orcSpear";
           this.parent(x, y, settings);
           this.maxHealth = 100;
           this.attack = 20;
           this.defense = 0;
           this.setVelocity(6, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 4){
           console.log("wizard");
           settings.image = "wizard";
           this.parent(x, y, settings);
           this.maxHealth = 100;
           this.attack = 20;
           this.defense = 0;
           this.setVelocity(3, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [169, 170, 171, 172, 173, 174], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 5){
           console.log("skeleton");
           settings.image = "skeletonBigSword";
           this.parent(x, y, settings);
           this.maxHealth = 100;
           this.attack = 20;
           this.defense = 0;
           this.setVelocity(2, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);        //ASK MOISES
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else{
           console.log("Character select ERROR");
       }
       
       this.renderable.setCurrentAnimation("run");
       this.deathtimer = new Date().getTime();
       this.last = new Date().getTime();
       this.now = new Date().getTime();
       this.lastHit = new Date().getTime();
       this.dead = false;
       this.health = this.maxHealth;
       this.type = "PlayerTeammate";
       this.alwaysUpdate = true;
       this.collidable = true;
       this.lastPosX = this.pos.x;
       
       //this.mini = new game.miniTeammateLocation(10, 10, 5, {}); //game.data.miniplayer = me.pool.pull("miniPlayer", 10, 10, 5, {});
       this.mini = me.pool.pull("miniTeammate", 10, 10, 5, {});
       me.game.world.addChild(this.mini, 31);
       
       this.flipX(true);
    },
    
     loseHealth: function(dmg){
        
       this.health = this.health - dmg;
       
   },
    
    update: function(delta){
       this.now = new Date().getTime();
       this.mini.updateMini(this.pos.x, this.pos.y);
       
        if (this.health <= 0){
           if(this.dead === false){
                this.deathtimer = new Date().getTime();
                this.renderable.setCurrentAnimation("die");
                this.renderable.setAnimationFrame();
                this.dead = true;
           }
           else if(this.now - this.deathtimer > 480){
               this.renderable.setCurrentAnimation("run");
               this.pos.x = 10;
               this.pos.y = 150;
               this.health = this.maxHealth;
               this.dead = false;
           }
           else{
           }
           
            
            
           //me.game.world.removeChild(this.mini); 
           //me.game.world.removeChild(this);
        }
        
        var bcollision = me.game.world.collideType(this, "EnemyBaseEntity");
        var pcollision = me.game.world.collideType(this, "EnemyEntity");
        var ccollision = me.game.world.collideType(this, "EnemyCreep");
        
        if(bcollision){
            this.attack = true;
            this.vel.x = 0;
            this.pos.x = this.pos.x - 1;
            if((this.now-this.lastHit >= 1000)){
                this.lastHit = this.now;
                bcollision.obj.loseHealth(1);
                if(!this.renderable.isCurrentAnimation("attack")){
                    this.renderable.setCurrentAnimation("attack", "run");
                    this.renderable.setAnimationFrame();
                }
            }
        }
        else if(pcollision){
            var ydif = this.pos.y - pcollision.obj.pos.y;
            var xdif = this.pos.x - pcollision.obj.pos.x;
             this.vel.x = 0;
             this.pos.x = this.pos.x - 1;
             this.attack = true; 
             if((this.now-this.lastHit >= 1000)){
                this.lastHit = this.now;
                pcollision.obj.loseHealth(1);
                if(!this.renderable.isCurrentAnimation("attack")){
                    this.renderable.setCurrentAnimation("attack", "run");
                    this.renderable.setAnimationFrame();
                }
             }
        }
        else if(ccollision){
            this.vel.x = 0;
            this.pos.x = this.pos.x - 1;
            this.attack = true;
            if((this.now-this.lastHit >= 1000)){
                this.lastHit = this.now;
                ccollision.obj.loseHealth(1);
                if(!this.renderable.isCurrentAnimation("attack")){
                    this.renderable.setCurrentAnimation("attack", "run");
                    this.renderable.setAnimationFrame();
                }
             }
        }
        else{
            this.vel.x += this.accel.x * me.timer.tick;
        }        

        if(this.pos.x === this.lastPosX && this.attack === false && !this.jumping && !this.falling && (this.now-this.lastHit >= 3000)){
                this.jumping = true;
                this.vel.y -= this.accel.y * me.timer.tick;
                //this.vel.x -= this.accel.x * me.timer.tick;
            
        }
        this.attack = false;
        this.lastPosX = this.pos.x;
        this.parent(delta);
        this.updateMovement();
        return true;
    }
});


game.GameManager = Object.extend({
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
       
   },
    
   update: function(){
        this.now = new Date().getTime();
                
                if((Math.round(this.now/1000))%10 === 0 && (this.now - this.lastCreep >= 1000)){
                        this.lastCreep = this.now;
                        game.data.creepe = me.pool.pull("creepE", 11000, 0, {});
                        game.data.creepp = me.pool.pull("creepP", 0, 0, {});
                        me.game.world.addChild(game.data.creepe, 5);
                        me.game.world.addChild(game.data.creepp, 5);
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
                    //this.pausePos = me.game.viewport.localToWorld(0, 0);
                    game.data.pausePos = me.game.viewport.localToWorld(0, 0);
                    game.data.pausescreen = new me.SpriteObject (game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('pause'));
                    game.data.pausescreen.updateWhenPaused = true;
                    me.game.world.addChild(game.data.pausescreen, 32);
                    this.lastPause = this.now;
                    console.log((game.data.pausePos.x) + " 1 " + (game.data.pausePos.y));
                    game.data.pauseText = new (me.Renderable.extend ({
                        init: function(){
                            this.parent(new me.Vector2d(game.data.pausePos.x, game.data.pausePos.y), 1, 1);
                            this.font = new me.BitmapFont("32x32_font", 32);
                            this.updateWhenPaused = true;
                            this.alwaysUpdate = true;
                            console.log((game.data.pausePos.x) + " 2 " + (game.data.pausePos.y));
                        },

                        draw: function(context){    
                            console.log((game.data.pausePos.x) + " 3 " + (game.data.pausePos.y ));
                            this.font.draw(context, "PRESS 'P' TO UNPAUSE", (game.data.pausePos.x + 270), (game.data.pausePos.y + 100));
                        }

                    }));
                    me.game.world.addChild(game.data.pauseText, 35);
                    me.state.pause(me.state.PLAY);
                }
                else if(me.input.isKeyPressed("pause") && this.paused && this.now-this.lastPause >= 1000){
                    this.paused = false;
                    me.state.resume(me.state.PLAY);
                    this.lastPause = this.now;
                    this.screenDrawn = false;
                    me.game.world.removeChild(game.data.pausescreen);
                    me.game.world.removeChild(game.data.pauseText);
                }
                return true;
   },    
     
});