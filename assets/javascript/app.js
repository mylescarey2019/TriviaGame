// saved state of of 7-17-19 9:55pm

// --------------------------------------------------------
// javascript Periodic Table of Elements Quiz game
// ---------------------------------------------------------
// Summary:
// This is a knowledge quiz game more than a trivia game.
// The theme is the Periodic Table of Elements.  The player
// answers a series of 10 question given 15 seconds per question.
// After completing the set stats are shown for counts of correct, incorrect
// and time-expired answers.
// Player has opportunity to play the next set of 10 questions.
// After all sets exhausted player can start over from the beginning.
// ---------------------------------------------------------

// ---------------------------------------------------------
// Methodology:
// ---------------------------------------------------------
// Logic layer:  javascript object/methods, button click events
//   game "state" variable to control the "story board" flow.
//   JQuery for DOM manipulation.
//   *** attempting to utlize classes for the Question object
//   and instansiate one object per question.
// 
// Web-Page:  nesponsive layout leveraging bootstrap.
//    JQuery for dynamic activty of onpage objects and styles.
// 
// The "state" logic guides the experience and page activity
// as the player progress thru the decision tree/story board
// and the program responds to the play results.
// 
// State flow allows for game reset after completion


// ---------------------------------------------------------
// Refactor Needs:
// ---------------------------------------------------------

// ---------------------------------------------------------
// Enhancements:
// ---------------------------------------------------------
// Add additional question sets so all naturally occuring
// periodic elements are represented in questions.
// 
// This could be used a quiz engine/template - would like
// to experiment with adding themes so that the UX stays
// the same but different themed set of questions along with
// applicable page styling could be added.

// ---------------------------------------------------------
// User Stories / Use Cases
// ---------------------------------------------------------
// 1.  game starts in browser 
//     1. page has header bar with title on left start and next set buttons on right
//     2. over backround image is centered content box with title bar, timer and main box for text and game questions
//     3. the box will have welcome title and instruction for game
//     4. progress bar below the main box
//     5. start button is enabled, next set button is disabled

// 2.  user clicks start button 
//     1. timer starts coundown from 15 seconds
//     2. content changes to question in the title bar and 4 clickable answers in the content box 
//     3. mousing over an answer draws attention to it 
//     4. disable start button

// 3.  User interacts with question content or timer runs out
//     1. if timer runs out or if user clicks answer - page changes into answer result mode
//         1.  Timer stops (if not already stopped)
//         2.  content title shows the question & answer in some manner
//         3.  content box shows graphic or image 
//         4.  message display:  
//             1. correct
//             2. incorrect
//             3. time expired 
//             4. these are logged as counts for displaying later 
//             5. progress bar updated to reflect correct or incorrect(+expired)
//             5. page pauses for 3 seconds then proceed with program flow

// 4. Check made to see if question in set remain
//     1. if more questions then load new question/choices and reset/restart timer
//     2. if no more questions in the set 
//         1. check to see if this was the last set 
//             1. if not then show set results
//                 1. change content title bar to Set Score
//                 2. change box content to # correct, incorrect, time-expired
//                 3. enable next set button
//         2. if that was the last set then show final
//             1. change content title to Overall Score
//             2. change box content to overall # correct, incorrect, time-expired
//             3. instruction to use start button if desire to play again
//             4. disable next set button
//             5. enable start button

// 5. User presses Next Set button
//     1. load new set of questions, reset counts for the set
//     2. disable next set button
//     3. load new question/choices and reset/restart timer

// 6. User presses Start button
//     1. reset all counts and load first set
//     2. disable start button and disable next set button
//     3. load new question/choices and reset/restart timer

// ### Psuedo Code - notes

// 1. Global variables
//     1. 
// 2. Objects:
//     1. Game
//         1. Game state
//             1. begin, question, answer result (correct, incorrect, time expired),
//                end of set, end of all sets
//         2. set count for correct, incorrect, time expired
//         3. overal count for correct, incorrect, time expired
//         4. number of questions remaining in set
//         5. number of sets remaining
//         6. Method to check answer
//         7. Method to get random question from question pool (no repeating within the 3 sets of 10)
//         8. Method for game start/restart (see if this can be single method used in either situation)
//     2. Question
//         1. question pool -structure or array of objects (need to try and get beyond using correlated arrays)
//             1. index 
//             2. question
//             3. choices for question
//             4. answer for question
//             5. graphics or image for answer
//             6. parallel array that acts as index into question pool and is depleted as a question has been used
//                 1. gets reset on game restart
//         2. Method to return random question from question pool (no repeating within the 3 sets of 10)
//             1. needs to mark or otherwise make used so no repeats
//         3. Method reset the question pool for Play Again
//     3. User Interface
//         1. Method for managing the header bar   
//             1. enable, disable button
//         2. Method for managing the content title and content box
//         3. Method(s) for managing progress bar
//             1. reset bar
//             2. update bar with correct and incorrect stats
//         4. Method(s) for handling the question timer
//         5. Method(s) for handling the in-between question pause

// 3. Event listeners
//     1. click event for header start button
//         1. re-initialize game and starts it
//     2. click event for the next set button
//         2. resets for new set of questions, starts play
//     2. click event for the unordered choice list
//         1. list of 4 choices in context box will be unordered list
//         2. clickable class 
//         3. need get what choice was clicked so it can be compared to the question's answer
// ---------------------------------------------------------
// Global Variables
// ---------------------------------------------------------
// initial some variables to be used in questionPool
// maybe this goes in a game object but not sure
$(document).ready(function(){
  var numberOfQuestions = 15;
  var availableQuestions = [];
  var questionArray = [];
  var setSize = 5;
  var progressBarPercentPerQuestion = 100 / setSize;
  var setsRemaining = numberOfQuestions / setSize;
  var numberOfSetsConstant = numberOfQuestions / setSize;
  var questionsRemainingInSet = setSize;
  // timers for question allotment & for transition between questions
  var questionTimer;
  var intermissionTimer;
  // keep these in sync
  var questionTimeConstant = 25;
  var intermissionTimeConstant = 7;
  var questionTime = questionTimeConstant;
  var intermissionTime = intermissionTimeConstant;
  var correctAnswersSet = 0;
  var incorrectAnswersSet = 0;
  var timeOutAnswersSet = 0;
  var correctAnswersOverall = 0;
  var incorrectAnswersOverall = 0;
  var timeOutAnswersOverall = 0;
  
  
  // interval for timers
  var questionIntervalId;
  var intermissionIntervalId;
  
  // question object that is currently in play
  var currentQuestionInPlay;
  
  // screen texts
  
  var instructionText = "There are 5 questions per quiz/trivia round." + "<br>" + "You have 25 seconds per question" + 
                        "<br>" + "Press Start when ready" 
  
  
  // var questionText = "Sorry" + "<br>" + "The correct answer is Li-3." + "<br>" 
  // +  "Lithium(Li-3) is a main component in cell phone batteries" 
  
  // var questionText = "Sorry" + "\n" + "The correct answer is Li-3." + "\n" 
  //                    +  "Lithium(Li-3) is a main component in cell phone batteries" 
  
  var questionText = "Sorry" + "<br>" + "The correct answer is Ne-10." + "<br>" 
  +  "Neon(Ne-10) is used to make neon signs"; 
  
                    
  
  // prevents the clock from being sped up unnecessarily
  // may not need this
  // deprecated
  // var questionIntervalRunning = false;
  // var intermissionIntervalRunning = false;
  
  // ---------------------------------------------------------
  // Global Functions:
  // ---------------------------------------------------------
  // used for testing only
  // see how to seed the answer choices in the button grid
  // sampleChoice = ["O-8","Sn-50","W-74","H-1"];
  // function updateButtonAnswers () {
  //   console.log("in global.updateButtonAnswers");
  //   var i = 0;
  //   $(".list-group-item-light").each(function() {
  //      $(this).text(sampleChoice[i]);
  //      i++
  //   });
  // }
  // updateButtonAnswers();
  
  
  
  
  // start the question countdown timer
  function startQuestionCountdown() {
    console.log("in global.startQuestionCountdown");
    // if (!questionIntervalRunning) {
      // resetQuestionCountdown();
      questionTime = questionTimeConstant;
    // update timer on page
    $("#timer").text(displayableTime(questionTime));
      questionIntervalId = setInterval(questionIntervalCountdown, 1000);
    //   questionIntervalRunning = true;
    // }
  }
  
  // stop the question countdown timer
  function stopQuestionCountdown() {
    console.log("in global.stopQuestionCountdown");
    clearInterval(questionIntervalId);
    // questionIntervalRunning = false;
  }
  
  // deprecated
  // // reset question countdown timer
  // function resetQuestionCountdown() {
  //   console.log("in global.resetQuestionCountdown");
  //   // console.log("question timer: " + questionTime);
  //   questionTime = questionTimeConstant;
  
  //   // update timer on page
  //   $("#timer").text(displayableTime(questionTime));
  // }
  
  // decrement the question countdown timer
  function questionIntervalCountdown() {
    console.log("in global.questionIntervalCountdown, time: " + questionTime);
    questionTime--;
    // update timer on page
    $("#timer").text(displayableTime(questionTime));
    //  time running out
    if (questionTime <= 5) {
      $("#timer").css("color","red");
    };
    //  time expired
    if (questionTime === 0) {
      stopQuestionCountdown();
      questionsRemainingInSet--;
      // passing (result,timeExpired)
      // in this case answer is counted as wrong, i.e. false
      // and timeExpired is true
      showAnswer(false,true);
      startIntermissionCountdown();  // MRC-fix attempt
      // if (questionsRemainingInSet > 0) {  // MRC-fix attempt
      //   // startIntermissionCountdown();  // MRC-fix attempt
      // }
      // else {
      //   console.log("in global.questionIntervalCountdown - no more questions");
      //   console.log("run game end procedure to show results")
      //   console.log("this is where a restart procedure must go");
      //   // startIntermissionCountdown();
      //   // reset color
      //   $("#timer").css("color","#818182");
      //   resetGame();
      // }
    }
  } 
  
  // convert countdown to displayable time
  function displayableTime(t) {
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
  
  // start the intermission countdown timer
  function startIntermissionCountdown() {
    console.log("in global.startIntermissionCountdown");
    // if (!intermissionIntervalRunning) {
      // resetIntermissionCountdown();
    // reset color
    $("#timer").css("color","#818182");
      intermissionTime = intermissionTimeConstant;
      intermissionIntervalId = setInterval(intermissionIntervalCountdown, 1000);
    //   intermissionIntervalRunning = true;
    // }
  }
  
  // stop the intermission countdown timer
  function stopIntermissionCountdown() {
    console.log("in global.stopIntermissionCountdown");
    clearInterval(intermissionIntervalId);
    // intermissionIntervalRunning = false;
    if (questionsRemainingInSet > 0) {  // MRC -fix attempt
      showQuestion();
    } else {
      resetGame();
    };
      // don't want to do this if between sets  - fix this
    // startQuestionCountdown();
  }
  
  // deprecated
  // reset intermission countdown timer
  // function resetIntermissionCountdown() {
  //   console.log("in global.resetIntermissionCountdown");
  //   intermissionTime = intermissionTimeConstant;
  // }
  
  // decrement the question countdown timer
  function intermissionIntervalCountdown() {
    console.log("intermission timer decrement: " + intermissionTime);
    // decrement time by 1
    intermissionTime--;
    //  time expired
    if (intermissionTime === 0) {
      $("#timer").css("color","#818182");  // MRC -fix attempt
      stopIntermissionCountdown() 
    }
  } 
  
  
  // this will belong in the question class or game object
  // for now just trying to learn how to create the flow
  function showQuestion() {
    console.log("in global.showQuestion");
    // get the next question object
    currentQuestionInPlay = gameQuestions.getQuestion();
    console.log("question name: ",currentQuestionInPlay.name);
    console.log("question symbol: ",currentQuestionInPlay.symbol);
    console.log("question elementQuestion : ",currentQuestionInPlay.elementQuestion);
    console.log("question choices : ",currentQuestionInPlay.choices);
    console.log("question answerIndex: ",currentQuestionInPlay.answerIndex);
    console.log("question factoid: ",currentQuestionInPlay.factoid);
   
    // load display with question answer choices
    $("p.lead").text(currentQuestionInPlay.elementQuestion);
    updateButtonAnswers(currentQuestionInPlay.choices);
  
    // hide the results panel and show the answer buttons
    $("#inner-container").removeClass("hide-container");
    $("#inner-container-2").addClass("hide-container");
  
      // start the question countdown
      startQuestionCountdown();
  }
  
  // load answer choices to button group
  function updateButtonAnswers (array) {
    console.log("in global.updateButtonAnswers");
    var i = 0;
    $(".list-group-item-light").each(function() {
       $(this).text(array[i]);
       i++
    });
  }
  
  // create string for Set score
  function yourSetScore() {
    console.log("in global.setScore");
    var msg = "Your quiz score was: " + correctAnswersSet +
              " Correct, " + incorrectAnswersSet +
              " Incorrect, " + timeOutAnswersSet +
              " Time expired." 
    return msg;
  }
  
  // create string for Overall score
  function yourOverallScore() {
    console.log("in global.overallScore");
    var msg = "Your total score was: " + correctAnswersOverall +
              " Correct, " + incorrectAnswersOverall +
              " Incorrect, " + timeOutAnswersOverall +
              " Time expired.";
    return msg;
  }
  
  // this will belong in the question class or game object
  // for now just trying to learn how to create the flow
  function showAnswer(result,timeExpired) {
    console.log("in global.showAnswer");
    console.log("result/time-expired sent in is: ", result, timeExpired);
    var resultMsg;
    if (timeExpired) {
      resultMsg = "Time expired." + "<br>" + "The answer is " +
      currentQuestionInPlay.symbol  + "<br>" +
      currentQuestionInPlay.factoid; 
      timeOutAnswersSet++;
      // time-out counts as incorrect on progress bar
      var progBarIncorrect = progressBarPercentPerQuestion * (timeOutAnswersSet + incorrectAnswersSet);
      console.log("prog bar incorrect # : ", progressBarPercentPerQuestion, incorrectAnswersSet, progBarIncorrect);
      var progBarStyle = "width: " + progBarIncorrect + "%";
      var progBarLabel = progBarIncorrect.toString() + "%";
      $(".bg-danger").attr("style",progBarStyle);
      $(".bg-danger").text(progBarLabel);
    }
    else if (result) {
      resultMsg = "You are correct" + "<br>" + "The answer is " +
      currentQuestionInPlay.symbol  + "<br>" +
      currentQuestionInPlay.factoid; 
      correctAnswersSet++;
      var progBarCorrect = progressBarPercentPerQuestion * correctAnswersSet;
      console.log("prog bar correct # : ", progressBarPercentPerQuestion, correctAnswersSet, progBarCorrect);
      var progBarStyle = "width: " + progBarCorrect + "%";
      var progBarLabel = progBarCorrect.toString() + "%";
      $(".bg-success").attr("style",progBarStyle);
      $(".bg-success").text(progBarLabel);
    }
      else {
        resultMsg = "Sorry" + "<br>" + "The correct answer is " +
        currentQuestionInPlay.symbol  + "<br>" +
        currentQuestionInPlay.factoid; 
        incorrectAnswersSet++;
        // wrong answer- update progress bar
        var progBarIncorrect = progressBarPercentPerQuestion * (timeOutAnswersSet +  incorrectAnswersSet);
        console.log("prog bar incorrect # : ", progressBarPercentPerQuestion, incorrectAnswersSet, progBarIncorrect);
        var progBarStyle = "width: " + progBarIncorrect + "%";
        var progBarLabel = progBarIncorrect.toString() + "%";
        $(".bg-danger").attr("style",progBarStyle);
        $(".bg-danger").text(progBarLabel);
      }; 
     
      console.log("result string is: ", resultMsg); 
  
      // display the result message
      $("#inner-container-2").html(resultMsg);   
  
      // this will hide the button group and show the answer paragraph
      $("#inner-container").addClass("hide-container");
      $("#inner-container-2").removeClass("hide-container"); 
  
        
  
    // // simulate the answer quessing for now
    // console.log("in global.showAnswer, questions remaining: " + questionsRemainingInSet);
    // var quess = Math.floor(Math.random() * 2);
    // $("#inner-container").addClass("hide-container");
    // $("#inner-container-2").removeClass("hide-container");
    // if (quess === 0 ) {
    //   incorrectAnswers++;
    //   var progBarIncorrect = 20 * incorrectAnswers;
    //   var progBarStyle = "width: " + progBarIncorrect + "%";
    //   var progBarLabel = progBarIncorrect.toString() + "%";
    //   $(".bg-danger").attr("style",progBarStyle);
    //   $(".bg-danger").text(progBarLabel);
    // }
    // else 
    // {
    //   correctAnswers++;
    //   var progBarCorrect = 20 * correctAnswers;
    //   var progBarStyle = "width: " + progBarCorrect + "%";
    //   var progBarLabel = progBarCorrect.toString() + "%";
    //   $(".bg-success").attr("style",progBarStyle);
    //   $(".bg-success").text(progBarLabel);
    // }
  }
  
  // game start up
  function gameStartUp() {
    console.log("in global.gameStartUp()");
     // load instructions
     $("#inner-container-2").html(instructionText);
    //  $("p.lead").text('HELLO');
     correctAnswersSet = 0;
     incorrectAnswersSet = 0;
     timeOutAnswersSet = 0;
     setsRemaining = numberOfSetsConstant;
     questionsRemainingInSet = setSize;
  }
  
  
  function resetGame() {
    console.log("in global.resetGame");
    console.log("1: need to run gameQuestions.resetPool(inlineQuestionData);" );
    console.log("2. need to check to see what global needs to be reset");
  
  
  
    // simulating sets of quizes
    setsRemaining--;
    // $("#inner-container").addClass("hide-container");
    // $("#inner-container-2").removeClass("hide-container");
    // $(".bg-danger").attr("style","width: 0%");
    // $(".bg-success").attr("style","width: 0%");
    console.log("3. sets remaining: " + setsRemaining)
    $("p.lead").html("<br>");
    // track overall score
    correctAnswersOverall += correctAnswersSet;
    incorrectAnswersOverall += incorrectAnswersSet;
    timeOutAnswersOverall += timeOutAnswersSet;
  
    if (setsRemaining > 0) { 
      // do another set
      questionsRemainingInSet = setSize;
      $("#next-set").removeAttr("disabled");
      // yourSetScore goes here 
      var bothMsg = yourSetScore() + "<br>" +
      "Press Next Quiz when ready";
      $("#inner-container-2").html(bothMsg); 
    }
    else {
      console.log("all questions/sets used - restart")
      $("#start-restart").removeAttr("disabled");
      // yourSetScore & yourOverallScore goes here
      var bothMsg = yourSetScore() + "<br>" + yourOverallScore() +
               "<br>" + "Press Restart to play again";
      $("#inner-container-2").html(bothMsg);  
      // reset overall scores
      correctAnswersOverall = 0;
      incorrectAnswersOverall = 0;
      timeOutAnswersOverall = 0;
    };
  
      // load instructions
    // gameStartUp();  // tMRC - fix attemp
    
    correctAnswersSet = 0;
    incorrectAnswersSet = 0;
    timeOutAnswersSet = 0;
  
  }
  
  // diagnostic output to console
  function diagnosticDump() {
    console.log("------------------------")
    console.log("in global.diagnosticDump"); 
    console.log("questions in remaining in pool: ", gameQuestions.availableQuestions.length)
   
    // console.log("display word: " + game.getDisplayableGameWord());
    // console.log("word: " + game.gameWordString);
    // console.log("used letters: " + game.getDisplayableUsedLetterList());
    // console.log("guess remaining: " + game.guessesRemaining);
    // console.log("game state: " + game.checkGameState());
    // console.log("words remaining: " + wordPool.availableWords.length);
    // console.log("wins: " + session.wins);
    // console.log("losses: " + session.losses);
    // console.log("game active: " + game.gameActive);
    // console.log("session active: " + session.sessionActive);
    // session.wordsWon.forEach(element => {
    //   console.log("word won: " + element);
    // });
    // session.wordsLost.forEach(element => {
    //   console.log("word lost: " + element);
    // });
    console.log("------------------------")
  }
  
  // // this will belong in the question class or game object
  // // for now just trying to learn how to create the flow
  // function loadQuestion() {
  //   // assuming there is a question available - need to check for that
  //   // 
    
  // }
  
  // ---------------------------------------------------------
  // Objects, Classes & Methhods:
  // ---------------------------------------------------------
  
  var inlineQuestionData =  [{"name": "Hydrogen", "symbol": "H", "elementQuestion": "Was unfortunate for Hindenburg Zeppelin","choices":["O-8","Sn-50","W-74","H-1"],"answerIndex":3,
                   "factoid": "Leaking Hydrogen(H-1) ignited by weather related electrostatic discharge was likely cause of Hindenburg's demise"},
                   {"name": "Helium", "symbol": "He", "elementQuestion": "Would have been better choice for use in Hindenburg Zeppelin","choices":["Pb-82","He-2","Cl-17","Hg-80"],"answerIndex":1,
                   "factoid": "Modern airships use Helium(He-2) gas due to its non-flammable and 92% buoyancy properties"}, 
                   {"name": "Lithium", "symbol": "Li", "elementQuestion": "Don't leave your phone without it","choices":["K-19","Na-11","Li-3","Pu-94"],"answerIndex":2,
                   "factoid": "Lithium(Li-3) is a main component in cell phone batteries"},
                   {"name": "Lead", "symbol": "Pb", "elementQuestion": "X-Ray technicians make use of this","choices":["F-9","O-8","Cu-29","Pb-82"],"answerIndex":3,
                   "factoid": "Lead(Pb-82) is used in for shielding when taking X-rays "},
                   {"name": "Copper", "symbol": "Cu", "elementQuestion": "Zinc replaced which of these in the modern US penny?","choices":["Cu-29","Ag-47","Mg-12","Au-79"],"answerIndex":0,
                   "factoid": "Copper(Cu-29) was the main alloy in US pennys until 1982"},
  
  
                   {"name": "Mercury", "symbol": "Hg", "elementQuestion": "A metal you can pour","choices":["Ni-28","Hg-80","Xe-54","Ne-10"],"answerIndex":1,
                   "factoid": "Mercury(Hg-80) is the only metal that is liquid at standard temperature and pressure"},
                   {"name": "Oxygen", "symbol": "O", "elementQuestion": "Necessary to form water","choices":["He-2","Au-79","O-8","Ca-20"],"answerIndex":2,
                   "factoid": "Oxygen(O-8) H2O is water: two Hydrongen atoms and 1 Oxygen atom"},
                   {"name": "Plutonium", "symbol": "Pu", "elementQuestion": "Named after planet that has since been demoted to dwarf status","choices":["Pu-92","Kr-36","Xe-54","Ir-77"],"answerIndex":0,
                   "factoid": "Plutonium(Pu-94) was named for outer planet Pluto following namings of Uranium and Neptunium"},
                   {"name": "Neon", "symbol": "Ne", "elementQuestion": "Downtown (song) ...Linger on the sidewalks were the **** signs are pretty","choices":["Ti-22","F-9","Ne-10","Zr-40"],"answerIndex":2,
                   "factoid": "Neon(Ne-10) is used to make neon signs "},
                   {"name": "Carbon", "symbol": "C", "elementQuestion": "The elemental form of this includes one of the hardest substances and one of the softest ","choices":["Na-11","Sn-50","Rn-86","C-6"],"answerIndex":3,
                   "factoid": "Carbon(C-6) elemental allotropic forms include diamond (hard) and graphite (soft)"},
  
                   {"name": "Gold", "symbol": "Au", "elementQuestion": "Latin name means 'glow of sunrise'","choices":["Po-84","Au-79","Pd-46","Ir-77"],"answerIndex":1,
                   "factoid": "Gold(Au-79) from the latin name aurum"},
                   {"name": "Uranium", "symbol": "U", "elementQuestion": "3-Mile is not a rapper from Pennsylvania","choices":["Ni-28","N-7","Am-95","U-92"],"answerIndex":3,
                   "factoid": "Uranium(U-92) isotope U-235 is used in nuclear reactors"},
                   {"name": "Titanium", "symbol": "Ti", "elementQuestion": "Named after Greek gods","choices":["As-33","Ti-22","Rn-86","B-5"],"answerIndex":1,
                   "factoid": "Titanium(Ti-22) was named after the Titans of Greek mythology"},
                   {"name": "Iodine", "symbol": "I", "elementQuestion": "Seafood and kelp are natural food sources of this","choices":["Ti-22","F-9","I-53","Mn-25"],"answerIndex":2,
                   "factoid": "Iodine(I-53) - a small amount is essential for nutrition "},
                   {"name": "Sodium", "symbol": "Na", "elementQuestion": "Compounds of this element are used in food preservation","choices":["K-19","Na-11","Fe-26","P-15"],"answerIndex":1,
                   "factoid": "Sodium(Na-11) - important in maintaining fluid balance in human cells"}
  
     
                  ];
  
  
  
  // ----------------------------------------------------------
  // class for Question
  // ----------------------------------------------------------
  // - refactored using deconstruction (study this more in depth for understanding)
  // - refactored using class
  class Question {
    constructor(array) {
      console.log("in constructor.Question");
      this.name = array.name;
      this.symbol = array.symbol;
      this.elementQuestion = array.elementQuestion;
      this.choices = array.choices;
      this.answerIndex = array.answerIndex;
      this.factoid = array.factoid;
    }
  
    // method to determine if answer is correct
    // remember to have caller use zero based index
    isCorrect(index) {
    console.log("in questionPool.isCorrect");
    // remember to having caller use zero based index
    return index === this.answerIndex;
    }
  }
  
  // ----------------------------------------------------------
  // class for pool of questions - 
  // ----------------------------------------------------------
  class QuestionPool {
    
    constructor(numberOfQuestions) { //,availableQuestions,questionArray) {
      console.log("in constructor.QuestionPool");
      this.numberOfQuestions = numberOfQuestions;
  
      // intended to be a correlation index into array of question objects using indexOf()
      // this would be to randomly select the next question
      // this.availableQuestions = availableQuestions;
      // // array of question objects
      // this.questionArray = questionArray

      this.availableQuestions = [];
      // array of question objects
      this.questionArray = [];
    }
   
    // intended to be a correlation index into array of question objects using indexOf()
    // this would be to randomly select the next question
    
    // availableQuestions = [];
    // // array of question objects
    // questionArray = [];
  
  
  
    // method to reset the question pool's questions (i.e. questionPool.questionArray )
    resetPool(questionData) {
      console.log("in questionPool.resetPool");
      console.log("number of questions: " + this.numberOfQuestions);
      // clear the arrays 
      this.availableQuestions.splice(0,this.availableQuestions.length);
      this.questionArray.splice(0,this.questionArray.length);
  
      // populate the available question array
      for ( let i = 0; i < this.numberOfQuestions; i++) {
        this.availableQuestions.push(i);
      };
      console.log("available array: " + this.availableQuestions);
    
      // instantiate question object for every questionData row
      // and push into questionPool's question object array
      console.log("question data is: " + questionData);
      questionData.forEach(element => {
        console.log("question row is: " + element);
        this.questionArray.push(new Question(element));
        // questionArray.push(new Question(element));
      })
    }
  
    // method to get a random question
    getQuestion() {
      console.log("in questionPool.getQuestion");
      // randomly select from availableQuestions
      var nextQuestionToPlay = this.availableQuestions[Math.floor(Math.random() * this.availableQuestions.length)];
  
      // remove element from availableQuestions - it is going to be consumed
      this.availableQuestions.splice(this.availableQuestions.indexOf(nextQuestionToPlay),1);
      
      diagnosticDump();
  
      // index into the questionArray and return the correleted question object
      return this.questionArray[nextQuestionToPlay];
    }
  };
  
  
  
  
  
  
  // manual process to build gameQuestions.question array
  // qElement.forEach(element => {
  //   console.log("in loop to call Question()"); 
  //   console.log("qElement is: " + element);
  //   questionPool.questionArray.push(new Question(element));
    
  // });
  
  // use to unpack & display the question data array content
  // qElement.forEach(element => {
  //   console.log("name: " + element["name"]);
  //   console.log("symbol: " + element["symbol"]);
  //   console.log("hint-question: " + element["elementQuestion"]);
  //   console.log("choices: " + element["choices"]);
  //   console.log("answer index: " + element["answerIndex"]);
  //   console.log("factoid: " + element["factoid"]);
  //   console.log("==============");
    
  // });
  
  // ----------------------------------------------------------------------------
  // Events and timers
  // ----------------------------------------------------------------------------
  
  
  
  
  
  
  
  // ----------------------------------------------------------------------------
  //  START OF GAME FLOW
  // ----------------------------------------------------------------------------
  // init activity
  gameStartUp();
  
  // create object to hold all the question objects
  var gameQuestions = new QuestionPool(numberOfQuestions);
  // deprecated:
  // var gameQuestions = new QuestionPool(numberOfQuestions,availableQuestions,questionArray);
  
  // initialize the pool by loading the question objects to it from the global question
  // data array - i.e 
  gameQuestions.resetPool(inlineQuestionData);
  
  // unpackQuestions();
  
  // going to need a game object and a run function i think
  // game.run();
  
  function unpackQuestions() {
  // unpack and log the gameQuestions to see if it was loaded as intended
  // these are properties of the questionPool class object
  console.log("---------------------------------------");
  console.log("in unpacking of gameQuestions object...");
  console.log("number of questions: " + gameQuestions.numberOfQuestions);
  console.log("available questions: " + gameQuestions.availableQuestions);
  // next comes the property that is an array of question obects
  // so lets see what is in a question object - first some properties
  console.log("starting unpacking of gameQuestions's question object array...")
  console.log("...>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  gameQuestions.questionArray.forEach(element => {
    console.log("question element name: " + element.name);
    console.log("question element symbol:" + element.symbol);
    console.log("question: " + element.elementQuestion);
    // within a question object there is an array object property that holds the answer choices
    console.log("......>>>>>>>>>>>>>>>>>>>>>>>>>>")
    element.choices.forEach(element => {
      console.log("...answer choice: " + element);
    });
    // and finally the last properties of the question object
    console.log("index for correct answer: " + element.answerIndex);
    console.log("factoid: " + element.factoid);
  });
  }
  
  
  
  
  
  //  prototyping - clicking the start button
  //  will start the game - in this case lets just start
  //  the answer countdown timer
  $("#start-restart").on("click", function(event) {
    event.preventDefault();
    console.log("in start-restart.on.click");
    $(this).prop("disabled",false);
  
    $(".bg-danger").attr("style","width: 0%");
    $(".bg-success").attr("style","width: 0%");
    $("#inner-container").addClass("hide-container");
    $("#inner-container-2").removeClass("hide-container");
    gameStartUp();
    gameQuestions.resetPool(inlineQuestionData);
    // setsRemaining = 2;
    // questionsRemainingInSet = setSize;
    
    // get and reveil next qustion
    // not sure we should showQuestion here anymore - MRC fix
    showQuestion();
    // start the question countdown
    // startQuestionCountdown();
    // also will want to disable the start button during quiz 
    // do that here
  });
  
  
  
  //  prototyping - clicking the start button
  //  will start the game - in this case lets just start
  //  the answer countdown timer
  $("#next-set").on("click", function() {
    console.log("in next-set.on.click");
    $(this).prop("disabled",true);
    $(".bg-danger").attr("style","width: 0%");
    $(".bg-success").attr("style","width: 0%");
    $("#inner-container").addClass("hide-container");
    $("#inner-container-2").removeClass("hide-container");
    // get and reveil next qustion
    showQuestion();
    // start the question countdown
    // startQuestionCountdown();
    // also will want to disable the start button during quiz 
    // do that here
  });
  
  
  //  cancel the question timer
  //  start the intermission timer
  $(".list-group-item-light").on("click", function(e) {
    console.log("in list-group-item-light.on.click");
    console.log("CLICK: " + e.type);
    console.log("CLICK: " + e.which);
    console.log("CLICK: " + e.target);
    var button = $(event.target).closest('button');
    console.log("You clicked on: ", button);
    console.log("that was: ", button.innerText);
    console.log("value is:  ", $(this).val());
   
    // stop the question timer
    stopQuestionCountdown();
    // decrement questions remaining
    questionsRemainingInSet--;
    // show the answer - 2nd parameter is if timeOut occured, which it did not
    showAnswer(currentQuestionInPlay.isCorrect(+$(this).val()),false);
    startIntermissionCountdown();  // MRC-fix attempt
    // // start the intermission timer for transitioning between questions
    // if(questionsRemainingInSet > 0) {
    //   // startIntermissionCountdown();  // MRC-fix attempt
    // }
    // else {
    //   console.log("in global.questionIntervalCountdown - no more questions");
    //   console.log("run game end procedure to show results")
    //   console.log("this is where a restart procedure must go");
    //   resetGame();
    // }
  });
  
  
})
