
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
                //minimap: new game.HUD.MiniMap(300, 10, me.loader.getImage("miniMap2")),
                minimap: "",
		score : 0,
                miniplayer: "",
                player: "",
                creepe: "",
                creepp: ""
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen", 1067, 600, true, 1.0)) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

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
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
                me.state.set(me.state.CHARSELECT, new game.CharSelect());
                me.state.set(me.state.GAMEOVER, new game.GameOver());
                me.state.set(me.state.SPENDEXP, new game.SpendExp());
                me.state.set(me.state.SPENDGOLD, new game.SpendGold());
                me.state.set(me.state.PAUSE, new game.PauseScreen());
                
                me.pool.register("player", game.PlayerEntity, true);
                me.pool.register("baseP", game.PlayerBaseEntity, true);
                me.pool.register("baseE", game.EnemyBaseEntity, true);
                me.pool.register("miniMap", game.MiniMap, true);
                me.pool.register("miniPlayer", game.miniPlayerLocation, true);
                me.pool.register("creepE", game.EnemyCreep, true);
                me.pool.register("creepP", game.PlayerCreep, true);

                me.input.bindKey(me.input.KEY.RIGHT, "right");
                me.input.bindKey(me.input.KEY.LEFT, "left");
                me.input.bindKey(me.input.KEY.SPACE, "jump");
                me.input.bindKey(me.input.KEY.A, "attack");
                me.input.bindKey(me.input.KEY.TAB, "toggleMap");
                me.input.bindKey(me.input.KEY.P, "pause");
            
            // Start the game.
		me.state.change(me.state.MENU);
	}
};
