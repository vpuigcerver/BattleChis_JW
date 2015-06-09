function Fitxa (id,colour, pos,casella) {
    var id = id;
    var posicio = pos;
    var color = colour;
    var pos_ini = pos;
    var casella = casella;
    
    var pujant = false;
    var arribat = false;
    var canMove = true;
    var nextCasellaIfClick = -1;
    var nextPujantIfClick = false;
    
    var puedeMorir = false;
    
    this.matarFitxa = function(){
        posicio = pos_ini;
        casella = 0;
        pujant = false;
        arribat = false;
        canMove = true;
        nextCasellaIfClick = -1;
        nextPujantIfClick = false;
        puedeMorir = false;
    }
    
    this.getPuedeMorir = function() {
        return puedeMorir;
    }
    
    this.setPuedeMorir = function(pm){
        puedeMorir = pm;
    }
    
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
    
    this.setCasella = function(cas){
        casella = cas;
    }
    
    this.getCasella = function(){
        return casella;
    }

    this.getColor = function (){
        return color;
    }
    
    this.getPujant = function() {
        return pujant;
    }
    
    this.setPujant = function(puja){
        pujant = puja;
    }
    
    this.getArribat = function() {
        return arribat;
    }
    
    this.setArribat = function(ari){
        arribat = ari;
    }
    
    this.getCanMove = function(){
        return canMove
    }
    
    this.setCanMove = function(can){
        canMove = can;
    }
    
    this.getNextCasellaIfClick = function(){
        return nextCasellaIfClick;
    }
    
    this.setNextCasellaIfClick = function(casella){
        nextCasellaIfClick = casella;
    }
    
    this.getNextPujantIfClick = function(){
        return nextPujantIfClick;
    }
    
    this.setNextPujantIfClick = function(puj){
        nextPujantIfClick = puj;
    }
};