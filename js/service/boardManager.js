var BoardManager = function() {
  // Constants    
  var PLAYER_COLOR = {
    GROC: 0,
    BLAU: 1,
    ROJA: 2,
    VERD: 3
  };
    
  // Attributes
  var currentColor = PLAYER_COLOR.GROC;
  var board = new Board();
  var position = new Position();
  // Public methods
  // Returns true if the player was able to make the move. 
  this.makeMove = function(PositionIndex) {
      /*ioSocket.emit('makeMove', selectedPositionIndex);
      */
      
      var arrayPosition = board.verCasellesExteriors(PositionIndex-1);
        
      var canMakeMove = arrayPosition[0].isEmpty();
      if(canMakeMove) {
         var currentStatus = getCurrentStatus();
         
         board.setPositionStatus(PositionIndex, currentStatus);
         updateCurrentColor();
      }
      
      board.debugPrint();
      return canMakeMove;
      
  };
    
  this.getBoard = function() {
      return board;
  };
    
  this.isGameFinished = function() {
    var gameFinished = false;
      
    var leftToRightDiag = board.getLeftToRightDiagonal();
    if(arePositionsEqual(leftToRightDiag)) {
        gameFinished = true;
    }
      
    if(gameFinished) {
        return gameFinished;
    }
      
    var rightToLeftDiag = board.getRightToLeftDiagonal();
    if(arePositionsEqual(rightToLeftDiag)) {
        gameFinished = true;
    }
      
    for(var i = 0; i < 3 && !gameFinished; ++i) {
      var column = board.getColumn(i);
      if(arePositionsEqual(column)) {
        gameFinished = true;
      }
      
      var row = board.getRow(i);
      if(arePositionsEqual(row)) {
        gameFinished = true;
      }
    }
        
    return gameFinished;
  };
    
  // Private
  var getCurrentStatus = function() {
    if(currentColor === PLAYER_COLOR.GROC) {
        return BOARD_POSITION_COLOR.GROC;
    }  
    else if(currentColor === PLAYER_COLOR.BLAU) {
        return BOARD_POSITION_COLOR.BLAU;
    } 
    else if(currentColor === PLAYER_COLOR.VERD) {
        return BOARD_POSITION_COLOR.VERD;
    } 
    else if(currentColor === PLAYER_COLOR.ROJA) {
        return BOARD_POSITION_STATUS.ROJA;
    }
  };
  
  var updateCurrentColor = function() {
    if(currentColor === PLAYER_COLOR.GROC) {
      currentColor = PLAYER_COLOR.BLAU;
    }
    else if (currentColor === PLAYER_COLOR.BLAU){
      currentColor = PLAYER_COLOR.ROJA;
    }
    else if (currentColor === PLAYER_COLOR.ROJA){
      currentColor = PLAYER_COLOR.VERD;
    }
    else if (currentColor === PLAYER_COLOR.VERD){
      currentColor = PLAYER_COLOR.GROC;
    }
  };    
    
  var arePositionsEqual = function(positions) {
    return !positions[0].isEmpty() && 
      positions[0].areEqual(positions[1]) && 
      positions[0].areEqual(positions[2]);
  }
    
};