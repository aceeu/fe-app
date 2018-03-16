import { createStore, combineReducers } from 'redux';
import moment from 'moment';
import { loggedUser } from './App'

const actions_constants = {
    ADD_RECORD: 'ADD_RECORD',
    DELETE_RECORD: 'DELETE_RECORD',
    EDIT_RECORD: 'EDIT_RECORD',
    CHANGE_SORT: 'CHANGE_SORT',
    CHANGE_FILTER: 'CHANGE_FILTER'
};
const sort_options = {
    SORT_BY_TIME: 'SORT_BY_TIME',
    SORT_BY_SUM: 'SORT_BY_SUM',
    SORT_NATURAL: 'SORT_NATURAL'
};
// actions

const newRecordTemplate = {
    id: '%id',
    created: moment().unix()*1000,
    edited: moment().unix()*1000,
    creator: loggedUser,
    buyer: '%buyer',
    category: '%category',
    buyDate: '%buyDate',
    product: '%product',
    sum: NaN,
    whom: '%whom',
    note: '%note'
}

export const newRecord = ({creator, buyDate, category, buyer, product, sum, whom, note}) => {
    return {
        type: actions_constants.ADD_RECORD,
        ...newRecordTemplate,
        id: '$id',
        category,
        buyDate,
        buyer,
        product,
        sum,
        whom,
        note
    }
}

export const newSort = (sort = sort_options.SORT_BY_TIME) => ({type: actions_constants.CHANGE_SORT, sort})

const initialState = {
    records: [],
    filter: '', // dateFilter
    sort: ''
}

// reducers

export const record = (record, action) => {
    const {type, ...actionData} = action;
    switch(action.type) {
        case actions_constants.ADD_RECORD: {
            return {...actionData}
        }
        default: return record;
    }
}

export const records = (records = [], action) => {
    switch(action.type) {
        case actions_constants.ADD_RECORD: {
            return [...records,
                record({}, action)
            ]
        }
        default: return records;
    }
}

export const filter = (text='', action) => {
    switch(action.type) {
        case actions_constants.CHANGE_FILTER: {
            return action.text;
        }
        default: return '';
    }
}

export const sort = (sort='', action) => {
    switch(action.type) {
        case actions_constants.CHANGE_SORT: {
            return action.sort;
        }
        default: return sort_options.SORT_NATURAL;
    }
}

export const store = createStore(combineReducers({records, filter, sort}), initialState);

store.dispatch(newRecord({
    creator: 'ace',
    buyDate: '2018-02-23',
    category: 'Продукты',
    buyer: 'Аня',
    product: 'Хлеб',
    sum: 20,
    whom: 'Лизе',
    note: ''
}));
