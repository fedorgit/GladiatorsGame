

const DataManager = {

    userServise: null,
    clientServise: null,
    playerServise: null,

    currentUser: null,
    currentClient: null,
    currentPlayer: null,

    init() {
        this.userService = new UserService();
        this.clientService = new ClientService();
        this.playerService = new PlayerService();
    },

    /**
     * Установить текущего пользоватлея.
     * @param {CurrentUser} currentUser 
     */
    setCurrentUser(currentUser) {
        this.currentUser = currentUser;
    },

    /**
     * Установить текущего клиента игровой сесси.
     * @param {CurrentClient} currentClient 
     */
    setCurrentClient(currentClient) {
        this.currentClient = currentClient;
    },

    setCurrentPlayer(currentPlayer) {
        this.currentPlayer = currentPlayer;
    },

    selectAction(selectActionEnumId) {

        const model = {
            selectActionEnumId: selectActionEnumId
        }

        
    }

}