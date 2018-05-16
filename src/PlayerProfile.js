import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { setPlayerName } from './actions';


class PlayerProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }

    handleSubmit = () => {
        this.props.setPlayerName(this.state.name);
        localStorage.setItem('playerName', this.state.name);
        this.setState({
            open: false
        });
    }

    render() {
        return (
            <div>
                <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Player Name</DialogTitle>
                    <DialogContent>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        value={this.state.name}
                        fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                 </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
    setPlayerName: name => dispatch(setPlayerName(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerProfile);