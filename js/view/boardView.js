var BoardView = function() {
    console.log("created View");
    var BOARD_LINE_LIMIT_WIDTH = 3;
    var OFFSET_FITXA = 10;
    // Attributes
    var self = this;
    
    var tirant = 0; //tirant->0, escollint fitxa -> 1
    var valorDados = -1;
    
    var boardPositions = [];
    var fitxes = [];
    var mFitxesSprites = {};
    var boardManager = new BoardManager();
    var dado;
    var cuadro_turno;
    var numeroDeSisos = 0;
    var beforeColor = 0;
    
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
                if(dado != null){
                     dado.kill();
                }
                if (cuadro_turno != null){
                    cuadro_turno.kill();
                }
                valorDados = tirarDados();
                console.log("tirar dados, numero: " + valorDados);
                tirant = 1; //toca mover
                game.world.remove(text);
                var potJugarArray = boardManager.canPlayTurn(fitxes, valorDados);
                var potJugar = potJugarArray[0];
                fitxes = potJugarArray[1];
                var currentColor = potJugarArray[2];

                console.log("potJugar: " + potJugar + " currentColor: " + currentColor);
                if(!potJugar && valorDados != 6){
                    console.log("CANVIA DE TORN PERQUE NO POT MOURE");
                    boardManager.updateCurrentColor();
                    tirant = 0;
                    numeroDeSisos = 0;
                    //redibujarDados();
                }else if (!potJugar){
                    tirant = 0;
                    if(currentColor == beforeColor){
                        numeroDeSisos++;
                    }else{
                        beforeColor = currentColor;
                        numeroDeSisos = 1;
                    }
                }else if (valorDados == 6){
                    if(currentColor == beforeColor){
                        numeroDeSisos++;
                    }else{
                        beforeColor = currentColor;
                        numeroDeSisos = 1;
                    }
                }
            }
        }else {
            //console.log("intentando dar a fitxa");
            var board = boardManager.getBoard(); 
            var indexFitxa = board.searchPosition(mouseEvent.x, mouseEvent.y, fitxes, boardPositions);

            if(indexFitxa != -1){
                var arrayResult = boardManager.makeMove(fitxes, indexFitxa, valorDados, boardPositions, mFitxesSprites);
                var canMove = arrayResult[0];
                fitxes = arrayResult[1];
            }
            if(canMove && valorDados != 6){
                boardManager.updateCurrentColor();
            }               
        }
        if(canMove){
            tirant = 0;
            redibujarDados();               
        } 
    }; //mouseEvent
    
    this.addListener = function(listener) {
      self.listener = listener;
    };
    

    var redibujarDados = function(){
        game.world.remove(dado);
        game.world.remove(cuadro_turno);
        text = game.add.text(game.world.centerX-95, game.world.centerY-50, "SIGUIENTE\n TURNO\n-CLIK-", {
        font: "35px Arial",
        fill: "#f0ff0f",
        align: "center"
        });
    };
    
    // Private
    var tirarDados = function(){
        var randomdice=Math.round(Math.random()*5)+1;
        var currentColor = boardManager.getCurrentStatus();
        //Dibuixar quadre del color que toqui
        cuadro_turno = window.game.add.image(355, 355, 'cuadrado'+currentColor);
        dado = window.game.add.sprite(375, 375, 'dados','dado'+randomdice+'.png');
        return randomdice;
    };
    
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
  };
  
  this.debugDrawBoardPositions = function() {
    var graphics = window.game.add.graphics(0, 0);
    
    graphics.lineStyle(2, 0x0000FF, 1);
    
    for(positionIndex in boardPositions) {
      var position = boardPositions[positionIndex];
      graphics.drawRect(position.left, position.top, position.width, position.height);  
    }
  };
    
    this.createBoard = function(imagenbattlechis){
        game.add.sprite(0,0,imagenbattlechis,'battle_battlechis.png');
        calculateBoardPosition();

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
        
        for(var i = 0; i < 16; i++){
            var position = boardPositions[fitxes[i].getPosition()];
            var elementId = fitxes[i].getId();
            mFitxesSprites[elementId] = game.add.sprite(position.left + OFFSET_FITXA, position.top + OFFSET_FITXA, imagenbattlechis,'fitxa_'+fitxes[i].getColor()+'.png');
        }

        if(tirant == 0){
            text = game.add.text(game.world.centerX-95, game.world.centerY-50, "-START!-\nAQUI", {
            font: "45px Arial",
            fill: "#ff0044",
            align: "center"
            });
        }
    };
    this.getFitxes = function(){
        return fitxes;   
    };
    
     (function() {
         window.game.input.onDown.add(self.onMouseDown);     
         game.load.atlasJSONHash('dados', 'media/img/dados.png', 'media/img/dados.json');
         
    })();
};