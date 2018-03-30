import * as React from 'react';
import { Login } from './login';
import { ShowModal } from './modal';
import { PropTypes } from 'prop-types';
import { get, post } from '../communicate';

export class LoginPanel extends React.Component {

    onLogoutButton = async() => {
        const res = await get(`/logout`);
        if (res.res === true)
            this.props.onLogin(undefined);
    }

    renderButton() {
        return (
            <button onClick={this.onLoginButton}>
                Login
            </button>
        )
    }

    renderLogoutButton() {
        return (
            <div>
                {this.props.user}
                <button onClick={this.onLogoutButton}>
                    Logout
                </button>
            </div>
        )
    }

    async onLogin(data) {
        const res = await post(`/auth`, data);
        this.props.onLogin(res.name);
    }

    render() {
        return (
            <div>
                {this.props.user ? this.renderLogoutButton() : <Login onData={e => this.onLogin(e)}/>}
            </div>
        );
    }
}

LoginPanel.propTypes = {
    user: PropTypes.string.isRequired,
    onLogin: PropTypes.func.isRequired
}