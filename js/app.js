//This code allows the star to appear in the bottom left-hand corner.
//The Star construcor function
var Star = function (x, y) {
  //Inserts the star image
  this.sprite = 'images/Star.png';
  //Allows for x and y coordinates of star on canvas
  this.x = x;
  this.y = y;
};

//Allows the eventual star object to be rendered
Star.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This code allows the gems to appear randomly somewhere on the stone blocks
//Superclass ExtraPoints constructor function
var ExtraPoints = function () {
  //Sets the x and y coordinates of the gems randomly
  this.x = (600*Math.random());
  this.y = (165*Math.random())+50;
};

//Prevents the two gems from appearing in the same place at once
ExtraPoints.prototype.update = function () {
  //Checks to see if the two gems are overlapping
  if (gem1.x <  gem2.x + 75 &&
    gem1.x + 75 >  gem2.x &&
    gem1.y <  gem2.y + 100 &&
    100 +  gem1.y >  gem2.y) {
      //If they are overlapping, a new location is chosen for the second gem until they are no longer overlapping
      gem2.x = (600*Math.random());
      gem2.y = (165*Math.random())+50;
  }
};

//The first subclass constructor called BlueGem
//Creates the blue gem which is worth 1 point
var BlueGem = function () {
  ExtraPoints.call(this);
  //Incorporates the image
  this.sprite = 'images/GemBlue.png';
  //Stores its point value
  this.points = 1;
};

BlueGem.prototype = Object.create(ExtraPoints.prototype);

BlueGem.prototype.constructor = BlueGem;

//Renders the blue gem onto the canvas
BlueGem.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//The second subclass constructor called OrangeGem
//Creates the orange gem which is worth 2 points
var OrangeGem = function () {
  ExtraPoints.call(this);
  //Incorporates the image
  this.sprite = 'images/GemOrange.png';
  //Stores its point value
  this.points = 2;
};

OrangeGem.prototype = Object.create(ExtraPoints.prototype);

OrangeGem.prototype.constructor = OrangeGem;

//Renders the orange gem onto the canvas
OrangeGem.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This code creates the enemies our player must avoid
//They move along the screen horizontally and any collision with them ends the round and causes the player to move back to the beginning
//The Enemy superclass constructor. The subclasses are divided between enemies that move to the right or to the left
var Enemy = function (x, y) {
  //Inserts the enemy image
  this.sprite = 'images/enemy-bug.png';
  //Sets the x and y variables for the enemy initial location
  this.x = x;
  this.y = y;
};

//Renders the enemy onto the canvas
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Now I am creating two subclass constructors, one for enemies that move
//forward (to the right), and one for a single enemy that moves in reverse (to the left)
//The ForwardEnemies the sublclass constructor
var ForwardEnemies = function () {
  Enemy.call(this);
};

ForwardEnemies.prototype = Object.create(Enemy.prototype);

ForwardEnemies.prototype.constructor = ForwardEnemies;

//This code allows the enemies to move
ForwardEnemies.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x < 705) {
    //This sets the speed of movement up until the enemy reaches the end of the canvas by incrementing the x value
    this.x += (this.speed * dt);
  }
    //If the enemy has reached the end of the canvas (705 pixels) it resets to
    //the x location of 0 and generates a new random speed
    else {
      //New x location
      this.x = 0;
      //New random speed
      this.speed = (250 * Math.random()) + 100;
    }
};



//The ReverseEnemies subclass constructor
var ReverseEnemies = function () {
  Enemy.call(this);
};

ReverseEnemies.prototype = Object.create(Enemy.prototype);

ReverseEnemies.prototype.constructor = ReverseEnemies;

//This code allows the enemies to move
ReverseEnemies.prototype.update = function (dt) {
  if (this.x > 5) {
    //This sets the speed of movement up until the enemy reaches the beginning of the canvas by decrementing the x value
    this.x -= (this.speed * dt);
  }
  //If the enemy has reached the beginning of the canvas (<5 pixels) it resets to
  //the x location of 700 and generates a new random speed
    else {
      this.x = 700;
      this.speed = (250 * Math.random()) + 100;
    }
};



//This code allows for the creation of the player Object
//The playes goal is to reach the water without colliding with any bugs and
//can also gain points by touching gems
//The Player constructor function
var Player = function (x, y) {
  // Inserts the player image
  this.sprite = 'images/char-princess-girl.png';
  //Sets the Player initial location using x and y variables
  this.x = x;
  this.y = y;
  //Holds the players current score
  this.score = 0;
};

//this variable holds the high score
var highScore = 0;

//This code checks for whether the player has reached the water and if the player did
//then the players position is restarted and a point is gained
Player.prototype.update = function () {
  //if the player reaches the water
  if (this.y <0.5) {
    //Reset the x and y variables
    this.y = 475;
    this.x = 300;
    //Add one point to the players score
    this.score +=1;
  }
};

//This code checks for collisions between the player and the forward moving enemy bugs
//If a collision is detected the round ends and the players position is restarted
//and the score is checked against the high score.
//If its higher than the high score, the current score becomes the high score
Player.prototype.checkCollisions = function () {
  //Checks all 3 forward moving bug locations to see if the player collided with any of them
  for (var i=0; i<3; i++) {
    if (this.x < allEnemies[i].x + 50 &&
    this.x + 50 > allEnemies[i].x &&
    this.y < allEnemies[i].y + 75 &&
    75 + this.y > allEnemies[i].y) {
      //If the player did, reset their position
      this.y = 475;
      this.x = 300;
      //Compare the current score to the high score
      //If the current score is higher, the high score value is updated
      if (this.score > highScore) {
        highScore = this.score;
        this.score = 0;
      }
      //otherwide the current score is simply reset to 0
      else {
        this.score = 0;
      } //do I need semicolons here?
    }
  };
};

//This code checks for collisions between the player and the reverse moving enemy bug
Player.prototype.checkReverseCollisions = function () {
  //Checks the reverse moving bug location to see if the player collided with it
    if (this.x < reverseEnemies.x + 50 &&
    this.x + 50 > reverseEnemies.x &&
    this.y < reverseEnemies.y + 75 &&
    75 + this.y > reverseEnemies.y) {
      //If the player did, reset their position
      this.y = 475;
      this.x = 300;
      //Compare the current score to the high score
      //If the current score is higher, the high score value is updated
      if (this.score > highScore) {
        highScore = this.score;
        this.score = 0;
      }
      //otherwide the current score is simply reset to 0
      else {
        this.score = 0;
      } //do I need semicolons here?
    }
};

//this code checks for collisions between the player and the blue gem.
//If a collision is detected, the player gains one point and the gem position is reset to a new random position.
//The player position is not reset.
Player.prototype.checkBlueCollision = function () {
  //Compares player position to gem position
  if (this.x < gem1.x + 50 &&
    this.x + 50 > gem1.x &&
    this.y < gem1.y + 75 &&
    75 + this.y > gem1.y) {
      //If a collision happened, the gem1 x and y variables are rest
      gem1.x = (410*Math.random());
      gem1.y = (165*Math.random())+50;
      //The point gained is added to the players current score
      this.score += gem1.points;
  }
};

   //this code checks for collisions between the player and the orange gem
   //If a collision is detected, the player gains two points and the gem position is reset to a new random position
   //The player position is not reset.
Player.prototype.checkOrangeCollision = function () {
  //Compares player position to the gem position
  if (this.x < gem2.x + 50 &&
    this.x + 50 > gem2.x &&
    this.y < gem2.y + 75 &&
    75 + this.y > gem2.y) {
      //If a collision happened, the gem2 x and y variables are reset
      gem2.x = (410*Math.random());
      gem2.y = (165*Math.random())+50;
      //The points gained are added to the players current score
      this.score += gem2.points;
  }
};

//This code allows the player to receive input from the keyboard of the computer
//and tells the player how many pixels to move in any given direction when that key is hit
Player.prototype.handleInput = function (key) {
  if (key === 'left' && this.x > 0) {
    this.x -=100;
  }
  if (key === 'up' && this.y > 0) {
    this.y -= 85;
  }
  if (key === 'right' && this.x < 600) {
    this.x += 100;
  }
  if (key === 'down' && this.y < 600) {
    this.y +=85;
  }
};

// This code renders the player on the canvas
//It also renders the text keeping track of the score onto the canvas
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.font = '30px Impact';
  ctx.fillText('= x '+this.score, 105, 700);
  ctx.fillText('High', 415, 665);
  ctx.fillText('Score     =  ' +highScore, 415, 700);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
  }
);

//Instatiate all objects
//Instantiation of a new star object from the Star constructor function
var star = new Star(0,575);

//Instantiate two new gem objects
var gem1 = new BlueGem();
var gem2 = new OrangeGem();

// Place all enemy objects in an array called allEnemies
//instantiating the forward moving enemy bug objects
var allEnemies = [];
allEnemies[0] = new ForwardEnemies(0, 65);
allEnemies[1] = new ForwardEnemies(0, 230);
allEnemies[2] = new ForwardEnemies(0, 310);

//instantiating the reverse moving enemy bug object
var reverseEnemies = new ReverseEnemies(700, 145);

//instatiating the player object
var player = new Player(300, 475);
