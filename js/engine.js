playerMode = null;
currentTurn = null;

selectedPaper = function(){
    selected("Paper");
}
selectedRock = function(){
    selected("Rock");
}
selectedScissors = function(){
    selected("Scissors");
}
selectedSpock = function(){
    selected("Spock");
}
selectedLizard = function(){
    selected("Lizard");
}

var options = ["Paper","Rock","Scissors","Spock","Lizard"];

var getRandomChoice = function(){
    var number  = Math.random();
    number *= 5;
    number =  Math.floor(number);
    return options[number];
}

var checkForWinner = function(playerOne,playerTwo){
    var result;
    if(playerOne == "Scissors"){
        result = checkScissor(playerTwo);
    }else if(playerOne == "Paper"){
        result = checkPaper(playerTwo);
    }else if(playerOne == "Rock"){
        result = checkRock(playerTwo);
    }else if(playerOne == "Spock"){
        result = checkSpock(playerTwo);
    }else if(playerTwo == "Lizard"){
        result = checkLizard(playerTwo);
    }else{
        alert("Tsk Tsk Tsk. No cheating please!");
        return;
    }

    if(result == 1){
        alert("You won with " + playerOne + " against "+playerTwo);
    }else if(result == -1){
        alert("You lost with " + playerOne + " against "+playerTwo);
    }else{
        alert("You got a draw with " + playerOne + " against "+playerTwo);
    }
}

var checkScissor = function(against){
    if(against == "Rock" || against == "Spock"){
        return -1;
    }else if(against == "Paper" || against == "Lizard"){
        return 1;
    }
    return 0;
}

var checkPaper = function(against){
    if(against == "Scissors" ||  against == "Lizard"){
        return -1;
    }else if(against == "Spock" || against == "Rock"){
        return 1;
    }
    return 0;
}

var checkRock = function(against){
    if(against == "Paper" ||  against == "Spock"){
        return -1;
    }else if(against == "Scissors" || against == "Lizard"){
        return 1;
    }
    return 0;
}
var checkSpock = function(against){
    if(against == "Paper" ||  against == "Lizard"){
        return -1;
    }else if(against == "Scissors" || against == "Rock"){
        return 1;
    }
    return 0;
}
var checkLizard = function(against){
    if(against == "Paper" ||  against == "Spock"){
        return 1;
    }else if(against == "Scissors" || against == "Rock"){
        return -1;
    }
    return 0;
}



var selected = function(hand){
    if(playerMode == "Single"){
        var opposingHand = getRandomChoice();
        checkForWinner(hand,opposingHand);
    }
}



setListeners = function(){
    hideGame();
    var elem = document.querySelector("#single-player");
    elem.addEventListener("click",function(){
        setUpSinglePlayer();
    });
    var elem = document.querySelector("#two-player");
    elem.addEventListener("click",function(){
        setUpTwoPlayer();
    });

    document.querySelector("#paper").addEventListener("click",selectedPaper);
    document.querySelector("#rock").addEventListener("click",selectedRock);
    document.querySelector("#spock").addEventListener("click",selectedSpock);
    document.querySelector("#lizard").addEventListener("click",selectedLizard);
    document.querySelector("#scissor").addEventListener("click",selectedScissors);
}

var hideGameSelect = function(){
    var elem = document.querySelector("#type-select");
    elem.setAttribute("style","display:none");
}

var hideGame = function(){
    var elem = document.querySelector("#game-session");
    elem.setAttribute("style","display:none");
}


var showGame = function(){
    var elem = document.querySelector("#game-session");
    elem.removeAttribute("style");
}


setUpSinglePlayer = function(){
    hideGameSelect();
    playerMode = "Single";

   showGame();
}

setUpTwoPlayer = function(){
    hideGameSelect();
    playerMode = "TwoPlayer";
    currentTurn = 1;
    showGame();
}

document.addEventListener("DOMContentLoaded",setListeners);