/**
 * User - авторизованный пользователь
 * 
 */

module.exports = class User {
    constructor(id, statusUserEnumId){
        this.id = id;
        this.statusUserEnumId = statusUserEnumId;
        this.playerLink = null;
    }
}