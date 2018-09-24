import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './modal.css';
import PropTypes from 'prop-types';
import {removeFromBody, appendToBody} from './dom'

const classes = {
    modal: 'modal',
    popover: 'popover',
    buttons: 'buttons'
}

export class Modal extends React.Component {
    
    data = null;
    isCorrect = false;

    onClose = (e) => {
        this.props.onClose(null);
    }
    onAdd = (e) => {
        if (this.isCorrect)
            this.props.onClose(this.data);
    }
    onData = (data, isCorrect) => {
        this.data = data;
        this.isCorrect = isCorrect;
    }
    render() {
        let this_ = this;
        const clonedChildren = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {onData: this.onData.bind(this_)});
        })
        return (
            <div className={classes.popover}>
                <div className={classes.modal}>
                    {clonedChildren}
                    <div className={classes.buttons}>
                        <button
                            onClick={this.onAdd}
                        > Добавить </button>

                        <button
                            onClick={this.onClose}
                        > Отмена </button>
                    </div>
                </div>
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


