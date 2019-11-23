import * as React from 'react';
import { TextInput } from '../controls/input';
import PropTypes from 'prop-types';
import './login.css';
import './styles.css';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phase: 0,
            user: '',
            password: ''
        }
    }

    onEMess = async () => {
            this.setState({phase: 1});
    }

    renderEnterMess() {
        return (
            <div 
                className={'text-button'}
                onClick={this.onEMess}>
                Войти
            </div>
        );
    }

    render() {
        return !this.state.phase ? this.renderEnterMess() :
            (
            <div className={'login'}>
                <label>
                    Имя
                    <TextInput 
                        onBlur={
                            e => this.setState({user: e.currentTarget.value})
                        }
                        onEnter={e => {
                            this.setState({user: e}, () => {this.props.onData(this.state)});
                        }}
                        negative={this.state.user.length < 3}
                    ></TextInput>
                </label>
                <label>Пароль
                    <TextInput
                        maxlength={15}
                        onBlur={e => this.setState({password: e.currentTarget.value})}
                        onEnter={e => {
                            this.setState({password: e}, () => {this.props.onData(this.state)});
                        }}
                        password
                    ></TextInput>
                </label>
            </div>
        );
    }
}

Login.propsTypes = {
    onData: PropTypes.func
}