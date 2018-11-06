import * as React from 'react';
import DatePicker from 'react-datepicker';
import './addForm.css'
import moment from 'moment';
import { BUYERS, TARGET, DateFormat } from '../define';
import { Select } from '../controls/select';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import { TextInput, NumericInput } from '../controls/input';

export default class LineForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: props._id,
            creator: props.creator,
            buyDate: props.buyDate, // в формате moment
            category: props.category,
            buyer: props.buyer,
            product: props.product,
            sum: +props.sum,
            whom: props.whom,
            note: props.note,
            invalidStatusSum: false // ошибка в заполнении полей
        }
        if (this.props.editMode) {
            let st = {...this.state};
            delete st.invalidStatusSum;
            delete st.creator;
            this.props.onData && this.props.onData(st, this.isCorrectData());    
        } else {
            this.state.category = props.categories[0];
        }
    }

    onEnter = e => {}
    handleChange = e => this.setState({buyDate: e})
    isCorrectData() {
        return !this.state.invalidStatusSum
            && this.state.buyer.length !== 0
            && this.state.category.length !== 0;
    }
    componentDidUpdate() {
        let res = {
            _id: this.props._id,
            creator: this.props.creator,
            buyDate: this.state.buyDate,
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
                <label>{this.props.user}</label>
                <label>Кто потратил</label>
                <Select
                    options={BUYERS}
                    autoFocus
                    onSelect={e => this.setState({buyer: e})}
                    negative={this.state.buyer.length === 0}
                    value={this.state.buyer}
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
                    options={this.props.categories}
                    onSelect={e => this.setState({category: e})}
                    negative={this.state.category.length === 0}
                    value={this.state.category}
                />
                <label>Название</label>
                <TextInput 
                    onEnter={this.onEnter} 
                    onChange={e => {
                        this.setState({product: e.currentTarget.value});
                    }}
                    value={this.state.product}
                ></TextInput>
                <label>Сумма расхода</label>
                <div
                    style={{display: 'flex', flexDirection: 'row'}}
                >
                    <NumericInput 
                        style={{width: '160px'}}
                        onChange={e => {
                            let value = e.currentTarget.value;
                            value = value.replace(',', '.');
                            const invalidStatusSum = this.isNaNSum(value);
                            this.setState({invalidStatusSum, sum: value == '' ? '' : Number.parseFloat(value)});                        
                        }}
                        negative={this.state.invalidStatusSum || this.state.sum === 0}
                        value={this.state.sum}
                    />
                    <div style={{width: '74px', overflow: 'auto', paddingTop: '3px', paddingLeft: '3px'}}> {this.state.sum} </div>
                </div>
                <label>Кому покупка</label>
                <Select
                    options={TARGET}
                    onSelect={e => this.setState({whom: e})}
                    value={this.state.whom}
                />
                <label>Примечание</label>
                <textarea
                    onChange={e => this.setState({note: e.target.value})}
                    value={this.state.note}
                ></textarea>
            </div>
        );
    }
}

LineForm.propsTypes = {
    editMode: PropTypes.bool,
    onData: PropTypes.func,
    user: PropTypes.string.isRequired,

    _id: PropTypes.string,
    creator: PropTypes.string.isRequired,
    buyDate: PropTypes.instanceOf(moment).isRequired,
    category: PropTypes.string.isRequired,
    buyer: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    sum: PropTypes.number.isRequired,
    whom: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequred
}