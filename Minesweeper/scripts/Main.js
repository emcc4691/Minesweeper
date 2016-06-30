function Initialise() {
    game = new Game();

    Draw(game);
    game.loadMines();
    AddCellClickEvents();
}

function Draw(game) {
    cellIDs = [];

    for (var i = 0; i < game.numberOfRows; i++) {
        var rowNumber = i.toString().length < 2 ? '0' + i.toString() : i.toString();

        $('#game').append('<div class="row" id="row' + rowNumber + '"></div>');

        for (var j = 0; j < game.numberOfColumns; j++) {
            var columnNumber = j.toString().length < 2 ? '0' + j.toString() : j.toString();
            var cellID = 'cell' + rowNumber + columnNumber;

            $('#row' + rowNumber).append('<div class="cell" id="' + cellID + '" flagged="' + flagStage.None + '"></div>')

            cellIDs.push(cellID);
        }
    }
}

function AddCellClickEvents() {
    $('.cell').click(ClickCell);
}

function ClickCell(e) {
    if (!game.isPlaying || $(e.target).attr('displayed'))
        return;

    if (e.which === 1) // left button
        game.showCellContent($(e.target).attr('id'));
    else if (e.which === 3) // right button
        game.flagCell($(e.target).attr('id'));
}

document.addEventListener('DOMContentLoaded', Initialise);
document.addEventListener("contextmenu", ClickCell);