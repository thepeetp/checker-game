import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import PlayerProfile from './PlayerProfile';
import RoomList from './RoomList';
import AddButton from './AddButton';
import { connect } from 'react-redux';
import { first as randomName, place as randomPlace} from 'random-name';
import { setPlayerName, createRoom } from './actions';
import { addNewRoom } from './core';


class App extends Component {

  createRoom = () => {
    let roomName = randomPlace();
    this.props.createRoom(roomName);
    addNewRoom(roomName);
  };

  componentWillMount() {
    this.props.setPlayerName(randomName());
  }

  render() {
    console.log(this.props.readyToPlay);
    const inGameContent = <Board size={8}/>;
    const findRoomContent = (
      <div>
        <AddButton onClick={this.createRoom}/>
        <RoomList />
      </div>
    );
    const content = this.props.readyToPlay ? inGameContent : findRoomContent;
    return (
      <div className="App">
          {content}
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  readyToPlay: Boolean(state.gameReducer.player.room)
});

const mapDispatchToProps = dispatch => ({
    setPlayerName: name => dispatch(setPlayerName(name)),
    createRoom: name => dispatch(createRoom(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);