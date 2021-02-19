# ID-Assignment-3

## Website Link
 **[GameMOO](https://verrgod.github.io/ID-Assignment-3/)**

![GameMoo Logo](img/Logo.png)

### GameMoo is a minigame website; a place for users to play games and to show the world their skills by setting highscores on minigames. Users can create an acconut and save their scores on the leaderboards. GameMoo uses restdb.io for keeping track of account details, leaderboards and localstorage for the quiz leaderboard.

## Design Process

### This website was tailored to users of all walks of life, particularly those who love to play games / are competitive in nature and having a main goal of allowing users to be competitive to be placed in the leaderboards. 

* As a player, I want to create an account to save my scores.
* As a player, I want to play games on my account and have them saved on the leaderboards.
* As a player, I want to compare my scores with other players and gain confidence knowing that I am better than other players. (Players are competitive)

## Features

### Existing features

* Mobile hamburger menu - allow users to explore the page on mobile devices
* Account management - allow users to create an account and login to their account with proper validation
* Leaderboards - allow users to save their scores when they are logged in to their account

### Possible features / features left to implement

* Achievements - similar to Kongregate; users can play games to earn achievements and level up their account to unlock rewards
* Full mobile responsiveness - allow users to fully play on the website on mobile devices (currently not)

## Games Included 

### TicTacToe
* Tic-tac-toe, noughts and crosses, or Xs and Os/“X’y O’sies”, is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a diagonal, horizontal, or vertical row is the winner ("Tic-tac-toe", n.d.)
  * Source of code **[https://github.com/BornaSepic/Tic-Tac-Toe](https://github.com/BornaSepic/Tic-Tac-Toe)**

### Circle Click Game
* Circle Click, a game where user click on different sizes circle with different score according to the size of the circle, within 30 seconds. Eg. the smaller the circle, the higher the score
  * Source of code **[https://github.com/robwhitaker/Circle-Game](https://github.com/robwhitaker/Circle-Game)**

### Dino Game
* Dino Game, also known as T-Rex Game and Dino Runner, a replica of the in-built browser game in google chrome. It is being played by pressing the space bar for the dino to jump over the obstacles.
  * Source of code **[https://www.youtube.com/watch?v=i7nIutSLvdU](https://www.youtube.com/watch?v=i7nIutSLvdU)**
  
### Dino Game
* Breakout, an arcade game where player knocks down as many bricks as possible with the ball by using the paddle and wall. If the player's paddle misses the ball's rebound, they will lose a live. ("Breakout (video game)", n.d.)
  * Source of code **[https://github.com/flowforfrank/breakout](https://github.com/flowforfrank/breakout)**
  
### Flappy Bird
* Flappy Bird is an arcade-style game in which the player controls the bird, which moves persistently to the right. The player is tasked with navigating it through pairs of pipes that have equally sized gaps placed at random heights. Faby automatically descends and only ascends when the player press the Fly button.Colliding with a pipe ends the gameplay. ("Flappy Bird", n.d.)
  * Source of code **[https://www.w3schools.com/graphics/tryit.asp?filename=trygame_default_gravity](https://www.w3schools.com/graphics/tryit.asp?filename=trygame_default_gravity)**

### Quiz
* A simple and short 4 question game to test the player's knowledge on video games.
  * Source of code **[https://www.youtube.com/watch?v=f4fB9Xg2JEY&t=2587s](https://www.youtube.com/watch?v=f4fB9Xg2JEY&t=2587s)**

## Technologies used 

### This project uses

* Restdb.io for account management / leaderboards
* localstorage for quiz leaderboard

## Testing

* Moblie hamburger menu
  * Resize the page to mobile device resolution
  * Try to click on the hamburger dropdown
  * Check for an animation of the dropdown line on the top-right
  * Try to close the menu
  * Check for an animation of the dropdown line on the top-right
  * Try to click on every button and see that the buttons work correctly

* Register / login
  * Click on the login button in the header
  * Try to click on the sign up button with blank fields and check that an alert pops up
  * Fill in username and not matching passwords and verify that an alert should pop up telling the user that passwords do not match
  * Fill in every field and verify that an account has been created
  * Try to login with details filled in from the signup form and verify that if the username / password does not exist, an error pops up accordingly.

* Leaderboards
  * Login to account and go to the games page
  * Play any games in the page 
  * Verify that after a score is made, the leaderboard should update with your account's name with the correct score.
  * Verify that the scores are sorted from largest to smallest from top-down
 
* Trivia quiz
  * Click on the quiz game in the games page
  * Play the game and verify that the progress bar fills in properly 
  * Also check that an animation pops up when the answer is wrong / correct; red for wrong, green for correct
  * Verify that once the name is submitted, the score pops up in the leaderboard when the leaderboard button is clicked
  * Try playing again with a lower score and verify that the score in the leaderboard is shown lower down, scores are sorted from largest to smallest
 (This quiz does not link to the main pages account since this is a small game that has only a fixed number of questions)
 
## Credits 

### Source of code
* **[https://github.com/BornaSepic/Tic-Tac-Toe](https://github.com/BornaSepic/Tic-Tac-Toe)**
* **[https://github.com/robwhitaker/Circle-Game](https://github.com/robwhitaker/Circle-Game)**
* **[https://www.youtube.com/watch?v=i7nIutSLvdU](https://www.youtube.com/watch?v=i7nIutSLvdU)**
* **[https://github.com/flowforfrank/breakout](https://github.com/flowforfrank/breakout)**
* **[https://www.w3schools.com/graphics/tryit.asp?filename=trygame_default_gravity](https://www.w3schools.com/graphics/tryit.asp?filename=trygame_default_gravity)**
* **[https://www.youtube.com/watch?v=f4fB9Xg2JEY&t=2587s](https://www.youtube.com/watch?v=f4fB9Xg2JEY&t=2587s)**
 
### Media
 * Images were gotten from undraw.co
 * Images were gotten from Google image

### Acknowledgments
 * I (Vernon) received inspiration for this project from Brian Design
 * I (Marcus) received inspiration for this project from **[Y8 Games](https://www.y8.com/)**
 
### Contribution
 
* Vernon 
  * front-end development (HTML files - mobile menu, modal pop up form) 
  * trivia quiz (localstorage leaderboard)

* Marcus
  * API development 
  * Account management, leaderboard database from restdb.io
  * Javascript for mini games (TicTacToe, Circle Click, Dino Game, Breakout, Flappy Bird)
