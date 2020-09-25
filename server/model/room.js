/**
 * Room - 
 * 
 */

const Entity = require('./entity')
const Slot = require('./slot')

module.exports = class Room extends Entity  {

    constructor(hostPlayer, name, map) {
        super();
        
        this.name = name;
        this.map = map;
        this.playerCountMax = map.playerCount;
        this.playerCount = 0;

        this.stashs = [];

        this.slots = [];
        for(let i = 0; i < this.playerCountMax; i++) 
            this.slots.push(new Slot(i, map.start[i]));

        // TODO: wtf?
        this.hostPlayer = hostPlayer;
        this.slots[0].setHostPlayer(hostPlayer);
        this.customerPlayers = {};
    }

    addPlayer(player) {

        this.customerPlayers[player.id] = player;

        for(let slot of this.slots) {

            if(slot.player == null) {
                
                slot.setClientPlayer(player);

                return;
            }
        }

        this.stash.push(player);
    }

    /**
     * Перенести игрока в тайник.
     * @param {Player} player 
     */
    stashPlayer(player) {

        for(let slot of this.slots) {

            if(slot.player.id == player.id) {

                slot.player = null;

                break;
            }
        }

    }

    removePlayer(player) {

        delete this.customerPlayers[player.id];

        for(let slot of this.slots) {

            if(slot.player.id == player.id) {

                slot.player = null;

                break;
            }
        }

        console.log(`Removed player id: ${player.id} from room id: ${this.id}`);
    }

    getPublic() {

        const room = {
            id: this.id,
            hostName: this.hostPlayer.name, 
            name: this.name,
            playerCountMax: this.playerCountMax, 
            playerCount: this.playerCount,
            map: {
                name: this.map.name,
                playerCount: this.map.playerCount
            }
        }

        return room;
    }

    getLobby() {

        // {id, name}
        const customerPlayers = Object.values(this.customerPlayers).map(player => player.getPublic());

        const slots = this.slots.map(slot => slot.getPublic());

        const stashs = this.stashs.map(player => player.getPublic());

        const lobby = {
            id: this.id,
            hostPlayer: this.hostPlayer.getPublic(),
            customerPlayers: customerPlayers,
            slots: slots,
            stashs: stashs,
            map: {
                name: this.map.name,
                playerCount: this.map.playerCount
            }
        }

        return lobby;
    }
}