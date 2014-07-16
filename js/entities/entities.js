game.PlayerEntity = me.ObjectEntity.extend({
   init: function (x, y, settings){
       settings.spritewidth = "64";
       settings.spriteheight = "64";
       settings.width = 64;
       settings.height = 64;
       
       if(game.data.character === 1){  
           settings.image = "archer";
           this.parent(x, y, settings);
           this.maxHealth = game.data.archerBaseHealth;
           this.attack = game.data.archerBaseDamage;
           this.defense = game.data.archerBaseDef;
           this.setVelocity(game.data.archerBaseSpeed, 20);
           game.data.mySpeed = game.data.archerBaseSpeed;
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(game.data.character === 2){
           settings.image = "darkelf";
           this.parent(x, y, settings);
           this.maxHealth = game.data.elfBaseHealth;
           this.attack = game.data.elfBaseDamage;
           this.defense = game.data.elfBaseDef;
           this.setVelocity(game.data.elfBaseSpeed, 20);
           game.data.mySpeed = game.data.elfBaseSpeed;
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [169, 170, 171, 172, 173, 174], 80);                    //ASK MOISES
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(game.data.character === 3){
           settings.image = "orcSpear";
           this.parent(x, y, settings);
           this.maxHealth = game.data.orcBaseHealth;
           this.attack = game.data.orcBaseDamage;
           this.defense = game.data.orcBaseDef;
           this.setVelocity(game.data.orcBaseSpeed, 20);
           game.data.mySpeed = game.data.orcBaseSpeed;
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(game.data.character === 4){
           settings.image = "wizard";
           this.parent(x, y, settings);
           this.maxHealth = game.data.wizardBaseHealth;
           this.attack = game.data.wizardBaseDamage;
           this.defense = game.data.wizardBaseDef;
           this.setVelocity(game.data.wizardBaseSpeed, 20);
           game.data.mySpeed = game.data.wizardBaseSpeed;
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [169, 170, 171, 172, 173, 174], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(game.data.character === 5){
           settings.image = "skeletonBigSword";
           this.parent(x, y, settings);
           this.maxHealth = game.data.skeletonBaseHealth;
           this.attack = game.data.skeletonBaseDamage;
           this.defense = game.data.skeletonBaseDef;
           this.setVelocity(game.data.skeletonBaseSpeed, 20);
           game.data.mySpeed = game.data.skeletonBaseSpeed;
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [169, 170, 171, 172, 173, 174], 80);       
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else{
           console.log("Character select ERROR");
       }
       
       this.attackspeed = 1;
       this.hitDelay = 1000;
       this.deathtimer = new Date().getTime();
       this.last = new Date().getTime();
       this.now = new Date().getTime();
       this.lastHit = new Date().getTime();
       this.dead = false;
       this.facing = "right";
       this.type = "PlayerEntity";
       this.skill1 = 0;                 //These six variables keep track of spent gold
       this.skill2 = 0;
       this.skill3 = 0;
       this.ability1 = 0;
       this.ability2 = 0;
       this.ability3 = 0;
       this.ability1CD = 0;
       this.ability2CD = 0;
       this.ability3CD = 0;
       this.team = true;
       this.range = 100;
       this.penetrate = false; //used for archer's first skill
       
       this.collidable = true;
              
       if(game.data.exp3 === 1){
           this.attack += 5;
       }
       else if(game.data.exp3 === 2){
           this.attack += 10;
       }
       else if(game.data.exp3 === 3){
           this.attack += 15;
       }
       else if(game.data.exp3 === 4){
           this.attack += 20;
       }
       
       if(game.data.exp4 === 1){
           this.maxHealth += 10;
       }
       else if(game.data.exp4 === 2){
           this.maxHealth += 20;
       }
       else if(game.data.exp4 === 3){
           this.maxHealth += 30;
       }
       else if(game.data.exp4 === 4){
           this.maxHealth += 40;
       }
       
       this.health = this.maxHealth;
       
       me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
   }, 
           
   loseHealth: function(dmg){
       dmg -= this.defense;
       if(dmg > 0){
        this.health = this.health - dmg;
       }
       else
           this.health --;
   },
           
   useAbility: function(num, level){
       this.now = new Date().getTime();
       
       if(game.data.character === 1){       //ARCHER
           if(num === 1){
               if (level === 1){
                   this.penetrate = true;
                   this.qTime = this.now + 5000;
                   this.ability1CD = this.now + 30000;
               }
               else if (level === 2){
                   this.penetrate = true;
                   this.qTime = this.now + 10000;
                   this.ability1CD = this.now + 30000;
               }
               else if (level === 3){
                   this.penetrate = true;
                   this.qTime = this.now + 15000;
                   this.ability1CD = this.now + 30000;
               }
           }
           else if (num === 2){
               if (level === 1){
                   this.ability2CD = this.now + 30000;
               }
               else if (level === 2){
                   this.ability2CD = this.now + 30000;
               }
               else if (level === 3){
                   this.ability2CD = this.now + 30000;
               }
           }
           else if (num === 3){
               if (level === 1){
                   
               }
               else if (level === 2){
                   
               }
               else if (level === 3){
                   
               }
           }
       }
       else if(game.data.character === 2){      //ELF
           
       }
       else if(game.data.character === 3){      //ORC
           
       }
       else if(game.data.character === 4){      //WIZARD
           if(num === 1){
               if (level === 1){
               }
               else if (level === 2){
               }
               else if (level === 3){
               }
           }
           else if (num === 2){
               if (level === 1){
                   this.fireball = me.pool.pull("fireball", this.pos.x + 32, this.pos.y + 26, {}, 30, 500, this.facing, 1);
                   me.game.world.addChild(this.fireball, 10);
                   this.ability2CD = this.now + 30000;
               }
               else if (level === 2){
                   this.fireball = me.pool.pull("fireball", this.pos.x + 32, this.pos.y + 26, {}, 60, 700, this.facing, 1);
                   me.game.world.addChild(this.fireball, 10);
                   this.ability2CD = this.now + 30000;
               }
               else if (level === 3){
                   this.fireball = me.pool.pull("fireball", this.pos.x + 32, this.pos.y + 26, {}, 90, 900, this.facing, 1);
                   me.game.world.addChild(this.fireball, 10);
                   this.ability2CD = this.now + 30000;
               }
            }
           else if (num === 3){
               if (level === 1){
                   
               }
               else if (level === 2){
                   
               }
               else if (level === 3){
                   
               }
           }
       }
       else if(game.data.character === 5){      //SKELETON
           
       }
   },         
          
    
   update: function(delta){
           this.now = new Date().getTime();
         
       if (this.health <= 0){
           if(this.dead === false){
                this.deathtimer = new Date().getTime();
                me.audio.play("ManHurt");
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
       
       if(this.penetrate){
           if(this.now >= this.qTime){
               console.log("Arrows penetrate");
               this.penetrate = false;
           }
           
       }
       
       
       if(this.vel.x !== 0){
            if(!this.renderable.isCurrentAnimation("run") && !this.renderable.isCurrentAnimation("attack") && !this.renderable.isCurrentAnimation("die")){
                this.renderable.setCurrentAnimation("run");
                this.renderable.setAnimationFrame();
           }
       }
       else if(!this.renderable.isCurrentAnimation("attack") && !this.renderable.isCurrentAnimation("die")){
           this.renderable.setCurrentAnimation("idle");
       }
       
       if(me.input.isKeyPressed("attack")){
           if(!this.renderable.isCurrentAnimation("attack") && !this.renderable.isCurrentAnimation("die") && (this.now-this.last >= this.hitDelay)){
               this.last = this.now;
               this.renderable.setCurrentAnimation("attack", "idle");
               if(game.data.character === 1){
                    this.arrow = me.pool.pull("arrow", this.pos.x + 32, this.pos.y + 26, {}, this.attack, this.range, this.facing, 1, this.penetrate);
                    me.game.world.addChild(this.arrow, 10);
               }
               if(game.data.character === 4){
                    this.magic = me.pool.pull("magic", this.pos.x + 32, this.pos.y + 26, {}, this.attack, this.range, this.facing, 1);
                    me.game.world.addChild(this.magic, 10);
               }
               this.renderable.setAnimationFrame();
           }
       }
       
       if(me.input.isKeyPressed("Q") && this.ability1 > 0 && this.now>=this.ability1CD){
           this.useAbility(1, this.ability1);
       }
       
       if(me.input.isKeyPressed("W") && this.ability2 > 0 && this.now>=this.ability2CD){

           this.useAbility(2, this.ability2);
       }
       
       if(me.input.isKeyPressed("E") && this.ability3 > 0 && this.now>=this.ability3CD){
           this.useAbility(3, this.ability3);
       }
       
       if(me.input.isKeyPressed("down")){    
//           var layer = me.game.currentLevel.getLayerByName("collision");
//           var tile = layer.getTile(this.pos.x, this.pos.y + 65);
//           var tileProperties = layer.tileset.getTileProperties(tile.tileID); //
//           //var tile = layer.layerData(this.pos.x, this.pos.y + 65); //says layer.layerData is not a function
//           //var tile = layer.layerData[this.pos.x][this.pos.y+65]; //returns nothing
//           
//           
//           console.log("Tile?" + tileProperties.type === "platform"); //says tileProperties is undefined
//           //console.log("Tile?" + layer.tileset.getTileId(this.pos.x, this.pos.y + 65)); //says layer.tileset.getTileId is not a function
//       
//           if(tileProperties.type === "platform"){
//               this.pos.y += 10;
//           }
       }
       
       if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling){
            this.jumping = true;
            this.vel.y -= this.accel.y * me.timer.tick;
       }
       
       
       
              
        //var collision = me.game.world.collide(this);  //TESTING
        var bcollision = me.game.world.collideType(this, "EnemyBaseEntity");
        var pcollision = me.game.world.collideType(this, "EnemyEntity");
        var ccollision = me.game.world.collideType(this, "EnemyCreep");
        this.now = new Date().getTime();
       
       
       
        if(bcollision){
            var ydif = this.pos.y - bcollision.obj.pos.y;
            var xdif = this.pos.x - bcollision.obj.pos.x;
            
            
            if(ydif < -50 && (xdif < 60) && (xdif > -35)){
                this.falling = false;
                this.vel.y = 0;
                this.pos.y = this.pos.y - 1;
            }
            else if((xdif > 0)&&(xdif < 60)&&(ydif > -50)){
                this.vel.x = 0;
                this.pos.x = this.pos.x + 1;
            }
            else if((xdif > -35) && (xdif < 0) &&(ydif > -50)){
                this.vel.x = 0; 
                this.pos.x = this.pos.x - 1;
            }
        
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= this.hitDelay && (Math.abs(this.pos.y-bcollision.obj.pos.y)<=40)){
                if((this.facing === "left" && (this.pos.x > bcollision.obj.pos.x))||(this.facing === "right" && (this.pos.x < bcollision.obj.pos.x))){
                    this.lastHit = this.now;
                    bcollision.obj.loseHealth(this.attack);
                }
            }
       }
       
       if(pcollision){
           var ydif = this.pos.y - pcollision.obj.pos.y;
           var xdif = this.pos.x - pcollision.obj.pos.x;
           if(xdif > 0){
               this.pos.x = this.pos.x + 1;
               if(this.facing === "left"){
                    this.vel.x = 0;
               }
           }
           else{
               this.pos.x = this.pos.x - 1;
               if(this.facing === "right"){
                    this.vel.x = 0;
               }
           }
           
           if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= this.hitDelay && (Math.abs(this.pos.y-pcollision.obj.pos.y)<=40)){
                if((this.facing === "left" && (this.pos.x > pcollision.obj.pos.x))||(this.facing === "right" && (this.pos.x < pcollision.obj.pos.x))){
                    this.lastHit = this.now;
                    console.log("enemy health: " + pcollision.obj.health + "myAttack: " + this.attack);
                    if(pcollision.obj.health <= this.attack){
                        game.data.gold += 10;
                        console.log("Current gold: " + game.data.gold);
                    }
                    pcollision.obj.loseHealth(this.attack);
                }
           }
       }
       
       if(ccollision){
           var ydif = this.pos.y - ccollision.obj.pos.y;
           var xdif = this.pos.x - ccollision.obj.pos.x;
           if(xdif > 0){               
               this.pos.x = this.pos.x + 1;
               if(this.facing === "left"){
                    this.vel.x = 0;
               }
           }
           else{
               this.pos.x = this.pos.x - 1;
               if(this.facing === "right"){
                    this.vel.x = 0;
               }
           }
           
           if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= this.hitDelay && (Math.abs(this.pos.y-ccollision.obj.pos.y)<=40)){
                if((this.facing === "left" && (this.pos.x > ccollision.obj.pos.x))||(this.facing === "right" && (this.pos.x < ccollision.obj.pos.x))){
                    this.lastHit = this.now;
                    console.log("creep health: " + ccollision.obj.health + "myAttack: " + this.attack);
                    if(ccollision.obj.health <= this.attack){
                        game.data.gold += 1;
                        console.log("Current gold: " + game.data.gold);
                    }
                    ccollision.obj.loseHealth(this.attack);
                }
           }
       }
       
       
       this.updateMovement();
       this.parent(delta);
       return true;
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
       this.health = 500;
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
       this.health = 500;
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
        this.pos.y = (13 + (y * 0.06));
       
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
       this.lastAttacking = this.now;
       this.collidable = true;
       this.alwaysUpdate = true;
       this.attacking = false;
       this.jumping = false;
       this.health = 30;
       this.type = "EnemyCreep";
       this.lastPosX = x;
       this.attack = 5;
       this.jump = false;
       
       this.lastHit = new Date().getTime();
       
       this.setVelocity(3, 20);
       
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
        
        if(this.jump === false && this.jumping === false &&  this.pos.x > 8560 && this.pos.x <8690){
            var up = Math.floor(Math.random()* 2)+1;
            this.jump = true;
            if(up === 1){
                this.vel.y -= this.accel.y * me.timer.tick;
            }
        }
        
        var bcollision = me.game.world.collideType(this, "PlayerBaseEntity");
        var pcollision = me.game.world.collideType(this, "PlayerEntity");
        var ccollision = me.game.world.collideType(this, "PlayerCreep");
        var tcollision = me.game.world.collideType(this, "PlayerTeammate");
        
        if(bcollision){
            this.attacking = true;
            this.lastAttacking = this.now;
            this.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            if((this.now-this.lastHit >= 1000)){
                this.lastHit = this.now;
                bcollision.obj.loseHealth(this.attack);
            }
        }
        else if(pcollision){
             var ydif = this.pos.y - pcollision.obj.pos.y;
             var xdif = this.pos.x - pcollision.obj.pos.x;
             this.vel.x = 0;             
             this.attacking = true; 
             this.lastAttacking = this.now;
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
        else if(tcollision){
             var ydif = this.pos.y - tcollision.obj.pos.y;
             var xdif = this.pos.x - tcollision.obj.pos.x;
             this.vel.x = 0;             
             this.attacking = true; 
             this.lastAttacking = this.now;
             //if((this.now-this.lastHit >= 1000) && !tcollision.obj.renderable.isCurrentAnimation("attack")){
             if((this.now-this.lastHit) >= 1000){
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
            //console.log("Hitting a player creep " + this.pos.x);
            this.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            this.attacking = true;
            if((this.now-this.lastHit >= 1000)){
                this.lastHit = this.now;
                ccollision.obj.loseHealth(1);
             }
        }
        else{
            this.vel.x -= this.accel.x * me.timer.tick;
        }        

        if(this.pos.x === this.lastPosX && this.attacking === false && !this.jumping && !this.falling && (this.now-this.lastAttacking >= 3000)){
                this.jumping = true;
                this.vel.y -= this.accel.y * me.timer.tick;
                //this.vel.x -= this.accel.x * me.timer.tick;
            
        }
        this.attacking = false;
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
       this.lastAttacking = this.now;
       this.alwaysUpdate = true;
       this.collidable = true;
       this.health = 20;
       this.type = "PlayerCreep";
       this.lastPosX = x;
       this.attack = 5;
       this.jump = false;
       
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
        
        if(this.jump === false && this.jumping === false &&  this.pos.x > 2700 && this.pos.x <2800){
            var up = Math.floor(Math.random()* 2)+1;
            this.jump = true;
            if(up === 1){
                this.vel.y -= this.accel.y * me.timer.tick;
            }
        }
        
        var bcollision = me.game.world.collideType(this, "EnemyBaseEntity");
        var pcollision = me.game.world.collideType(this, "EnemyEntity");
        var ccollision = me.game.world.collideType(this, "EnemyCreep");
        
        if(bcollision){
            this.attacking = true;
            this.lastAttacking = this.now;
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
             this.attacking = true;
             this.lastAttacking = this.now;
             //if((this.now-this.lastHit >= 1000) && !pcollision.obj.renderable.isCurrentAnimation("attack")){
             if((this.now-this.lastHit >= 1000)){
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
            this.attacking = true;
            this.lastAttacking = this.now;
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

        if(this.pos.x === this.lastPosX && this.attacking === false && !this.jumping && !this.falling && (this.now-this.lastAttacking >= 3000)){
                this.jumping = true;
                this.vel.y -= this.accel.y * me.timer.tick;
                //this.vel.x -= this.accel.x * me.timer.tick;
            
        }
        this.attacking = false;
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
           settings.image = "archer";
           this.parent(x, y, settings);
           this.maxHealth = game.data.archerBaseHealth;
           this.attack = game.data.archerBaseDamage;
           this.defense = game.data.archerBaseDef;
           this.setVelocity(game.data.archerBaseSpeed, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 2){
           settings.image = "darkelf";
           this.parent(x, y, settings);
           this.maxHealth = game.data.elfBaseHealth;
           this.attack = game.data.elfBaseDamage;
           this.defense = game.data.elfBaseDef;
           this.setVelocity(game.data.elfBaseSpeed, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [169, 170, 171, 172, 173, 174], 80);                    //ASK MOISES
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 3){
           settings.image = "orcSpear";
           this.parent(x, y, settings);
           this.maxHealth = game.data.orcBaseHealth;
           this.attack = game.data.orcBaseDamage;
           this.defense = game.data.orcBaseDef;
           this.setVelocity(game.data.orcBaseSpeed, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 4){
           settings.image = "wizard";
           this.parent(x, y, settings);
           this.maxHealth = game.data.wizardBaseHealth;
           this.attack = game.data.wizardBaseDamage;
           this.defense = game.data.wizardBaseDef;
           this.setVelocity(game.data.wizardBaseSpeed, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [169, 170, 171, 172, 173, 174], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 5){
           settings.image = "skeletonBigSword";
           this.parent(x, y, settings);
           this.maxHealth = game.data.skeletonBaseHealth;
           this.attack = game.data.skeletonBaseDamage;
           this.defense = game.data.skeletonBaseDef;
           this.setVelocity(game.data.skeletonBaseSpeed, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [169, 170, 171, 172, 173, 174], 80);        //ASK MOISES
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
       this.lastAttacking = this.now;
       this.dead = false;
       this.health = this.maxHealth;
       this.hitDelay = 1000;
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
       dmg -= this.defense;
       if(dmg > 0){
        this.health = this.health - dmg;
       }
       else
           this.health --;
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
               this.pos.x = 11000;
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
            this.attacking = true;
            this.lastAttacking = this.now;
            this.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            if((this.now-this.lastHit >= this.hitDelay)){
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
             this.attacking = true; 
             this.lastAttacking = this.now;
             if(this.now-this.lastHit >= this.hitDelay && !pcollision.obj.renderable.isCurrentAnimation("attack")){
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
             this.attacking = true;
             this.lastAttacking = this.now;
             //if((this.now-this.lastHit >= 1000) && !tcollision.obj.renderable.isCurrentAnimation("attack")){
             if((this.now-this.lastHit >= this.hitDelay)){
                this.lastHit = this.now;
                tcollision.obj.loseHealth(this.attack);
                if(!this.renderable.isCurrentAnimation("attack")){
                    this.renderable.setCurrentAnimation("attack", "run");
                    this.renderable.setAnimationFrame();
                }
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
            this.attacking = true;
            this.lastAttacking = this.now;
            if((this.now-this.lastHit >= this.hitDelay)){
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

        if(this.pos.x === this.lastPosX && this.attacking === false && !this.jumping && !this.falling && (this.now-this.lastAttacking >= 3000)){
            //console.log("this.pos.x " + this.pos.x + " this.lastPosX " + this.lastPosX + " this.attacking " + this.attacking + " this.now-this.lastHit " + (this.now-this.lastHit));
                this.jumping = true;
                this.vel.y -= this.accel.y * me.timer.tick;
                //this.vel.x -= this.accel.x * me.timer.tick;
            
        }
        this.attacking = false;
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
           settings.image = "archer";
           this.parent(x, y, settings);
           this.maxHealth = game.data.archerBaseHealth;
           this.attack = game.data.archerBaseDamage;
           this.defense = game.data.archerBaseDef;
           this.setVelocity(game.data.archerBaseSpeed, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 2){
           settings.image = "darkelf";
           this.parent(x, y, settings);
           this.maxHealth = game.data.elfBaseHealth;
           this.attack = game.data.elfBaseDamage;
           this.defense = game.data.elfBaseDef;
           this.setVelocity(game.data.elfBaseSpeed, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [169, 170, 171, 172, 173, 174], 80);                    //ASK MOISES
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 3){
           settings.image = "orcSpear";
           this.parent(x, y, settings);
           this.maxHealth = game.data.orcBaseHealth;
           this.attack = game.data.orcBaseDamage;
           this.defense = game.data.orcBaseDef;
           this.setVelocity(game.data.orcBaseSpeed, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 4){
           settings.image = "wizard";
           this.parent(x, y, settings);
           this.maxHealth = game.data.wizardBaseHealth;
           this.attack = game.data.wizardBaseDamage;
           this.defense = game.data.wizardBaseDef;
           this.setVelocity(game.data.wizardBaseSpeed, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [169, 170, 171, 172, 173, 174], 80);
           this.renderable.addAnimation("run", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
           this.renderable.addAnimation("die", [260, 261, 262, 263, 264, 265], 80);
       }
       else if(char === 5){
           settings.image = "skeletonBigSword";
           this.parent(x, y, settings);
           this.maxHealth = game.data.skeletonBaseHealth;
           this.attack = game.data.skeletonBaseDamage;
           this.defense = game.data.skeletonBaseDef;
           this.setVelocity(game.data.skeletonBaseSpeed, 20);
           this.renderable.addAnimation("idle", [78]);
           this.renderable.addAnimation("attack", [169, 170, 171, 172, 173, 174], 80);        //ASK MOISES
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
       this.lastAttacking = this.now;
       this.hitDelay = 1000;
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
       dmg -= this.defense;
       if(dmg > 0){
        this.health = this.health - dmg;
       }
       else
           this.health --;
       
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
            this.attacking = true;
            this.lastAttacking = this.now;
            this.vel.x = 0;
            this.pos.x = this.pos.x - 1;
            if((this.now-this.lastHit >= this.hitDelay)){
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
             this.attacking = true; 
             this.lastAttacking = this.now;
             if((this.now-this.lastHit >= this.hitDelay)){
                this.lastHit = this.now;
                pcollision.obj.loseHealth(this.attack);
                if(!this.renderable.isCurrentAnimation("attack")){
                    this.renderable.setCurrentAnimation("attack", "run");
                    this.renderable.setAnimationFrame();
                }
             }
        }
        else if(ccollision){
            this.vel.x = 0;
            this.pos.x = this.pos.x - 1;
            this.attacking = true;
            this.lastAttacking = this.now;
            if((this.now-this.lastHit >= this.hitDelay)){
                this.lastHit = this.now;
                ccollision.obj.loseHealth(this.attack);
                if(!this.renderable.isCurrentAnimation("attack")){
                    this.renderable.setCurrentAnimation("attack", "run");
                    this.renderable.setAnimationFrame();
                }
             }
        }
        else{
            this.vel.x += this.accel.x * me.timer.tick;
        }        

        if(this.pos.x === this.lastPosX && this.attacking === false && !this.jumping && !this.falling && (this.now-this.lastAttacking >= 3000)){
                this.jumping = true;
                this.vel.y -= this.accel.y * me.timer.tick;
                //this.vel.x -= this.accel.x * me.timer.tick;
            
        }
        this.attacking = false;
        this.lastPosX = this.pos.x;
        this.parent(delta);
        this.updateMovement();
        return true;
    }
});

game.ArrowEntity = me.ObjectEntity.extend({
    init: function (x, y, settings, dmg, rng, dir, team, pen){
        settings.spritewidth = "24";
        settings.spriteheight = "24";
        settings.width = 24;
        settings.height = 24;
        settings.image = "arrow";
        this.parent(x, y, settings);
        this.attack = dmg;
        this.range = rng;
        this.startX = x;
        this.endX = (this.startX + rng);
        this.facing = dir;
        this.team = team;
        this.lastPosX = x;
        this.last = new Date().getTime();
        this.now = new Date().getTime();
        this.stuck = false;
        this.penetrate = pen;
        this.alwaysUpdate = true;
        
        this.renderable.addAnimation("idle", [0]);
        
        this.setVelocity (10, 0);
    },
            
    endCollide: function(){
        if(!this.penetrate){
            me.game.world.removeChild(this);
        }
    },
    
    update: function(delta){
        this.now = new Date().getTime();
        
        if(this.facing === "right"){
           this.vel.x += this.accel.x * me.timer.tick;
           
       }
       else if(this.facing === "left"){
           this.flipX(true);
           this.vel.x -= this.accel.x * me.timer.tick;
       }
       
       if(this.team === 1){
            var bcollision = me.game.world.collideType(this, "EnemyBaseEntity");
            var pcollision = me.game.world.collideType(this, "EnemyEntity");
            var ccollision = me.game.world.collideType(this, "EnemyCreep");

            if(bcollision){
                 bcollision.obj.loseHealth(this.attack);
                 this.endCollide();
            }
            else if(pcollision){
                 pcollision.obj.loseHealth(this.attack);
                 this.endCollide();
                 if(pcollision.obj.health <= this.attack){
                        game.data.gold += 10;
                        console.log("Current gold: " + game.data.gold);
                    }
            }
            else if(ccollision){
                if(ccollision.obj.health <= this.attack){
                        game.data.gold += 1;
                        console.log("Current gold: " + game.data.gold);
                    }
                 ccollision.obj.loseHealth(this.attack);
                 this.endCollide();
            }
            
            if(this.pos.x === this.lastPosX && this.stuck === false){
                this.last = this.now;
                this.stuck = true;
            }
            
            if(this.pos.x >= this.endX || (this.pos.x === this.lastPosX && (this.now - this.last > 200) && this.stuck === true)){
                me.game.world.removeChild(this);
            }
            
            if(this.now - this.last >= 2000){
                this.stuck = false;
            }
       }
       else if(this.team === 2){
            var tcollision = me.game.world.collideType(this, "PlayerTeammate");
            var bcollision = me.game.world.collideType(this, "PlayerBaseEntity");
            var pcollision = me.game.world.collideType(this, "PlayerEntity");
            var ccollision = me.game.world.collideType(this, "PlayerCreep");

            if(bcollision){
                 bcollision.obj.loseHealth(this.attack);
                 this.endCollide();
            }
            else if(tcollision){
                 tcollision.obj.loseHealth(this.attack);
                 this.endCollide();
            }
            else if(pcollision){
                 pcollision.obj.loseHealth(this.attack);
                 this.endCollide();
            }
            else if(ccollision){
                 ccollision.obj.loseHealth(this.attack);
                 this.endCollide();
                 if(ccollision.obj.health <= this.attack){
                        game.data.gold += 1;
                        console.log("Current gold: " + game.data.gold);
                    }
            }
            
            if(this.pos.x === this.lastPosX && this.stuck === false){
                this.last = this.now;
                this.stuck = true;
            }
            
            if(this.pos.x >= this.endX || (this.pos.x === this.lastPosX && (this.now - this.last > 200) && this.stuck === true)){
                me.game.world.removeChild(this);
            }
            
            if(this.now - this.last >= 2000){
                this.stuck = false;
            }
            
       }
        this.lastPosX = this.pos.x;
        this.updateMovement();
        this.parent(delta);
        return true;
    }
    
});

game.MagicMissile = me.ObjectEntity.extend({
    init: function (x, y, settings, dmg, rng, dir, team){
        settings.spritewidth = "24";
        settings.spriteheight = "24";
        settings.width = 24;
        settings.height = 24;
        settings.image = "magic";
        this.parent(x, y, settings);
        this.attack = dmg;
        this.range = rng;
        this.startX = x;
        this.endX = (this.startX + rng);
        this.facing = dir;
        this.team = team;
        this.lastPosX = x;
        this.last = new Date().getTime();
        this.now = new Date().getTime();
        this.stuck = false;
        this.alwaysUpdate = true;
        
        this.renderable.addAnimation("idle", [0]);
        
        this.setVelocity (10, 0);
    },
    
    update: function(delta){
        this.now = new Date().getTime();
        
        if(this.facing === "right"){
           this.vel.x += this.accel.x * me.timer.tick;
           
       }
       else if(this.facing === "left"){
           this.flipX(true);
           this.vel.x -= this.accel.x * me.timer.tick;
       }
       
       if(this.team === 1){
            var bcollision = me.game.world.collideType(this, "EnemyBaseEntity");
            var pcollision = me.game.world.collideType(this, "EnemyEntity");
            var ccollision = me.game.world.collideType(this, "EnemyCreep");

            if(bcollision){
                 bcollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            else if(pcollision){
                if(pcollision.obj.health <= this.attack){
                        game.data.gold += 10;
                        console.log("Current gold: " + game.data.gold);
                    }
                 pcollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            else if(ccollision){
                if(ccollision.obj.health <= this.attack){
                        game.data.gold += 1;
                        console.log("Current gold: " + game.data.gold);
                    }
                 ccollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            
            if(this.pos.x === this.lastPosX && this.stuck === false){
                this.last = this.now;
                this.stuck = true;
            }
            
            if(this.pos.x >= this.endX || (this.pos.x === this.lastPosX && (this.now - this.last > 200) && this.stuck === true)){
                me.game.world.removeChild(this);
            }
            
            if(this.now - this.last >= 2000){
                this.stuck = false;
            }
       }
       else if(this.team === 2){
            var tcollision = me.game.world.collideType(this, "PlayerTeammate");
            var bcollision = me.game.world.collideType(this, "PlayerBaseEntity");
            var pcollision = me.game.world.collideType(this, "PlayerEntity");
            var ccollision = me.game.world.collideType(this, "PlayerCreep");

            if(bcollision){
                 bcollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            else if(tcollision){
                 tcollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            else if(pcollision){
                 pcollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            else if(ccollision){
                 ccollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            
            if(this.pos.x === this.lastPosX && this.stuck === false){
                this.last = this.now;
                this.stuck = true;
            }
            
            if(this.pos.x >= this.endX || (this.pos.x === this.lastPosX && (this.now - this.last > 200) && this.stuck === true)){
                me.game.world.removeChild(this);
            }
            
            if(this.now - this.last >= 2000){
                this.stuck = false;
            }
            
       }
        this.lastPosX = this.pos.x;
        this.updateMovement();
        this.parent(delta);
        return true;
    }
});

game.SpearThrow = me.ObjectEntity.extend({
    init: function (x, y, settings, dmg, rng, dir, team){
        settings.spritewidth = "48";
        settings.spriteheight = "48";
        settings.width = 48;
        settings.height = 48;
        settings.image = "spear";
        this.parent(x, y, settings);
        this.attack = dmg;
        this.range = rng;
        this.startX = x;
        this.endX = (this.startX + rng);
        this.facing = dir;
        this.team = team;
        this.lastPosX = x;
        this.last = new Date().getTime();
        this.now = new Date().getTime();
        this.stuck = false;
        this.alwaysUpdate = true;
        
        this.renderable.addAnimation("idle", [0]);
        
        this.setVelocity (10, 0);
    },
    
    update: function(delta){
        this.now = new Date().getTime();
        
        if(this.facing === "right"){
           this.vel.x += this.accel.x * me.timer.tick;
           
       }
       else if(this.facing === "left"){
           this.flipX(true);
           this.vel.x -= this.accel.x * me.timer.tick;
       }
       
       if(this.team === 1){
            var bcollision = me.game.world.collideType(this, "EnemyBaseEntity");
            var pcollision = me.game.world.collideType(this, "EnemyEntity");
            var ccollision = me.game.world.collideType(this, "EnemyCreep");

            if(bcollision){
                 bcollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            else if(ccollision){
                if(ccollision.obj.health <= this.attack){
                        game.data.gold += 10;
                        console.log("Current gold: " + game.data.gold);
                    }
                 pcollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            else if(ccollision){
                if(ccollision.obj.health <= this.attack){
                        game.data.gold += 1;
                        console.log("Current gold: " + game.data.gold);
                    }
                 ccollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            
            if(this.pos.x === this.lastPosX && this.stuck === false){
                this.last = this.now;
                this.stuck = true;
            }
            
            if(this.pos.x >= this.endX || (this.pos.x === this.lastPosX && (this.now - this.last > 200) && this.stuck === true)){
                me.game.world.removeChild(this);
            }
            
            if(this.now - this.last >= 2000){
                this.stuck = false;
            }
       }
       else if(this.team === 2){
            var tcollision = me.game.world.collideType(this, "PlayerTeammate");
            var bcollision = me.game.world.collideType(this, "PlayerBaseEntity");
            var pcollision = me.game.world.collideType(this, "PlayerEntity");
            var ccollision = me.game.world.collideType(this, "PlayerCreep");

            if(bcollision){
                 bcollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            else if(tcollision){
                 tcollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            else if(pcollision){
                 pcollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            else if(ccollision){
                 ccollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            
            if(this.pos.x === this.lastPosX && this.stuck === false){
                this.last = this.now;
                this.stuck = true;
            }
            
            if(this.pos.x >= this.endX || (this.pos.x === this.lastPosX && (this.now - this.last > 200) && this.stuck === true)){
                me.game.world.removeChild(this);
            }
            
            if(this.now - this.last >= 2000){
                this.stuck = false;
            }
            
       }
        this.lastPosX = this.pos.x;
        this.updateMovement();
        this.parent(delta);
        return true;
    }
});

game.Fireball = me.ObjectEntity.extend({
    init: function (x, y, settings, dmg, rng, dir, team){
        settings.spritewidth = "48";
        settings.spriteheight = "48";
        settings.width = 48;
        settings.height = 48;
        settings.image = "fireball";
        this.parent(x, y, settings);
        this.attack = dmg;
        this.range = rng;
        this.startX = x;
        this.endX = (this.startX + rng);
        this.facing = dir;
        this.team = team;
        this.lastPosX = x;
        this.last = new Date().getTime();
        this.now = new Date().getTime();
        this.stuck = false;
        this.alwaysUpdate = true;
        
        this.renderable.addAnimation("idle", [0]);
        
        this.setVelocity (10, 0);
        console.log("HERE IT COMES!");
        
    },
    
    update: function(delta){
        this.now = new Date().getTime();
        console.log(this.pos.x + " " + this.pos.y + " " + this.attack + " " + this.range + " " + this.facing + " " + this.team );
        
        
        if(this.facing === "right"){
           console.log("GOING RIGHT");
           this.vel.x += this.accel.x * me.timer.tick;
           
       }
       else if(this.facing === "left"){
           this.flipX(true);
           this.vel.x -= this.accel.x * me.timer.tick;
       }
       
       if(this.team === 1){
            var bcollision = me.game.world.collideType(this, "EnemyBaseEntity");
            var pcollision = me.game.world.collideType(this, "EnemyEntity");
            var ccollision = me.game.world.collideType(this, "EnemyCreep");

            if(bcollision){
                 bcollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            else if(pcollision){
                if(pcollision.obj.health <= this.attack){
                        game.data.gold += 10;
                        console.log("Current gold: " + game.data.gold);
                    }
                 pcollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            else if(ccollision){
                if(ccollision.obj.health <= this.attack){
                        game.data.gold += 1;
                        console.log("Current gold: " + game.data.gold);
                    }
                 ccollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            
            if(this.pos.x === this.lastPosX && this.stuck === false){
                this.last = this.now;
                this.stuck = true;
            }
            
            if(this.pos.x >= this.endX || (this.pos.x === this.lastPosX && (this.now - this.last > 200) && this.stuck === true)){
                me.game.world.removeChild(this);
            }
            
            if(this.now - this.last >= 2000){
                this.stuck = false;
            }
       }
       else if(this.team === 2){
            var tcollision = me.game.world.collideType(this, "PlayerTeammate");
            var bcollision = me.game.world.collideType(this, "PlayerBaseEntity");
            var pcollision = me.game.world.collideType(this, "PlayerEntity");
            var ccollision = me.game.world.collideType(this, "PlayerCreep");

            if(bcollision){
                 bcollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            else if(tcollision){
                 tcollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            else if(pcollision){
                 pcollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            else if(ccollision){
                 ccollision.obj.loseHealth(this.attack);
                 me.game.world.removeChild(this);
            }
            
            if(this.pos.x === this.lastPosX && this.stuck === false){
                this.last = this.now;
                this.stuck = true;
            }
            
            if(this.pos.x >= this.endX || (this.pos.x === this.lastPosX && (this.now - this.last > 200) && this.stuck === true)){
                me.game.world.removeChild(this);
            }
            
            if(this.now - this.last >= 2000){
                this.stuck = false;
            }
            
       }
        this.lastPosX = this.pos.x;
        this.updateMovement();
        this.parent(delta);
        return true;
     }
});

game.RootArrow = me.ObjectEntity.extend({
    init: function (x, y, settings, dmg, rng, dir, team, pen){
        settings.spritewidth = "48";
        settings.spriteheight = "48";
        settings.width = 48;
        settings.height = 48;
        settings.image = "iArrow";
        this.parent(x, y, settings);
        this.attack = dmg;
        this.range = rng;
        this.startX = x;
        this.endX = (this.startX + rng);
        this.facing = dir;
        this.team = team;
        this.lastPosX = x;
        this.last = new Date().getTime();
        this.now = new Date().getTime();
        this.stuck = false;
        this.penetrate = pen;
        this.alwaysUpdate = true;
        
        this.renderable.addAnimation("idle", [0]);
        
        this.setVelocity (10, 0);
    },
    
    endCollide: function(){
        if(!this.penetrate){
            me.game.world.removeChild(this);
        }
    },
    
    update: function(delta){
        this.now = new Date().getTime();
        
        if(this.facing === "right"){
           this.vel.x += this.accel.x * me.timer.tick;
           
       }
       else if(this.facing === "left"){
           this.flipX(true);
           this.vel.x -= this.accel.x * me.timer.tick;
       }
       
       if(this.team === 1){
            var bcollision = me.game.world.collideType(this, "EnemyBaseEntity");
            var pcollision = me.game.world.collideType(this, "EnemyEntity");
            var ccollision = me.game.world.collideType(this, "EnemyCreep");

            if(bcollision){
                 bcollision.obj.loseHealth(this.attack);
                 this.endCollide();
            }
            else if(pcollision){
                 pcollision.obj.loseHealth(this.attack);
                 this.endCollide();
                 if(pcollision.obj.health <= this.attack){
                        game.data.gold += 10;
                        console.log("Current gold: " + game.data.gold);
                    }
            }
            else if(ccollision){
                if(ccollision.obj.health <= this.attack){
                        game.data.gold += 1;
                        console.log("Current gold: " + game.data.gold);
                    }
                 ccollision.obj.loseHealth(this.attack);
                 this.endCollide();
            }
            
            if(this.pos.x === this.lastPosX && this.stuck === false){
                this.last = this.now;
                this.stuck = true;
            }
            
            if(this.pos.x >= this.endX || (this.pos.x === this.lastPosX && (this.now - this.last > 200) && this.stuck === true)){
                me.game.world.removeChild(this);
            }
            
            if(this.now - this.last >= 2000){
                this.stuck = false;
            }
       }
       else if(this.team === 2){
            var tcollision = me.game.world.collideType(this, "PlayerTeammate");
            var bcollision = me.game.world.collideType(this, "PlayerBaseEntity");
            var pcollision = me.game.world.collideType(this, "PlayerEntity");
            var ccollision = me.game.world.collideType(this, "PlayerCreep");

            if(bcollision){
                 bcollision.obj.loseHealth(this.attack);
                 this.endCollide();
            }
            else if(tcollision){
                 tcollision.obj.loseHealth(this.attack);
                 this.endCollide();
            }
            else if(pcollision){
                 pcollision.obj.loseHealth(this.attack);
                 this.endCollide();
            }
            else if(ccollision){
                 ccollision.obj.loseHealth(this.attack);
                 this.endCollide();
                 if(ccollision.obj.health <= this.attack){
                        game.data.gold += 1;
                        console.log("Current gold: " + game.data.gold);
                    }
            }
            
            if(this.pos.x === this.lastPosX && this.stuck === false){
                this.last = this.now;
                this.stuck = true;
            }
            
            if(this.pos.x >= this.endX || (this.pos.x === this.lastPosX && (this.now - this.last > 200) && this.stuck === true)){
                me.game.world.removeChild(this);
            }
            
            if(this.now - this.last >= 2000){
                this.stuck = false;
            }
            
       }
        this.lastPosX = this.pos.x;
        this.updateMovement();
        this.parent(delta);
        return true;
    }
});

game.GameManager = Object.extend({
   init: function (x, y, settings){
       this.last = new Date().getTime();
       this.lastCreep = new Date().getTime();
       this.lastPause = new Date().getTime();
       this.now = new Date().getTime();
       this.lastBuy = this.now;
       this.toggle = true;
       this.paused = false;
       this.buying = false;
       this.alwaysUpdate = true;
       this.updateWhenPaused = true;
       this.pausePos = 0, 0;
       //this.screenDrawn = false;
       
       settings.width = 701;
       settings.height = 115;
       
        if(game.data.exp2 === 0){
            game.data.gold = 0;
        }
        else if(game.data.exp2 === 1){
            game.data.gold = 10;
        }
        else if(game.data.exp2 === 2){
            game.data.gold = 20;
        }
        else if(game.data.exp2 === 3){
            game.data.gold = 30;
        }
        else if(game.data.exp2 === 4){
            game.data.gold = 40;
        }
       
   },
    
   update: function(){
        this.now = new Date().getTime();
        
                if((Math.round(this.now/1000))%20 === 0 && (this.now - this.lastCreep >= 1000) && this.paused === false){
                    if(game.data.exp2 === 0){
                            game.data.gold += 1;
                        }
                        else if(game.data.exp2 === 1){
                            game.data.gold += 2;
                        }
                        else if(game.data.exp2 === 2){
                            game.data.gold += 3;
                        }
                        else if(game.data.exp2 === 3){
                            game.data.gold += 4;
                        }
                        else if(game.data.exp2 === 4){
                            game.data.gold += 5;
                        }
                        
                        console.log("Current gold: " + game.data.gold);
                }
                
                if((Math.round(this.now/1000))%10 === 0 && (this.now - this.lastCreep >= 1000) && this.paused === false){
                        
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
                
                if(me.input.isKeyPressed("buy") && !this.buying && this.now-this.lastBuy >= 1000){
                    this.buying = true;
                    this.lastBuy = this.now;
                    game.data.pausePos = me.game.viewport.localToWorld(0, 0);
                    game.data.buyscreen = new me.SpriteObject (game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('spend'));
                    game.data.buyscreen.updateWhenPaused = true;
                    game.data.buyscreen.setOpacity(0.8);
                    me.game.world.addChild(game.data.buyscreen, 34);
                    game.data.player.setVelocity(0, 0);             //NEED TO ADD A GLOBAL VARIABLE HERE
                    game.data.buytext = new (me.Renderable.extend ({
                        init: function(){
                            this.parent(new me.Vector2d(game.data.pausePos.x, game.data.pausePos.y), 1, 1);
                            this.font = new me.BitmapFont("32x32_font", 32);
                            this.updateWhenPaused = true;
                            this.alwaysUpdate = true;
                        },

                        draw: function(context){    
                            this.font.draw(context, "CHOOSE WISELY (PRESS F1-F6)", (game.data.pausePos.x + 70), (game.data.pausePos.y + 10));
                        }

                    }));
                    game.data.buytext2 = new (me.Renderable.extend ({
                        init: function(){
                            this.parent(new me.Vector2d(game.data.pausePos.x, game.data.pausePos.y), 1, 1);
                            this.font = new me.Font("Arial", 20, "white");
                            this.updateWhenPaused = true;
                            this.alwaysUpdate = true;
                            
                        },

                        draw: function(context){
                            this.font.draw(context, "CURRENT GOLD: " + game.data.gold.toString(), (game.data.pausePos.x + 350), (game.data.pausePos.y + 50));
                            if(game.data.character === 1){
                                if(game.data.player.skill1 === 0){
                                    this.font.draw(context, "Skill1: Level1 - What Does This Thing Do? (shoot Farther) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 100));
                                }
                                else if(game.data.player.skill1 === 1){
                                    this.font.draw(context, "Skill1: Level2 - What Does This Thing Do? (shoot Farther) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 100));
                                }
                                else if(game.data.player.skill1 === 2){
                                    this.font.draw(context, "Skill1: Level3 - What Does This Thing Do? (shoot Farther) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 100));
                                }
                                else{
                                    //console.log("skill1 maxed");
                                }
                                
                                if(game.data.player.skill2 === 0){
                                    this.font.draw(context, "Skill2: Level1 - Throwing Arrows Seems Ineffective! (shoot Farther) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 150));
                                }
                                else if(game.data.player.skill2 === 1){
                                    this.font.draw(context, "Skill2: Level2 - Throwing Arrows Seems Ineffective! (shoot Farther) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 150));
                                }
                                else if(game.data.player.skill2 === 2){
                                    this.font.draw(context, "Skill2: Level3 - Throwing Arrows Seems Ineffective! (shoot Farther) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 150));
                                }
                                else{
                                    //console.log("skill2 maxed");
                                }
                                
                                if(game.data.player.skill3 === 0){
                                     this.font.draw(context, "Skill3: Level1 - Bowflex Time! (Increase Damage) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 200));
                                }
                                else if(game.data.player.skill3 === 1){
                                      this.font.draw(context, "Skill3: Level2 - Bowflex Time! (Increase Damage) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 200));
                                }
                                else if(game.data.player.skill3 === 2){
                                       this.font.draw(context, "Skill3: Level3 - Bowflex Time! (Increase Damage) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 200));
                                }
                                else{
                                    //console.log("skill3 maxed");
                                }
                                
                                if(game.data.player.ability1 === 0){
                                    this.font.draw(context, "AbilityQ: Level1 - No More Meatshields (arrows go through enemies) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 250));
                                }
                                else if(game.data.player.ability1 === 1){
                                    this.font.draw(context, "AbilityQ: Level2 - No More Meatshields (arrows go through enemies) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 250));
                                }
                                else if(game.data.player.ability1 === 2){
                                    this.font.draw(context, "AbilityQ: Level3 - No More Meatshields (arrows go through enemies) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 250));
                                }
                                else{
                                    //console.log("abilityq maxed");
                                }
                                
                                if(game.data.player.ability2 === 0){
                                    this.font.draw(context, "AbilityW: Level1 - You Shall Not Pass (immobilize target) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 300));
                                }
                                else if(game.data.player.ability2 === 1){
                                    this.font.draw(context, "AbilityW: Level2 - You Shall Not Pass (immobilize target) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 300));
                                }
                                else if(game.data.player.ability2 === 2){
                                    this.font.draw(context, "AbilityW: Level3 - You Shall Not Pass (immobilize target) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 300));
                                }
                                else{
                                    //console.log("abilityw maxed");
                                }
                                
                                if(game.data.player.ability3 === 0){
                                    this.font.draw(context, "AbilityE: Level1 - Rolling Deep (hide behind your friends) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 350));
                                }
                                else if(game.data.player.ability3 === 1){
                                    this.font.draw(context, "AbilityE: Level2 - Rolling Deep (hide behind your friends) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 350));
                                }
                                else if(game.data.player.ability3 === 2){
                                    this.font.draw(context, "AbilityE: Level3 - Rolling Deep (hide behind your friends) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 350));
                                }
                                else{
                                    //console.log("abilitye maxed");
                                }                                
                                
                            }
                            else if(game.data.character === 2){
                                if(game.data.player.skill1 === 0){
                                    this.font.draw(context, "Skill1: Level1 - You Wouldn't Like Me When I'm Angry (increase damage) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 100));
                                }
                                else if(game.data.player.skill1 === 1){
                                    this.font.draw(context, "Skill1: Level2 - You Wouldn't Like Me When I'm Angry (increase damage) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 100));
                                }
                                else if(game.data.player.skill1 === 2){
                                    this.font.draw(context, "Skill1: Level3 - You Wouldn't Like Me When I'm Angry (increase damage) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 100));
                                }
                                else{
                                    //console.log("skill1 maxed");
                                }
                                
                                if(game.data.player.skill2 === 0){
                                    this.font.draw(context, "Skill2: Level1 - Feeding Frenzy (increase attack speed) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 150));
                                }
                                else if(game.data.player.skill2 === 1){
                                    this.font.draw(context, "Skill2: Level2 - Feeding Frenzy (increase attack speed) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 150));
                                }
                                else if(game.data.player.skill2 === 2){
                                    this.font.draw(context, "Skill2: Level3 - Feeding Frenzy (increase attack speed) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 150));
                                }
                                else{
                                    //console.log("skill2 maxed");
                                }
                                
                                if(game.data.player.skill3 === 0){
                                     this.font.draw(context, "Skill3: Level1 - Must... Move... Faster... Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 200));
                                }
                                else if(game.data.player.skill3 === 1){
                                      this.font.draw(context, "Skill3: Level2 - Must... Move... Faster... Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 200));
                                }
                                else if(game.data.player.skill3 === 2){
                                       this.font.draw(context, "Skill3: Level3 - Must... Move... Faster... Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 200));
                                }
                                else{
                                    //console.log("skill3 maxed");
                                }
                                
                                if(game.data.player.ability1 === 0){
                                    this.font.draw(context, "AbilityQ: Level1 - Now You See Me, Now You Don't (enemies cant see you) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 250));
                                }
                                else if(game.data.player.ability1 === 1){
                                    this.font.draw(context, "AbilityQ: Level2 - Now You See Me, Now You Don't (enemies cant see you) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 250));
                                }
                                else if(game.data.player.ability1 === 2){
                                    this.font.draw(context, "AbilityQ: Level3 - Now You See Me, Now You Don't (enemies cant see you) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 250));
                                }
                                else{
                                    //console.log("abilityq maxed");
                                }
                                
                                if(game.data.player.ability2 === 0){
                                    this.font.draw(context, "AbilityW: Level1 - I Wish I was There (teleport) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 300));
                                }
                                else if(game.data.player.ability2 === 1){
                                    this.font.draw(context, "AbilityW: Level2 - I Wish I was There (teleport) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 300));
                                }
                                else if(game.data.player.ability2 === 2){
                                    this.font.draw(context, "AbilityW: Level3 - I Wish I was There (teleport) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 300));
                                }
                                else{
                                    //console.log("abilityw maxed");
                                }
                                
                                if(game.data.player.ability3 === 0){
                                    this.font.draw(context, "AbilityE: Level1 - The Big Hurt (Power Attack) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 350));
                                }
                                else if(game.data.player.ability3 === 1){
                                    this.font.draw(context, "AbilityE: Level2 - The Big Hurt (Power Attack) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 350));
                                }
                                else if(game.data.player.ability3 === 2){
                                    this.font.draw(context, "AbilityE: Level3 - The Big Hurt (Power Attack) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 350));
                                }
                                else{
                                    //console.log("abilitye maxed");
                                }          
                            }
                            else if(game.data.character === 3){
                                if(game.data.player.skill1 === 0){
                                    this.font.draw(context, "Skill1: Level1 - I Wish I was Big (more health) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 100));
                                }
                                else if(game.data.player.skill1 === 1){
                                    this.font.draw(context, "Skill1: Level2 - I Wish I was Big (more health) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 100));
                                }
                                else if(game.data.player.skill1 === 2){
                                    this.font.draw(context, "Skill1: Level3 - I Wish I was Big (more health) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 100));
                                }
                                else{
                                    //console.log("skill1 maxed");
                                }
                                
                                if(game.data.player.skill2 === 0){
                                    this.font.draw(context, "Skill2: Level1 - OOOOOOH Shiny (run faster) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 150));
                                }
                                else if(game.data.player.skill2 === 1){
                                    this.font.draw(context, "Skill2: Level2 - OOOOOOH Shiny (run faster) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 150));
                                }
                                else if(game.data.player.skill2 === 2){
                                    this.font.draw(context, "Skill2: Level3 - OOOOOOH Shiny (run faster) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 150));
                                }
                                else{
                                    //console.log("skill2 maxed");
                                }
                                
                                if(game.data.player.skill3 === 0){
                                     this.font.draw(context, "Skill3: Level1 - Check Out These Guns (Increase Damage) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 200));
                                }
                                else if(game.data.player.skill3 === 1){
                                      this.font.draw(context, "Skill3: Level2 - Check Out These Guns (Increase Damage) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 200));
                                }
                                else if(game.data.player.skill3 === 2){
                                       this.font.draw(context, "Skill3: Level3 - Check Out These Guns (Increase Damage) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 200));
                                }
                                else{
                                    //console.log("skill3 maxed");
                                }
                                
                                if(game.data.player.ability1 === 0){
                                    this.font.draw(context, "AbilityQ: Level1 - Adrenaline Rush (speed burst) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 250));
                                }
                                else if(game.data.player.ability1 === 1){
                                    this.font.draw(context, "AbilityQ: Level2 - Adrenaline Rush (speed burst) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 250));
                                }
                                else if(game.data.player.ability1 === 2){
                                    this.font.draw(context, "AbilityQ: Level3 - Adrenaline Rush (speed burst) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 250));
                                }
                                else{
                                    //console.log("abilityq maxed");
                                }
                                
                                if(game.data.player.ability2 === 0){
                                    this.font.draw(context, "AbilityW: Level1 - You Look Tasty (eat your own creep for health) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 300));
                                }
                                else if(game.data.player.ability2 === 1){
                                    this.font.draw(context, "AbilityW: Level2 - You Look Tasty (eat your own creep for health) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 300));
                                }
                                else if(game.data.player.ability2 === 2){
                                    this.font.draw(context, "AbilityW: Level3 - You Look Tasty (eat your own creep for health) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 300));
                                }
                                else{
                                    //console.log("abilityw maxed");
                                }
                                
                                if(game.data.player.ability3 === 0){
                                    this.font.draw(context, "AbilityE: Level1 - Shish Kabob (throw your spear) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 350));
                                }
                                else if(game.data.player.ability3 === 1){
                                    this.font.draw(context, "AbilityE: Level2 - Shish Kabob (throw your spear) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 350));
                                }
                                else if(game.data.player.ability3 === 2){
                                    this.font.draw(context, "AbilityE: Level3 - Shish Kabob (throw your spear) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 350));
                                }
                                else{
                                    //console.log("abilitye maxed");
                                }          
                            }
                            else if(game.data.character === 4){
                                if(game.data.player.skill1 === 0){
                                    this.font.draw(context, "Skill1: Level1 - I Believe in Magic (increase range) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 100));
                                }
                                else if(game.data.player.skill1 === 1){
                                    this.font.draw(context, "Skill1: Level2 - I Believe in Magic (increase range) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 100));
                                }
                                else if(game.data.player.skill1 === 2){
                                    this.font.draw(context, "Skill1: Level3 - I Believe in Magic (increase range) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 100));
                                }
                                else{
                                    //console.log("skill1 maxed");
                                }
                                
                                if(game.data.player.skill2 === 0){
                                    this.font.draw(context, "Skill2: Level1 - Hitting the Books (Increase Damage) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 150));
                                }
                                else if(game.data.player.skill2 === 1){
                                    this.font.draw(context, "Skill2: Level2 - Hitting the Books (Increase Damage) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 150));
                                }
                                else if(game.data.player.skill2 === 2){
                                    this.font.draw(context, "Skill2: Level3 - Hitting the Books (Increase Damage) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 150));
                                }
                                else{
                                    //console.log("skill2 maxed");
                                }
                                
                                if(game.data.player.skill3 === 0){
                                     this.font.draw(context, "Skill3: Level1 - Avada Kedavra (Increase Damage) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 200));
                                }
                                else if(game.data.player.skill3 === 1){
                                      this.font.draw(context, "Skill3: Level2 - Avada Kedavra (Increase Damage) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 200));
                                }
                                else if(game.data.player.skill3 === 2){
                                       this.font.draw(context, "Skill3: Level3 - Avada Kedavra (Increase Damage) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 200));
                                }
                                else{
                                    //console.log("skill3 maxed");
                                }
                                
                                if(game.data.player.ability1 === 0){
                                    this.font.draw(context, "AbilityQ: Level1 - Freeze! Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 250));
                                }
                                else if(game.data.player.ability1 === 1){
                                    this.font.draw(context, "AbilityQ: Level2 - Freeze! Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 250));
                                }
                                else if(game.data.player.ability1 === 2){
                                    this.font.draw(context, "AbilityQ: Level3 - Freeze! Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 250));
                                }
                                else{
                                    //console.log("abilityq maxed");
                                }
                                
                                if(game.data.player.ability2 === 0){
                                    this.font.draw(context, "AbilityW: Level1 - You Shouldn't Play With Matches Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 300));
                                }
                                else if(game.data.player.ability2 === 1){
                                    this.font.draw(context, "AbilityW: Level2 - You Shouldn't Play With Matches Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 300));
                                }
                                else if(game.data.player.ability2 === 2){
                                    this.font.draw(context, "AbilityW: Level3 - You Shouldn't Play With Matches Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 300));
                                }
                                else{
                                    //console.log("abilityw maxed");
                                }
                                
                                if(game.data.player.ability3 === 0){
                                    this.font.draw(context, "AbilityE: Level1 - Move the Chess Pieces Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 350));
                                }
                                else if(game.data.player.ability3 === 1){
                                    this.font.draw(context, "AbilityE: Level2 - Move the Chess Pieces Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 350));
                                }
                                else if(game.data.player.ability3 === 2){
                                    this.font.draw(context, "AbilityE: Level3 - Move the Chess Pieces Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 350));
                                }
                                else{
                                    //console.log("abilitye maxed");
                                }          
                            }
                            else if(game.data.character === 5){
                                if(game.data.player.skill1 === 0){
                                    this.font.draw(context, "Skill1: Level1 - Sticks and Stones May Break My Bones but Words Will Never Hurt Me (armor up) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 100));
                                }
                                else if(game.data.player.skill1 === 1){
                                    this.font.draw(context, "Skill1: Level2 - Sticks and Stones May Break My Bones but Words Will Never Hurt Me (armor up) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 100));
                                }
                                else if(game.data.player.skill1 === 2){
                                    this.font.draw(context, "Skill1: Level3 - Sticks and Stones May Break My Bones but Words Will Never Hurt Me (armor up) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 100));
                                }
                                else{
                                    //console.log("skill1 maxed");
                                }
                                
                                if(game.data.player.skill2 === 0){
                                    this.font.draw(context, "Skill2: Level1 - Every Day I'm Shufflin' (move faster) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 150));
                                }
                                else if(game.data.player.skill2 === 1){
                                    this.font.draw(context, "Skill2: Level2 - Every Day I'm Shufflin' (move faster) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 150));
                                }
                                else if(game.data.player.skill2 === 2){
                                    this.font.draw(context, "Skill2: Level3 - Every Day I'm Shufflin' (move faster) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 150));
                                }
                                else{
                                    //console.log("skill2 maxed");
                                }
                                
                                if(game.data.player.skill3 === 0){
                                     this.font.draw(context, "Skill3: Level1 - Put your Backbone Into It (Increase Damage) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 200));
                                }
                                else if(game.data.player.skill3 === 1){
                                      this.font.draw(context, "Skill3: Level2 - Put your Backbone Into It (Increase Damage) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 200));
                                }
                                else if(game.data.player.skill3 === 2){
                                       this.font.draw(context, "Skill3: Level3 - Put your Backbone Into It (Increase Damage) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 200));
                                }
                                else{
                                    //console.log("skill3 maxed");
                                }
                                
                                if(game.data.player.ability1 === 0){
                                    this.font.draw(context, "AbilityQ: Level1 - How do you Kill That Which Has no Life? (instant respawn) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 250));
                                }
                                else if(game.data.player.ability1 === 1){
                                    this.font.draw(context, "AbilityQ: Level2 - How do you Kill That Which Has no Life? (instant respawn) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 250));
                                }
                                else if(game.data.player.ability1 === 2){
                                    this.font.draw(context, "AbilityQ: Level3 - How do you Kill That Which Has no Life? (instant respawn) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 250));
                                }
                                else{
                                    //console.log("abilityq maxed");
                                }
                                
                                if(game.data.player.ability2 === 0){
                                    this.font.draw(context, "AbilityW: Level1 - Stop It, That Tickles! (Infinite Armor) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 300));
                                }
                                else if(game.data.player.ability2 === 1){
                                    this.font.draw(context, "AbilityW: Level2 - Stop It, That Tickles! (Infinite Armor) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 300));
                                }
                                else if(game.data.player.ability2 === 2){
                                    this.font.draw(context, "AbilityW: Level3 - Stop It, That Tickles! (Infinite Armor) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 300));
                                }
                                else{
                                    //console.log("abilityw maxed");
                                }
                                
                                if(game.data.player.ability3 === 0){
                                    this.font.draw(context, "AbilityE: Level1 - ONE OF US! ONE OF US! (Kill your target) Cost: 10", (game.data.pausePos.x + 10), (game.data.pausePos.y + 350));
                                }
                                else if(game.data.player.ability3 === 1){
                                    this.font.draw(context, "AbilityE: Level2 - ONE OF US! ONE OF US! (Kill your target) Cost: 20", (game.data.pausePos.x + 10), (game.data.pausePos.y + 350));
                                }
                                else if(game.data.player.ability3 === 2){
                                    this.font.draw(context, "AbilityE: Level3 - ONE OF US! ONE OF US! (Kill your target) Cost: 30", (game.data.pausePos.x + 10), (game.data.pausePos.y + 350));
                                }
                                else{
                                    //console.log("abilitye maxed");
                                }          
                            }
                            else{
                                console.log("Character shop error");
                            }
                            
                        }

                    }));
                    me.input.bindKey(me.input.KEY.F1, "F1", true);
                    me.input.bindKey(me.input.KEY.F2, "F2", true);
                    me.input.bindKey(me.input.KEY.F3, "F3", true);
                    me.input.bindKey(me.input.KEY.F4, "F4", true);
                    me.input.bindKey(me.input.KEY.F5, "F5", true);
                    me.input.bindKey(me.input.KEY.F6, "F6", true);
                    
                                      
                    
                    me.game.world.addChild(game.data.buytext, 35);
                    me.game.world.addChild(game.data.buytext2, 35);
                }
                else if(me.input.isKeyPressed("buy") && this.buying && this.now-this.lastBuy >= 1000){
                    this.buying = false;
                    this.lastBuy = this.now;
                    game.data.player.setVelocity(game.data.mySpeed, 20);
                    me.input.unbindKey(me.input.KEY.F1);
                    me.input.unbindKey(me.input.KEY.F2);
                    me.input.unbindKey(me.input.KEY.F3);
                    me.input.unbindKey(me.input.KEY.F4);
                    me.input.unbindKey(me.input.KEY.F5);
                    me.input.unbindKey(me.input.KEY.F6);
                    me.game.world.removeChild(game.data.buyscreen);
                    me.game.world.removeChild(game.data.buytext);
                    me.game.world.removeChild(game.data.buytext2);
                }
                
                if(this.buying && me.input.isKeyPressed("F1") && this.now-this.lastBuy >= 1000){
                    this.lastBuy = this.now;
                    if(game.data.player.skill1 === 0 && game.data.gold >= 10){
                        game.data.player.skill1 += 1;
                        game.data.gold -= 10;
                        this.powerUp(1);
                    }
                    else if(game.data.player.skill1 === 1 && game.data.gold >= 20){
                        game.data.player.skill1 += 1;
                        game.data.gold -= 20;
                        this.powerUp(1);
                    }
                    else if(game.data.player.skill1 === 2 && game.data.gold >= 30){
                        game.data.player.skill1 += 1;
                        game.data.gold -= 30;
                        this.powerUp(1);
                    }
                }
                
                
                
                if(this.buying && me.input.isKeyPressed("F2") && this.now-this.lastBuy >= 1000){
                    this.lastBuy = this.now;
                    if(game.data.player.skill2 === 0 && game.data.gold >= 10){
                        game.data.player.skill2 += 1;
                        game.data.gold -= 10;
                        this.powerUp(2);
                    }
                    else if(game.data.player.skill2 === 1 && game.data.gold >= 20){
                        game.data.player.skill2 += 1;
                        game.data.gold -= 20;
                        this.powerUp(2);
                    }
                    else if(game.data.player.skill2 === 2 && game.data.gold >= 30){
                        game.data.player.skill2 += 1;
                        game.data.gold -= 30;
                        this.powerUp(2);
                    }
                }
                
                if(this.buying && me.input.isKeyPressed("F3") && this.now-this.lastBuy >= 1000){
                    this.lastBuy = this.now;
                    if(game.data.player.skill3 === 0 && game.data.gold >= 10){
                        game.data.player.skill3 += 1;
                        game.data.gold -= 10;
                        this.powerUp(3);
                    }
                    else if(game.data.player.skill3 === 1 && game.data.gold >= 20){
                        game.data.player.skill3 += 1;
                        game.data.gold -= 20;
                        this.powerUp(3);
                    }
                    else if(game.data.player.skill3 === 2 && game.data.gold >= 30){
                        game.data.player.skill3 += 1;
                        game.data.gold -= 30;
                        this.powerUp(3);
                    }
                }
                
                if(this.buying && me.input.isKeyPressed("F4") && this.now-this.lastBuy >= 1000){
                    this.lastBuy = this.now;
                    if(game.data.player.ability1 === 0 && game.data.gold >= 10){
                        game.data.player.ability1 += 1;
                        game.data.gold -= 10;
                        
                    }
                    else if(game.data.player.ability1 === 1 && game.data.gold >= 20){
                        game.data.player.ability1 += 1;
                        game.data.gold -= 20;
                        
                    }
                    else if(game.data.player.ability1 === 2 && game.data.gold >= 30){
                        game.data.player.ability1 += 1;
                        game.data.gold -= 30;
                        
                    }
                }
                
                if(this.buying && me.input.isKeyPressed("F5") && this.now-this.lastBuy >= 1000){
                    this.lastBuy = this.now;
                    if(game.data.player.ability2 === 0 && game.data.gold >= 10){
                        game.data.player.ability2 += 1;
                        game.data.gold -= 10;
                        
                    }
                    else if(game.data.player.ability2 === 1 && game.data.gold >= 20){
                        game.data.player.ability2 += 1;
                        game.data.gold -= 20;
                        
                    }
                    else if(game.data.player.ability2 === 2 && game.data.gold >= 30){
                        game.data.player.ability2 += 1;
                        game.data.gold -= 30;
                        
                    }
                }
                
                if(this.buying && me.input.isKeyPressed("F6") && this.now-this.lastBuy >= 1000){
                    this.lastBuy = this.now;
                    if(game.data.player.ability3 === 0 && game.data.gold >= 10){
                        game.data.player.ability3 += 1;
                        game.data.gold -= 10;
                        
                    }
                    else if(game.data.player.ability3 === 1 && game.data.gold >= 20){
                        game.data.player.ability3 += 1;
                        game.data.gold -= 20;
                        
                    }
                    else if(game.data.player.ability3 === 2 && game.data.gold >= 30){
                        game.data.player.ability3 += 1;
                        game.data.gold -= 30;
                       
                    }
                }
                
                //console.log("F2? " + this.buying + me.input.isKeyPressed("F2") + (this.now-this.lastbuy >= 1000) + " pause? " + me.input.isKeyPressed("pause") + !this.paused + (this.now-this.lastPause >= 1000));
                
                if(me.input.isKeyPressed("pause") && !this.paused && this.now-this.lastPause >= 1000){
                    this.paused = true;
                    //this.pausePos = me.game.viewport.localToWorld(0, 0);
                    game.data.pausePos = me.game.viewport.localToWorld(0, 0);
                    game.data.pausescreen = new me.SpriteObject (game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('pause'));
                    game.data.pausescreen.updateWhenPaused = true;
                    me.game.world.addChild(game.data.pausescreen, 32);
                    this.lastPause = this.now;
                    game.data.pauseText = new (me.Renderable.extend ({
                        init: function(){
                            this.parent(new me.Vector2d(game.data.pausePos.x, game.data.pausePos.y), 1, 1);
                            this.font = new me.BitmapFont("32x32_font", 32);
                            this.updateWhenPaused = true;
                            this.alwaysUpdate = true;
                        },

                        draw: function(context){    
                            this.font.draw(context, "PRESS 'P' TO UNPAUSE", (game.data.pausePos.x + 270), (game.data.pausePos.y + 100));
                        }

                    }));
                    me.game.world.addChild(game.data.pauseText, 33);
                    me.state.pause(me.state.PLAY);
                }
                else if(me.input.isKeyPressed("pause") && this.paused && this.now-this.lastPause >= 1000){
                    this.paused = false;
                    me.state.resume(me.state.PLAY);
                    this.lastPause = this.now;
                    me.game.world.removeChild(game.data.pausescreen);
                    me.game.world.removeChild(game.data.pauseText);
                }
                return true;
        
   },
   
   powerUp : function(skill){
       if(skill === 1){
            if((game.data.character === 1)){
                console.log("Old Range: ");
                game.data.player.range += 150;
                console.log("New Range: ");
            }
            else if((game.data.character === 2)){
                console.log("Old Attack: " + game.data.player.attack);
                game.data.player.attack += 5;
                console.log("New Attack: " + game.data.player.attack);
            }
            else if((game.data.character === 3)){
                console.log("Old Health: " + game.data.player.maxHealth);
                game.data.player.maxHealth += 10;
                game.data.player.health += 10;
                console.log("New Health: " + game.data.player.maxHealth);
            }
            else if((game.data.character === 4)){
                game.data.player.range += 150;            
            }
            else if((game.data.character === 5)){
                game.data.player.defense += 2;            
            }
       }
       
       if(skill === 2){
            if((game.data.character === 1)){
                 game.data.player.attack += 5;       
            }
            else if((game.data.character === 2)){
                game.data.player.hitDelay -= 100;
            }
            else if((game.data.character === 3)){
                console.log("Old Speed: " + game.data.mySpeed);
                game.data.mySpeed ++;
                game.data.player.setVelocity(game.data.mySpeed, 20);
                console.log("New Speed: " + game.data.mySpeed);
            }
            else if((game.data.character === 4)){
                game.data.player.attack += 5;             
            }
            else if((game.data.character === 5)){
                game.data.mySpeed ++;
                game.data.player.setVelocity(game.data.mySpeed, 20);            
            }
       }
       if(skill === 3){
            if((game.data.character === 1)){
                game.data.player.range += 150;       
            }
            else if((game.data.character === 2)){
                game.data.mySpeed ++;
                game.data.player.setVelocity(game.data.mySpeed, 20);
            }
            else if((game.data.character === 3)){
                game.data.player.attack += 5;
            }
            else if((game.data.character === 4)){
                game.data.player.attack += 5;
            }
            else if((game.data.character === 5)){
                game.data.player.attack += 5;           
            }
       }
   }
     
});