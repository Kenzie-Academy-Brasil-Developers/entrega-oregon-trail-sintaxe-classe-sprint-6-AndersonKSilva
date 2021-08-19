class Traveler {
    
    constructor(name) {
        this._name = name;
        this.food = 1;
        this.isHealthy = true;
    }
    get name(){return this._name}
    set name(value){this._name = value}
    hunt() {
        this.food = this.food + 2;
    }
    eat() {
        if(this.food === 0) {
            this.isHealthy = false;
        }
        if(this.food > 0) {
            this.food = this.food - 1;
        }
    }
}

class Wagon {
    constructor(capacity) {
        this._capacity = capacity;
        this.fixedCapacity = capacity
        this.seats = [];
    }
    get capacity(){return this._capacity}
    set capacity(value){this._capacity = value}
    getAvailableSeatCount() {
        return this.capacity;
    }
    join(travelerName) {
        if(this.getAvailableSeatCount() > 0)  {
            (this.seats).push(travelerName);
            return this.capacity -=1
        }
    }
    shouldQuarantine() {
        for(let seat=0;seat<=this.seats.length;seat++){
            if(this.seats[seat].isHealthy === false) {
                return `true since ${this.seats[seat].name} is sick`;
            }
        }
    }
    totalFood() {
        let totFood=0;
        for(let seat=0;seat<this.fixedCapacity;seat++){
            totFood+=this.seats[seat].food
        }
        return totFood
    }
}

// Criar uma carroça que comporta 2 pessoas
let wagon = new Wagon(2);
// Criar três viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let maude = new Traveler('Maude');

console.log(`${wagon.getAvailableSeatCount()} should be 2`);

wagon.join(henrietta);
console.log(`${wagon.getAvailableSeatCount()} should be 1`);

wagon.join(juan);
wagon.join(maude); // Não tem espaço para ela!
console.log(`${wagon.getAvailableSeatCount()} should be 0`);

henrietta.hunt(); // pega mais comida
juan.eat();
juan.eat(); // juan agora está com fome (doente)

console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
console.log(`${wagon.totalFood()} should be 3`);