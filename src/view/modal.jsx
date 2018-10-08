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
    onDel = () => {
        this.data.category = '';
        this.props.onClose(this.data);
    }
    onData = (data, isCorrect) => {
        this.data = data;
        this.isCorrect = isCorrect;
    }

    addOreditButton() {
        return this.props.purpose ? 
        <button onClick={this.onAdd}> Добавить </button> :
        [<button onClick={this.onAdd}> Изменить </button>,
        <button onClick={this.onDel}> Удалить </button>]
    }

    render() {
        const clonedChildren = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {onData: this.onData});
        })
        return (
            <div className={classes.popover}>
                <div className={classes.modal}>
                    {clonedChildren}
                    <div className={classes.buttons}>

                        {this.addOreditButton()}
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
    purpose: PropTypes.bool // add or edit row
}

export function defer(contentElementFunc) {
    const parent = appendToBody();
    const onClose = () => removeFromBody(parent);
    const body = function(resolve, reject) {
        ReactDOM.render(contentElementFunc(resolve), parent)
    };
    return new Promise(body).finally(onClose);
}

export function ShowModal(props, content) {
    return defer(resolve =>
      <Modal {...props} show inline onClose={resolve}>
        {content}
      </Modal>
    );
  }


