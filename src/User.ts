var Cache: MethodDecorator = (target: any, propertyName, desc: PropertyDescriptor) => {
    //const getter = desc.get;
    const method = desc.value;
    /*desc.get = function () {
        return getter.apply(this);
    }
    return desc;*/

    desc.value = function(){
        if(this["_fightPowerCache"] != null){
            return target["fightPowerCache"];
        }else{
            console.log("----");
        }

    }
}

class User {
    private _cash: number = 0;
    private _gold: number = 0;
    private _exp: number = 0;
    private _totalExp: number = 0;
    private _level: number = 0;

    private _heroes: Hero[] = [];
    private _cacheFighterPower = 0;
    //heroesInTeam:Hero[] = [];

    constructor() {
      
    }

    get hearoesInTeam() {
        return this._heroes.filter(hero => hero.isInTeam);
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
            this.hearoesInTeam.forEach(hero => result += hero.getFightPower());
            //result += this.pet.getFightPower();
            this._cacheFighterPower = result;
        }
        return this._cacheFighterPower;
    }
}

class Hero {
    private _isInTeam: boolean = false;
    private _equipments: Equipment[] = [];
    private _hp = 50;
   // level = 1;
    //quality: number = 2.0;
    private _level: number;
    private _strength: number;
    private _quick: number;
    private _wisdom: number;
    private _cacheMaxHp: number;

    get maxHP() {
        return this._cacheMaxHp;
    }

    get isInTeam(){
        return this._isInTeam;
    }

    getFightPower() {
        var result = 0;
        this._equipments.forEach(e => result += e.getFightPower());
        this._strength += result + this._level * 2;
        return this._strength;
    }
}

class Equipment {
    private _jewels: Jewel[] = [];
    private _level: number;
    private _strength: number;
    private _quick: number;
    private _wisdom: number;
    constructor(strength: number, quick: number, wisdom: number, jewls:Jewel[]) {
        this._strength = strength;
        this._quick = quick;
        this._wisdom = wisdom;
        this._level = 0;
        this._jewels = jewls;
    }

    getFightPower() {
        var result = 0;
        this._jewels.forEach(jewel => result += jewel.getFightPower());
        this._strength = result + 2 * this._level;
        return this._strength;
    }

    getQuick() {
        var result = 0;
        this._jewels.forEach(jewel => result += jewel.getQuick());
        this._quick = result + 2 * this._level;
        return this._quick;
    }

    getWisdom() {
        var result = 0;
        this._jewels.forEach(jewel => result += jewel.getWisdom());
        this._wisdom = result + 2 * this._level;
        return this._wisdom;
    }

}

class Jewel {
    private _level: number;
    private _strength: number;
    private _quick: number;
    private _wisdom: number;
    private _type: string;

    constructor(type: string, level: number) {
        this._type = type;
        this._level = level;
        if (this._type == "strength") {
            this._strength = 10;
            this._quick = 0;
            this._wisdom = 0;
        } else if (this._type == "quick") {
            this._strength = 0;
            this._quick = 10;
            this._wisdom = 0;
        } else if (this._type == "wisdom") {
            this._strength = 0;
            this._quick = 0;
            this._wisdom = 10;
        }
    }

    getFightPower() {
        this._strength = this._level * 2 + this._strength;
        return this._strength;
    }

    getQuick() {
        this._quick = this._level * 2 + this._quick;
        return this._quick;
    }

    getWisdom() {
        this._wisdom = this._level * 2 + this._wisdom;
        return this._wisdom;
    }

}