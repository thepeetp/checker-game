import React, { Component } from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import './Room.css';
import { joinRoom, onEnemyMove } from './actions';
import { connect } from 'react-redux';
import { watchMovement } from './core';

class Room extends React.Component {


    onSelectRoom = () => {
        this.props.joinRoom(this.props.id);
        watchMovement(this.props.id, (board) => {
            this.props.updateBoard(board.B, board.A);
        });
    };

    render() {
        return (
            <div onClick={this.onSelectRoom}>
                <Card className={'card'}>
                    <CardContent>
                        <Typography>
                            {this.props.title}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            JOIN
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
    joinRoom: room => dispatch(joinRoom(room)),
    updateBoard: (playerPieces, enemyPieces) => dispatch(onEnemyMove(playerPieces, enemyPieces))

});

export default connect(mapStateToProps, mapDispatchToProps)(Room);