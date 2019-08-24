// question and answer object, has all the questions and the associated answers.
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

// I have a time variable (30 seconds)
// an interval variable (for the timing stuff)
// i (for cycling through my arrays)
// an array of right answers in order of the questions, for checking if you got it right or not (which works because the question order isn't randomized)
// and counters for your wrong answers, right answers, and the questions you didn't answer at all.
// there's also the reset button, for if you want to replay.
var time = 30;
var interval;
var i = 0;
var rightAns = ["Monty Oum", "Yang Xiao Long, Blake Belladonna, Ruby Rose, and Weiss Schnee", "4", "Salem", "Crescent Rose", "Casey Lee Williams"];
var correct = 0;
var wrong = 0;
var timeOut = 0;
var resetButton = $("<button/>", {
    text: "Reset",
    id: "reset-button",
    click:function() {
        $("#reset").empty();
        $("#correct-answer").empty();
        correct = 0;
        wrong = 0;
        timeOut = 0;
        i = 0;
        time = 30;
        getQuestion();
    }
});

$("#start").click(startGame);

$("#answers").on("click", function(e) {
    var text = $(e.target).text();

    if(rightAns.includes(text)) {
        correct++;
        clearInterval(interval);

        $("#ans-1").empty();
        $("#ans-2").empty();
        $("#ans-3").empty();
        $("#ans-4").empty();
        $("#question").empty();
        $("#correct-answer").text("You got it right!");

        i++;

        if(i < qAndA.length) {
            setTimeout(getQuestion, 2000);
        }
        else {
            $("#ans-1").empty();
            $("#ans-2").empty();
            $("#ans-3").empty();
            $("#ans-4").empty();
            $("#question").empty();
            $("#reset").append(resetButton);
            $("#correct-answer").html("Game Over.<br>Correct Answers: "+correct+"<br>Wrong Answers: "+wrong+"<br> Unanswered: "+timeOut+"<br>If you'd like to play again, hit the reset button.");
        }
    }
    else {
        wrong++;
        clearInterval(interval);

        $("#ans-1").empty();
        $("#ans-2").empty();
        $("#ans-3").empty();
        $("#ans-4").empty();
        $("#question").empty();
        $("#correct-answer").text("Sorry, you got it wrong! The correct answer was "+rightAns[i]+".");

        i++;

        if(i < qAndA.length) {
            setTimeout(getQuestion, 2000);
        }
        else {
            $("#ans-1").empty();
            $("#ans-2").empty();
            $("#ans-3").empty();
            $("#ans-4").empty();
            $("#question").empty();
            $("#reset").append(resetButton);
            $("#correct-answer").html("Game Over.<br>Correct Answers: "+correct+"<br>Wrong Answers: "+wrong+"<br> Unanswered: "+timeOut+"<br>If you'd like to play again, hit the reset button.");
        }
    }
});

// this function exists primarily so that the getQuestion function isn't clearing the start-button div every time it's called, since most of the time, that div would already be empty.
function startGame() {
    $("#start-button").empty();
    getQuestion();
}

function getQuestion() {
    time = 30;
    $("#time").html("00:30");
    interval = setInterval(count, 1000);
    $("#correct-answer").empty();
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
        clearInterval(interval);

        $("#ans-1").empty();
        $("#ans-2").empty();
        $("#ans-3").empty();
        $("#ans-4").empty();
        $("#question").empty();
        $("#correct-answer").text("You ran out of time. The correct answer was "+rightAns[i]+".");

        i++;

        if(i < qAndA.length) {
            setTimeout(getQuestion, 2000);
        }
        else {
            $("#ans-1").empty();
            $("#ans-2").empty();
            $("#ans-3").empty();
            $("#ans-4").empty();
            $("#question").empty();
            $("#reset").append(resetButton);
            $("#correct-answer").html("Game Over.<br>Correct Answers: "+correct+"<br>Wrong Answers: "+wrong+"<br> Unanswered: "+timeOut+"<br>If you'd like to play again, hit the reset button.");
        }
    }
}

// yes, I took this right out of the stopwatch. I don't care. I wanted this to look nice, and this function was right there, so I looked at it and copied it. the only thing I changed is variables, to make more sense to me/make them easier to type.
function timeConverter(time) {
    var mins = Math.floor(time/60);
    var secs = time - (mins*60);
  
    if (secs < 10) {
      secs = "0"+secs;
    }
  
    if (mins === 0) {
      mins = "00";
    }
    else if (mins < 10) {
      mins = "0"+mins;
    }

    return mins+":"+secs;
}