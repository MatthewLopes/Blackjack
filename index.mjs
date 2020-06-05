import { Deck } from "./Deck";
import { Player } from "./Player";
import scanf from './node_modules/scanf';

let deck = new Deck();
let players = [new Player("Dealer", true), new Player("Chris"), new Player("Matthew"), new Player("Stephen")];
deck = deck.shuffle().shuffle();

console.log(' _     _            _    _            _    ');
console.log("| |   | |          | |  (_)          | |   ");
console.log('| |__ | | __ _  ___| | ___  __ _  ___| | __');
console.log("| '_ \\| |/ _` |/ __| |/ / |/ _` |/ __| |/ /");
console.log("| |_) | | (_| | (__|   <| | (_| | (__|   < ");
console.log("|_.__/|_|\\__,_|\\___|_|\\_\\ |\\__,_|\\___|_|\\_\\");
console.log("                       _/ |                ");
console.log("                      |__/                 ");



// Deal phase
console.log('Dealer is Dealing Cards');
for(let player of players){
    let card = deck.dealCard();
    player.hand.push(card);
    player.score += card.value;
}
for(let player of players){
    let card = deck.dealCard();
    if(player.dealer){
        card.faceDown = true;
        player.hand.push(card);
    } else {
        player.hand.push(card);
    }
    player.score += card.value;

}
const dealer = players.shift();

// Game Phase
// Players Turn
console.log('Dealer is Showing: ');
for (let card of dealer.hand){
    if(!card.faceDown){
        console.log(`${card.card} of ${card.suit}`)
    }
}
for(let player of players){
    console.log(`${player.name}'s turn`);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    let canDoubleDown = true;
    while(true){
        console.log("Your Hand is:");
        for (let card of player.hand){
            console.log(`${card.card} of ${card.suit}`)
        }
        console.log("Your Score is:");
        console.log(player.score);
        if(player.score == 21) {
            console.log("BLACKJACK!");
            break;
        }
        if(canDoubleDown){
            console.log('type "1" to Hit, or "2" to Stand, or "3" to Double Down');
        } else {
            console.log('type "1" to Hit, or "2" to Stand');
        }
        let dec = scanf('%s');
        if(dec == 1){
            canDoubleDown = false;
            let card = deck.dealCard();
            console.log(`You got dealt a ${card.card} of ${card.suit}`);
            player.hand.push(card);
            player.score += card.value;
            if(player.score == 21) {
                console.log("BLACKJACK!");
                break;
            }
            if(player.score > 21){
                for (let card of player.hand){
                    if(card.bustedValue && !card.hasBeenDeducted){
                        player.score -= card.value;
                        player.score += card.bustedValue;
                        card.hasBeenDeducted = true;
                        break;
                    }
                }
            }
            if(player.score > 21){
                player.busted = true;
                console.log("Busted");
                break;
            }
        } else if(dec == 2) {
            console.log("Stood");
            break;
        }
        else if(dec == 3 && canDoubleDown) {
            let card = deck.dealCard();
            console.log(`You got dealt a ${card.card} of ${card.suit}`);
            player.hand.push(card);
            player.score += card.value;
            if(player.score == 21) {
                console.log("BLACKJACK!");
                break;
            }
            if(player.score > 21){
                for (let card of player.hand){
                    if(card.bustedValue && !card.hasBeenDeducted){
                        player.score -= card.value;
                        player.score += card.bustedValue;
                        card.hasBeenDeducted = true;
                        break;
                    }
                }
            }
            if(player.score > 21){
                player.busted = true;
                console.log("Busted");
                break;
            }
            console.log("Doubled Down");
            console.log("Your Score is:");
            console.log(player.score);
            break;
        }
    }
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}

// Dealers Turn
while(true){
    console.log("Dealer Hand is:");
    for (let card of dealer.hand){
        console.log(`${card.card} of ${card.suit}`)
    }
    console.log("Dealer Score is: ");
    console.log(dealer.score);
    if(dealer.score == 21) {
        console.log("BLACKJACK!");
        break;
    }
    if(dealer.score > 16){
        console.log(`Dealer Score is ${dealer.score}, Dealer is Standing`);
        break;
    }
    let card = deck.dealCard();
    console.log(`Dealer got dealt a ${card.card} of ${card.suit}`);
    dealer.hand.push(card);
    dealer.score += card.value;
    if(dealer.score > 21){
        for (let card of dealer.hand){
            if(card.bustedValue && !card.hasBeenDeducted){
                dealer.score -= card.value;
                dealer.score += card.bustedValue;
                card.hasBeenDeducted = true;
                break;
            }
        }
    }
    if(dealer.score > 21){
        dealer.busted = true;
        console.log("Busted");
        break;
    }
}

// Determine Winner
for(let player of players){
    let res;
    if(player.busted || (player.score < dealer.score && !dealer.busted)){
        res = "Lost"
    } else if (dealer.busted || player.score > dealer.score){
        res = "Won"
    } else if (dealer.score == player.score){
        res = "Pushed"
    }

    console.log(`${player.name} ${res}`);
}



