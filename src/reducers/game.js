const size = 8;
const firstLine = 'A';
const promotePosition = 'H';

const initPieces = (positions) => positions.map(position => {
    return {position, type: 'MEN'}
});

let playerPieces = initPieces(['A1', 'A3', 'A5', 'A7', 'B2', 'B4', 'B6', 'B8']);
let enemyPieces = initPieces(['H2', 'H4', 'H6', 'H8', 'G1', 'G3', 'G5', 'G7']);

let player = {
    select: ''
};

const gameReducer = (state = {playerPieces, enemyPieces, player}, action) => {
    switch(action.type) {
        case 'SELECT' : 
            return Object.assign({}, state, {player: { select: action.position}});
        case 'MOVE' : 
            let {playerPieces, player} = state;
            let selectedPiece = playerPieces.filter(o => o.position === player.select)[0];
            if(player.select && selectedPiece) {
                let validateParam = {
                    from: selectedPiece.position, 
                    to: action.position, 
                    isKing: selectedPiece.type === 'KING', 
                    playerPieces
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
        default: return state;
    }
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

function validateKing({from, to, playerPieces}) {
    let allowPaths = [];
    const currentLineCode = from.charCodeAt(0);
    const endLineCode = firstLine.charCodeAt(0) + size;
    const firstLineCode = firstLine.charCodeAt(0);
    const currentColIndex = Number(from.charAt(1));
    for(let i = 1; i < endLineCode - currentLineCode; i++) {
        let allowLine = String.fromCharCode(currentLineCode + i);
        allowPaths.push(allowLine + (currentColIndex + i));
        allowPaths.push(allowLine + (currentColIndex - i));
    }
    for(let i = 1; i <= currentLineCode - firstLineCode ; i++) {
        let allowLine = String.fromCharCode(currentLineCode - i);
        allowPaths.push(allowLine + (currentColIndex + i));
        allowPaths.push(allowLine + (currentColIndex - i));
    }
    return allowPaths.filter(removeExceed).filter(o => removeExistingPiece(o, playerPieces)).includes(to);
}

function removeExceed(position) {
    let col = Number(position.substr(1));
    return col >= 1 && col <= 8
}

function removeExistingPiece(position, pieces) {
    return !pieces.map(o => o.position).includes(position)
}


export default gameReducer;