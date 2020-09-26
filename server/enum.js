
global.ComponentEnum = Object.freeze({
    NONE: 0,
    CONNECT: 1,
    SELECT_NAME: 2,
    ACTION_ROOM: 3,
    CREATE_ROOM: 4,
    SELECT_ROOM: 5,
    HOST_LOBBY: 6,
    CLIENT_LOBBY: 7,
    GAME: 8,
    SETTING: 9,
    DISCONNECT: 10
});


global.ClientStatusEnum = Object.freeze({
    NONE: 0,
    CONNECT: 1,
    SELECT_NAME: 2,
    ACTION_ROOM: 3,
    CREATE_ROOM: 4,
    SELECT_ROOM: 5,
    HOST_LOBBY: 6,
    CLIENT_LOBBY: 7,
    UPDATE_LOBBY: 8,
    GAME: 9,
    AREA: 10,
    BATTLE: 11,
    SETTING: 12,
    DISCONNECT: 13
});


global.ActionRoomEnum = Object.freeze({
    NONE: 0,
    CREATE: 1,
    SELECT: 2
});

global.ActionLobbyEnum = Object.freeze({
    NONE: 0,
    START: 1,
    LEAVE: 2
});