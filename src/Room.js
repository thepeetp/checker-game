import React, { Component } from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import './Room.css';
import { joinRoom } from './actions';
import { connect } from 'react-redux';

class Room extends React.Component {


    onSelectRoom = () => {
        this.props.joinRoom(this.props.id);
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
    joinRoom: room => dispatch(joinRoom(room))
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);