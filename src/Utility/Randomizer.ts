import seedrandom, { alea } from 'seedrandom';

class Random {

    private seed: number;
    private randomiser: seedrandom.PRNG;

    constructor() {
        // this.seed = Math.round((Math.random() * 10000) * 1e0) / 1e0;
        this.seed = 5933;

        this.randomiser = new alea(this.seed.toFixed(2));

        
        const seed = document.querySelector("#seed")!;
        seed.innerHTML = this.seed.toString();
    }

    number(): number {
        return this.randomiser();
    }

    reset() {
        this.seed = Math.round((Math.random() * 10000) * 1e0) / 1e0;
        this.randomiser = new alea(this.seed.toFixed(2));
        const seed = document.querySelector("#seed")!;
        seed.innerHTML = "seed " + this.seed;
    }
}

let RAND = new Random();

export {
    RAND,
}