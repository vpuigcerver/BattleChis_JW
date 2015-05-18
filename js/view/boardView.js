var BoardView = function() {
    
    var BOARD_LINE_LIMIT_WIDTH = 3;

    // Attributes
    var self = this;
    var boardPositions = [];
    var fitxes = [];
    var boardManager = new BoardManager();
    var board = new Board();
/*    this.updateBoard = function(logicBoard) {
      for(positionIndex in boardPositions) {
          if(!boardPositions[positionIndex].painted) {
            var logicPosition = logicBoard.getPosition(positionIndex);
            if(!logicPosition.isEmpty()) {
              drawMovement(positionIndex, logicPosition.isCross());
            }
          }
      }
    };
    */
    this.onMouseDown = function(mouseEvent) {
         var pressedPosition = -1;
      
      for(positionIndex in boardPositions) {
        var position = boardPositions[positionIndex];
        
        var positionLimit =  {
          minX: position.left,
          maxX: position.left + position.width,
          minY: position.top,
          maxY: position.top + position.height
        }
        
        if((mouseEvent.x >= positionLimit.minX) && 
           (mouseEvent.x <= positionLimit.maxX) &&
           (mouseEvent.y >= positionLimit.minY) &&
           (mouseEvent.y <= positionLimit.maxY))
        {
          pressedPosition = positionIndex;
          break;
        }
      }
      
      if(pressedPosition != -1) {
         var valorDados = tirarDados();
          //console.log(valorDados);
        //self.listener.onPositionPressed(pressedPosition); 
          
          boardManager.makeMove(5);
          
          var numerosCasilla = board.verCasellesExteriors(valorDados); // 1 = numero de casilla enviada
          for ( var i = 0; i <=1; i++){
            console.log(numerosCasilla[i]);   
          }
                      
      }
        
    };
    
    this.addListener = function(listener) {
      self.listener = listener;
    };
    
    var tirarDados = function(){
        var randomdice=Math.round(Math.random()*5)+1;
        window.game.add.sprite(375, 375, 'dados','dado'+randomdice+'.png');
        return randomdice;
    };
    
    
    
    // Private
    var calculateBoardPosition = function() {
      var boardSize = {
          width: window.game.width - (2 * BOARD_LINE_LIMIT_WIDTH),
          height: window.game.height - (2 * BOARD_LINE_LIMIT_WIDTH)
      };
      
      var elementWidth = boardSize.width / 21;
      var elementHeight = boardSize.height/ 21;
      
      var minWidth = BOARD_LINE_LIMIT_WIDTH;
      for(var horizontal = 0; horizontal < 21; ++horizontal) {
        var minHeight = BOARD_LINE_LIMIT_WIDTH;
        
        for(var vertical = 0; vertical < 21; ++vertical) {
          boardPositions.push({
            top: minHeight,
            left: minWidth,
            width: elementWidth,
            height: elementHeight,
            painted: false
          });
          
          minHeight += elementHeight;
        }
        
        minWidth += elementWidth;
      }
      console.log(boardPositions);
      debugDrawBoardPositions();
  };
  
  var debugDrawBoardPositions = function() {
    var graphics = window.game.add.graphics(0, 0);
    
    graphics.lineStyle(2, 0x0000FF, 1);
    
    for(positionIndex in boardPositions) {
      var position = boardPositions[positionIndex];
      graphics.drawRect(position.left, position.top, position.width, position.height);  
    }
  };
    /*
  var drawMovement = function(positionIndex, isCross) {
    var position = boardPositions[positionIndex];
    
    if(isCross)
    {
      game.add.sprite(position.left, position.top, 'boardSprite', 'cross.png');  
    }
    else 
    {
      game.add.sprite(position.left, position.top, 'boardSprite', 'circle.png');  
    }
  };
    
    */
   
    var crearFitxas = function() {
        var f1 = new Fitxa(1,"groc",66);
        var f2 = new Fitxa(2,"groc",88);
        var f3 = new Fitxa(3,"groc",108);
        var f4 = new Fitxa(4,"groc",130);
        
        var f5 = new Fitxa(5,"roja",310);
        var f6 = new Fitxa(6,"roja",332);
        var f7 = new Fitxa(7,"roja",352);
        var f8 = new Fitxa(8,"roja",374);
        
        var f9 = new Fitxa(9,"verd",339);
        var f10 = new Fitxa(10,"verd",361);
        var f11 = new Fitxa(11,"verd",341);
        var f12 = new Fitxa(12,"verd",363);
        
        var f13 = new Fitxa(13,"blau",77);
        var f14 = new Fitxa(14,"blau",99);
        var f15 = new Fitxa(15,"blau",79);
        var f16 = new Fitxa(16,"blau",101);
        
        
        fitxes = [f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14,f15,f16];
        
        for(var i = 1; i <= 16; i++){
            var position = boardPositions[fitxes[i-1].getPosition()];
            console.log(fitxes[i-1].getColor());
            game.add.sprite(position.left, position.top, 'battle_battlechis','fitxa_'+fitxes[i-1].getColor()+'.png');   
        }

    };
    
    // Constructor
    (function() {
        window.game.add.sprite(0, 0, 'battle_battlechis','battle_battlechis.png');
        
        window.game.input.onDown.add(self.onMouseDown);      
        calculateBoardPosition();
        crearFitxas();  
    })();
};