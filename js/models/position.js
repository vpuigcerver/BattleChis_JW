function Position (id) {
    var id = id;
    var empty = true;
    
    this.setToEmpty = function() {
      empty = true;
    };
    this.setToFull = function() {
      empty = false;
    };
    this.isEmpty = function() {
        
        return empty;
    };

    
    
};