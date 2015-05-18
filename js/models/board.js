var BOARD_POSITION_COLOR = {
    GROC: 0,
    BLAU: 1,
    VERD: 2,
    ROJA: 3,
    EMPTY: 4
};

var Board = function() {
    // Positions are in column-major order
    var positions = [];
    
    // Public methods
    this.getPosition = function(positionId) {
        return positions[positionId];  
    };
    
   
    
    this.verCasellesExteriors = function(id){
        
    var Caselles=[[new Position(5),new Position(26)],[new Position(4), new Position(25)],[new Position(3), new Position(24)],[new Position(2), new Position(23)],[new Position(1), new Position(21)],[new Position(42), new Position(43)],[new Position(63), new Position(64)],[new Position(84), new Position(85)],[new Position(105), new Position(106)],[new Position(126), new Position(127)],[new Position(147), new Position(148)],[new Position(168), new Position(169)],[new Position(189), new Position(190)],[new Position(210), new Position(211)],[new Position(231), new Position(232)],[new Position(252), new Position(253)],[new Position(273), new Position(295)],[new Position(315), new Position(316)],[new Position(336), new Position(337)],[new Position(357), new Position(358)],[new Position(378), new Position(379)],[new Position(399), new Position(421)],[new Position(401), new Position(422)],[new Position(402), new Position(423)],[new Position(403), new Position(424)],[new Position(404), new Position(425)],[new Position(405), new Position(426)],[new Position(406), new Position(427)],[new Position(407), new Position(428)],[new Position(408), new Position(429)],[new Position(409), new Position(430)],[new Position(410), new Position(431)],[new Position(411), new Position(432)],[new Position(412), new Position(434)],[new Position(414), new Position(435)],[new Position(415), new Position(436)],[new Position(416), new Position(437)],[new Position(417), new Position(438)],[new Position(419), new Position(439)],[new Position(397), new Position(398)],[new Position(376), new Position(377)],[new Position(355), new Position(356)],[new Position(334), new Position(335)],[new Position(313), new Position(314)],[new Position(292), new Position(293)],[new Position(271), new Position(272)],[new Position(250), new Position(251)],[new Position(229), new Position(230)],[new Position(208), new Position(209)],[new Position(187), new Position(188)],[new Position(145), new Position(167)],[new Position(124), new Position(125)],[new Position(103), new Position(104)],[new Position(82), new Position(83)],[new Position(61), new Position(62)],[new Position(19), new Position(41)],[new Position(18), new Position(39)],[new Position(17), new Position(38)],[new Position(16), new Position(37)],[new Position(15), new Position(36)],[new Position(14), new Position(35)],[new Position(13), new Position(34)],[new Position(12), new Position(33)],[new Position(11), new Position(32)],[new Position(10), new Position(31)],[new Position(9), new Position(30)],[new Position(8), new Position(29)],[new Position(7), new Position(27)]];
    
  //  var Caselles=[[new Position(5), new Position(26)],[4,25],[3,24],[2,23],[1,21],[42,43],[63,64],[84,85],[105,106],[126,127],[147,148],[168,169],[189,190],[210,211],[231,232],[252,253],[273,295],[315,316],[336,337],[357,358],[378,379],[399,421],[401,422],[402,423],[403,424],[404,425],[405,426],[406,427],[407,428],[408,429],[409,430],[410,431],[411,432],[412,434],[414,435],[415,436],[416,437],[417,438],[419,439],[397,398],[376,377],[355,356],[334,335],[313,314],[292,293],[271,272],[250,251],[229,230],[208,209],[187,188],[145,167],[124,125],[103,104],[82,83],[61,62],[19,41],[18,39],[17,38],[16,37],[15,36],[14,35],[13,34],[12,33],[11,32],[10,31],[9,30],[8,29],[7,27]]
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
    
    this.setPositionStatus = function(positionId, status) {
        if(status == BOARD_POSITION_COLOR.GROC || status == BOARD_POSITION_COLOR.BLAU || status == BOARD_POSITION_COLOR.ROJA || status == BOARD_POSITION_COLOR.VERD ) {
            positions[positionId].setToFull();
        }else {
            positions[positionId].setToEmpty();
        }
    };
    
    this.debugPrint = function() {
      for(positionIndex in positions) {
          //console.log(positions[positionIndex].debugPrint());
      }
      
    };
    
    // Private methods
    
    // Constructor
    (function() {
        for(var i = 0; i < 9; i++)
        {
            positions.push(new Position(i));
        }
    })();
};