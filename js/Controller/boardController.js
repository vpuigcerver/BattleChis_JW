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