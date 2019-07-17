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

// ---------------------------------------------------------
// Global Functions:
// ---------------------------------------------------------

 
// ---------------------------------------------------------
// Objects, Classes & Methhods:
// ---------------------------------------------------------

var qElement =  [{"name": "hydrogen", "symbol": "H", "elementQuestion": "Was unfortunate for Hindenburg Zeppelin"},
                 {"name": "helium", "symbol": "He", "elementQuestion": "Would have been better choice to use in Hindenburg Zeppelin"},  
                 {"name": "Lithium", "symbol": "Li", "elementQuestion": "Don't leave your phone without it"}, 
                ];

console.log(">>> " + qElement[0]["name"]);

qElement.forEach(element => {
  console.log("name: " + element["name"]);
  console.log("symbol: " + element["symbol"]);
  console.log("hint-question: " + element["elementQuestion"]);
  console.log("==============");
  
});

// ----------------------------------------------------------
// constructor function: class for Questions
// ----------------------------------------------------------
function Question(elementArray) {
  console.log("in constructor.Question");
  this.name = elementArray["name"];
  this.symbol = elementArray["symbol"];
  this.hint = elementArray["elementQuestion"];
  // other properties to add:
  //   4 answer choices (use array)
  //   index for correct answer
  //   answer facts or trivia

  // methods go below
};

// intent is loop thru qElement array data and call Question constructor
// to create a question object for each array row
// push the created question object into a question array
// finally, call a constructor for QuestionPool to create a questionPool object
// this array of objects will be part of waht is feed to that constructor

// ----------------------------------------------------------
// constructor function: class for QuestionPool
// ----------------------------------------------------------
// function QuestionPool(elementArray) {
//   console.log("in constructor.Question");
//   this.name = elementArray["name"];
//   this.symbol = elementArray["symbol"];
//   this.hint = elementArray["elementQuestion"];
//   // other properties to add:
//   //   4 answer choices (use array)
//   //   index for correct answer
//   //   answer facts or trivia

//   // methods go below
// };



var questionPool = {
  numberOfQuestions: 3,
  // intended to be a correlation index into array of question objects using indexOf()
  // this would be to randomly select the next question
  availableQuestions: ['H','He','Li'],
  // array of question objects
  questionArray: [],

  // methods:
  // getQuestion: function() {
    // randomly select from availableQuestions
    // remove element from availableQuestions - it is going to be consumed
    // index into the questionArray and return the correleted question object
  // }

};


// var candidate = {
// //         1. Candidate arrays (5, element array)
// //             1. Name
// //             2. Base attack, current attack, health,      
// //             3. defense
// //             4. isMovable
//   candidateName: ['biden','harris','delaney','williamson','sanders','booker','inslee','gabbard','trump'],
//   candidateIsMovable: [true,true,true,true,true,true,true,true,false],
//   candidateBaseOffense: [0,0,0,0,0,0,0,0,0],
//   candidateBaseDefense: [0,0,0,0,0,0,0,0,0],
//   candidateCurrentOffense: [0,0,0,0,0,0,0,0,0],
//   candidateHealth: [0,0,0,0,0,0,0,0,0],
//   // helper arrays for randomization and reset of candidate attributes
//   typeOfProfile: [],
//   profileType: [],
//   profileHealth: [],
//   profileAttack: [],
//   profileDefense: [],
//   electionHealthResetFactor: 0,
//   electionOffenseResetFactor: 0,
//   attackMin: 0,
//   attackMax: 0,
//   defenseMin: 0,
//   defenseMax: 0,
//   lowFactorAdjustUp: 0,
//   highFactorAdjustDown: 0,
//   lowFactorAdjustDown: 0,

//   // this is the profile Type array
//   buildProfileArray: function() {
//     this.typeOfProfile = ['a','a-','b','b-','c','c-','d','d-'];
//     console.log("type of profiles: " + this.typeOfProfile);

//     for ( i = 0; i < 8; i++) {
//         var profile = this.typeOfProfile[Math.floor(Math.random() * this.typeOfProfile.length)];
//         this.typeOfProfile.splice(this.typeOfProfile.indexOf(profile),1);
//         this.profileType[i] = profile;
//       }  
//     },

// };

// ----------------------------------------------------------------------------
//  START OF GAME FLOW
// ----------------------------------------------------------------------------

// refactoring attempt to only have one master Game() function
// game.startGame();
// game.resetGame();


// // click event for candidate badges
// $(".candidate").on("click", function() {
//   console.log("in on.click .candidate")
//   // get Id attr of the badge
//   var badgeId = $(this).attr("id");
//   // console.log("The attr id of the badge is " + badgeId);

//   if (candidate.candidateIsMovable[candidate.candidateName.indexOf(badgeId)]) {
//     switch (game.currentGameState) {
//       case "pick-candidate": {
//         $("#contenders-top").css("visibility","visible");
//         $("#contenders").css("visibility","visible");
//         userInterface.moveCandidateToFrontRunnerBox(badgeId);
//         userInterface.moveCandidatesToContendersBox();
//         game.currentGameState = 'pick-opponent';
//         // userInterface.diagnosticDump();
//         break;
//       }
//       case "pick-opponent": {
//         userInterface.moveContenderToChallengerBox(badgeId);
//         game.currentGameState = 'campaign';
//         // userInterface.diagnosticDump();
//         break;
//       }      
//       default:
//         break;
//     };
//   };
// });

// // click event for action button
// $("#duel").on("click", function() {
//   console.log("in on.click .duel");
//   // userInterface.diagnosticDump();
//   switch (game.currentGameState) {
//     case "campaign": {
//       game.executeTurn();
//       break;
//     }
//     case "campaign-won": {
//       game.preElection();
//       game.currentGameState = 'pre-election-night';
//       break;
//     }       
//     case "pre-election-night": {
//       game.startElection();
//       game.currentGameState = 'campaign' //'election-night';
//       break;
//     } 
//     // need to change this so it flows thru executeTurn
//     // will need a boolean so we know it is the election
//     // round and will need to refresh the nominee to they
//     // they can win or lose - probably take existing health * 3
//     // and reset their attack rating
//     // will also have to populate Trumps stats and 
//     // push it into a ninth position on the candidate arrays
//     // so that existing logic for managing the battle round 
//     // can be used almost as-is
//     // 
//     // case "election-night": {
//     //   // game.executeElectionTurn();
//     //   game.currentGameState = 'campaign';
//     //   break;
//     // } 
//     case "restart": {
//       game.resetGame();
//       // depracated:
//       // game.startGame();
//       break;
//     } 
//     default:
//       break;
//   };
// });

