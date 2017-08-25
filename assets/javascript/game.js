//Audio and aesthetic functions and declarations
//new Audio('assets/sounds/themesong.mp3').play();

/*setInterval (function() {
	new Audio('assets/sounds/themesong.mp3').play();
}, 120000);*/

setInterval (function() {		
	document.getElementById("blinkyText").style.color = "#ffffff";
	setTimeout(function() {
	document.getElementById("blinkyText").style.color = "#e60000";
	}, 500)
}, 1000);

var soundOfBenderWin = ['assets/sounds/win_1.mp3', 
						'assets/sounds/win_2.mp3', 
						'assets/sounds/win_3.mp3', 
						'assets/sounds/win_4.mp3'];
var soundOfBenderLoss = ['assets/sounds/loss_1.mp3', 
						'assets/sounds/loss_2.mp3', 
						'assets/sounds/loss_3.mp3', 
						'assets/sounds/loss_4.mp3'];

var blinky = document.getElementById("blinkyText");
var randomNumberForSound;
//End of Audio and aesthetic functions and declarations

//Game variables
var mainObject = {
	hangWord: ["copper", "explain", "decisive", "tenuos", "branch",
				"vagabond", "redundant", "sabotage", "ridiculous", "uninspiring",
				"trouble", "blackjack", "wrench", "therapeutic", "invention",
				"calculate", "structure", "magical", "repulsive", "calendar"],
	alphabet: "abcdefghijklmnopqrstuvwxyz",		
	displayWord: "",
	
	gameOver: 10,
	winscore: 0,
	lossscore: 0,

	returnDisplay: document.getElementById("theWord"),
	guessLetters: document.getElementById("guessBox"),
 	lives: document.getElementById("livesLeft"),

 	entryInput: "",
 	timerGame: 120,
 	mainI: 0,
 	inputsList: [],
 	userInput: "",
	arrayWord: [], 

};

var randomNumber;
var bufferWord;
var wordLength;
var indexMultiple;
var inputHolder;
var myTimer;

//Initial setup of displays
function initialize() {
	mainObject.returnDisplay.innerHTML = mainObject.displayWord;
	mainObject.lives.innerHTML = "Lives: 10";
	mainObject.guessLetters.innerHTML = "Guesses:  "
	mainObject.returnDisplay.innerHTML = "- - - - -";	
	mainObject.timerGame = 120;
	mainObject.displayWord = "";
	mainObject.inputsList = [];
	document.getElementById("timerBox").innerHTML = mainObject.timerGame;
};

//Word initialize for algorithm
function algoInitialize() {
	randomNumber = Math.floor(Math.random() * 20) + 0;					
	bufferWord = mainObject.hangWord[randomNumber];
	wordLength = mainObject.hangWord[randomNumber].length;	
}

//Timer
function clock() {
	myTimer = setInterval (function() { 
		document.getElementById("timerBox").innerHTML = mainObject.timerGame;
		mainObject.timerGame--;
		if (mainObject.timerGame === -1) {
			clearTimeout(myTimer);
			blinky.innerHTML = "Times Up Chum!" + "<br>" + "Press Enter to continue"
			mainObject.lossscore++;
			document.getElementById("lossBox").innerHTML = "Loss: " + mainObject.lossscore
			mainObject.guessLetters.innerHTML = "Answer: " + "<div style='display: inline; letter-spacing: 4px; color: red;'>" + bufferWord + "</div>"
			mainFunction();
		}
	}, 1000);
}

//Game's main function
initialize();
mainFunction();
function mainFunction() {
	document.onkeyup = function(event) {		
		mainObject.entryInput = event.key;

		if (mainObject.entryInput === "Enter") {
			randomNumberForSound = Math.floor(Math.random() * 4) + 0;
			new Audio('assets/sounds/intro.mp3').play();	
			blinky.innerHTML = "Good Luck Chum!"	
			
			clock();
			algoInitialize();			
			initialize();
			
			for (var i = 0; i < wordLength; i++) {
				mainObject.displayWord += (" - ");
				mainObject.arrayWord[i] = " - ";
			}

			mainObject.returnDisplay.innerHTML = mainObject.displayWord;

			//Answer
			console.log(bufferWord);

			//Start of hangman algorithm
			document.onkeyup = function(event) {
				mainObject.userInput = event.key;	
				inputHolder = mainObject.userInput			

				if (mainObject.mainI < mainObject.gameOver) {

					indexMultiple = [];

					if (mainObject.inputsList.indexOf(inputHolder) === -1 && mainObject.alphabet.indexOf(inputHolder) !== -1) {
						if (bufferWord.indexOf(inputHolder) > -1) {
							for (i = 0; i < bufferWord.length; i++) {
								if (bufferWord.charAt(i) === inputHolder) {
									indexMultiple.push(i);
								}
							}

							for (i = 0; i < indexMultiple.length; i++) {
								indexOfIndex = indexMultiple[i];
								mainObject.arrayWord[indexOfIndex] = bufferWord.charAt(indexOfIndex);
							}			

							blinky.innerHTML = "Good Luck Chum!" + "<br>" + "Good One!"	
							new Audio('assets/sounds/goodletter.mp3').play();
							mainObject.inputsList.push(inputHolder);						
						}
						else {
							mainObject.inputsList.push(inputHolder);	
							blinky.innerHTML = "Good Luck Chum!" + "<br>" + "No Match!"
							new Audio('assets/sounds/badletter.mp3').play();
							mainObject.mainI++;
						}
					}
					else {
						blinky.innerHTML = "Good Luck Chum!" + "<br>" + "Character No Good!"
						new Audio('assets/sounds/noletter.mp3').play();
					}

					//Array to string function
					mainObject.displayWord = "";
					for (i = 0; i < wordLength; i++) {
						mainObject.displayWord += mainObject.arrayWord[i];
					}

					mainObject.lives.innerHTML = "Lives: " + (10 - mainObject.mainI);
					mainObject.returnDisplay.innerHTML = mainObject.displayWord;
					mainObject.guessLetters.innerHTML = "Guesses:  " + "<div style='display: inline; letter-spacing: 4px; color: red;'>" + mainObject.inputsList + "</div>"

					if (mainObject.displayWord.indexOf(" - ") === -1) {
						mainObject.winscore++;
						document.getElementById("winBox").innerHTML = "Wins: " + mainObject.winscore
						blinky.innerHTML = "Beginner's Luck!" + "<br>" + "Press Enter to continue"
						setTimeout(function() {new Audio(soundOfBenderWin[randomNumberForSound]).play();}, 2000);
						clearTimeout(myTimer);
						mainFunction();
					}
					else if (mainObject.mainI === mainObject.gameOver) {
						mainObject.lossscore++;
						document.getElementById("lossBox").innerHTML = "Loss: " + mainObject.lossscore
						blinky.innerHTML = "Hasta la vista Meatbag!" + "<br>" + "Press Enter to continue"
						mainObject.guessLetters.innerHTML = "Answer: " + "<div style='display: inline; letter-spacing: 4px; color: red;'>" + bufferWord + "</div>"
						setTimeout(function() {new Audio(soundOfBenderLoss[randomNumberForSound]).play();}, 2000);
						clearTimeout(myTimer);
						mainFunction();
					}								
				}
			}
		}
	}
}	