import * as React from 'react';
import { TextInput } from '../controls/input';
import PropTypes from 'prop-types';
import { get } from '../communicate';
import './login.css';
import { Button, Text } from '@blueprintjs/core';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: undefined,
            user: '',
            password: ''
        }
    }

    onEMess = async () => {
        const token = await get('/authtoken');
        if(token.res)
            this.setState({token: token.token});
    }

    renderEnterMess() {
        return (
            <Button 
                onClick={this.onEMess}>
                Войти
            </Button>
        );
    }

    render() {
        return this.state.token === undefined ? this.renderEnterMess() :
            (
            <div className={'login'}>
                <Text>Имя</Text>
                <TextInput 
                    onBlur={
                        e => this.setState({user: e.currentTarget.value})
                    }
                    onEnter={e => {
                        this.setState({user: e}, () => {this.props.onData(this.state)});
                    }}
                    negative={this.state.user.length < 3}
                ></TextInput>
                <Text>Пароль</Text>
                <TextInput 
                    onBlur={e => this.setState({password: e.currentTarget.value})}
                    onEnter={e => {
                        this.setState({password: e}, () => {this.props.onData(this.state)});
                    }}
                    password
                ></TextInput>
            </div>
        );
    }
}

Login.propsTypes = {
    onData: PropTypes.func
}