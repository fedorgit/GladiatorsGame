


class SlotHostElement {

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

        if(!slot.isHost && slot.player != null) {
            let kickElement = document.createElement('button');
            kickElement.setAttribute('content', 'test content');
            kickElement.setAttribute('class', 'btn');  
            kickElement.textContent = 'Выгнать';
            this.element.appendChild(kickElement);
        }
    }
}