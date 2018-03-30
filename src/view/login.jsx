import * as React from 'react';
import { TextInput, NumericInput } from '../controls/input';
import PropTypes from 'prop-types';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        }
    }

    render() {
        return (
            <div>
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
                    onBlur={e => this.setState({user: e.currentTarget.value})}
                    onEnter={e => {
                        this.setState({password: e}, () => {this.props.onData(this.state)});
                    }}
                ></TextInput>
            </div>
        );
    }
}

Login.propsTypes = {
    onData: PropTypes.func
}