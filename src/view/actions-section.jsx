import * as React from 'react';
import { AddForm } from './addForm';
import { newRecord } from '../store';
import { ShowModal } from './modal';
import { PropTypes } from 'prop-types';
import { LoginPanel } from './login-panel';
import { get, post } from '../communicate';

export let loggedUser = undefined; // потом надо заменить на пользователя который был залогинен


export class ActionsSection extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            user: loggedUser
        }
    }

    componentDidMount () {
        const res = get(`/user`).then(res => {
            if (res.name) {
                loggedUser = res.name;
                this.setState({user: res.name});
            }
        });
    }

    onButtonAdd = async() => {
        const {store} = this.context;
        let data = await ShowModal({}, <AddForm />);
        if (data) {
            // send data to the server
            const res = await post('/adddata', data);
            if (res.res)
                store.dispatch(newRecord(data));
        }
    }

    onLogin = (user) => {
        loggedUser  = user;
        this.setState({user});    
    }

    renderButtonAdd() {
        return (
            <button onClick={this.onButtonAdd}>
                Добавить
            </button>
        );
    }

    render () {
        return (
        <div className={this.props.className}>
            {this.state.user ? this.renderButtonAdd() : null}
            <LoginPanel
                user={this.state.user}
                onLogin={this.onLogin}
            />
        </div>
        );
    }
}

ActionsSection.contextTypes = {
    store: PropTypes.object
}