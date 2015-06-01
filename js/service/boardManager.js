var BoardManager = function() {
  // Constants    
  var PLAYER_COLOR = {
    GROC: 0,
    VERD: 1,
    ROJA: 2,    
    BLAU: 3
  };
    
  var INI_CASELLA_COLOR = [
      5, //GROC
      22, //VERD
      39, //ROJA
      56 //BLAU
  ];
    
  // Attributes
  var currentColor = PLAYER_COLOR.GROC;
  var board = new Board();
  var position = new Position();
  // Public methods
  // Returns true if the player was able to make the move. 
    
  this.makeMove = function(fitxes, indexFitxa, moveDistance, boardPositions, spriteFitxa) {
      /*ioSocket.emit('makeMove', selectedPositionIndex);
      */
      var fitxa = fitxes[indexFitxa];
      
      var posToGo = fitxa.getPosition();
      
      var casellaIni = board.getCasella(posToGo);
      
      var casellaToGo = casellaIni;
       
    
      if (fitxa.getPosition() == fitxa.getPosIni()){
          casellaToGo = INI_CASELLA_COLOR[currentColor] + moveDistance;
          casellaIni = INI_CASELLA_COLOR[currentColor];
      }else {
          if (casellaToGo != -1){
             casellaToGo += moveDistance;
          }else{
              console.log("Casella igual a -1 quan no toca");
          }
      }
      
      var arrayPosition;
      var barrera_bool = false;
      var barrera_casella = -1; 
      
      for(var pos_barrera = casellaIni+1; pos_barrera <= casellaToGo; pos_barrera++){
          arrayPosition = board.verCasellesExteriors(pos_barrera);
          if(arrayPosition[0].isEmpty() || arrayPosition[1].isEmpty()){
          }else {
              barrera_casella = pos_barrera;
              barrera_bool = true;
              break;
          }              
      }
      
      if (barrera_bool){   
          //Hi ha barrera que impedeix el pas
          return [false, fitxes];
      }
      
      var arrayPosition = board.verCasellesExteriors(casellaToGo);
    
      var internal_pos = -1;
      
      if(arrayPosition[0].isEmpty()){
          internal_pos = 0;
      }else if (arrayPosition[1].isEmpty()){
          internal_pos = 1;
      }else{
          //Les dues posicions estan ocupades
          return [false, fitxes];
      }
      
      console.log("internalPo: " + internal_pos);
      var currentStatus = getCurrentStatus();

      console.log("CurrentStatus: " + currentStatus);

      if (Math.floor(indexFitxa/4) == currentStatus){
          board.setPositionStatus(fitxa.getPosition(),BOARD_POSITION_COLOR.EMPTY);
          console.log("Position fitxa abans: " + fitxa.getPosition());
          fitxa.setPosition(arrayPosition[internal_pos].getId());
          fitxes[i] = fitxa;
          board.setPositionStatus(fitxa.getPosition(), currentStatus);
          console.log("Position fitxa despres: " + fitxa.getPosition());
          //console.log("posicio 0: " + board.verCasellesExteriors(fitxa.getPosition())[0].isEmpty() + " i posicio 1: " + board.verCasellesExteriors(fitxa.getPosition())[1].isEmpty());
          updateCurrentColor();


          for(var i = 0; i < 16; i++){
                var position = boardPositions[fitxes[i].getPosition()];

                var elementId = fitxes[i].getId();
                spriteFitxa[elementId].kill();

                spriteFitxa[elementId] = game.add.sprite(position.left, position.top, 'battle_battlechis','fitxa_'+fitxes[i].getColor()+'.png');


          }
      }else {
          //No es el torn de la fitxa
          return [false, fitxes];
      }
      
      board.debugPrint();
      return [true, fitxes];
      
  };
    
  this.getBoard = function() {
      return board;
  };
    
  this.isGameFinished = function() {
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
        return BOARD_POSITION_COLOR.ROJA;
    }
  };
  
  var updateCurrentColor = function() {
    if(currentColor === PLAYER_COLOR.GROC) {
      currentColor = PLAYER_COLOR.VERD;
    }
    else if (currentColor === PLAYER_COLOR.BLAU){
      currentColor = PLAYER_COLOR.GROC;
    }
    else if (currentColor === PLAYER_COLOR.ROJA){
      currentColor = PLAYER_COLOR.BLAU;
    }
    else if (currentColor === PLAYER_COLOR.VERD){
      currentColor = PLAYER_COLOR.ROJA;
    }
  };    
    
  var arePositionsEqual = function(positions) {
    return !positions[0].isEmpty() && 
      positions[0].areEqual(positions[1]) && 
      positions[0].areEqual(positions[2]);
  }
    
};