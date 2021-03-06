/**
 * Client - сущность в игровой системе
 * 
 */

 const Entity = require('./entity.js')

module.exports = class Client extends Entity {

    #wsi = null;
    #user = null;
    #player = null;

    constructor(wsi, status){
        super();
        this.#wsi = wsi;
        this.status = status;
    }

    /**
     * Получить привзаного пользователя к клиенту.
     * @returns {User}
     */
    getUser() {
        return this.#user;
    }

    /**
     * Установить к клиенту пользователя.
     * @param {User} user
     */
    setUser(user) {
        if(this.#user != null) {
            console.error(`error setting user value for client id: ${this.id}`);
            return;
        }

        this.#user = user;
    }

    /**
     * Получить привязанного к пользователю игрока.
     * @returns {Player}
     */
    getPlayer() {
        return this.#player;
    }

    /**
     * Установить к клиенту игрока.
     * @param {Player} player
     */
    setPlayer(player) {
        if(player != null && this.#player != null) {
            console.error(`error setting player value for client id: ${this.id}`);
            return;
        }

        this.#player = player;
    }

    /**
     * Отправить данные на сервер
     * @param {Object(Json)} data 
     */
    send(data) {

        this.#wsi.send(data);
    }
}