const buttonColour = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let gameStart = false;
let userTurn = false;
let level = 0;
let currentScore = 0;
let highscore = 0;

$(".btn").click(function(){
    btnClick(this.id);
});

function playSound(colour){
    $("#" + colour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
    let audioStr = "/sounds/" + colour + ".mp3"
    let a = new Audio(audioStr);
    a.play();
}

function nextSequence(){
    $("#level-title").text("Level " + level);
    let colour = buttonColour[Math.floor(Math.random()*3)];
    playSound(colour);
    gamePattern.push(colour);
    level++;
    userTurn = true;
    console.log(gamePattern);
}

function btnClick(colour){
    if (gameStart && userTurn){
        animatePress(colour);
        playSound(colour);
        userClickedPattern.push(colour);
        if (userClickedPattern.length === gamePattern.length){
            userTurn = false;
            checkAnswer();
        }
    }
}

function animatePress(currentColour){
    let element = $("." + currentColour);
    element.addClass("pressed");
    setTimeout(function(){
        element.removeClass("pressed");
    }, 300);
}

function checkAnswer(){
    if (JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern)){
        userClickedPattern = [];
        currentScore++;
        if (currentScore > highscore){
            highscore = currentScore
        }
        $("#level-title").text("Passed!");
        $("#highscore").text("High Score: " + highscore);
        setTimeout(nextSequence,1500);
    } else {
        playSound("wrong");
        gameStart = false;
        $("#level-title").text("Game Over!");
        setTimeout(function(){
            $("#level-title").text("Press A Key To Restart Game");
        }, 2000);
    }
}

document.addEventListener("keydown", function(e){
    if (!gameStart && e.key === "a"){
        console.log("game start");
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        currentScore = 0;
        gameStart = true;
        if (gameStart && !userTurn){
            nextSequence();
        }
    }
});