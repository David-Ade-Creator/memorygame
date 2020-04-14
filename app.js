const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

  function flipcard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.toggle('flip');

    if(!hasFlippedCard){
      //first click
      hasFlippedCard = true;
      firstCard = this;

      return;
    }
      //secondclick
      secondCard = this;

      checkForMatch();
  }

function checkForMatch(){
  //do cards match?
  let isMatch = firstCard.dataset.content === secondCard.dataset.content;

  isMatch ? disableCards(): unflipCards();
}

function disableCards(){
  firstCard.removeEventListener('click', flipcard);
  secondCard.removeEventListener('click',flipcard);

  resetBoard();
}
function unflipCards(){
lockBoard = true;

  setTimeout(()=>{
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard(){
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card, i) => {
  card.addEventListener('click', flipcard);
});
