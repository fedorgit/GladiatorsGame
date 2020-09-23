


class SlotClientElement {

    constructor(slot) {

        this.element = document.createElement('div');

        let indexElement = document.createElement('span');
        indexElement.prepend(`[${slot.index}]`);
        this.element.appendChild(indexElement);

        if(slot.player == null) {
            let buttonElement = document.createElement('button');
            buttonElement.setAttribute('content', 'test content');
            buttonElement.setAttribute('class', 'btn');  
            buttonElement.textContent = '-- Занять --';
            this.element.appendChild(buttonElement);
        } else {
            let playerElement = document.createElement('span');
            playerElement.prepend(`-- ${slot.player.name} --`);
            this.element.appendChild(playerElement);
        }
            
        let positionElement = document.createElement('span');
        positionElement.prepend(`Позиция: ${slot.positionId}`);
        this.element.appendChild(positionElement);
    }
}