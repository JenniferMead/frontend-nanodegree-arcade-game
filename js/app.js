//This code allows the star to appear in the bottom left-hand corner
//Contstructor function
var Star = function (x, y){
  this.sprite = 'images/Star.png';
  this.x = x;
  this.y = y;
}

//this allows the eventual star object to be rendered
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//instantiation of a new star object from the Star constructor function
var star = new Star(0,505);


//This code allows the gems to appear randomly somewhere on the stone blocks
//superclass constructor function
var ExtraPoints = function (){
  this.x = (600*Math.random());
  this.y = (165*Math.random())+50;
  }

//This prevents the two gems from appearing in the same place at once by checking on every update to make sure they are not overlapping. If they are, a new location is chosen for the second gem until they are no longer overlapping
ExtraPoints.prototype.update = function(){
  if (gem1.x <  gem2.x + 75 &&
    gem1.x + 75 >  gem2.x &&
    gem1.y <  gem2.y + 100 &&
   100 +  gem1.y >  gem2.y){
     gem2.x = (600*Math.random());
     gem2.y = (165*Math.random())+50;
   }

};

//the first subclass constructor
//this creates the blue gem which is worth 1 point
var BlueGem = function(){
    ExtraPoints.call(this)
    this.sprite = 'images/GemBlue.png';
    this.points = 1;
}

BlueGem.prototype = Object.create(ExtraPoints.prototype);

BlueGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

BlueGem.prototype.constructor = BlueGem;

//the second subclass constructor
//this creates the orange gem with is worth 2 points
var OrangeGem = function(){
    ExtraPoints.call(this)
    this.sprite = 'images/GemOrange.png';
    this.points = 2;
}

OrangeGem.prototype = Object.create(ExtraPoints.prototype);

OrangeGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

OrangeGem.prototype.constructor = OrangeGem;

//instantiating new gem objects
var gem1 = new BlueGem();
var gem2 = new OrangeGem();


// Enemies our player must avoid. They move along the screen horizontally and any collision with them ends the round and causes the player to move back to the beginning
//This code creates the superclass constructor for the enemy bugs
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //setting the Enemy initial location
    this.x = x;
    this.y = y;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//now I am creating two subclass constructors, one for enemies that move forward, and one for a single enemy that moves in reverse
//this is the sublclass constructor for the enemies that move forward
var ForwardEnemies = function(){
  Enemy.call(this);
}

ForwardEnemies.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   At that point it starts from x = 0 and is given a newly generated random speed
    if(this.x < 705){
          //This sets the speed of movement up until the enemy reaches the end of the canvas.
      this.x += (this.speed * dt);
    }
    else{
      this.x = 0;
      this.speed = (250 * Math.random()) + 100;
        }
};

ForwardEnemies.prototype = Object.create(Enemy.prototype);

ForwardEnemies.prototype.constructor = ForwardEnemies;

//this is the subclass constructor that allows the enemy bug to move in reverse
var ReverseEnemies = function(){
  Enemy.call(this);
}

ReverseEnemies.prototype.update = function(dt) {

    if(this.x > 5){
        //This sets the speed of movement up until the enemy reaches the end of the canvas.
      this.x -= (this.speed * dt);
    }
    else{
      this.x = 700;
      this.speed = (250 * Math.random()) + 100;
        }
};

ReverseEnemies.prototype = Object.create(Enemy.prototype);

ReverseEnemies.prototype.constructor = ReverseEnemies;



//this code allows for the creation of the player Object
//this is the constructor function for the player
var Player = function(x, y) {
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-princess-girl.png';
    //setting the Player initial location
    this.x = x;
    this.y = y;
    this.score = 0;
  };
var highScore = 0;

Player.prototype.update = function() {
      //if the player reaches the water the players position is restarted and a point is gained
      if(this.y <0.5){
        this.y = 400;
        this.score +=1;
        console.log(this.score);

      }


};

//this code checks for collisions between the player and the enemy bugs.
//if a collision is detected the round ends and the players position is restarted and the score is checked against the high score. If its higher than the high score, the current score
//becomes the high score

Player.prototype.checkCollisions = function(){
  for(var i=0; i<3; i++){

    if (this.x < allEnemies[i].x + 50 &&
     this.x + 50 > allEnemies[i].x &&
     this.y < allEnemies[i].y + 75 &&
     75 + this.y > allEnemies[i].y)
     {
    this.y = 400;
    this.x = 200;
    if(this.score > highScore){
      highScore = this.score;
      this.score = 0;
    }
    else{this.score = 0;}
      }
  };
};

//this code checks for collisions between the player and the blue gem. If a collision is detected, the player gains one point and the gem position is reset to a new random position. The player position is not reset.
Player.prototype.checkBlueCollision = function(){
  if (this.x < gem1.x + 50 &&
   this.x + 50 > gem1.x &&
   this.y < gem1.y + 75 &&
   75 + this.y > gem1.y){
     gem1.x = (410*Math.random());
     gem1.y = (165*Math.random())+50;
     this.score += gem1.points;
       }
   };


   //this code checks for collisions between the player and the orange gem. If a collision is detected, the player gains two points and the gem position is reset to a new random position. The player position is not reset.
   Player.prototype.checkOrangeCollision = function(){
     if (this.x < gem2.x + 50 &&
      this.x + 50 > gem2.x &&
      this.y < gem2.y + 75 &&
      75 + this.y > gem2.y){
        gem2.x = (410*Math.random());
        gem2.y = (165*Math.random())+50;
        this.score += gem2.points;
          }
      };

//this code allows the player to receive input from the keyboard of the computer and tells the player how many pixels to move in any given direction when that key is hit.
Player.prototype.handleInput = function(key){
if(key === 'left' && this.x > 0){
this.x -=100;
}
if(key === 'up' && this.y > 0){
this.y -= 85;
}
if(key === 'right' && this.x < 600){
this.x += 100;
}
if(key === 'down' && this.y < 600){
this.y +=85;
}
}

// This code renders the player on the canvas. It also renders the text keeping track of the score onto the canvas.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "30px Impact";
    ctx.fillText("= x "+this.score, 105, 625);
    ctx.fillText("High", 315, 590);
    ctx.fillText("Score     =  " +highScore, 315, 625);

};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//instantiating the forward moving enemy bugs
var allEnemies = new Array();  //should I have Var in front of it?
allEnemies[0] = new ForwardEnemies(0, 65);
allEnemies[1] = new ForwardEnemies(0, 230);
allEnemies[2] = new ForwardEnemies(0, 310);

//instantiating the reverse moving enemy bug
var reverseEnemies = new ReverseEnemies(700, 145);

//instatiating the player
var player = new Player(200, 400);


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
});
