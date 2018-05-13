const promotePosition = 'H';

let pieces = ['A1', 'A3', 'A5', 'A7', 'B2', 'B4', 'B6', 'B8'].map(position => {
    return {position, type: 'MEN'}
});

let player = {
    select: ''
};

const gameReducer = (state = {pieces, player}, action) => {
    switch(action.type) {
        case 'SELECT' : return Object.assign({}, state, {player: { select: action.position}}); break;
        case 'MOVE' : 
            let {pieces, player} = state;
            let selectedPiece = pieces.filter(o => o.position === player.select)[0];
            if(player.select && selectedPiece) {
                let validateParam = {
                    from: selectedPiece.position, 
                    to: action.position, 
                    isKing: selectedPiece.type === 'KING', 
                    pieces
                };
                if(validate(validateParam)) {
                    selectedPiece.position = action.position;
                    player.select = '';
                    let row = selectedPiece.position.charAt(0);
                    if(row === promotePosition) {
                        selectedPiece.type = 'KING';
                    }
                }
            }
            return Object.assign({}, state);
            break;
        default: return state;
    }
    return state;
};


function validate(param) {
    if(param.isKing){
        return validateKing(param);
    } else {
        return validateMen(param);
    }
}

function validateMen({from, to}) {
    let moveFront = String.fromCharCode(from.charCodeAt(0) + 1) === to.charAt(0);
    let colPosition = Number(from.charAt(1));
    let withinArea = [colPosition + 1, colPosition - 1].includes(Number(to.charAt(1)));
    return moveFront && withinArea;
}

function validateKing({from, to}) {
    return true;
}


export default gameReducer;