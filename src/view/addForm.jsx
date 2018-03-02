import * as React from 'react';
import { TextInput, NumericInput } from '../controls/input';
import PropTypes from 'prop-types';
import './addForm.css'


export class AddForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            sum: 0
        }
    }
    onEnter = e => {}
    render() {
        return (
            <div className={'addForm'}>
                <label>Кто потратил</label>
                <select></select>
                <label>Дата покупки</label>
                <TextInput/>
                <label>Категория</label>
                <select></select>
                <label>Название</label>
                <TextInput 
                    onEnter={this.onEnter} 
                    autoFocus
                    onBlur={e => {
                        this.setState({name: e.currentTarget.value},() => this.props.onData(this.state));
                    }}
                ></TextInput>
                <label>Сумма расхода</label>
                <NumericInput 
                    onEnter={this.onEnter}
                    onBlur={e => {
                        this.setState({sum: +e.currentTarget.value},() => this.props.onData(this.state));
                    }}
                />
                <label>Кому покупка</label>
                <select></select>
                <label>Примечание</label>
                <textarea></textarea>
            </div>
    );}
}

AddForm.propsTypes = {
    onData: PropTypes.func.isRequred
}