#Overview
This projects was completed for Udacity's Front End Nanodegree Program. The goal of the project was to complete the creation of a classic arcade game by adding to the javascript and images that were already provided. 


#Getting the game up and running

Download the code by selecting 'Clone in Desktop' or 'Download ZIP'.
If you downloaded the zip, simply open the frontend-nanodegree-arcade-game folder, right click on index.html, and open in the browser of your choice.

#The game
The game is set in a world made up of a grassy section, a stone section, and a water section. The enemies are bugs who patrol the stone section, dividing the grass from the water. The users character tries to safely cross the stone area without hitting the bugs, and reach the water. The round ends when the user hits into a bug. 

The goal of the game is to gain as many points as possible in one round. At the end of the round, the users score is compared to the high score, and if it exceeded the high score it becomes the new high score.

There is no end to the game. You can play for hours if you want, trying to beat your last high score.

#Rules of the game
The player must reach the water without hitting into a bug. If the player is successful they will gain one star. If they collide with a bug the player loses a star and the round ends. The player is then moved back to the beginning position and the players score is reset to zero.

A single point is gained by reaching the water, and points can also be gained by hitting into gems that appear on the stone area. The blue gems are worth 1 point and the orange gems are worth 2 points. If the player hits into a gem, the score is increased and the gem is moved to a new random location. The players position is not changed.

At the end of any round, if the players current score is higher than the high score, it replaces the high score, and the current score resets to zero. Otherwise the current score is thrown away.


#Game play instructions

To move the player use the arrow keys.
Left arrow: moves the player left
Right arrow: moves the player right
Up arrow: moves the player up
Down arrow: moves the player down
