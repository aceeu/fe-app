import * as React from 'react';
import { TextInput, NumericInput } from '../controls/input';
import PropTypes from 'prop-types';
import { get } from '../communicate';
import './login.css';

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
            <div onClick={this.onEMess}>
                Войти
            </div>
        );
    }

    render() {
        return this.state.token === undefined ? this.renderEnterMess() :
            (
            <div className={'login'}>
                <label>Имя</label>
                <TextInput 
                    onBlur={
                        e => this.setState({user: e.currentTarget.value})
                    }
                    onEnter={e => {
                        this.setState({user: e}, () => {this.props.onData(this.state)});
                    }}
                    negative={this.state.user.length < 3}
                ></TextInput>
                <label>Пароль</label>
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