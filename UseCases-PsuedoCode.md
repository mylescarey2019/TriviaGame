# Trivia

Trivia Game - Periodic Table of Elements

## Description

User answers e choice questions by clicking on list item while countdown timer
provides up to 15 seconds to answer.  Correct answer, incorrect answer and time expired
show different results content.  After completing all 15 questions chance to play again.
Planning on pool of 15 questions which will not repeat until three sets of 5 played.
Start button to begin game and next 5 to continue with restart after 3 sets exhausted.

![preliminary wireframe drawing](assets/images/wireframe0.png)

## Requirement Note

Intend to leverage Bootstrap due to need for more practice and desire to make responsive.
Intend to make use of some javascript Classes.


## User Stories / Use Cases

0.  This was the intended Use Case and program flow - final result was close to this
    although some differences to evolve during development.  See javascript code header
    for more details.

1.  game starts in browser 
    1. page has header bar with title on left start and next set buttons on right
    2. over backround image is centered content box with title bar, timer and main box for text and game questions
    3. the box will have welcome title and instruction for game
    4. progress bar below the main box
    5. start button is enabled, next set button is disabled

2.  user clicks start button 
    1. timer starts coundown from 15 seconds
    2. content changes to question in the title bar and 4 clickable answers in the content box 
    3. mousing over an answer draws attention to it 
    4. disable start button

3.  User interacts with question content or timer runs out
    1. if timer runs out or if user clicks answer - page changes into answer result mode
        1.  Timer stops (if not already stopped)
        2.  content title shows the question & answer in some manner
        3.  content box shows graphic or image 
        4.  message display:  
            1. correct
            2. incorrect
            3. time expired 
            4. these are logged as counts for displaying later 
            5. progress bar updated to reflect correct or incorrect(+expired)
            5. page pauses for 3 seconds then proceed with program flow

4. Check made to see if question in set remain
    1. if more questions then load new question/choices and reset/restart timer
    2. if no more questions in the set 
        1. check to see if this was the last set 
            1. if not then show set results
                1. change content title bar to Set Score
                2. change box content to # correct, incorrect, time-expired
                3. enable next set button
        2. if that was the last set then show final
            1. change content title to Overall Score
            2. change box content to overall # correct, incorrect, time-expired
            3. instruction to use start button if desire to play again
            4. disable next set button
            5. enable start button

5. User presses Next Set button
    1. load new set of questions, reset counts for the set
    2. disable next set button
    3. load new question/choices and reset/restart timer

6. User presses Start button
    1. reset all counts and load first set
    2. disable start button and disable next set button
    3. load new question/choices and reset/restart timer

### Psuedo Code - notes

1. Global variables
    1. 
2. Objects:
    1. Game
        1. Game state
            1. begin, question, answer result (correct, incorrect, time expired),
               end of set, end of all sets
        2. set count for correct, incorrect, time expired
        3. overal count for correct, incorrect, time expired
        4. number of questions remaining in set
        5. number of sets remaining
        6. Method to check answer
        7. Method to get random question from question pool (no repeating within the 3 sets of 10)
        8. Method for game start/restart (see if this can be single method used in either situation)
    2. Question
        1. question pool -structure or array of objects (need to try and get beyond using correlated arrays)
            1. index 
            2. question
            3. choices for question
            4. answer for question
            5. graphics or image for answer
            6. parallel array that acts as index into question pool and is depleted as a question has been used
                1. gets reset on game restart
        2. Method to return random question from question pool (no repeating within the 3 sets of 10)
            1. needs to mark or otherwise make used so no repeats
        3. Method reset the question pool for Play Again
    3. User Interface
        1. Method for managing the header bar   
            1. enable, disable button
        2. Method for managing the content title and content box
        3. Method(s) for managing progress bar
            1. reset bar
            2. update bar with correct and incorrect stats
        4. Method(s) for handling the question timer
        5. Method(s) for handling the in-between question pause

3. Event listeners
    1. click event for header start button
        1. re-initialize game and starts it
    2. click event for the next set button
        2. resets for new set of questions, starts play
    2. click event for the unordered choice list
        1. list of 4 choices in context box will be unordered list
        2. clickable class 
        3. need get what choice was clicked so it can be compared to the question's answer