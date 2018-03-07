import * as React from 'react';
import { AddForm } from './addForm';
import { newRecord } from '../store';
import { ShowModal } from './modal';
import { PropTypes } from 'prop-types';

export class ActionsSection extends React.Component {


    onButton = () => {
        const {store} = this.context;
        ShowModal({}, <AddForm />)
            .then((data) => {
                if (data)
                    store.dispatch(newRecord(data));
            });
    }

    render () {
        return (
        <div className={this.props.className}>
            <button onClick={this.onButton}>
                Добавить
            </button>
        </div>
        );
    }
}

ActionsSection.contextTypes = {
    store: PropTypes.object
}