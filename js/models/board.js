var BOARD_POSITION_STATUS = {
    EMPTY: 0,
    UNA_FITXA: 1,
    DOS_FITXA: 2,
};

var Board = function() {
    // Positions are in column-major order
    var positions = [];
    
    // Public methods
    this.getPosition = function(positionId) {
        return positions[positionId];  
    };
    
    this.getRow = function(rowId) {
        return [
            positions[0 + rowId],
            positions[3 + rowId],
            positions[6 + rowId]
        ];
    };
    
    this.getColumn = function(columnId) {
        return [
            positions[0 + (columnId * 3)],
            positions[1 + (columnId * 3)],
            positions[2 + (columnId * 3)]
        ];
    };
    
    this.getLeftToRightDiagonal = function() {
        return [
            positions[0],
            positions[4],
            positions[8]
        ];
    };
    
    this.getRightToLeftDiagonal = function() {
        return [
            positions[6],
            positions[4],
            positions[2]
        ];
    };
    
    this.setPositionStatus = function(positionId, status) {
        if(status == BOARD_POSITION_STATUS.CROSS) {
            positions[positionId].setToCross();
        }
        else if(status == BOARD_POSITION_STATUS.CIRCLE) {
            positions[positionId].setToCircle();
        }
        else {
            positions[positionId].setToEmpty();
        }
    };
    
    this.debugPrint = function() {
      for(positionIndex in positions) {
          console.log(positions[positionIndex].debugPrint());
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