var Points = function (x, y){
  this.sprite = 'images/Star.png';
  this.x = x;
  this.y = y;
}

Points.prototype.update = function(){

};

// Draw the enemy on the screen, required method for game
Points.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var star = new Points(0,420);

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //setting the Enemy initial location
    this.x = x;
    this.y = y;
    //setting the Enemy speed. I used math random so they weren't all moving at the same speed
    this.speed = (250 * Math.random()) + 70;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //This sets the speed of movement up until the enemy reaches the end of the canvas. At that point it starts from x = 0 and is given a newly generated random speed
    if(this.x < 505){
      this.x += (this.speed * dt);
    }
    else{
      //also, If an enemy collides with a player I need to have it resart from 0, that part seems hard...
      this.x = 0;
      this.speed = (250 * Math.random()) + 90;
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
      }
  };
};

Player.prototype.handleInput = function(key){
if(key === 'left' && this.x > 0){
this.x -=100;
}
if(key === 'up' && this.y > 0){
this.y -= 85;
}
if(key === 'right' && this.x < 400){
this.x += 100;
}
if(key === 'down' && this.y < 400){
this.y +=85;
}
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = new Array();
allEnemies[0] = new Enemy(0, 65);
allEnemies[1] = new Enemy(0, 145);
allEnemies[2] = new Enemy(0, 230);


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
