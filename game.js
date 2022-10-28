const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var inProgress = false;
var level = 0;

$("h1").text("Press A Key to Start");

$(document).keypress(function () {
    if (!inProgress) {
        inProgress = true;
        gamePattern = [];
        userClickedPattern=[];
        level = 0;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

$(".btn").click(function () {
    if (inProgress) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }

});

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(50, function () {
        playSound(randomChosenColor);
    }).fadeIn(50);
}


function playSound(color) {
    var audio = new Audio('sounds/' + color + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(userIndex) {
    console.log(userClickedPattern);
    console.log(gamePattern);
    if (userClickedPattern[userIndex] === gamePattern[userIndex]) {
        console.log("success");
        if (userClickedPattern.length === level) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        console.log("wrong")
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart");
        inProgress = false;
    }

}