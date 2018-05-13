import React, { Component } from 'react';
import './Square.css';
import { connect } from 'react-redux';
import { select, move } from './actions';

class Square extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className={`box ${this.color}`} onClick={() => this.onSelect(this.props)}>
                <div className={this.getPieceClassName(this.props)}></div>
            </div>);
    }

    onSelect({id: position, hasPiece}) {
        if(hasPiece) {
            this.props.select(position);
        } else if(this.available) {
            this.props.move(position);
        }
    }

    get color() {
        return this.available ? 'grey' : 'white';
    }

    getPieceClassName({hasPiece, isSelected}) {
        let classes = [];
        if(hasPiece) {
            classes.push('piece');
        }
        if(isSelected) {
            classes.push('select');
        }
        return classes.join(' ');
    }

    get available() {
        let position = this.props.id;
        return position.substr(1) % 2 == 0 == position.charCodeAt(0) % 2 == 0;
    }
}

const mapStateToProps = (state, ownProps) => ({
    hasPiece: state.gameReducer.pieces.map(o => o.position).includes(ownProps.id),
    isSelected: state.gameReducer.player.select === ownProps.id
});

const mapDispatchToProps = dispatch => ({
    select: position => dispatch(select(position)),
    move: position => dispatch(move(position))
});

export default connect(mapStateToProps, mapDispatchToProps)(Square);