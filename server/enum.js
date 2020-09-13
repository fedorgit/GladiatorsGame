global.StatusUserEnum = Object.freeze({
    NONE: 0,
    CONNECT: 1,
    SELECT_ACTION: 2,
    CREATE_ROOM: 3,
    SELECT_ROOM: 4,
    LOBBY: 5,
    GAME: 6,
    DISCONNECT: 7
});

global.ViewComponentEnum = Object.freeze({
    NONE: 0,
    CONNECT: 1,
    SELECT: 1,
    ROOM: 2,
    LOBBY: 3,
    GAME: 4,
    SETTING: 5
});


global.SelectEnum = Object.freeze({
    NONE: 0,
    CREATE: 1,
    CONNECT: 2
})