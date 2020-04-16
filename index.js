const buttonColour = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let randomChosenColour = buttonColour[nextSequence()];

function nextSequence(){
    return Math.floor(Math.random()*3);
}

function btnClick (colour){
    $(colour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    let audioStr = "/sounds/" + colour + ".mp3"
    let a = new Audio(audioStr);
    a.play();

}

$(".btn").click(function(){
    btnClick(this.id);
});