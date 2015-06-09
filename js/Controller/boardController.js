var BoardController = function() {
    var view = new BoardView();
    //var manager = new BoardManager();
    var isGameFinished = false;
        
    this.onPositionPressed = function(position) {
       /* if(!isGameFinished) {
            
            var wasAbleToMakeMove = manager.makeMove(position);
            if(!wasAbleToMakeMove) {
                alert("Error!");
                return;
            }

            var board = manager.getBoard();
            view.updateBoard(board);

            isGameFinished = manager.isGameFinished();

            if(isGameFinished) {
                console.log("GAME FINISHED");
            }
        }
        else 
        {
            alert("GAME FINISHED!!!!");
        }*/
        
    };
    
    var self = this;
    (function() {
        view.addListener(self);
    })();
};

var BoardController = {
    preload: function() {
        game.load.atlasJSONHash('battle_battlechis', 'media/img/battle_battlechis_all.png', 'media/img/battle_battlechis_all.json');
        game.load.atlasJSONHash('dados', 'media/img/dados.png', 'media/img/dados.json');
    },
    
    create: function () {
        this.view = new BoardView(this);
        this.view.createBoard('battle_battlechis','dados');
        //view.debugDrawBoardPositions();
        this.view.addListener(this);

    },
    
    update: function() {
       
    }
};