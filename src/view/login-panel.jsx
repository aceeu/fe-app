import * as React from 'react';
import { Login } from './login';
import { PropTypes } from 'prop-types';
import { get, post } from '../communicate';
import { Button, Intent } from '@blueprintjs/core';
import './login.css'

function jssha(text) {
    const shaObj = new window.jsSHA("SHA-256", "TEXT");
    shaObj.update(text);
    return shaObj.getHash("HEX");
  }

export class LoginPanel extends React.PureComponent {

    onLogoutButton = async() => {
        const res = await get(`/logout`);
        if (res.res)
            this.props.onLogin('');
    }

    renderLogoutButton() {
        return (
            <React.Fragment>
                <div style={{height: 'fitContent'}}>
                    {this.props.user}
                </div>
                <Button onClick={this.onLogoutButton} intent={Intent.PRIMARY}>
                    Выйти
                </Button>
            </React.Fragment>
        )
    }

    async onLogin(data) {
        const senddata = {user: data.user, hash: jssha(data.password + data.token)};
        const res = await post(`/auth`, senddata);      
        if (res.res)
            this.props.onLogin(res.name);
        else 
            window.alert(res.text);
    }

    render() {
        return (
            <div className='loginPanel'>
                {this.props.user ? this.renderLogoutButton() : <Login onData={e => this.onLogin(e)}/>}
            </div>
        );
    }
}

LoginPanel.propTypes = {
    user: PropTypes.string.isRequired,
    onLogin: PropTypes.func.isRequired
}