/**
 * Arena - поле боя состоящее из клеток (Cell)
 *
 */

const cellIMax = 24;

const cellJMax = 16;

class Arena {
    constructor(id){

        this.id = id;

        this.cells = {}
    }

    generate() {
        
        let startPointI = Math.floor(cellIMax / 2);
        let startPointJ = Math.floor(cellJMax / 2);

        let cellCount = startPointI * startPointJ;

        let minCellCount = Math.floor(cellCount / 2);
        let maxCellCount = cellCount;

        let currentCellCount = MathHelper.getRandomInteger(minCellCount, maxCellCount);

        let currentIndex = 0;

        let currentCell = new Cell(++currentIndex, startPointI, startPointJ);

        for(let currentIndex = 0; currentIndex < currentCellCount;) {
            
            const UP = 1;
            const DOWN = 2;
            const RIGHT = 3;
            const LEFT = 4;

            let routePath = [];

            if(currentCell.j > 0 && !checkCell(currentCell.i, currentCell.j - 1)) 
                routePath.push(UP);

            if(currentCell.j == cellJMax - 1 && !checkCell(currentCell.i, currentCell.j + 1)) 
                routePath.push(DOWN);

            if(currentCell.i < cellIMax - 1 && !checkCell(currentCell.i+1, currentCell.j)) 
                routePath.push(RIGHT);

            if(currentCell.i > 0 && !checkCell(currentCell.i-1, currentCell.j)) 
            routePath.push(LEFT);
            
            if (routePath.length == 0) {

                let index = MathHelper.getRandomInteger(0, currentIndex);

                currentCell = this.cells[index];

                continue;
            }

            let routeIndex = Math.floor(Math.random()*routePath.length);

            let route = routePath[routeIndex];

            let i = currentCell.i;
            let j = currentCell.j;

            if(route == UP)
                j = currentCell.j + 1;

            if(route == DOWN)
                j = currentCell.j - 1;

            if(route == RIGHT)
                i = currentCell.i + 1;

            if(route == LEFT)
                i = currentCell.i - 1;
                

            let cell = new Cell(currentIndex, i, j);

            this.cells[index] = cell;

            currentIndex++;
        }

        // TODO: создание связей между ячейками

    }

    checkCell(i, j) {

        for(let index = 0 in this.cells) {

            let cell = this.cells[index];
            
            if(cell.i == i && cell.j == j)
                return true;
        }

        return false;
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