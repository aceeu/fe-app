import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './modal.css';
import PropTypes from 'prop-types';
import {removeFromBody, appendToBody} from './dom'

const classes = {
    modal: 'modal'
}

export class Modal extends React.Component {
    onClose = (e) => {
        this.props.onClose(null);
    }
    onAdd = (e) => {
        this.props.onClose('some data');
    }
    render() {
        return (
            <div className={classes.modal}>
                {this.props.children}
                <button
                    onClick={this.onAdd}
                > Добавить </button>

                <button
                    onClick={this.onClose}
                > Отмена </button>
            </div>
        );
    }
}

Modal.propsTypes = {
    onClick: PropTypes.func.isRequired
}

export function defer(contentElement) {
    const parent = appendToBody();
    const onClose = () => removeFromBody(parent);
    const body = function(resolve, reject) {ReactDOM.render(contentElement(resolve), parent)};
    return new Promise(body).finally(onClose);
}

export function ShowModal(props, content) {
    return defer(resolve =>
      <Modal {...props} show inline onClose={resolve}>
        {content}
      </Modal>
    );
  }


