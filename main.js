
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;
var gameWon = false;
var player1tally = 0;
var player2tally = 0;


var resetSpaces = function() {
    spaces = [
      NaN, NaN, NaN,
      NaN, NaN, NaN,
      NaN, NaN, NaN
    ];
};

var clearBoard = function() {

    for(spaceNum = 0; spaceNum < spaces.length; spaceNum++) {
        $('#board .space:eq(' + spaceNum + ')').removeClass(player1);
        $('#board .space:eq(' + spaceNum + ')').removeClass(player2);
    }
};


var startGame = function() {
    resetSpaces();
    gameWon = false;
    clearBoard();
    setNextTurn();
    updateScores();
};

var updateScores = function() {
    $('#player1name').text(player1 + ": ");
    $('#player2name').text(player2 + ": ");
    $('#player1tally').text(player1tally);
    $('#player2tally').text(player2tally);
};



var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};



var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]

    || spaces[0] === spaces[3] && spaces[3] === spaces[6] 
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]

    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6]
    )
  {
    gameWon = true;
    console.log('somebody won');
    if(currentPlayer === player1) {
        player1tally += 1;
    }else {
        player2tally += 1;
    }
    // TODO: Trigger 'game-win' event with the winning player as the event data
    $(document).trigger('game-win', currentPlayer);
    updateScores();
  }
};

$(document).on('click', '#board .space', function (e) {
  var spaceNum = $(e.currentTarget).index();
  console.log('You clicked on space #' + spaceNum);
  if(gameWon) {
    alert("The game has already been won!  Please start a new game.");
  }else if(spaces[spaceNum]){
    alert("That space is already taken!  Please choose an empty space.");
  }else {
      // Marks the space with the current player's name
    spaces[spaceNum] = currentPlayer;
    // Adds a class to elem so css can take care of the visuals
    $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);
    checkForWinner();
    setNextTurn();
  }

});

$(document).on('game-win', function (e, winner) {
  // TODO: Alert who won the game
  alert(winner + " won this game!");
});


$('#newGame').on('click', function (e) {
    console.log("New Game! clicked");
    startGame();
});

// Start the game
startGame();

