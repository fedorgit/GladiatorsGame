
class CurrentClient {

    /**
     * 
     * @param {number} id 
     * @param {*} wsi 
     * @param {User} user 
     */
    constructor(id, wsi, user) {
        this.id = id;
        this._wsi = wsi;
        this.user = user;
    }

    /**
     * Отправить данные клиенту в сесию.
     * @param {String(Json)} data 
     */
    send(data) {

        this._wsi.send(data);
    }
}