var BoardController = {
    
    preload: function() {
        
        game.load.atlasJSONHash('battle_battlechis', 'media/img/battle_battlechis_all.png', 'media/img/battle_battlechis_all.json');
        game.load.atlasJSONHash('dados', 'media/img/dados.png', 'media/img/dados.json');
        game.load.image('cuadrado0', 'media/img/cuadrado0.png');
        game.load.image('cuadrado1', 'media/img/cuadrado1.png');
        game.load.image('cuadrado2', 'media/img/cuadrado2.png');
        game.load.image('cuadrado3', 'media/img/cuadrado3.png');
    },
    
    create: function () {
        this.view = new BoardView(this);
        this.view.createBoard('battle_battlechis');
        //view.debugDrawBoardPositions();
        this.view.addListener(this);

    },
    
    update: function() {
        var isGameFinished = false;
        this.onPositionPressed = function(position) {
            var guanya = guanyador();
            console.log("Guaña: " + guanya[0] +", " + guanya[1]);
            if(guanya[0]) {

               alert("GUANYA EL JUGADOR: " + guanya[1]);
            }
            else 
            {
                console.log("Ningu ha gunayat encara");
            }
        
        };
    }
};