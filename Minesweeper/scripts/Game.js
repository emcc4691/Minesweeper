flagStage = { None: 0, Flagged: 1, Possible: 2 };

function Game() {
    this.numberOfRows = 6;
    this.numberOfColumns = 8;
    this.numberOfMines = 10;
    this.mines = [];
    this.isPlaying = true;
}

Game.prototype.loadMines = function () {
    for (var i = 0; i < this.numberOfMines; i++) {
        var newMine = this.createMine();

        while (game.contains(newMine)) {
            newMine = this.createMine();
        }

        game.mines.push(newMine);
    }
}

Game.prototype.contains = function (mine) {
    return this.mines.containsMine(mine);
}

Game.prototype.isCellAMine = function (cellID) {
    return this.contains(CreateCell(cellID));
}

Game.prototype.createMine = function () {
    var row = Math.round(Math.random() * this.numberOfRows);
    var column = Math.round(Math.random() * this.numberOfColumns);

    return new Mine(row, column);
}

Game.prototype.showCellContent = function (cellID) {
    if ($('#' + cellID).attr('flagged') != flagStage.None || $('#' + cellID).attr('displayed'))
        return;

    if (this.isCellAMine(cellID)) {
        this.isPlaying = false;
        game.displayMines();
        game.highlightCell(cellID);
        return;
    }
    else {
        var cell = CreateCell(cellID);
        var mineCount = cell.countSurroundingMines();

        if (mineCount === 0) {
            $('#' + cellID).attr('displayed', true);
            $('#' + cellID).addClass('mine-cleared');
            var surroundingCells = cell.getSurroundingCells();
            surroundingCells.forEach(function (cell) {
                game.showCellContent(cell.cellID);
            });
        }

        else {
            $('#' + cellID).attr('displayed', true);
            $('#' + cellID).addClass('mine-cleared');
            $('#' + cellID).append('<div class="mines-' + mineCount + '">' + mineCount + '</div>');
        }
    };

}

Game.prototype.flagCell = function (cellID) {
    var flag = $('#' + cellID).attr('flagged');

    if (flag == flagStage.None)
        game.markWithFlag(cellID);
    else if (flag == flagStage.Flagged)
        game.markWithQuestion(cellID);
    else if (flag == flagStage.Possible)
        game.showUnmarkedCell(cellID);
}

Game.prototype.displayMines = function () {
    this.mines.forEach(function (mine) {
        var cellID = 'cell' + mine.row + mine.column;
        $('#' + cellID).append('<img class="cell-image" src="images/mine.png" />');
    })
}

Game.prototype.highlightCell = function (cellID) {
    $('#' + cellID).addClass('highlight-cell');
}

Game.prototype.markWithFlag = function (cellID) {
    $('#' + cellID).attr('flagged', flagStage.Flagged);
    $('#' + cellID).append('<img class="cell-image" src="images/flag.png" />');
    $('.cell-image').click($('.cell-image').parent().click());
    $('#' + cellID).off()
}

Game.prototype.markWithQuestion = function (cellID) {
    $('#' + cellID).attr('flagged', flagStage.Possible);
    $('#' + cellID).append('<img class="cell-image" src="images/question.png" />');
}

Game.prototype.showUnmarkedCell = function (cellID) {
    $('#' + cellID).attr('flagged', flagStage.None);
    // TODO - remove question image
}

CreateCell = function (cellID) {
    var row = cellID.substring(4, 6);
    var column = cellID.substring(6, 8);

    return new Mine(row, column);
}