/**
 * Gladiator - отрисованный игровой объект на сцене
 * 
 */

class Gladiator {
    constructor(id, x, y, name, modelId, hpMax, hp, enMax, en, damage){
        this.id = id;
        this.name = name;
        this.modelId = modelId;
        this.hpMax = hpMax;
        this.hp = hp;
        this.damage = damage;
    }
}