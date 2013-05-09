playerMode = null;
currentTurn = null;

playerOne = "";
playerTwo = "";

selectedPaper = function () {
    selectedHand("Paper");
};
selectedRock = function(){
    selectedHand("Rock");
};
selectedScissors = function(){
    selectedHand("Scissors");
};
selectedSpock = function(){
    selectedHand("Spock");
};
selectedLizard = function(){
    selectedHand("Lizard");
};

var options = ["Paper","Rock","Scissors","Spock","Lizard"];

var getRandomChoice = function(){
    var number  = Math.random();
    number *= 5;
    number =  Math.floor(number);
    return options[number];
};

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
    }else if(playerOne == "Lizard"){
        result = checkLizard(playerTwo);
    }else{
        //alert("Tsk Tsk Tsk. No cheating please!");
        alert(playerOne);
        return "";
    }
    /*
    if(playerMode == "Single"){
        if(result == 1){
            alert("You won with " + playerOne + " against "+playerTwo);
        }else if(result == -1){
            alert("You lost with " + playerOne + " against "+playerTwo);
        }else{
            alert("You got a draw with " + playerOne + " against "+playerTwo);
        }
    }
    */
    return result;
};

var checkScissor = function(against){
    if(against == "Rock" || against == "Spock"){
        return -1;
    }else if(against == "Paper" || against == "Lizard"){
        return 1;
    }
    return 0;
};

var checkPaper = function(against){
    if(against == "Scissors" ||  against == "Lizard"){
        return -1;
    }else if(against == "Spock" || against == "Rock"){
        return 1;
    }
    return 0;
};

var checkRock = function(against){
    if(against == "Paper" ||  against == "Spock"){
        return -1;
    }else if(against == "Scissors" || against == "Lizard"){
        return 1;
    }
    return 0;
};
var checkSpock = function(against){
    if(against == "Paper" ||  against == "Lizard"){
        return -1;
    }else if(against == "Scissors" || against == "Rock"){
        return 1;
    }
    return 0;
};
var checkLizard = function(against){
    if(against == "Paper" ||  against == "Spock"){
        return 1;
    }else if(against == "Scissors" || against == "Rock"){
        return -1;
    }
    return 0;
};

var getImageFor = function(hand){
    if("Paper" == hand){
        return "./img/Paper.png";
    }else if("Rock" == hand){
        return "./img/Rock.png";
    }else if("Lizard" == hand){
        return "./img/Lizzard.png";
    }else if("Spock" == hand){
        return "./img/Spock.png";
    }else{
        return "./img/Scizzors.png"
    }
};

var selectedHand = function(hand){
    // Player One
    if(playerMode == "Single"){
        var opposingHand = getRandomChoice();
        var result = checkForWinner(hand,opposingHand);
        var msg;
        if(result == 1){
            msg = "You win!";
        }else if(result == 0){
            msg = "Draw";
        }else{
            msg = "You lose!";
        }

        document.querySelector("#message").textContent = msg;
        document.querySelector("#result").setAttribute("style","");
        document.querySelector("#player img").setAttribute("src",getImageFor(hand));
        document.querySelector("#opponent img").setAttribute("src",getImageFor(opposingHand));
        // Player Two
    }else if(playerMode == "TwoPlayer"){
        currentTurn = currentTurn % 3;
        if(currentTurn == 1){
            document.querySelector("#message").textContent = "Player Two's turn";
            playerOne = hand;
        }else if(currentTurn == 0){
            document.querySelector("#message").textContent = "Player One's turn";
            document.querySelector("#continue").setAttribute("style","display:none;");
            document.querySelector("#gestures").setAttribute("style","");
            document.querySelector("#result").setAttribute("style","display:none");
        }else{
            // check winner
            playerTwo = hand;
            var winner = playerOne + " vs " + playerTwo;
            var w= checkForWinner(playerOne,playerTwo);

            document.querySelector("#player img").setAttribute("src",getImageFor(playerOne));
            document.querySelector("#opponent img").setAttribute("src",getImageFor(playerTwo));
            document.querySelector("#result").setAttribute("style","");
            if(w == -1){
                winner = "Player Two wins";
            }else if(w == 0){
                winner = "Draw";
            }else if(w == 1){
                winner = "Player One wins";
            }

            document.querySelector("#message").textContent = winner;
            document.querySelector("#continue").setAttribute("style","");
            document.querySelector("#gestures").setAttribute("style","display:none;");
        }
        currentTurn++;
    }
};



setListeners = function(){
    hideGame();
    var elem = document.querySelector("#single-player");
    elem.addEventListener("click",function(){
        setUpSinglePlayer();
    });
    elem = document.querySelector("#two-player");
    elem.addEventListener("click",function(){
        setUpTwoPlayer();
    });

    document.querySelector("#paper").addEventListener("click",selectedPaper);
    document.querySelector("#rock").addEventListener("click",selectedRock);
    document.querySelector("#spock").addEventListener("click",selectedSpock);
    document.querySelector("#lizard").addEventListener("click",selectedLizard);
    document.querySelector("#scissor").addEventListener("click",selectedScissors);
    document.querySelector("#continue").addEventListener("click",selectedHand);
};

var hideGameSelect = function(){
    var elem = document.querySelector("#type-select");
    elem.setAttribute("style","display:none");
};

var hideGame = function(){
    var elem = document.querySelector("#game-session");
    elem.setAttribute("style","display:none");
};


var showGame = function(){
    var elem = document.querySelector("#game-session");
    elem.removeAttribute("style");
};


setUpSinglePlayer = function(){
    hideGameSelect();
    playerMode = "Single";
    document.querySelector("#message").textContent="Choose a gesture to play that hand.";
   showGame();
};

setUpTwoPlayer = function(){
    hideGameSelect();
    playerMode = "TwoPlayer";
    currentTurn = 1;
    document.querySelector("#message").textContent = "Player One's turn";
    showGame();
};

document.addEventListener("DOMContentLoaded",setListeners);