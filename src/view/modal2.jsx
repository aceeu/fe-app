import * as React from 'react';
import PropTypes from 'prop-types';
import defer from './defer';
import './modal.css';

const classes = {
    modal: 'modal',
    popover: 'popover',
    buttons: 'buttons'
}

export let Buttons = (props) => {
    const b = props.buttonsList.map(element => 
        <button
            key={element.id}
            onClick={() => props.onClick(element.id)}
            style={element.style}
        >
            {element.faIcon ? <i className={element.faIcon} ></i> : element.name}
        </button>
    );
    return (
        <div className={classes.buttons}>
            {b}
        </div>
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
