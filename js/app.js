var Counter = 0;
var Collision =0 ;
let second = 0, minute = 0; hour = 0;
let interval;

var Enemy = function (x, y, speed) { // class Enemy
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.update = function(dt) {
  this.x = this.x + this.speed * dt;
      if (this.x >= 600) {
        this.x = 0;
      }
// for collisions
  if( player.x > this.x - 50 &&
      player.y > this.y - 50 &&
      player.x < this.x + 50 &&
      player.y <  this.y + 50 ){
        console.log('Collision');
        audio.src = "audio/Collision.mp3"; //http://www.developerdrive.com/2012/06/manipulating-html5s-native-audio-with-javascript/
           audio.play();
             Collision ++ ;
        $('.Collision').text(Collision);
          player.x = 200;
          player.y = 400;
      }
};
var Player = function () {//  Player class
    timer();
    // start
    this.x = 200;
    this.y = 400;
    this.player = 'images/char-princess-girl.png';
};

Player.prototype.update = function (dt) {
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function (e) {  // handle Input  key pressed
    if (e === 'left' && this.x > 0){
       ++Counter;
       $('.moves').text(Counter);
        this.x = this.x -100;
    }
    else if (e === 'right' && this.x < 400){
       ++Counter;
       $('.moves').text(Counter);
        this.x =  this.x +100;
    }
    else if (e === 'up'){ // key up
       ++Counter;
       $('.moves').text(Counter);
        if (this.y < 100){ // If playing with water comes back to the starting point
            this.x = 200;
            this.y = 400;
          console.log('You win');
          audio.src = "audio/win.mp3";
             audio.play();
          swal({  //A message telling the player that he won
        title: "Good job!",
        text: 'You Done in \n  Time: '+second +' s \n Collision :  ' +  Collision+ '\n Moves :  ' +  Counter ,
        icon: "success",
      })
      .then((value) => {
            location.reload();
            });
        }
         this.y= this.y- 85;
    }
    else if (e === 'down' && this.y < 400){
       ++Counter;
       $('.moves').text(Counter);
        this.y = this.y + 85;
    }
};
function timer(){// displayed timer in www.w3schools.com
  interval = setInterval(function(){
  $(".timer").html( second +" s");
      second = second + 1;
  }, 2000);
}
var allEnemies =[]; // allEnemies array
  allEnemies.push (new Enemy(10, 50, 300));
  allEnemies.push (new Enemy(10, 100, 210));
  allEnemies.push (new Enemy(10, 150, 320));
  allEnemies.push (new Enemy(10, 220, 150));

var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
