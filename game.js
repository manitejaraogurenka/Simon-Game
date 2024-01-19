
const buttonColours = ["red", "blue", "green", "yellow"]

let gamePattern = []

let userClickedPattern = []

let started = false

let level = 0

$(".btn").click(function(){
    let userChosenColour = $(this).attr('id')
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})


function nextSequence(){
    userClickedPattern = []
    level++
    $("#level-title").text("Level "+level)
    let randomNumber = Math.floor(Math.random()*4)
    let randomChoosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChoosenColour)

    $("#"+randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChoosenColour)

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    } else{
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        $(".start").removeClass("none");
        startOver()
    }  
}

function startGame() {
    if (!started) {
        $(".start").addClass("none");
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
}

$(document).keypress(startGame);

$(".start").click(startGame);

function startOver(){
    level = 0
    gamePattern = []
    started = false
}

function playSound(name){
    let audio = new Audio("sounds/"+name+".mp3")
    audio.play()
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed").delay(100).queue(function (next) {
        $(this).removeClass("pressed");
        next();
    });
}
