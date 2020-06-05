export class Player {
    hand = [];
    name = "";
    dealer = false;
    score = 0;
    busted = false;

    constructor(name, dealer = false){
        this.name = name;
        this.dealer = dealer;
    }
}
