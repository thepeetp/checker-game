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