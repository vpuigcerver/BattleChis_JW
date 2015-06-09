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
    
  var CASELLA_ESPECIAL = [
     /*17, //GROC
      34, //VERD
      51, //ROJA
      68 //BLAU*/
      68, //GROC
      17, //VERD
      34, //ROJA
      51 //BLAU
  ];
    
  var POSICIO_FINAL = [
      [174,175,195,196], //GROC
      [281,302,282,303], //VERD
      [265,266,244,245], //ROJA
      [138,159,137,158] //BLAU
  ];
    
  var CASELLA_SEGURA = [5,12,17,22,29,34,39,46,51,56,63,68];
    
     var OFFSET_FITXA = 10;
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
      
      var casellaToGo = fitxa.getNextCasellaIfClick();
      //console.log("PereProva: "+ casellaToGo  + " " + fitxa.getNextCasellaIfClick());
      fitxa.setPujant(fitxa.getNextPujantIfClick());
      
      var potMorir = true;
      var i = 0;
      while(i < CASELLA_SEGURA.length){
          if (casellaToGo == CASELLA_SEGURA[i]){
              potMorir = false;
              break;
          }
          i++;
      }
      fitxa.setPuedeMorir(potMorir);
      
      if (!fitxa.getCanMove()){   
          //Es dona alguna de les condicions que no permet moure la fitxa (mirar canPlayTurn)
          fitxes[indexFitxa] = fitxa;
          return [false, fitxes];
      }     
      
      arrayPosition = board.verCasellesExteriors(casellaToGo, fitxa.getPujant() ? currentColor : -1);
      
      //console.log("PereProva: "+ casellaToGo + " " + fitxa.getPujant());
      
      if(casellaToGo == 8 && fitxa.getPujant()){
          board.setPositionStatus(fitxa.getPosition(),BOARD_POSITION_COLOR.EMPTY);
          // console.log("Position fitxa abans: " + fitxa.getPosition());
          fitxa.setPosition(POSICIO_FINAL[currentColor][indexFitxa%4]);
          fitxa.setCasella(-1);
          fitxa.setArribat(true);
          fitxes[indexFitxa] = fitxa;
          board.setPositionStatus(fitxa.getPosition(), currentStatus);
          dibuixarFitxes(fitxes, boardPositions, spriteFitxa);
          
          var guanya = guanyador(fitxes);
          if(guanya[0]){
            alert("Ha guañat " + guanya[1]);
          }else{
            console.log("Ningu ha guañat");   
          }
          
          return [true, fitxes];  
      }
    
      var internal_pos = -1;
      
      if(arrayPosition[0].isEmpty()){
          internal_pos = 0;
      }else if (arrayPosition[1].isEmpty()){
          internal_pos = 1;
      }else{
          //Les dues posicions estan ocupades
          console.log("Posició segura d'inici del color pertinent");

          matar(fitxes,indexFitxa, casellaToGo, true);
          fitxes[indexFitxa] = fitxa;
          return [false, fitxes];
      }
      
      //Matar
      matar(fitxes, indexFitxa, casellaToGo, false);
      
      
      
      var currentStatus = this.getCurrentStatus();

      if (Math.floor(indexFitxa/4) == currentStatus){
          board.setPositionStatus(fitxa.getPosition(),BOARD_POSITION_COLOR.EMPTY);
          fitxa.setPosition(arrayPosition[internal_pos].getId());
          fitxa.setCasella(casellaToGo);
          fitxes[indexFitxa] = fitxa;
          board.setPositionStatus(fitxa.getPosition(), currentStatus);

          dibuixarFitxes(fitxes, boardPositions, spriteFitxa);
      }else {
          //No es el torn de la fitxa
          return [false, fitxes];
      }
      
      return [true, fitxes];
      
  };
    
  this.getBoard = function() {
      return board;
  };
    
  this.isGameFinished = function() {
    return gameFinished;
  };
    
  // Private
  this.getCurrentStatus = function() {
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
  
  

  this.updateCurrentColor = function() {
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
    console.log("Es el turno de "+currentColor);
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
    console.log("Es el turno de "+currentColor);
  }; 
    
  var arePositionsEqual = function(positions) {
    return !positions[0].isEmpty() && 
      positions[0].areEqual(positions[1]) && 
      positions[0].areEqual(positions[2]);
  };
  
  var dibuixarFitxes = function(fitxes, boardPositions, spriteFitxa) {
    for(var i = 0; i < 16; i++){
        var position = boardPositions[fitxes[i].getPosition()];

        var elementId = fitxes[i].getId();
        spriteFitxa[elementId].kill();

        spriteFitxa[elementId] = game.add.sprite(position.left + OFFSET_FITXA, position.top + OFFSET_FITXA, 'battle_battlechis','fitxa_'+fitxes[i].getColor()+'.png');
    }
  };
  
  this.canPlayTurn = function(fitxes, moveDistance){
      i = currentColor * 4;
      var canPlay = false;
      while (i < (currentColor + 1) * 4){
          var fitxa = fitxes[i];
          fitxa.setCanMove(true);
          if(!fitxa.getArribat()){
              //Comprova si hi ha alguna barrera
              fitxa = hiHaBarrera(fitxa, moveDistance);
              var casellaToGo = fitxa.getNextCasellaIfClick();
              
              //Comprova que si et passes de la casella final no puguis moure la fitxa
              if(casellaToGo > 8 && fitxa.getPujant()){
                  fitxa.setCanMove(false);
              }
              
              //Comprovació que per sortir de l'inici es necessita un 5
              if(moveDistance != 5 && fitxa.getPosIni() == fitxa.getPosition()){
                  fitxa.setCanMove(false);
              }
              
              if(fitxa.getCanMove()){
                  canPlay = true;
                  fitxes[i] = fitxa;
              }
          }else {
              fitxa.setCanMove(false);
              
          }
          fitxes[i] = fitxa;
          i++;
      }
      return [canPlay, fitxes, currentColor];
  };

  //Comprova si s'arriba a una barrera i actualitza la casella a la que hauria d'anar la fitxa si es moves
  var hiHaBarrera = function(fitxa, moveDistance){
      var posToGo = fitxa.getPosition();
      var casellaIni = board.getCasella(posToGo, fitxa.getPujant() ? currentColor : -1);
      var casellaToGo = casellaIni;
      
      console.log("hiHaBarrera - fitxa: "+fitxa.getId() +" posToGo: "+posToGo+" casellaToGo: " + casellaToGo + " getPujant: " + fitxa.getPujant());
      
      if (fitxa.getPosition() == fitxa.getPosIni()){
          casellaToGo = INI_CASELLA_COLOR[currentColor];
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
      
      for(var pos_barrera = casellaIni+1; pos_barrera <= (casellaToGo > 8 && fitxa.getPujant() ? 8 : casellaToGo); pos_barrera++){
          fitxa.setNextPujantIfClick(fitxa.getPujant());
          
          arrayPosition = board.verCasellesExteriors(pos_barrera, fitxa.getPujant() ? currentColor : -1);
          
          if(arrayPosition[0].isEmpty() || arrayPosition[1].isEmpty()){
              //Comprovar si esta en casella especial per pujar
              if (pos_barrera == CASELLA_ESPECIAL[currentColor]){
                  casellaToGo = (casellaToGo - CASELLA_ESPECIAL[currentColor])+1;
                  fitxa.setNextPujantIfClick(true);
                  //barreraArray = searchBarrera(casellaToGo);
                  for(var pos_barrera_puj = 1; pos_barrera_puj <= (casellaToGo > 8 ? 8 : casellaToGo); pos_barrera_puj++){
                        arrayPosition = board.verCasellesExteriors(pos_barrera_puj, currentColor);
                        if(!arrayPosition[0].isEmpty() && !arrayPosition[1].isEmpty()){
                          barrera_casella = pos_barrera_puj;
                          barrera_bool = true;
                          break;
                       }             
                  }
                  break;
              }
          }else {
              barrera_casella = pos_barrera;
              barrera_bool = true;
              break;
          }              
      }
      fitxa.setCanMove(!barrera_bool && !(casellaToGo > 8 && fitxa.getPujant()));
      fitxa.setNextCasellaIfClick(casellaToGo);
      return fitxa;
  };
    
    var guanyador = function(fitxes){
      i = currentColor * 4;
      while (i < (currentColor + 1) * 4){
          if(!fitxes[i].getArribat()){
              return [false, currentColor];
          }
          i++;
      }
      return [true, currentColor];
    };
    
    var matar = function(fitxes, indexFitxa, casellaToGo, haveToDie) {
        var fitxa = fitxes[indexFitxa];
        if(!arrayPosition[0].isEmpty() || !arrayPosition[1].isEmpty()){
              var i = 0;
              while (i < fitxes.length){
                  fitxaToDie = fitxes[i];
                  if(fitxaToDie.getCasella() == casellaToGo && (fitxaToDie.getPuedeMorir() || haveToDie) && Math.floor(i/4) != currentColor){
                      board.setPositionStatus(fitxaToDie.getPosition(),BOARD_POSITION_COLOR.EMPTY);                      
                      fitxaToDie.matarFitxa();                   
                      board.setPositionStatus(fitxaToDie.getPosition(), currentStatus);
                      fitxes[i] = fitxaToDie;
                      console.log("HA DE MORIR!!! " + fitxaToDie.getId() + " de color " + fitxaToDie.getColor() + " a mans de " + fitxa.getId() + " a casella " + casellaToGo);
                      break;
                  }
                  console.log("La fitxa " + fitxaToDie.getId() +" s'ha salvat a casella " + fitxaToDie.getCasella() + " pot morir? " + fitxaToDie.getPuedeMorir());
                  i++;
              }        
          }
        return fitxes;
    };
    
};