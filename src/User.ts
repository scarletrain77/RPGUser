var Cache: MethodDecorator = (target: any, propertyName, desc: PropertyDescriptor) => {
    //const getter = desc.get;
    const method = desc.value;
    /*desc.get = function () {
        return getter.apply(this);
    }
    return desc;*/

    desc.value = function () {
        if (this["_fightPowerCache"] != null) {
            console.log(target["fightPowerCache"]);
            return target["fightPowerCache"];
        } else {
            console.log("----");
            this["fightPowerCache"] = method.apply(this);
            return method.apply(this);
        }

    }
    return desc;
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

    public addHero(hero:Hero):void{
        hero.setIsInteam(true);
        this._heroes.push(hero);
    }

    get hearoesInTeam() {
        return this._heroes.filter(hero => hero.isInTeam);
    }

    //@Logger
    print() {
        console.log("hello");
    }

   // @Cache
    getFightPower() {
        /* var arr:Hero[] = [];
         function test(hero:Hero){
             return true;
         }
         arr.every(hero=>hero.isInteam);*/
        if (!this._cacheFighterPower) {
            var result = 0;
            this.hearoesInTeam.forEach(hero => result += hero.getFightPower());
            //console.log(result);
            //result += this.pet.getFightPower();
            this._cacheFighterPower = result;
        }
        console.log("User:" + this._cacheFighterPower);
        return this._cacheFighterPower;
    }
}

class Hero {
    private _isInTeam: boolean = false;
    private _equipments: Equipment[] = [];
    private _hp;
    // level = 1;
    //quality: number = 2.0;
    private _level: number;
    private _strength: number;
    private _quick: number;
    private _wisdom: number;
    private _cacheMaxHp: number;

    constructor(strength: number, quick: number, wisdom: number) {
        this._strength = strength;
        this._quick = quick;
        this._wisdom = wisdom;
        this._level = 0;
        this._hp = 50;
    }
    get maxHP() {
        return this._cacheMaxHp;
    }

    get isInTeam() {
        return this._isInTeam;
    }

    setIsInteam(is:boolean){
        this._isInTeam = is;
    }

    getFightPower() {
        var result = 0;
        this._equipments.forEach(e => result += e.getFightPower());
        this._strength += this._level * 0.5;
        result += this._strength;
        //console.log("Hero:" + result);
        return result;
    }

    public addEquipment(equipment:Equipment):void{
        this._equipments.push(equipment);
    }
}

class Equipment {
    private _jewels: Jewel[] = [];
    private _level: number;
    private _strength: number;
    private _quick: number;
    private _wisdom: number;
    constructor(strength: number, quick: number, wisdom: number) {
        this._strength = strength;
        this._quick = quick;
        this._wisdom = wisdom;
        this._level = 0;
    }

    public addJewel(jewel:Jewel):void{
        this._jewels.push(jewel);
    }

    getFightPower() {
        var result:number = 0;
        this._jewels.forEach(jewel => result += jewel.getFightPower());
        this._strength += this._level * 0.5;
        result += this._strength;
        //console.log("Equipment:" + result);
        return result;
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
        this._strength += this._level * 0.5;
        //console.log("jewel:" + this._strength);
        return this._strength;
    }
}