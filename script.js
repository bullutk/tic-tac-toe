// 1.set up board
// 2. user shoudld be able to click a box and a mark shows up
// 	- put an onclick on the fiorst square
// 	- when user clicks, call function, that put an x in the box
// MILESTONE
// 4. keep track of who's turn it is
// 5. when a square is clicked, put the symbol AND change who's turn it is
// 6. keep player from overwriting a square
// 7. we need a win checker...

var whosTurn = 1; // Init whosTurn to player 1
var player1Squares = [];
var player2Squares = [];
var someoneWon = false;
var computerPlayer = false;
var xImage = "https://4.bp.blogspot.com/-eF8s5sjgh4s/VvQOR4hUlYI/AAAAAAAAYg8/nExPYh2Uh9QaEsMNlLeij_JuUQKwBDs9Q/s1600/Tic%2BTac%2BPopcorn%2BFlavour%2BReview.jpg"
var oImage = "http://www.paulkonrardy.com/images/Blog/MyLeftBigToe2.jpg"
// Set up winners array
var winningCombos = [
	['A1', 'B1', 'C1'], //ROW1
	['A2', 'B2', 'C2'],	//ROW2
	['A3', 'B3', 'C3'], //ROW3
	['A1', 'A2', 'A3'], //COL1
	['B1', 'B2', 'B3'], //COL2
	['C1', 'C2', 'C3'], //COL3
	['A1', 'B2', 'C3'], //DIAG1
	['A3', 'B2', 'C1'], //DIAG2
];
console.log(winningCombos)

function onePlayerGame(){
	computerPlayer = true;
};
function markSquare(currentSquare){
	// console.log(square.id);
	console.log(currentSquare.children[0].src);
	if((currentSquare.children[0].src === xImage) || (currentSquare.children[0].src === oImage)){
	}else if (someoneWon){
		// console.log('Someone already won');
		return "taken"
	}else{
		if(whosTurn === 1){
			currentSquare.children[0].src = xImage;
			whosTurn = 2
			player1Squares.push(currentSquare.id);
			checkWin(1, player1Squares);
			if(computerPlayer){
				computerMove();
			}
		}else{
			currentSquare.children[0].src = oImage
			whosTurn = 1;
			player2Squares.push(currentSquare.id);
			checkWin(2, player2Squares);
		}
	}
}
function computerMove(){
	//go find a random square
	var squareButtons = document.getElementsByClassName('square');
	while(needASquare){
		var randomNumber = (Math.floor(Math.random() * 8) + 1);
		var randomSquare = squareButtons[randomNumber];
		isTaken = markSquare(randomSquare);
		console.log(isTaken)
		if(isTaken !== "taken"){
			needASquare = false;
		}
	}
}
function checkWin(whoJustWent, currentPlayerSquares){
	//outer loop
	for (var i = 0;  i < winningCombos.length; i++) {
		//inner loop
		var rowCount = 0;
		for(var j = 0; j < winningCombos[i].length; j++){
			var winningSquare = winningCombos[i][j];
			if(currentPlayerSquares.indexOf(winningSquare) > -1){
				//HIT!! player has this square somewhere
				rowCount++
			}
		}
		if(rowCount === 3){
			//player had all of these j's. WIN
			console.log("Player " + whoJustWent +" WON")
			gameOver(whoJustWent, winningCombos[i]);
			break;
		}
	}
}
function gameOver(whoJustWon, winningCombo){
	var message = "Congrats to Player" + whoJustWon + ", you just won with " + winningCombo;
	document.getElementById('message').innerHTML = message;
	for(var i = 0; i < winningCombo.length; i++){
		document.getElementById(winningCombo[i]).className += ' winning-square'
	}
	someoneWon = true;

}
