import * as React from 'react';
import { TextInput, NumericInput } from '../controls/input';
import PropTypes from 'prop-types';
import './addForm.css'
import { BUYERS, CATEGORIES, TARGET, DateFormat } from '../define';
import { Select } from '../controls/select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


export class AddForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            creator: 'Неизвестно',
            buyDate: moment(),
            category: '',
            buyer: '',
            product: '',
            sum: 0,
            whom: '',
            note: ''
        }
    }

    onEnter = e => {}
    handleChange = e => this.setState({buyDate: e})
    componentDidUpdate() {
        let res = {...this.state, buyDate: this.state.buyDate.format(DateFormat)};
        this.props.onData && this.props.onData(res);
    }
    render() {
        return (
            <div className={'addForm'}>
                <label>Кто потратил</label>
                <Select
                    options={BUYERS}
                    autoFocus
                    onSelect={e => this.setState({buyer: e})}
                />
                <label>Дата покупки</label>
                <DatePicker
                    selected={this.state.buyDate}
                    onChange={this.handleChange}
                    dateFormat={DateFormat}
                />
                <label>Категория</label>
                <Select
                    options={CATEGORIES}
                    onSelect={e => this.setState({category: e})}
                />
                <label>Название</label>
                <TextInput 
                    onEnter={this.onEnter} 
                    onBlur={e => {
                        this.setState({product: e.currentTarget.value});
                    }}
                ></TextInput>
                <label>Сумма расхода</label>
                <NumericInput 
                    onEnter={this.onEnter}
                    onBlur={e => {
                        this.setState({sum: +e.currentTarget.value});
                    }}
                />
                <label>Кому покупка</label>
                <Select
                    options={TARGET}
                    onSelect={e => this.setState({whom: e})}
                />
                <label>Примечание</label>
                <textarea
                    onChange={e => this.setState({note: e.target.value})}
                ></textarea>
            </div>
    );}
}

AddForm.propsTypes = {
    onData: PropTypes.func
}