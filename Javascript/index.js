var level = 0;
var started = false;
var seq = [];
var userSeq = [];
const colours = ["red", "blue", "yellow", "green"];
var index = 0;

function playSound(colour, index) {
    var sound = new Audio("sounds/"+colour+".mp3");
    setTimeout(function () {
        $("#" + colour).addClass("clicked");
        setTimeout(function() {
            $("#" + colour).removeClass("clicked");
    }, 200);
    sound.play();
    }, 300 * (index + 1))  
}

function newSequence() {
    userSeq = [];
    seq = [];
    index = 0;
    $(".heading").text("level " + level);

    setTimeout(function () {
        for (var i=0; i<level; i++) {
            var indexed = i;
            seq.push(Math.floor((Math.random()) * 4));
            playSound(colours[seq[indexed]] , indexed);
        }
        level++;
    }, 1000)
}

function checkAns(indexOfUserSeq) {
    if (userSeq[indexOfUserSeq] === seq[indexOfUserSeq]) {
        playSound(colours[seq[indexOfUserSeq]]);
    } else {
        $("body").addClass("wrong");
        setTimeout(function() {
            $("body").removeClass("wrong");
        }, 200);
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        level = 0;
        $(".heading").text(("Game Over,Press any key to start"));
        started = false;
        return 0;
    }
    if (indexOfUserSeq === seq.length-1) {
        newSequence();
        $("body").addClass("level-complete");
        $("body div").addClass("hiding-div");
        $("body h1").addClass("hiding-div");
        setTimeout(function () {
            var sound = new Audio("sounds/levelComplete.mp3")
            sound.play();
        }, 500)
        setTimeout(function () {
            $("body").removeClass("level-complete");
            $("body div").removeClass("hiding-div");
            $("body h1").removeClass("hiding-div");
        }, 1000);
    }
    started = true;
}

function startGame() { 
    level = 0;
    started = true;
    $(".heading").text("level " + ++level);
    newSequence(); 
}

$(".btn").on("click", function() {
    $this = $(this);
    $this.addClass("clicked");
    setTimeout(function () {
        $this.removeClass("clicked")
    }, 200);
    playSound($this.attr("class").split(" ")[0]);
    userSeq.push(colours.indexOf($this.attr("class").split(" ")[0]));
    checkAns(index++);
})

$(document).on("keydown", function (key) {
    if(!started) {
        startGame();
    } else {
        switch (key.keyCode) {
            case 37:
                $("#yellow").addClass("clicked");
                setTimeout(function() {
                    $("#yellow").removeClass("clicked");
                }, 200);
                playSound("yellow");
                userSeq.push(2);
                checkAns(index++);
            break;
        
            case 38:
                $("#red").addClass("clicked");
                setTimeout(function() {
                    $("#red").removeClass("clicked");
                }, 200);
                playSound("red");
                userSeq.push(0);
                checkAns(index++);
            break;
        
            case 39:
                $("#blue").addClass("clicked");
                setTimeout(function() {
                    $("#blue").removeClass("clicked");
                }, 200);
                playSound("blue");
                userSeq.push(1);
                checkAns(index++);
            break;
        
            case 40:
                $("#green").addClass("clicked");
                setTimeout(function() {
                    $("#green").removeClass("clicked");
                }, 200);
                playSound("green");
                userSeq.push(3);
                checkAns(index++);
            break;

            default :
                $("body").addClass("wrong");
                setTimeout(function () {
                    $("body").removeClass("wrong");
                }, 200);
                level = 0;
                started = false;
                $(".heading").text(("Game Over,Press any key to start"));
            break;
        }
    }
})
