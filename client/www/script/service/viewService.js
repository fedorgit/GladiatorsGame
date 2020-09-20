
/**
 * ViewService - сервис по работе с интерфейсом
 */

const ViewService = {

    componentConnectElement: null,
    componentSelectNameElement: null,
    componentActionRoomElement: null,
    componentCreateRoomElement: null,
    componentSelectRoomElement: null,
    componentLobbyElement: null,
    componentGameElement: null,
    componentSettingElement: null,
    componentDisconnectElement: null,

    componentElements: null,

    init() {
        this.componentConnectElement = document.getElementById('js-component-connect');
        this.componentSelectNameElement = document.getElementById('js-component-select-name');
        this.componentActionRoomElement = document.getElementById('js-component-action-room');
        this.componentCreateRoomElement = document.getElementById('js-component-create-room');
        this.componentSelectRoomElement = document.getElementById('js-component-select-room');
        this.componentLobbyElement = document.getElementById('js-component-lobby');
        this.componentGameElement = document.getElementById('js-component-game');
        this.componentSettingElement = document.getElementById('js-component-setting');
        this.componentDisconnectElement = document.getElementById('js-component-disconnect');

        this.componentElements = document.getElementsByClassName('js-component');

        this.setComponent(ComponentEnum.CONNECT);
    },

    /**
     * Установить интерфейсный компонент.
     * @param {ComponentEnum} сomponentEnumId 
     */
    setComponent(сomponentEnumId) {

        console.log(`Set component: ${сomponentEnumId}`)

        for(let component of this.componentElements)
            component.style = 'display: none;';

        this.componentElements.style = 'display: none;';

        switch(сomponentEnumId) {
            
            case ComponentEnum.CONNECT:

                this.componentConnectElement.style = 'display: block;';
            break;

            case ComponentEnum.SELECT_NAME:

                this.componentSelectNameElement.style = 'display: block;';
            break;
            
            case ComponentEnum.ACTION_ROOM:

                this.componentActionRoomElement.style = 'display: block;';
            break;
            
            case ComponentEnum.CREATE_ROOM:

                this.componentCreateRoomElement.style = 'display: block;';
            break;
            
            case ComponentEnum.SELECT_ROOM:

                this.componentSelectRoomElement.style = 'display: block;';
            break;
            
            // TODO: add
        }
    },

    getViewConnectName() {

        return 'Player';
    }
}
