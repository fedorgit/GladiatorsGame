
class Service {

    constructor() {

        this.elements = {};
    }

    add(element) {

        const id = element.id;

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

    remove(id) {

        if(!this.elements.hasOwnProperty(id)) {
            console.error('error remove element in service ' + id);
            return;
        }

        delete this.elements[id];
    }
}
