
module.exports = class Service {

    constructor() {

        this.elements = {};

        this.counterId = 0;
    }

    getId() {

        return ++this.counterId;
    }

    add(element) {

        let id = this.getId();

        element.id = id;

        this.elements[id] = element;

        return this.elements[id];
    }

    get(id) {

        if(!this.elements.hasOwnProperty(id)) {
            console.log('error get element in service ' + id);
            return null;
        }

        return this.elements[id];

    }

    remove(id) {

        if(!this.elements.hasOwnProperty(id)) {
            console.log('error remove element in service ' + id);
            return;
        }

        delete this.elements[id];
    }
}
