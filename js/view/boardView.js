var BoardView = function() {
    
    var BOARD_LINE_LIMIT_WIDTH = 3;
    var OFFSET_FITXA = 10;
    // Attributes
    var self = this;
    
    var tirant = 0; //tirant->0, escollint fitxa -> 1
    var valorDados = -1;
    
    var boardPositions = [];
    var fitxes = [];
    var boardManager = new BoardManager();
    
    this.onMouseDown = function(mouseEvent) {
        var esquina_button_right = boardPositions[242];
        var esquina_top_left = boardPositions[198];
        
        if (tirant==0){
            var dadosLimit = {
              minX: esquina_top_left.left,
              maxX: esquina_button_right.right,
              minY: esquina_top_left.top,
              maxY: esquina_button_right.button
            }
            
            if((mouseEvent.x >= dadosLimit.minX) && 
               (mouseEvent.x <= dadosLimit.maxX) &&
               (mouseEvent.y >= dadosLimit.minY) &&
               (mouseEvent.y <= dadosLimit.maxY))
            {
              console.log("tirar dados");
              valorDados = tirarDados();

              tirant = 1; //toca mover
              game.world.remove(text);
             
                
            }
        }else {
            //console.log("intentando dar a fitxa");
            var board = boardManager.getBoard(); 
            var indexFitxa = board.searchPosition(mouseEvent.x, mouseEvent.y, fitxes, boardPositions);
            var quantsTeACasa = 0;
          /*  if (Math.floor(indexFitxa/4) == boardManager.getCurrentStatus()){
                for(var tempContador = 0; tempContador < 4; tempContador++){
                    if(fitxes[indexFitxa].getPosIni()== fitxes[indexFitxa].getPosition()){
                        teFitxesEnCasa = true; 
                        quantsTeACasa = quantsTeACasa +1;
                    }
                }
            }*/
        
           // console.log("dado en fitxa " + indexFitxa);
            if(indexFitxa != -1){
                var arrayResult = boardManager.makeMove(fitxes, indexFitxa, valorDados, boardPositions, this.mFitxesSprites);
                var canMove = arrayResult[0];
                fitxes = arrayResult[1];
               
            }
            if(canMove){
                tirant = 0;
                game.world.remove(dado);
                text = game.add.text(game.world.centerX-95, game.world.centerY-50, "SIGUIENTE\n TURNO\n-CLIK-", {
                font: "35px Arial",
                fill: "#f0ff0f",
                align: "center"
                });
               
            }
            
        }
    };
    
    this.addListener = function(listener) {
      self.listener = listener;
    };
    
    var tirarDados = function(){
        var randomdice=Math.round(Math.random()*5)+1;
        dado = window.game.add.sprite(375, 375, 'dados','dado'+randomdice+'.png');
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
            button: minHeight + elementHeight,
            right: minWidth + elementHeight,
            left: minWidth,
            width: elementWidth,
            height: elementHeight,
            painted: false
          });
          
          minHeight += elementHeight;
        }
        
        minWidth += elementWidth;
      }
     // debugDrawBoardPositions(); // Comentar para ver bien el tablero
  };
  
  var debugDrawBoardPositions = function() {
    var graphics = window.game.add.graphics(0, 0);
    
    graphics.lineStyle(2, 0x0000FF, 1);
    
    for(positionIndex in boardPositions) {
      var position = boardPositions[positionIndex];
      graphics.drawRect(position.left, position.top, position.width, position.height);  
    }
  };
    
   //private 
    var crearFitxas = function() {
        var f1 = new Fitxa(1,"groc",66,0);
        var f2 = new Fitxa(2,"groc",88,0);
        var f3 = new Fitxa(3,"groc",108,0);
        var f4 = new Fitxa(4,"groc",130,0);
        
        var f5 = new Fitxa(5,"verd",339,0);
        var f6 = new Fitxa(6,"verd",361,0);
        var f7 = new Fitxa(7,"verd",341,0);
        var f8 = new Fitxa(8,"verd",363,0);
        
        var f9 = new Fitxa(9,"roja",310,0);
        var f10 = new Fitxa(10,"roja",332,0);
        var f11 = new Fitxa(11,"roja",352,0);
        var f12 = new Fitxa(12,"roja",374,0);
        
        var f13 = new Fitxa(13,"blau",77,0);
        var f14 = new Fitxa(14,"blau",99,0);
        var f15 = new Fitxa(15,"blau",79,0);
        var f16 = new Fitxa(16,"blau",101,0);
        
        
        fitxes = [f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14,f15,f16];
        
        this.mFitxesSprites = {};
        
        for(var i = 0; i < 16; i++){
            var position = boardPositions[fitxes[i].getPosition()];
            var elementId = fitxes[i].getId();
            mFitxesSprites[elementId] = game.add.sprite(position.left + OFFSET_FITXA, position.top + OFFSET_FITXA, 'battle_battlechis','fitxa_'+fitxes[i].getColor()+'.png');
        }

    };
    
   
    
    // Constructor
    (function() {
        window.game.add.sprite(0, 0, 'battle_battlechis','battle_battlechis.png');
        
        window.game.input.onDown.add(self.onMouseDown);      
        calculateBoardPosition();
        crearFitxas();  
        
          if(tirant == 0){
            text = game.add.text(game.world.centerX-95, game.world.centerY-50, "-START!-\n AQUI", {
            font: "45px Arial",
            fill: "#ff0044",
            align: "center"
            });
        }
    })();
};