import { createStore, combineReducers } from 'redux';
import moment from 'moment';

const actions_constants = {
    ADD_RECORD: 'ADD_RECORD',
    DELETE_RECORD: 'DELETE_RECORD',
    EDIT_RECORD: 'EDIT_RECORD',
    CHANGE_SORT: 'CHANGE_SORT',
    CHANGE_FILTER: 'CHANGE_FILTER'
};
const sort_options = {
    SORT_BY_TIME: 'SORT_BY_TIME',
    SORT_BY_SUM: 'SORT_BY_SUM'
};
// actions

// export const newFilter = {
//     type: actions_constants.CHANGE_FILTER,
//     text: ''
// }
export const newRecord = (creator, buyDate, category, buyer, product, sum, whom, note) => {
    return {
        type: actions_constants.ADD_RECORD,
        id: '',
        creator,
        buyDate,
        time: moment().milliseconds(), // newrecord created time
        category,
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
    switch(action.type) {
        case actions_constants.ADD_RECORD: {
            return {
                id: action.id,
                creator: action.creator,
                date: action.date,
                category: action.category,
                buyer: action.buyer,
                product: action.product,
                sum: action.sum,
                whom: action.whom,
                note: action.note
            }
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
        default: return sort;
    }
}

export const store = createStore(combineReducers({records, filter, sort}), initialState);