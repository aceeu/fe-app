import * as React from 'react';
import { AddForm } from './addForm';
import { newRecord } from '../store';
import { ShowModal } from './modal';
import { PropTypes } from 'prop-types';
import { MakeGetRequest } from '../common/request';
import { Login } from './login';

export class ActionsSection extends React.Component {


    onButton = () => {
        const {store} = this.context;
        ShowModal({}, <AddForm />)
            .then((data) => {
                if (data)
                    store.dispatch(newRecord(data));
            });
    }

    onLoginButton = async() => {
        let name_pass = await ShowModal({}, <Login />);
        MakeGetRequest(`/auth/${name_pass.user}/pass/${name_pass.password}`, {}, (res) => {
            window.alert(res);
        });
    }

    render () {
        return (
        <div className={this.props.className}>
            <button onClick={this.onButton}>
                Добавить
            </button>
            <button onClick={this.onLoginButton}>
                Login
            </button>
        </div>
        );
    }
}

ActionsSection.contextTypes = {
    store: PropTypes.object
}