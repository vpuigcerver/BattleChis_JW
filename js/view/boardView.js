var BoardView = function() {
    
    var BOARD_LINE_LIMIT_WIDTH = 8;
  
    // Attributes
    var self = this;
    var boardPositions = [];
   
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
          console.log(valorDados);
        //self.listener.onPositionPressed(pressedPosition); 
          var numerosCasilla = verCasellesExteriors(valorDados); // 1 = numero de casilla enviada
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
    }
    
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
    var verCasellesExteriors = function(id){
    var Caselles=[[5,26],[4,25],[3,24],[2,23],[1,21],[42,43],[63,64],[84,85],[105,106],[126,127],[147,148],[168,169],[189,190],[210,211],[231,232],[252,253],[273,295],[315,316],[336,337],[357,358],[378,379],[399,421],[401,422],[402,423],[403,424],[404,425],[405,426],[406,427],[407,428],[408,429],[409,430],[410,431],[411,432],[412,434],[414,435],[415,436],[416,437],[417,438],[419,439],[397,398],[376,377],[355,356],[334,335],[313,314],[292,293],[271,272],[250,251],[229,230],[208,209],[187,188],[145,167],[124,125],[103,104],[82,83],[61,62],[19,41],[18,39],[17,38],[16,37],[15,36],[14,35],[13,34],[12,33],[11,32],[10,31],[9,30],[8,29],[7,27]]
    var arrayCaselles = new Array(2);
     
     if (id>68){
         id = id-68;
     }
     
     for ( var i = 0; i <=1; i++){
       
            arrayCaselles[0] = Caselles[id-1][0]; 
            arrayCaselles[1] = Caselles[id-1][1];  
          }
     
    return[
            arrayCaselles[0],
            arrayCaselles[1] 
        ];
 };
    
    // Constructor
    (function() {
        window.game.add.sprite(0, 0, 'battle_battlechis','battle_battlechis.png');
      
        window.game.input.onDown.add(self.onMouseDown);      
        calculateBoardPosition();
    })();
};