let Score = 0;
let ScoreBoard = document.querySelector('.score')
// let gameBoard = document.getElementById('myCanvas')

// Enemies our player must avoid
const Enemy = function(x, y, v) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.velocity = v;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.velocity * dt;
    if (this.x > 507) {
        this.x = -100;
        let RandVelocity = (Math.random() + 0.3) * 60 * (Math.floor(Math.random() * 4 + 2));
        this.velocity = RandVelocity;
      
    }

    let bugL = this.x - 60;
    let bugR = this.x + 60;
    let bugT = this.y - 55;
    let bugB = this.y + 55;
    if (player.x <= bugR && player.x >= bugL && player.y <= bugB && player.y >= bugT) {
        player.die();
    }

    // console.log(Player);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.LR_move = 100
    this.UD_move = 80;
};

Player.prototype.resetPosition = function() {
    this.x = 200;
    this.y = 400;

    
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.die = function() {
    
    let gameBoard = document.getElementById('myCanvas')
    gameBoard.classList.add("apply-shake");
    this.resetPosition();
    setTimeout(function(){
        gameBoard.classList.remove("apply-shake");
    }, 820)
   

    
    

    console.log('wiggle');
    // this.x -= 60
    // this.x += 30
    
}

Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            if (this.x >= this.LR_move) {
                this.x -= this.LR_move
            } else {
                this.x -= 0};
            break;
        case 'right':
            if (this.x <= (this.LR_move * 3)) {
                this.x += this.LR_move
             } else {
                this.x -= 0};
            break;
        case 'up':
            this.y -= this.UD_move;
            if (this.y <= 50) {
                this.resetPosition();
                Score += 1
                console.log(Score);
                ScoreBoard.textContent = `${Score}`;
                if (Score === 3) {
                    setTimeout(function() {
                        Swal.fire({
                            title: "You've Won!",
                            text: `You Made it Across ${Score} Times!`,
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Click to play again!'
                        }).then((result) => {
                          if (result.value) {
                              document.location.reload(true)
                          }
                        })
                    }, 150);
                }
            }
            break;
        case 'down':
            this.y <= (this.UD_move * 4) ? this.y += this.UD_move : this.y += 0;
            break;

    }
}


// Now instantiate your objects.

let bug1 = new Enemy(-80, 60, 60 * ((Math.random() * 4 + 2)));
let bug2 = new Enemy(-80, 140, 60 * (Math.floor(Math.random() * 4 + 2)));
let bug3 = new Enemy(-80, 220, 60 * ((Math.random() * 4 + 2)));



// Place all enemy objects in an array called allEnemies
window.allEnemies = [bug1, bug2, bug3];

// Place the player object in a variable called player

window.player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    if (Score < 3) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        }
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
    
        
    

    // player.handleInput(allowedKeys[e.keyCode]);
