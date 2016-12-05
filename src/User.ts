var Cache: MethodDecorator = (target: any, propertyName, desc: PropertyDescriptor) => {
    const getter = desc.get;
    desc.get = function () {
        return getter.apply(this);
    }
    return desc;
}

class User {
    cash: number = 0;
    gold: number = 0;
    exp: number = 0;
    totalExp: number = 0;
    level: number = 0;

    heroes: Hero[] = [];
    pet: Pet;

    private _cacheFighterPower = 0;
    //heroesInTeam:Hero[] = [];


    constructor() {
        this.pet = new Pet();
    }

    get hearoesInTeam() {
        return this.heroes.filter(hero => hero.isInTeam);
    }

    //@Logger
    print() {
        console.log("hello");
    }

    @Cache
    getFightPower() {
        /* var arr:Hero[] = [];
         function test(hero:Hero){
             return true;
         }
         arr.every(hero=>hero.isInteam);*/
        if (!this._cacheFighterPower) {
            var result = 0;
            this.hearoesInTeam.forEach(hero => result += hero.fightPower);
            result += this.pet.getFightPower();
            this._cacheFighterPower = result;
        }
        return this._cacheFighterPower;
    }
}

class Hero {
    isInTeam: boolean = false;
    equipments: Equipment[] = [];
    hp = 50;
    level = 1;
    quality: number = 2.0;
    private _cacheMaxHp;

    get maxHP() {
        return this._cacheMaxHp;
    }

    get attack() {
        var result = 0;
        this.equipments.forEach(e => result += e.attack)
        return result;
    }

    @Cache
    get fightPower(){
        return this.level*10;
    }
}

class Equipment {
    jewels: Jewel[] = [];

    get attack() {
        return 50;
    }

}

class Pet {
    getFightPower() {
        return 200;
    }
}

class Jewel {

}