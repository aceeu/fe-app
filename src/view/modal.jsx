import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './modal.css';
import PropTypes from 'prop-types';
import {removeFromBody, appendToBody} from './dom'

const classes = {
    modal: 'modal'
}

export class Modal extends React.Component {
    render() {
        return (
            <div className={classes.modal}>
                {this.props.children}
                <button
                    onClick={this.props.onClose}
                > Close </button>
            </div>
        );
    }
}

export function ShowModal(content) {
    let element = null;
    const c =
        <Modal onClose={e => removeFromBody(element)}>
            {content}
        </Modal>
    element = appendToBody();
    ReactDOM.render(c, element);
}

Modal.propsTypes = {
    onClick: PropTypes.func.isRequired
}
