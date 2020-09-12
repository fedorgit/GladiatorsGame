/**
 * Gladiator - отрисованный игровой объект на сцене
 * 
 */

class Gladiator {
    constructor(id, name, modelId, hpMax, hp, damage){
        this.id = id;
        this.name = name;
        this.modelId = modelId;
        this.hpMax = hpMax;
        this.hp = hp;
        this.damage = damage;
    }
}