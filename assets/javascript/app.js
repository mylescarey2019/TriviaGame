// --------------------------------------------------------
// javascript Periodic Table of Elements Quiz game
// ---------------------------------------------------------
// Summary:
// This is a knowledge quiz game more than a trivia game.
// The theme is the Periodic Table of Elements.  The player
// answers a series of 5 question given 15 seconds per question.
// After completing the quiz stats are shown for counts of correct, incorrect
// and time-expired answers.  There is also a progress bar that
// is updated during the quiz.
// Player then has opportunity to play the next set of 5 questions.
// After all question/quizes are played the player can start over from the beginning.
// The player will see stats for their grand totals and the status bar
// will show percentages relative the grand totals.
// ---------------------------------------------------------

// ---------------------------------------------------------
// Methodology:
// ---------------------------------------------------------
// Logic layer:  javascript object/methods, button click events
//   game "state" variable to control the "story board" flow.
//   JQuery for DOM manipulation.
//   Used classes for questions and pool of questions.
//    
// Web-Page:  nesponsive layout leveraging bootstrap.
//    JQuery for dynamic activty of onpage objects and styles.
// 
// The "state" logic guides the experience and page activity
// as the player progresses thru each quiz 
// 
// State flow allows for game reset after completion
// Start/Restart and Next Quiz buttons are disable/enabled
// relative to the game state

// ---------------------------------------------------------
// Refactor Needs:
// ---------------------------------------------------------
// goals of this project were:
// 1.  get more experience with bootstrap and have a repsonsive design
// 2.  explore use of classes
// 3.  learn use of Timers
// 
// these goals were achieved.  classes were used to define
// Question and QuestionPool
// however, learning curve of new material, Timers, prevented
// completion of using more class and/or object on other parts
// of the design, instead global functions were leveraged
// So refactoring should include:
// 1. refactor to use class/objects for the timers
// 2. refactor to use class/objects for the game flow logic
// 3. refactor to have an object/methods for support to the page element updates
// 4. general code cleanup and reorganization 
// 5. update user stories/use cases to match final design

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
// 
// use speciality classes - for instance:
// there could be a class for base question and then 
// classes for question specialization such as questions
// that have answers in different forms - factoid, gif, image

// ---------------------------------------------------------
// User Stories / Use Cases
// ---------------------------------------------------------
// 1.  game starts in browser 
//     1. page has header bar with title on left start and next set buttons on right
//     2. over backround image is centered content box with title bar, timer and main box for text and game questions
//     3. the box will have welcome title and instruction for game
//     4. progress bar below the main box
//     5. start button is enabled, next quiz button is disabled

// 2.  user clicks start button 
//     1. timer starts coundown from 20 seconds
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
//     1. Game  (not created - do in refactoring)
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
//     2a. Question
//             1. question symobology
//             2. question
//             3. choices for question
//             4. answer for question
//             5. graphics or image for answer
//     2b.QuestionPool
//         1. question pool 
//             1. array of Question objects 
//             6. parallel array that acts as index into question pool and is depleted as a question has been used
//                 1. gets reset on game restart
//         2. Method to return random question from question pool (no repeating within the 3 sets of 10)
//             1. needs to mark or otherwise make used so no repeats
//         3. Method reset the question pool for Play Again
//     3. User Interface (not created - do in refactoring)
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
  // var questionArray = [];
  var setSize = 5;
  
  var setsRemaining = numberOfQuestions / setSize;
  var numberOfSetsConstant = numberOfQuestions / setSize;
  var questionsRemainingInSet = setSize;

  // global game variables
  var questionTimeConstant = 15;
  var intermissionTimeConstant = 5;
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
  var instructionText = "There are " + setSize + " questions per quiz and there are " + numberOfSetsConstant +
                         " quizzes." + "<br>" + "You have 15 seconds per question" + 
                        "<br>" + "Press Start when ready.  You can Restart after you have finished all quizzes in total." 
  
  

  // ----------------------------------------------------------------------------
  // Timers and global helper functions
  // ----------------------------------------------------------------------------

  // start the question countdown timer
  function startQuestionCountdown() {
    console.log("in global.startQuestionCountdown");
    questionTime = questionTimeConstant;
    // update timer on page
    $("#timer").text(displayableTime(questionTime));
      questionIntervalId = setInterval(questionIntervalCountdown, 1000);
  }
  
  // stop the question countdown timer
  function stopQuestionCountdown() {
    console.log("in global.stopQuestionCountdown");
    clearInterval(questionIntervalId);
  }
  
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
      startIntermissionCountdown();  
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
    // reset color
    $("#timer").css("color","#818182");
      intermissionTime = intermissionTimeConstant;
      intermissionIntervalId = setInterval(intermissionIntervalCountdown, 1000);
  }
  
  // stop the intermission countdown timer
  function stopIntermissionCountdown() {
    console.log("in global.stopIntermissionCountdown");
    clearInterval(intermissionIntervalId);
    // intermissionIntervalRunning = false;
    if (questionsRemainingInSet > 0) { 
      showQuestion();
    } else {
      resetGame();
    };
  }
  
  // decrement the question countdown timer
  function intermissionIntervalCountdown() {
    console.log("intermission timer decrement: " + intermissionTime);
    // decrement time by 1
    intermissionTime--;
    //  time expired
    if (intermissionTime === 0) {
      $("#timer").css("color","#818182");  
      stopIntermissionCountdown() 
    }
  } 
  
  
  // this will belong in the question class or game object
  // for now just trying to learn how to create the flow
  function showQuestion() {
    console.log("in global.showQuestion");
    // get the next question object
    currentQuestionInPlay = gameQuestions.getQuestion();
   
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
    console.log("sets remaining: " ,setsRemaining);
    var resultMsg;
    if (timeExpired) {
      resultMsg = "Time expired." + "<br>" + "The answer is " +
      currentQuestionInPlay.symbol  + "<br>" +
      currentQuestionInPlay.factoid; 
      timeOutAnswersSet++;

      updateProgressBar("quiz");
    }
    else if (result) {
      resultMsg = "You are correct" + "<br>" + "The answer is " +
      currentQuestionInPlay.symbol  + "<br>" +
      currentQuestionInPlay.factoid; 
      correctAnswersSet++;

      updateProgressBar("quiz");
    }
      else {
       
        resultMsg = "Sorry" + "<br>" + "The correct answer is " +
        currentQuestionInPlay.symbol  + "<br>" +
        currentQuestionInPlay.factoid; 
        incorrectAnswersSet++;
        updateProgressBar("quiz");
      }; 
     
      console.log("result string is: ", resultMsg); 
  
      // display the result message
      $("#inner-container-2").html(resultMsg);   
  
      // this will hide the button group and show the answer paragraph
      $("#inner-container").addClass("hide-container");
      $("#inner-container-2").removeClass("hide-container"); 
  }
  

  // update the progress bar
  function updateProgressBar(type){
    console.log("in global.updateProgressBar");
    // update the bar for the quiz
    if (type === "quiz") {
      var progBarCorrect = (correctAnswersSet / setSize).toFixed(2);
      var progBarIncorrect = ((incorrectAnswersSet + timeOutAnswersSet) / setSize).toFixed(2);

      // update Correct bar
      var progBarStyle = "width: " + progBarCorrect * 100 + "%";
      var progBarLabel = (progBarCorrect * 100).toFixed(0).toString() + "%";
      $(".bg-success").attr("style",progBarStyle);
      if (correctAnswersSet === 0) { 
        console.log("0 CORRECT");
        $(".bg-success").text('');
      } 
      else {
        $(".bg-success").text(progBarLabel);
      };

      // update Incorrect bar
      var progBarStyle = "width: " + progBarIncorrect * 100 + "%";
      var progBarLabel = (progBarIncorrect * 100).toFixed(0).toString() + "%";
      $(".bg-danger").attr("style",progBarStyle);
      if ((incorrectAnswersSet + timeOutAnswersSet) === 0) { 
        console.log("0 IN-CORRECT");
        $(".bg-danger").text('');
      } 
      else {
        $(".bg-danger").text(progBarLabel);
      };
    }
    // update the bar for grand total
    else if (type = "grandtotal") {
      var overallProgBarCorrect = (correctAnswersOverall / numberOfQuestions).toFixed(2);
      var overallProgBarIncorrect = ((incorrectAnswersOverall + timeOutAnswersOverall) / numberOfQuestions).toFixed(2);

      console.log(">>>>> " , overallProgBarCorrect, overallProgBarIncorrect);
      console.log(">>>>> ", (overallProgBarCorrect * 100).toFixed(0).toString()
                          , (overallProgBarIncorrect * 100).toFixed(0).toString());

      var progBarStyle = "width: " + overallProgBarCorrect * 100 + "%";
      var progBarLabel = (overallProgBarCorrect * 100).toFixed(0).toString() + "%";
      $(".bg-success").attr("style",progBarStyle);
      $(".bg-success").text(progBarLabel);
      var progBarStyle = "width: " + overallProgBarIncorrect * 100 + "%";
      var progBarLabel = (overallProgBarIncorrect * 100).toFixed(0).toString() + "%";
      $(".bg-danger").attr("style",progBarStyle);
      $(".bg-danger").text(progBarLabel);
    };
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
  
    // decrement quizes remaining on total game
    setsRemaining--;

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


      // Recalcuate progress bar for the overall score
      updateProgressBar("grandtotal");

      $("#inner-container-2").html(bothMsg);  
      $("#start-restart").text("Restart");
      // reset overall scores
      correctAnswersOverall = 0;
      incorrectAnswersOverall = 0;
      timeOutAnswersOverall = 0;
    };
  
    correctAnswersSet = 0;
    incorrectAnswersSet = 0;
    timeOutAnswersSet = 0;
  
  }
  
  // diagnostic output to console
  function diagnosticDump() {
    console.log("------------------------")
    console.log("in global.diagnosticDump"); 
    console.log("questions in remaining in pool: ", gameQuestions.availableQuestions.length)
    console.log("------------------------")
  }
  
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
                   "factoid": "Oxygen(O-8) H2O is water: two Hydrogen atoms and 1 Oxygen atom"},
                   {"name": "Plutonium", "symbol": "Pu", "elementQuestion": "Named after planet that has since been demoted to dwarf status","choices":["Pu-92","Kr-36","Xe-54","Ir-77"],"answerIndex":0,
                   "factoid": "Plutonium(Pu-94) was named for outer planet Pluto following namings of Uranium and Neptunium"},
                   {"name": "Neon", "symbol": "Ne", "elementQuestion": "Downtown (song) ...Linger on the sidewalks where the **** signs are pretty","choices":["Ti-22","F-9","Ne-10","Zr-40"],"answerIndex":2,
                   "factoid": "Neon(Ne-10) is used to make neon signs "},
                   {"name": "Carbon", "symbol": "C", "elementQuestion": "The elemental form of this includes one of the hardest substances and one of the softest ","choices":["Na-11","Sn-50","Rn-86","C-6"],"answerIndex":3,
                   "factoid": "Carbon(C-6) elemental allotropic forms include diamond (hard) and graphite (soft)"},
  
                   {"name": "Gold", "symbol": "Au", "elementQuestion": "Latin name means 'glow of sunrise'","choices":["Po-84","Au-79","Pd-46","Ir-77"],"answerIndex":1,
                   "factoid": "Gold(Au-79) from the latin name aurum"},
                   {"name": "Uranium", "symbol": "U", "elementQuestion": "3-Mile is not a rapper from Pennsylvania","choices":["Ni-28","N-7","Am-95","U-92"],"answerIndex":3,
                   "factoid": "Uranium(U-92) isotope U-235 is used in nuclear reactors like 3-Mile Island"},
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
  // - try to refactored using deconstruction 
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
      // array of available qustion index numbers
      this.availableQuestions = [];
      // array of question objects
      this.questionArray = [];

      // intended to be a correlation index into array of question objects using indexOf()
      // this would be to randomly select the next question
      // array of available qustion index numbers
      this.availableQuestions = [];
      // array of question objects
      this.questionArray = [];
    }
   
    // this location below cause ES6 issue on Safari and Firefox - private properties 
    // research further - fixed when moving them up into the constructor
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
  
  
  // development code - used in early stage proof of concept work:
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
  //  START OF GAME FLOW
  // ----------------------------------------------------------------------------
  // init activity
  gameStartUp();
  
  // create object to hold all the question objects
  var gameQuestions = new QuestionPool(numberOfQuestions);
  
  // initialize the pool by loading the question objects to it from the global question
  // data array - i.e 
  gameQuestions.resetPool(inlineQuestionData);
  
  // diagnostic unpacking of the questions
  // unpackQuestions();
  
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
  
  
  
  // ----------------------------------------------------------------------------
  // Events and timers
  // ----------------------------------------------------------------------------
  
  
//  start - restart button event
  $("#start-restart").on("click", function(event) {
    event.preventDefault();
    console.log("in start-restart.on.click");
    // so the button read Start after a restart
    // a true reset as if browser refreshed
    $("start-restart").text("Start");
    $(this).prop("disabled",true);

    $(".bg-danger").attr("style","width: 0%");
    $(".bg-success").attr("style","width: 0%");
    $("#inner-container").addClass("hide-container");
    $("#inner-container-2").removeClass("hide-container");
    gameStartUp();
    gameQuestions.resetPool(inlineQuestionData);
    showQuestion();
  });
  
  
  
  //  next quiz button event
  $("#next-set").on("click", function() {
    console.log("in next-set.on.click");
    $(this).prop("disabled",true);
    $(".bg-danger").attr("style","width: 0%");
    $(".bg-success").attr("style","width: 0%");
    $(".bg-danger").text('');
    $(".bg-success").text('');

    $("#inner-container").addClass("hide-container");
    $("#inner-container-2").removeClass("hide-container");
    // get and reveil next qustion
    showQuestion();
  });
  
  // answer button event
  //  cancel the question timer &  start the intermission timer
  $(".list-group-item-light").on("click", function(e) {
    console.log("in list-group-item-light.on.click");
    // console.log("CLICK: " + e.type);
    // console.log("CLICK: " + e.which);
    // console.log("CLICK: " + e.target);
    var button = $(event.target).closest('button');
    // console.log("You clicked on: ", button);
    // console.log("that was: ", button.innerText);
    // console.log("value is:  ", $(this).val());
   
    // stop the question timer
    stopQuestionCountdown();
    // decrement questions remaining
    questionsRemainingInSet--;
    // show the answer - 2nd parameter is if timeOut occured, which it did not
    showAnswer(currentQuestionInPlay.isCorrect(+$(this).val()),false);
    startIntermissionCountdown(); 
  });
  
// closes the document.ready
}) 
