const ComponentEnum = Object.freeze({
    NONE: 0,
    CONNECT: 1,
    SELECT_NAME: 2,
    ACTION_ROOM: 3,
    CREATE_ROOM: 4,
    SELECT_ROOM: 5,
    LOBBY: 6,
    GAME: 7,
    SETTING: 8,
    DISCONNECT: 9
});

const ClientStatusEnum = Object.freeze({
    NONE: 0,
    CONNECT: 1,
    SELECT_NAME: 2,
    ACTION_ROOM: 3,
    CREATE_ROOM: 4,
    SELECT_ROOM: 5,
    LOBBY: 6,
    GAME: 7,
    SETTING: 8,
    DISCONNECT: 9
});

const ActionRoomEnum = Object.freeze({
    NONE: 0,
    CREATE: 1,
    SELECT: 2
});