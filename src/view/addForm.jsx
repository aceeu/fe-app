import * as React from 'react';
import { TextInput, NumericInput } from '../controls/input';
import PropTypes from 'prop-types';
import './addForm.css'
import { BUYERS, CATEGORIES, TARGET, DateFormat } from '../define';
import { Select } from '../controls/select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { loggedUser } from '../App';


export class AddForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // creator: 'Неизвестно',
            buyDate: moment(),
            category: '',
            buyer: '',
            product: '',
            sum: 0,
            whom: '',
            note: '',
            invalidStatusSum: true // ошибка в заполнении полей
        }
    }

    onEnter = e => {}
    handleChange = e => this.setState({buyDate: e})
    isCorrectData() {
        return !this.state.invalidStatusSum
            && this.state.buyer.length !== 0
            && this.state.category.length !== 0
            && this.state.product.length !== 0;
    }
    componentDidUpdate() {
        let res = {
            buyDate: this.state.buyDate.format(DateFormat),
            category: this.state.category,
            buyer: this.state.buyer,
            product: this.state.product,
            sum: this.state.sum,
            whom: this.state.whom,
            note: this.state.note
        };

        this.props.onData && this.props.onData(res, this.isCorrectData());
    }

    isNaNSum (value) {
        return Number.isNaN(Number.parseFloat(value));
    }

    render() {
        return (
            <div className={'addForm'}>
                <label>{loggedUser}</label>
                <label>Кто потратил</label>
                <Select
                    options={BUYERS}
                    autoFocus
                    onSelect={e => this.setState({buyer: e})}
                    negative={this.state.buyer.length === 0}
                />
                <label>Дата покупки</label>
                <div
                    style={{display: 'flex', flexDirection: 'row'}}
                >
                <DatePicker
                    selected={this.state.buyDate}
                    onChange={this.handleChange}
                    dateFormat={DateFormat}
                />
                <button onClick={() => {
                    const yesterday = this.state.buyDate.subtract(1, 'days');
                    this.setState({buyDate: yesterday});
                }}>
                    -1 день
                </button>
                </div>
                <label>Категория</label>
                <Select
                    options={CATEGORIES}
                    onSelect={e => this.setState({category: e})}
                    negative={this.state.category.length === 0}
                />
                <label>Название</label>
                <TextInput 
                    onEnter={this.onEnter} 
                    onBlur={e => {
                        this.setState({product: e.currentTarget.value});
                    }}
                    negative={this.state.product.length < 3}
                ></TextInput>
                <label>Сумма расхода</label>
                <NumericInput 
                    onBlur={e => {
                        let value = e.currentTarget.value;
                        value = value.replace(',', '.');
                        const invalidStatusSum = this.isNaNSum(value);
                        this.setState({invalidStatusSum, sum: Number.parseFloat(value)});
                    }}
                    negative={this.state.invalidStatusSum || this.state.sum === 0}
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