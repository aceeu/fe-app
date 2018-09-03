import * as React from 'react';
import { Login } from './login';
import { ShowModal } from './modal';
import { PropTypes } from 'prop-types';
import { get, post } from '../communicate';
import { Button, Intent } from "@blueprintjs/core";

function jssha(text) {
    const shaObj = new window.jsSHA("SHA-256", "TEXT");
    shaObj.update(text);
    return shaObj.getHash("HEX");
  }

export class LoginPanel extends React.Component {

    onLogoutButton = async() => {
        const res = await get(`/logout`);
        if (res.res === true)
            this.props.onLogin('');
    }

    renderButton() {
        return (
            <Button onClick={this.onLoginButton} intent={Intent.SUCCESS}>Авторизация</Button>
        )
    }

    renderLogoutButton() {
        return (
            <div>
                {this.props.user}
                <Button onClick={this.onLogoutButton} intent={Intent.PRIMARY}>
                    Выйти
                </Button>
            </div>
        )
    }

    async onLogin(data) {
        const senddata = {user: data.user, hash: jssha(data.password + data.token)};
        const res = await post(`/auth`, senddata);      
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