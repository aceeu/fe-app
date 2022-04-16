import * as React from 'react';
//import DatePicker from 'react-datepicker';
import './addForm.css';
import './styles.css';
import moment from 'moment';
import { BUYERS, TARGET, DateFormat, usersMap } from '../define';
//import { Select } from '../controls/select';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import { cn } from '../common/classnames';
import { TextInput, NumericInput } from '../controls/input';
// import { Radio, RadioGroup, Collapse } from "@blueprintjs/core";
import {Collapse } from "@blueprintjs/core";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {
    InputLabel, Box,
    Select, MenuItem, TextField 
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ruLocale from "date-fns/locale/ru";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


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
        {!isOpen ? <AddCircleOutlineIcon onClick={() => setOpen(!isOpen)}/>
            : <RemoveCircleOutlineIcon onClick={() => setOpen(!isOpen)}/>
        }
        <Collapse
            isOpen={isOpen}
        >
            {props.children}
        </Collapse>
    </React.Fragment>
}

export default class LineForm extends React.Component {

    constructor(props) {
        //console.log(props.category)
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

    //onEnter = e => this.props.onEnter(e);
    
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
            <Box
                color='primary' sx={{ minWidth: 220 }}
                bgcolor='primary.light'
            >
            <FormControl color='primary' fullWidth>
                
                <RadioGroup
                    variant='outlined'
                    row
                    aria-label='Покупатель'
                    onChange={e => this.setState({buyer: e.currentTarget.value})}
                    value={this.state.buyer}
                >
                    {BUYERS.filter(b => !!b).map(b => <FormControlLabel key={b} value={b} control={<Radio />} label={b} />)}
                </RadioGroup>

                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                <DatePicker
                    label="Дата"
                    value={this.state.buyDate}
                    onChange={e => this.setState({buyDate: e})}
                    mask='__.__.____'
                    renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>

                <div style={{position: 'relative', margin: '20px 0 20px', display: 'flex'}}>
                    <InputLabel id="category_select">Категория</InputLabel>
                    <Select
                        required
                        label='Категория'
                        labelId='category_select'
                        onChange={e => this.setState({category: e.target.value})}
                        // negative={this.state.category.length === 0}
                        value={this.state.category}
                        style={{flexGrow: 1}}
                    >
                        {
                            this.props.categories.map((e, i) => <MenuItem key={i} value={e}>{e}</MenuItem>)
                        }
                    </Select>
                </div>



                <TextField 
                    required
                    id="outlined-basic"
                    label="Название"
                    variant="outlined"
                    // onEnter={this.onEnter} 
                    onChange={e => {
                        this.setState({product: e.currentTarget.value});
                    }}
                    value={this.state.product}
                />



                <div
                    style={{display: 'flex', flexDirection: 'row',  margin: '20px 0 20px', alignItems: 'baseline'}}
                >
                    <TextField
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        required
                        id="sum_control"
                        label="Сумма расхода"
                        variant="outlined"
                        //onEnter={this.onEnter} 
                        onChange={e => {
                            let value = e.currentTarget.value;
                            value = value.replace(',', '.');
                            const sum = mathExpSum(value);
                            const invalidStatusSum = isNaN(sum);
                            this.setState({invalidStatusSum, sum: value});
                        }}
                        // negative={this.state.isInvalid || this.state.sum === 0}
                        value={this.state.sum}
                    />
                    <div style={{width: '74px', overflow: 'auto', paddingTop: '3px', paddingLeft: '3px'}}> {mathExpSum(this.state.sum)} </div>
                </div>


                <Collapseable>
                <div style={{position: 'relative', margin: '20px 0 20px', display: 'flex'}}>
                    <InputLabel id="category_for">Кому покупка</InputLabel>
                    <Select
                        variant='outlined'
                        required
                        label='Кому покупка'
                        labelId='category_for'
                        onChange={e => this.setState({whom: e.target.value})}
                        //negative={this.state.category.length === 0}
                        value={this.state.whom}
                        style={{flexGrow: 1}}
                    >
                        {
                            TARGET.map((e, i) => <MenuItem key={i} value={e}>{e}</MenuItem>)
                        }
                    </Select>
                </div>



                {/* <Collapseable>
                    <div
                        className={'collapseable'}
                    >
                        <label>Примечание</label>
                        <textarea
                            onChange={e => this.setState({note: e.target.value})}
                            value={this.state.note}
                        ></textarea>
                    </div>
                </Collapseable> */}


                <TextField 
                    required
                    id="outlined-basic"
                    label="Примечание"
                    variant="outlined"
                    //onEnter={this.onEnter} 
                    onChange={e => this.setState({note: e.target.value})}
                    value={this.state.note}
                />
                </Collapseable>

            </FormControl>
            </Box>
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