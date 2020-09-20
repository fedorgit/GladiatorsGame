
module.exports = class Service {

    constructor() {

        this.elements = {};

        this._counterId = 0;
    }

    _getId() {

        return ++this._counterId;
    }

    add(element) {

        let id = this._getId();

        element.id = id;

        this.elements[id] = element;

        return this.elements[id];
    }

    get(id) {

        if(!this.elements.hasOwnProperty(id)) {
            console.error('error get element in service ' + id);
            return null;
        }

        return this.elements[id];

    }

    getList() {
    
        let result = [];

        for(const [_, element] of Object.entries(this.elements)) {
            result.push(element);
        }

        return result;
    }

    getDict() {

        return this.elements;
    }

    remove(id) {

        if(!this.elements.hasOwnProperty(id)) {
            console.error('error remove element in service ' + id);
            return;
        }

        delete this.elements[id];
    }
}
