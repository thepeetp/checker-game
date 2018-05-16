import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


class AddButton extends React.Component {
    
    render() {
        return (
            <Button variant="fab" color="primary" aria-label="add" onClick={this.props.onClick}>
              <AddIcon />
            </Button>
        );
    }
}

export default AddButton;