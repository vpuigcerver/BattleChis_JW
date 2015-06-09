function Fitxa (id,colour, pos,casella) {
    var id = id;
    var posicio = pos;
    var color = colour;
    var pos_ini = pos;
    var casella = casella;
    
    this.getId = function() {
        return id;
    }
    
    this.setPosition = function(pos){
        posicio = pos;
    }

    this.getPosition = function(){
        return posicio;
    }
    
    this.getPosIni = function(){
        return pos_ini;
    }
    
    this.setCasella = function(casella){
        this.casella = casella;
    }

    this.getColor = function (){
        return color;
    }
    
    this.moverFicha = function(avanzaX){
           this.id = this.id + avanzaX;
    }
};