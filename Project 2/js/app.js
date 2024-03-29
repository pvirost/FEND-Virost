/*
 * Create a list that holds all of your cards
 */

const cards = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bomb', 'fa-bomb',
    'fa-bicycle', 'fa-bicycle',
]

function generateCard(card) {
    return cardTemplate = `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



//  My attempt at a listener to restart the game
const restart = document.querySelector('.restart');
restart.addEventListener('click', function(e){
    document.location.reload(true)
});



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// import Swal from 'sweetalert2';

function initGame() {
    const deck = document.querySelector('.deck');
    const cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });

    deck.innerHTML = cardHTML.join('');
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

initGame();

const allCards = document.querySelectorAll(".card");
let openCards = [];
let matchedCards = [];

let turns = 0;
let turnCounter = document.querySelector('.moves');

let time = 0;
let timerDisp = document.querySelector('.timer');




setInterval(function(){
    if (time <60) {
        timerDisp.textContent = `${time} Seconds`;
    }

    if (time >= 60){
        let mins = Math.floor(time / 60);
        let secs = (time % 60);
        timerDisp.textContent = `${mins} Minutes and ${secs} Seconds`;
    }
}, 1000);




let star0 = document.querySelector('.zero')
let star1 = document.querySelector('.one')

let starCount = 3;

document.addEventListener('click', function(){
    timer = setInterval(function(){
        time++;
    }, 1000)
}, {once: true});


for (let card of allCards) {
    card.addEventListener('click', function(e) {     

        if (turns > 10) {
            document.querySelector(".zero").style.display = "none";
            starCount = 2;
        }
        if (turns > 20) {
            document.querySelector(".one").style.display = "none";
            starCount = 1;
        }

        
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card)
            card.classList.add('open', 'show')

            if (openCards.length == 2) {

                turns++
                turnCounter.textContent = `${turns}`;

                

                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards[0].classList.add('match');
                    openCards[1].classList.add('match');
                    matchedCards.push(openCards[0]);
                    matchedCards.push(openCards[1]);
                    openCards = [];

                    if (matchedCards.length == 16) {
                        setTimeout(function() {
                            Swal.fire({
                                title: "You've Won!",
                                text: `You've Won! It took you ${turns} tries and ${time} seconds! You received a ${starCount} star rating. Congrats!`,
                                type: 'success',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Click to play again!'
                              }).then((result) => {
                                if (result.value) {
                                    document.location.reload(true)
                                }
                              })
                              }, 200);
                            
                    }
                }



                console.log(openCards.length)
                setTimeout(function() {
                    openCards.forEach(function(card) {
                        card.classList.remove('open', 'show')
                        openCards = [];
                    })
                }, 1000)

            } else {
                console.log(openCards.length)
            }
        } else {
            console.log('already flipped');
        }
    })
};


// console.log(openCards)};
// 
// if (card.querySelector
// )};
// console.log("A card was clicked.")
// console.log(card)
// )};


// document.addEventListener('click', function () {
//     console.log('The thing was clicked!');
//     });