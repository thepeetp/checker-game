import React, { Component } from 'react';
import './Square.css';
import { connect } from 'react-redux';
import { select, move } from './actions';

class Square extends Component {

    
    render() {
        return (
            <div className={`box ${this.color}`} onClick={() => this.onSelect(this.props)}>
                <div className={this.getPieceClassName(this.props)}></div>
            </div>);
    }

    onSelect({id: position, isPlayer, isEnemy}) {
        if(isPlayer && !isEnemy) {
            this.props.select(position);
        } else if(this.available) {
            this.props.move(position);
        }
    }

    get color() {
        return this.available ? 'grey' : 'white';
    }

    getPieceClassName({isPiece, isPlayer, isEnemy, isSelected, isKing}) {
        let classes = [];
        if(isPlayer || isEnemy) {
            classes.push('piece');
            if(isSelected) {
                classes.push('select');
            } else if(isPlayer) {
                classes.push('player');
            } else if(isEnemy) {
                classes.push('enemy');
            }
        }
        
        if(isKing) {
            classes.push('king');
        }
        return classes.join(' ');
    }

    get available() {
        let position = this.props.id;
        return (position.substr(1) % 2 === 0) === (position.charCodeAt(0) % 2 === 0);
    }
}

const mapStateToProps = (state, ownProps) => ({
    isPlayer: state.gameReducer.playerPieces.map(o => o.position).includes(ownProps.id),
    isEnemy: state.gameReducer.enemyPieces.map(o => o.position).includes(ownProps.id),
    isKing: state.gameReducer.playerPieces.filter(o => o.type === 'KING').map(o => o.position).includes(ownProps.id),
    isSelected: state.gameReducer.player.select === ownProps.id
});

const mapDispatchToProps = dispatch => ({
    select: position => dispatch(select(position)),
    move: position => dispatch(move(position))
});

export default connect(mapStateToProps, mapDispatchToProps)(Square);