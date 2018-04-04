import * as React from 'react';
import { AddForm } from './addForm';
import { newRecord, updateLogin } from '../store';
import { ShowModal } from './modal';
import { PropTypes } from 'prop-types';
import { LoginPanel } from './login-panel';
import { get, post } from '../communicate';

export class ActionsSection extends React.Component {

    constructor(props) {
        super(props);
    }

    onButtonAdd = async() => {
        const {store} = this.context;
        let data = await ShowModal({}, <AddForm user={store.getState().user}/>);
        if (data) {
            // send data to the server
            const res = await post('/adddata', data);
            if (res.res)
                store.dispatch(newRecord(data));
        }
    }

    onLogin = (user) => {
        const { store } = this.context;
        store.dispatch(updateLogin(user));
    }

    renderButtonAdd() {
        return (
            <button onClick={this.onButtonAdd}>
                Добавить
            </button>
        );
    }

    render () {
        const { store } = this.context;
        const user = store.getState().user;
        return (
        <div className={this.props.className}>
            {user ? this.renderButtonAdd() : null}
            <LoginPanel
                user={user}
                onLogin={this.onLogin}
            />
        </div>
        );
    }
}

ActionsSection.contextTypes = {
    store: PropTypes.object
}