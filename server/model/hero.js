/**
 * Hero - непосредственный менеджер гладиаторов (Данная сущьность будет необходима при нескольких менеджерах)
 * 
 */
const Entity = require('./entity')

module.exports = class Hero extends Entity {

    constructor(name, modelId, arenaId){
        super();
        this.name = name;
        this.modelId = modelId;
        this.arenaId = arenaId;
        this.gladiators = {};
    }

    getAreaPublic() {

        const model = {
            name: this.name,
            modelId: this.modelId,
            arenaId: this.arenaId
        }

        return model;

    }
}