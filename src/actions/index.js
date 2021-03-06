export const move = (position) => {
    return {
        type: 'MOVE',
        position
    }
}


export const select = position => {
    return {
        type: 'SELECT',
        position
    };
}

export const setPlayerName = name => {
    return {
        type: 'SET_PLAYER_NAME',
        name
    };
}

export const updateRooms = rooms => {
    return {
        type: 'UPDATE_ROOMS',
        rooms
    };
};

export const joinRoom = room => {
    return {
        type: 'JOIN_ROOM',
        room
    }
}

export const createRoom = room => {
    return {
        type: 'CREATE_ROOM',
        room
    }
}


export const onEnemyMove = (playerPieces, enemyPieces) => {
    return {
        type: 'ENEMY_MOVE',
        playerPieces,
        enemyPieces
    }
}