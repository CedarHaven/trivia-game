var qAndA = [
    {question: "Who created RWBY?",
    answer1: "Monty Oum",
    answer2: "Miles Luna",
    answer3: "Kerry Shawcross",
    answer4: "Rooster Teeth"},

    {question: "Who are the four main characters of RWBY?",
    answer1: "Jaune Arc, Nora Valkyrie, Pyrrha Nikos, and Lie Ren",
    answer2: "Coco Adel, Fox Alistair, Yatsuhashi Daichi, and Velvet Scarlatina",
    answer3: "Yang Xiao Long, Blake Belladonna, Ruby Rose, and Weiss Schnee",
    answer4: "Sun Wukong, Neptune Vasilias, Scarlet David, and Sage Ayana"},

    {question: "How many kingdoms are there in Remnant?",
    answer1: "5",
    answer2: "4",
    answer3: "6",
    answer4: "2"},

    {question: "Who is the primary antagonist of RWBY?",
    answer1: "Cinder Fall",
    answer2: "Ozpin",
    answer3: "Adam Taurus",
    answer4: "Salem"},

    {question: "What is the name of Ruby Rose's weapon?",
    answer1: "Ember Celica",
    answer2: "Crescent Rose",
    answer3: "Magnhild",
    answer4: "Miló and Akoúo̱"},

    {question: "Who is the primary vocalist for RWBY?",
    answer1: "Jeff Williams",
    answer2: "Lamar Hall",
    answer3: "Casey Lee Williams",
    answer4: "Sandra Lee Casey"}
]

// all of this is working as intended now.
// things to do:
// make it so that once you've gone through all the questions and your score is displayed, a 'play again' button comes up that starts the game over
// change the console.log stuff to being in the appropriate divs and clear the relevant divs when answers and such are given
// css

var time = 30;
var interval;
var i = 0;
var rightAns = ["Monty Oum", "Yang Xiao Long, Blake Belladonna, Ruby Rose, and Weiss Schnee", "4", "Salem", "Crescent Rose", "Casey Lee Williams"];
var timeUp = false;
var ansGiven = false;
var correct = 0;
var wrong = 0;
var timeOut = 0;

$("#start").click(getQuestion);

$("#answers").on("click", function(e) {
    var text = $(e.target).text();

    if(!timeUp && !ansGiven){
        if(rightAns.includes(text)) {
            correct++;
            console.log("correct");
            ansGiven = true;
            clearInterval(interval);
            i++;
            if(i < qAndA.length) {
                setTimeout(getQuestion, 2000);
            }
            else {
                console.log("game over");
                console.log("correct answers: "+correct);
                console.log("wrong answers: "+wrong);
                console.log("unanswered: "+timeOut);
            }
        }
        else {
            wrong++;
            console.log("nope!");
            console.log("the correct answer was "+rightAns[i]);
            ansGiven = true;
            clearInterval(interval);
            i++;
            if(i < qAndA.length) {
                setTimeout(getQuestion, 2000);
            }
            else {
                console.log("game over");
                console.log("correct answers: "+correct);
                console.log("wrong answers: "+wrong);
                console.log("unanswered: "+timeOut);
            }
        }
    }
});


// function startGame() {
//     getQuestion();
// }

function getQuestion() {
    time = 30;
    ansGiven = false;
    timeUp = false;
    $("#time").html("00:30");
    interval = setInterval(count, 1000);
    $("#start-button").empty();
    $("#question").html(qAndA[i].question);

    $("#ans-1").html(qAndA[i].answer1);
    $("#ans-2").html(qAndA[i].answer2);
    $("#ans-3").html(qAndA[i].answer3);
    $("#ans-4").html(qAndA[i].answer4);
}

function count() {
    time--;
    var countdown = timeConverter(time);
    $("#time").html(countdown);

    if(time === 0){
        timeOut++;
        timeUp = true;
        console.log("you ran out of time!");
        console.log("the correct answer was "+rightAns[i]);
        i++;
        clearInterval(interval);
        if(i < qAndA.length) {
            setTimeout(getQuestion, 2000);
        }
        else {
            console.log("game over");
            console.log("correct answers: "+correct);
            console.log("wrong answers: "+wrong);
            console.log("unanswered: "+timeOut);
        }
    }
}

function timeConverter(t) {
    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}