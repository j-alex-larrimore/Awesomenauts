
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
                //minimap: new game.HUD.MiniMap(300, 10, me.loader.getImage("miniMap2")),
                username: "",       //username, password, exp are the variables being saved/loaded
                password: "",
                character: "",        
                exp: 0,
                gold: 0,
                minimap: "",
		score : 0,
                miniplayer: "",
                player: "",
                creepe: "",
                creepp: "",
                gamemanager: "",
                pausescreen: "",
                buyscreen: "",
                buytext: "",
                pausePos: "",
                pauseText: "",
                teammate1: "",
                teammate2: "",
                enemy1: "",
                enemy2: "",
                enemy3: ""
	},
	
        
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen", 1067, 600, true, 1.0)) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}        
        
        me.save.add({exp : 0});

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}
        me.state.CHARSELECT = 111;
        me.state.SPENDEXP = 112;
        me.state.SPENDGOLD = 113;
        me.state.NEWPROFILE = 114;
        me.state.LOADPROFILE = 115;
                
        me.sys.pauseOnBlur = false;             ///Need this and the next line to keep the game from unpausing when you switch to other tabs in your browser
        me.sys.resumeOnFocus = false;
        
	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
                //var me.state.PAUSE = me.state.USER + 0;
                
                //var CHARSELECT = 111;
                //var SPENDEXP = 112;
                //var SPENDGOLD = 113;
                
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
                me.state.set(me.state.CHARSELECT, new game.CharSelect());                
                me.state.set(me.state.SPENDGOLD, new game.SpendGold());
                me.state.set(me.state.GAMEOVER, new game.GameOver());
                me.state.set(me.state.SPENDEXP, new game.SpendExp());
                me.state.set(me.state.NEWPROFILE, new game.NewProfile());
                me.state.set(me.state.LOADPROFILE, new game.LoadProfile());
               // me.state.set(me.state.PAUSE, new game.PauseScreen());
                
                me.pool.register("gameManager", game.GameManager, true);
                me.pool.register("player", game.PlayerEntity, true);
                me.pool.register("baseP", game.PlayerBaseEntity, true);
                me.pool.register("baseE", game.EnemyBaseEntity, true);
                me.pool.register("miniMap", game.MiniMap, true);
                me.pool.register("miniPlayer", game.miniPlayerLocation, true);
                me.pool.register("creepE", game.EnemyCreep, true);
                me.pool.register("creepP", game.PlayerCreep, true);
                me.pool.register("enemyEntity", game.EnemyEntity, true);
                me.pool.register("playerTeammate", game.PlayerTeammate, true);
                me.pool.register("miniPCreep", game.miniPCreepLocation, true);
                me.pool.register("miniECreep", game.miniECreepLocation, true);
                me.pool.register("miniEnemy", game.miniEnemyLocation, true);
                me.pool.register("miniTeammate", game.miniTeammateLocation, true);

                me.input.bindKey(me.input.KEY.RIGHT, "right");
                me.input.bindKey(me.input.KEY.LEFT, "left");
                me.input.bindKey(me.input.KEY.SPACE, "jump");
                me.input.bindKey(me.input.KEY.A, "attack");
                me.input.bindKey(me.input.KEY.TAB, "toggleMap");
                me.input.bindKey(me.input.KEY.P, "pause");
                me.input.bindKey(me.input.KEY.B, "buy");
            
            // Start the game.
		me.state.change(me.state.MENU);
	}
};
