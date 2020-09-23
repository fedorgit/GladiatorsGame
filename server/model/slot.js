

module.exports = class Slot {
    constructor(index, positionId){
        this.index = index;
        this.positionId = positionId;
        this.isHost = false;
        this.player = null;
    }

    /**
     * 
     * @param {Player} player 
     */
    setPlayer(player) {

        this.player = player;
    }

    setHostPlayer(player) {
        this.isHost = true;
        this.player = player;
    }

    getPublic() {

        const model = {
            index: this.index,
            positionId: this.positionId,
            isHost: this.isHost,
            player: this.player != null ? this.player.getPublic() : null
        }

        return model;
    }
}