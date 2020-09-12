

const userService = {

    currentUser: null,

    get currentUser() {
        return currentUser
    },

    /**
     * @param {any} user
     */
    set currentUser(user) {
        this.currentUser = user;
    }
}