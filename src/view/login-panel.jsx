import * as React from 'react';
import { Login } from './login';
import { ShowModal } from './modal';
import { PropTypes } from 'prop-types';
import { get } from '../communicate';

export class LoginPanel extends React.Component {

    onLoginButton = async() => {
        let name_pass = await ShowModal({}, <Login />);
        const res = await get(`/auth/${name_pass.user}/pass/${name_pass.password}`);
        this.props.onLogin(res.name);
    }

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

    render() {
        return (
            <div>
                {this.props.user ? this.renderLogoutButton() : this.renderButton()}
            </div>
        );
    }
}

LoginPanel.propTypes = {
    user: PropTypes.string.isRequired,
    onLogin: PropTypes.func.isRequired
}