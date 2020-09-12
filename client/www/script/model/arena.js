/**
 * Arena - поле боя состоящее из клеток (Cell)
 *
 */

class Arena {
    constructor(id){

        this.id = id;

        this.cells = {}
    }

    setUnitLink(i, j, unit) {

    }
}


class Cell {
    constructor(index, i, j) {
        
        this.id = id;

        this.i = i;
        this.j = j;

        // Ссылки на доступные для перехода клетки.
        this.cellConnectionListLink = {}
    }
}