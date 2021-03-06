export class Deck {
    deck = [];
    constructor() {
        const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
        const cards = [
            {card: "2", value: 2, faceDown:false},
            {card: "3", value: 3, faceDown:false},
            {card: "4", value: 4, faceDown:false},
            {card: "5", value: 5, faceDown:false},
            {card: "6", value: 6, faceDown:false},
            {card: "7", value: 7, faceDown:false},
            {card: "8", value: 8, faceDown:false},
            {card: "9", value: 9, faceDown:false},
            {card: "10", value: 10, faceDown:false}, 
            {card: "Jack", value: 10, faceDown:false},
            {card: "Queen", value: 10, faceDown:false},
            {card: "King", value: 10, faceDown:false},
            {card: "Ace", value: 11, bustedValue: 1, hasBeenDeducted: false, faceDown:false}
        ];
        
        for (let suit of suits)
        {
            for (let value of cards) 
            {
                this.deck.push({suit: suit, ...value})
            }
            for (let value of cards) 
            {
                this.deck.push({suit: suit, ...value})
            }
        }
    }

    shuffle() {
        let deckLength = this.deck.length;
        let randomPosition;

        while (deckLength) {
            randomPosition = Math.floor((Math.random() * deckLength--));
            var tmp = this.deck[deckLength];
            this.deck[deckLength] = this.deck[randomPosition];
            this.deck[randomPosition] = tmp;
        }

        return this;
    }

    dealCard(){
        return this.deck.shift();
    }
}
