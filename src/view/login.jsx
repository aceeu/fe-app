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

    componentDidUpdate() {
        this.props.onData && this.props.onData(this.state, true);
    }

    render() {
        return (
            <div>
                <label>Имя</label>
                <TextInput 
                    onEnter={this.onEnter} 
                    onChange={e => {
                        this.setState({user: e.currentTarget.value});
                    }}
                    negative={this.state.user.length < 3}
                ></TextInput>
                <label>Пароль</label>
                <TextInput 
                    onEnter={this.onEnter} 
                    onChange={e => {
                        this.setState({password: e.currentTarget.value});
                    }}
                ></TextInput>
            </div>
        );
    }
}

Login.propsTypes = {
    onData: PropTypes.func
}