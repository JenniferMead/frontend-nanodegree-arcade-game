//This code allows the star to appear in the bottom left corner
var Points = function (x, y){
  this.sprite = 'images/Star.png';
  this.x = x;
  this.y = y;
}

Points.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var star = new Points(0,505);


//This code allows the gems to appear
var ExtraPoints = function (){
  this.x = (600*Math.random());
  this.y = (165*Math.random())+50;
  console.log(this.x);
}

ExtraPoints.prototype.update = function(){
  if (gem1.x <  gem2.x + 75 &&
    gem1.x + 75 >  gem2.x &&
    gem1.y <  gem2.y + 100 &&
   100 +  gem1.y >  gem2.y){
     gem2.x = (600*Math.random());
     gem2.y = (165*Math.random())+50;
   }

};

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


var gem1 = new BlueGem();
var gem2 = new OrangeGem();









// Enemies our player must avoid. This is an enemy superclass
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

//now I am creating two subclasses, one for enemies that move forward, and one for a single enemy that moves in reverse
//this is the code for the enemy that moves forward
var ForwardEnemies = function(){
  Enemy.call(this);
}

ForwardEnemies.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //This sets the speed of movement up until the enemy reaches the end of the canvas. At that point it starts from x = 0 and is given a newly generated random speed
    if(this.x < 705){
        //setting the Enemy speed. I used math random so they weren't all moving at the same speed
        // Update the enemy's position, required method for game
        // Parameter: dt, a time delta between ticks
      this.x += (this.speed * dt);
    }
    else{
      this.x = 0;
      this.speed = (250 * Math.random()) + 100;
        }
};

ForwardEnemies.prototype = Object.create(Enemy.prototype);
ForwardEnemies.prototype.constructor = ForwardEnemies;

//code to create the reverse enemy
var ReverseEnemies = function(){
  Enemy.call(this);
}

ReverseEnemies.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //This sets the speed of movement up until the enemy reaches the end of the canvas. At that point it starts from x = 0 and is given a newly generated random speed
    if(this.x > 5){
      this.x -= (this.speed * dt);
    }
    else{
      this.x = 700;
      this.speed = (250 * Math.random()) + 100;
        }
};
ReverseEnemies.prototype = Object.create(Enemy.prototype);
ReverseEnemies.prototype.constructor = ReverseEnemies;







// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Our player
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
      //maybe I only need this for restarting the character position if its hit the water or if its interacted with an enemy?
      if(this.y <0.5){
        this.y = 400;
        this.score +=1;
        console.log(this.score);

      }


};

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

// Draw the enemy on the screen, required method for game
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

allEnemies = new Array();  //should I have Var in front of it?
allEnemies[0] = new ForwardEnemies(0, 65);
allEnemies[1] = new ForwardEnemies(0, 230);
allEnemies[2] = new ForwardEnemies(0, 310);


var reverseEnemies = new ReverseEnemies(700, 145);


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
