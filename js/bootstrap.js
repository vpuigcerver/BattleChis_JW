var game = new Phaser.Game(
	916,
	916,
	Phaser.AUTO,
	'',
	{ 
        preload: function() {
            // Load sprite
            game.load.atlasJSONHash('battle_battlechis', 'media/img/battle_battlechis_all.png', 'media/img/battle_battlechis_all.json');
            game.load.atlasJSONHash('dados', 'media/img/dados.png', 'media/img/dados.json');
            
            
        }, 
		
        create: function() {
            console.log("Create");
            var boardController = new BoardController();
        },
		
        update: function() {
            
        }
    }
);