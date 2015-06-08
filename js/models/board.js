var BOARD_POSITION_COLOR = {
    GROC: 0,
    VERD: 1,
    ROJA: 2,
    BLAU: 3,
    EMPTY: 4
};

var Board = function() {
    var positions;
    // Public methods
    this.getPosition = function(positionId) {
        return positions[positionId-1];  
    };
    
    var Caselles;
    var Caselles_puj_verd;
    
    this.searchPosition = function(x,y,fitxes,boardPositions) {
        var i = 0;    
        while(i < fitxes.length){
            var positionIndex = fitxes[i].getPosition();
            var position = boardPositions[positionIndex];
            
            var positionLimit =  {
              minX: position.left,
              maxX: position.left + position.width,
              minY: position.top,
              maxY: position.top + position.height
            }

            if((x >= positionLimit.minX) && 
               (x <= positionLimit.maxX) &&
               (y >= positionLimit.minY) &&
               (y <= positionLimit.maxY))
            {
                console.log("fitxa :" + i);
              return i;
            }
            i += 1;
        }
        return -1;
    };
    
    this.getCasella = function(positionId, currentColor){
        var casellaIndex = 1;
        var casselles_cerca;
        if(currentColor == -1){
            casselles_cerca = Caselles;
        }else {
            switch(currentColor){
                    case BOARD_POSITION_COLOR.GROC:
                        casselles_cerca = Caselles_puj_verd; 
                        break;
                    case BOARD_POSITION_COLOR.VERD:
                        casselles_cerca = Caselles_puj_roij; 
                        break;
                    case BOARD_POSITION_COLOR.ROJA:
                        casselles_cerca = Caselles_puj_blau;  
                        break;
                    case BOARD_POSITION_COLOR.BLAU:
                        casselles_cerca = Caselles_puj_groc;  
                        break;
                    default:
                        console.log("La casella no te assignat cap color");
                        break;
            }
        }
        
        while (casellaIndex <= casselles_cerca.length){
            if (positionId == casselles_cerca[casellaIndex - 1][0].getId() || positionId == casselles_cerca[casellaIndex - 1][1].getId()){
                return casellaIndex;
            }
            casellaIndex += 1;
        }
        return -1;
    }; 
    
    this.verCasellesExteriors = function(id, currentColor){        
        var arrayCaselles = new Array(2);
        
        if(currentColor == -1){     
             if (id>68){
                 id = id-68;
             }

                    arrayCaselles[0] = Caselles[id-1][0]; 
                    arrayCaselles[1] = Caselles[id-1][1];              
        }else {
            
            console.log("ID: "+ id + " ArrayCasella");
            switch(currentColor){
                    case BOARD_POSITION_COLOR.GROC:
                    if(id-1 >= 0){
                        arrayCaselles[0] = Caselles_puj_verd[id-1][0]; 
                        arrayCaselles[1] = Caselles_puj_verd[id-1][1]; 
                    }
                        break;
                    case BOARD_POSITION_COLOR.VERD:
                    if(id-1 >= 0){
                        arrayCaselles[0] = Caselles_puj_roij[id-1][0]; 
                        arrayCaselles[1] = Caselles_puj_roij[id-1][1];
                    }
                        break;
                    case BOARD_POSITION_COLOR.ROJA:
                        if(id-1 >= 0){
                        arrayCaselles[0] = Caselles_puj_blau[id-1][0]; 
                        arrayCaselles[1] = Caselles_puj_blau[id-1][1]; 
                        }
                        break;
                    case BOARD_POSITION_COLOR.BLAU:
                            if(id-1 >= 0){
                        arrayCaselles[0] = Caselles_puj_groc[id-1][0]; 
                        arrayCaselles[1] = Caselles_puj_groc[id-1][1]; 
                            }
                        break;
                    default:
                        console.log("La casella no te assignat cap color");
                        break;
            }
        }
        
        return[ arrayCaselles[0],
                    arrayCaselles[1] ];
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
        // Positions are in column-major order
        positions = [];
        
        for(var i = 0; i < 440; i++)
        {
            positions.push(new Position(i));
        }
        
        Caselles=[[positions[5],positions[26]],[positions[4], positions[25]],[positions[3], positions[24]],[positions[2], positions[23]],[positions[1], positions[21]],[positions[42], positions[43]],[positions[63], positions[64]],[positions[84], positions[85]],[positions[105], positions[106]],[positions[126], positions[127]],[positions[147], positions[148]],[positions[168], positions[169]],[positions[189], positions[190]],[positions[210], positions[211]],[positions[231], positions[232]],[positions[252], positions[253]],[positions[273], positions[295]],[positions[315], positions[316]],[positions[336], positions[337]],[positions[357], positions[358]],[positions[378], positions[379]],[positions[399], positions[421]],[positions[401], positions[422]],[positions[402], positions[423]],[positions[403], positions[424]],[positions[404], positions[425]],[positions[405], positions[426]],[positions[406], positions[427]],[positions[407], positions[428]],[positions[408], positions[429]],[positions[409], positions[430]],[positions[410], positions[431]],[positions[411], positions[432]],[positions[412], positions[434]],[positions[414], positions[435]],[positions[415], positions[436]],[positions[416], positions[437]],[positions[417], positions[438]],[positions[419], positions[439]],[positions[397], positions[398]],[positions[376], positions[377]],[positions[355], positions[356]],[positions[334], positions[335]],[positions[313], positions[314]],[positions[292], positions[293]],[positions[271], positions[272]],[positions[250], positions[251]],[positions[229], positions[230]],[positions[208], positions[209]],[positions[187], positions[188]],[positions[145], positions[167]],[positions[124], positions[125]],[positions[103], positions[104]],[positions[82], positions[83]],[positions[61], positions[62]],[positions[19], positions[41]],[positions[18], positions[39]],[positions[17], positions[38]],[positions[16], positions[37]],[positions[15], positions[36]],[positions[14], positions[35]],[positions[13], positions[34]],[positions[12], positions[33]],[positions[11], positions[32]],[positions[10], positions[31]],[positions[9], positions[30]],[positions[8], positions[29]],[positions[7], positions[27]]];
        
        Caselles_puj_verd=[[positions[273],positions[295]],[positions[275],positions[296]],[positions[276],positions[297]],[positions[277],positions[298]],[positions[278],positions[299]],[positions[279],positions[300]],[positions[280],positions[301]],[positions[281],positions[302]]];
        
        Caselles_puj_roij=[[positions[412],positions[434]],[positions[412],positions[434]],[positions[370],positions[371]],[positions[349],positions[350]],[positions[328],positions[329]],[positions[307],positions[308]],[positions[286],positions[287]],[positions[265],positions[266]]];
        
        Caselles_puj_blau=[[positions[145],positions[167]],[positions[144],positions[165]],[positions[143],positions[164]],[positions[142],positions[163]],[positions[141],positions[162]],[positions[140],positions[161]],[positions[139],positions[160]],[positions[138],positions[159]]];
        
        Caselles_puj_groc=[[positions[7],positions[27]],[positions[48],positions[49]],[positions[69],positions[70]],[positions[90],positions[91]],[positions[111],positions[112]],[positions[132],positions[133]],[positions[153],positions[154]],[positions[174],positions[175]]];
    })();
};