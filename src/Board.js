import React, { Component } from 'react';
import Square from './Square';
import './Board.css';

class Board extends Component {

    render() {
        const board = [];
        const size = this.props.size;
        for(let i = 0; i < size; i++) {
            let rowId = String.fromCharCode(64 + size - i);
            let boxLine = [];
            for(let j = 1; j <= size; j++) {
                boxLine.push(`${rowId}${j}`);
            }
            board.push(boxLine);
        }
        return (
            <table className={'board'}>
                <tbody>
                    {board.map(line => (
                        <tr>
                        {line.map(id => (<td><Square id={id}/></td>))}
                        </tr>
                    ))}
                </tbody>
            </table>
    );
    }
}

export default Board;