class Deck {
    constructor() {
        this.deck = [];
        const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
        const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
        
        for (let suit in suits)
        {
            for (let value in values) 
            {
                this.deck.push(`${values[value]} of ${suits[suit]}`);
            }
        }
    }

    shuffleDeck() {
        const deck = this.deck;
        let deckLength = deck.length;
        let randomPosition;

        while (deckLength) {
            randomPosition = Math.floor((Math.random() * deckLength--));
            var tmp = this.deck[deckLength];
            deck[deckLength] = deck[randomPosition];
            deck[randomPosition] = tmp;
        }

        return this;
    }

    printDeck() {
        console.log(this.deck);
    }

    dealCard(){
        return this.deck.pop();
    }
}

const deck1 = new Deck();
deck1.printDeck();
deck1.shuffleDeck();
deck1.printDeck();

var card1 = deck1.dealCard();
var card2 = deck1.dealCard();

console.log("Matthews card: " + card1);
console.log("Stephens Card: " + card2);