function Mine(row, column) {
    this.row = row.toString().length < 2 ? '0' + row.toString() : row.toString();
    this.column = column.toString().length < 2 ? '0' + column.toString() : column.toString();
    this.cellID = 'cell' + this.row + this.column;
}

Mine.prototype.isSameAs = function (mine) {
    return mine.row == this.row && mine.column == this.column;
}

Mine.prototype.getMineAbove = function () {
    if (this.row <= 0)
        return null;
    return new Mine(parseInt(this.row - 1), this.column);
}

Mine.prototype.getMineBelow = function () {
    if (this.row > game.numberOfRows)
        return null;
    return new Mine(parseInt(this.row) + 1, this.column);
}

Mine.prototype.getMineOnLeft = function () {
    if (this.column <= 0)
        return null;
    return new Mine(this.row, parseInt(this.column) - 1);
}

Mine.prototype.getMineOnRight = function () {
    if (this.column > game.numberOfColumns)
        return null;
    return new Mine(this.row, parseInt(this.column) + 1);
}

Mine.prototype.countSurroundingMines = function () {
    var surroundingMines = this.getSurroundingCells();
    var result = 0;

    surroundingMines.forEach(function (mine) {
        if (game.contains(mine))
            result++;
    });

    return result;
}

Mine.prototype.getSurroundingCells = function () {
    var surroundingCells = [];

    /* --- The Cell ---*/

    // 
    //     1 # 2 # 3
    //     8 # X # 4
    //     7 # 6 # 5
    //

    /* ----------------*/

    var mineAbove = this.getMineAbove();

    if (mineAbove) {
        var leftMine = mineAbove.getMineOnLeft();
        if (leftMine)
            surroundingCells.push(leftMine); // 1

        surroundingCells.push(mineAbove); // 2

        var rightMine = mineAbove.getMineOnRight();
        if (rightMine)
            surroundingCells.push(rightMine); // 3
    }

    rightMine = this.getMineOnRight();
    if (rightMine)
        surroundingCells.push(rightMine); // 4

    var mineBelow = this.getMineBelow();
    {
        rightMine = mineBelow.getMineOnRight();
        if (rightMine)
            surroundingCells.push(rightMine); // 5

        surroundingCells.push(mineBelow) // 6

        leftMine = mineBelow.getMineOnLeft();
        if (leftMine)
            surroundingCells.push(leftMine); // 7
    }

    leftMine = this.getMineOnLeft();
    if (leftMine)
        surroundingCells.push(leftMine); // 8

    return surroundingCells;
}

Array.prototype.containsMine = function (mine) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].isSameAs(mine))
            return true;
    }

    return false;
}