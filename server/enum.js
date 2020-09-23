
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
    SETTING: 10,
    DISCONNECT: 11
});


global.ActionRoomEnum = Object.freeze({
    NONE: 0,
    CREATE: 1,
    SELECT: 2
});