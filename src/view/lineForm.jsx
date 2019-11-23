import * as React from 'react';
import DatePicker from 'react-datepicker';
import './addForm.css';
import './styles.css';
import moment from 'moment';
import { BUYERS, TARGET, DateFormat, usersMap } from '../define';
import { Select } from '../controls/select';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import { cn } from '../common/classnames';
import { TextInput, NumericInput } from '../controls/input';
import { Radio, RadioGroup, Collapse } from "@blueprintjs/core";

function mathExpSum(exp) {
    if (typeof exp === 'string') {
        let expr = exp.split(' ').join('');
        let values = expr.split('+');
        let sum = (a, v) => a + Number.parseFloat(v);
        return values.reduce(sum, 0);
    } else if (typeof exp === 'number')
        return +exp;
    return NaN;
}

const Collapseable = props => {
    const [isOpen, setOpen] = React.useState(false);
    return <React.Fragment>
        <i
            onClick={() => setOpen(!isOpen)}
            className={cn(isOpen ? 'fa fa-minus-square-o fa-lg' : 'fa fa-plus-square-o fa-lg', 'fa-button')}
            style={{marginTop: '10px'}}
        ></i>
        <Collapse
            isOpen={isOpen}
        >
            {props.children}
        </Collapse>
    </React.Fragment>
}

export default class LineForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: props._id,
            creator: props.creator,
            buyDate: props.buyDate, // в формате moment
            category: props.category,
            buyer: props.buyer || usersMap[this.props.user],
            product: props.product,
            sum: +props.sum,
            whom: props.whom,
            note: props.note,
            isInvalid: false // ошибка в заполнении полей
        }
        if (this.props.editMode) {
            let st = {...this.state};
            delete st.isInvalid;
            delete st.creator;
        } else {
            this.state.category = props.categories[0];
        }
    }

    onEnter = e => {}
    handleChange = e => this.setState({buyDate: e})
isCorrectData() {
        return !this.state.isInvalid
            && this.state.buyer.length !== 0
            && this.state.category.length !== 0
            && isNaN(mathExpSum(this.state.sum)) === false
    }
    componentDidUpdate() {
        let res = {
            _id: this.props._id,
            creator: this.props.creator,
            buyDate: this.state.buyDate,
            category: this.state.category,
            buyer: this.state.buyer,
            product: this.state.product,
            sum: mathExpSum(this.state.sum),
            whom: this.state.whom,
            note: this.state.note
        };
        this.isCorrectData() && this.props.onData && this.props.onData(res);
    }

    render() {
        return (
            <div className={'addForm'}>
                <RadioGroup
                    label="Покупатель"
                    onChange={e => this.setState({buyer: e.currentTarget.value})}
                    selectedValue={this.state.buyer}
                    inline
                >
                    {BUYERS.filter(b => !!b).map(b => <Radio key={b} label={b} value={b}></Radio>)}
                </RadioGroup>
                <label>Дата</label>
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
                            const sum = mathExpSum(value);
                            const invalidStatusSum = isNaN(sum);
                            this.setState({invalidStatusSum, sum: value});
                        }}
                        negative={this.state.isInvalid || this.state.sum === 0}
                        value={this.state.sum}
                        defaultSelect
                        type={'number'}
                    />
                    <div style={{width: '74px', overflow: 'auto', paddingTop: '3px', paddingLeft: '3px'}}> {mathExpSum(this.state.sum)} </div>
                </div>
                <Collapseable>
                    <div
                        className={'collapseable'}
                    >
                        <label>Кому покупка</label>
                        <Select
                            options={TARGET}
                            onSelect={e => this.setState({whom: e})}
                            value={this.state.whom}
                        />
                    </div>
                </Collapseable>
                <Collapseable>
                    <div
                        className={'collapseable'}
                    >
                        <label>Примечание</label>
                        <textarea
                            onChange={e => this.setState({note: e.target.value})}
                            value={this.state.note}
                        ></textarea>
                    </div>
                </Collapseable>
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