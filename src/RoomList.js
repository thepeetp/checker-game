import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getAvailableRoom } from './core';
import { updateRooms } from './actions';
import Room from './Room';
import './RoomList.css';

class RoomList extends React.Component {


    componentWillMount() {
        getAvailableRoom(rooms => this.props.updateRooms(rooms));
    }

    componentWillUnmount() {
        getAvailableRoom(rooms => {});
    }

    render() {
        return (
            <div className={'room-container'}>
                {this.props.rooms.map(room => <Room key={room.id} id={room.id} title={room.title}/>)}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    rooms: state.gameReducer.rooms
});

const mapDispatchToProps = dispatch => ({
    updateRooms: rooms => dispatch(updateRooms(rooms))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);