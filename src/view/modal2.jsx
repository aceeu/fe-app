import * as React from 'react';
import PropTypes from 'prop-types';
import defer from './defer';
import './modal.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const classes = {
    modal: 'modal',
    popover: 'popover',
    buttons: 'buttons'
}

export const Buttons = (props) => {
    const b = props.buttonsList.map(element => 
        <Button
            variant="contained"
            color='primary'
            key={element.id}
            onClick={() => props.onClick(element.id)}
        >
            {element.name}
        </Button>
    );
    return (
            <Stack spacing={2} direction="row">
                {b}
            </Stack>
    )
};

Buttons.propTypes = {
    buttonsList: PropTypes.array
};

export const Modal2 = props => {

    const clonedChildren = React.Children.map(props.children, child => 
        React.cloneElement(child, {onClick: data => props.onClose(data)}));

    return (
            <div className={classes.popover}>
                <div className={classes.modal}>
                    {clonedChildren}
                </div>
            </div>
    )
};

Modal2.propTypes = {
    onClose: PropTypes.func
}

export function ShowModal(props, content) {
    return defer(resolve =>
      <Modal2 {...props} onClose={resolve}>
        {content}
      </Modal2>
    );
  }
