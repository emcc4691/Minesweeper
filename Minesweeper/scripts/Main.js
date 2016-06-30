function Initialise() {
    game = new Game();

    Draw(game);
    game.loadMines();
    $('.cell').click(ClickCell);
    $('.button').click(function () { location.reload(); })
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

    $('#main').append('<div id="mine-count"></div>');

    $('#main').append('<div class="button">Play again.</div>');
}

function ClickCell(e) {
    var cell = e.target.classList.contains("cell") ? e.target : e.target.parentElement;

    if (!game.isPlaying || $(cell).attr('displayed'))
        return;

    if (e.which === 1) // left button
        game.showCellContent($(cell).attr('id'));
    else if (e.which === 3) // right button
        game.flagCell($(cell).attr('id'));
}

document.addEventListener('DOMContentLoaded', Initialise);
document.addEventListener("contextmenu", ClickCell);