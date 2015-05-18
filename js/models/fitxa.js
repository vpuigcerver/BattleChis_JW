function Fitxa (id,colour, pos) {
    var id = id;
    var posicio = pos;
    var color = colour;
    
    this.setPosition = function(pos){
        posicio = newPosicio;
    }

    this.getPosition = function(){
        return posicio;
    }

    this.getColor = function (){
        return color;
    }
};