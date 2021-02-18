# ID-Assignment-3

![GameMoo Logo](img/logo.png)

### GameMoo is a minigame website; a place for users to play games and to show the world their skills by creating an acconut and saving it in the leaderboards. GameMoo uses restdb.io for keeping track of account details, leaderboards and localstorage for the quiz leaderboard.

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

## Technologies used 

### This project uses

* ajax for account management / leaderboards
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
 
### Media
 
 * Images were gotten from undraw.co

### Acknowledgments
 
 * I (Vernon) received inspiration for this project from Brain Design
 
### Contribution
 
* Vernon 
  * front-end development (HTML files - mobile menu, modal pop up form) 
  * trivia quiz (localstorage leaderboard)

* Marcus
  * API development 
  * Account management, leaderboard database from restdb.io
  * Javascript for other games
