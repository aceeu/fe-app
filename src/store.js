import { createStore, combineReducers, applyMiddleware } from 'redux';
import { get, post } from './communicate';
import moment from 'moment';

export const actions_constants = {
    ADD_RECORD: 'ADD_RECORD',
    FETCH_RECORDS: 'FETCH_RECORDS',
    DELETE_RECORD: 'DELETE_RECORD',
    EDIT_RECORD: 'EDIT_RECORD',
    CHANGE_SORT: 'CHANGE_SORT',
    CHANGE_FILTER: 'CHANGE_FILTER',
    UPDATE_LOGIN: 'UPDATE_LOGIN'
};
const sort_options = {
    SORT_BY_TIME: 'SORT_BY_TIME',
    SORT_BY_SUM: 'SORT_BY_SUM',
    SORT_NATURAL: 'SORT_NATURAL'
};
// actions

const newRecordTemplate = {
    id: '%id',
    created: moment(),
    edited: moment(), // время редактирования
    editor: '%user', // кто отредактировал
    creator: '%user',
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
        creator,
        category,
        buyDate,
        buyer,
        product,
        sum,
        whom,
        note
    }
}

export const editedRecord = (data) => {
    return {
        type: actions_constants.EDIT_RECORD,
        ...data
    }
}

export const newSort = (sort = sort_options.SORT_BY_TIME) => ({type: actions_constants.CHANGE_SORT, sort})

export const updateLogin = (userName) => ({type: actions_constants.UPDATE_LOGIN, user: userName});

const initialState = {
    records: [],
    filter: '', // dateFilter
    sort: '',
    user: '' // login user
}

// reducers

export const record = (record, action) => {
    const {type, ...actionData} = action;
    switch(action.type) {
        case actions_constants.ADD_RECORD: {
            return {...actionData}
        }
        case actions_constants.EDIT_RECORD: {
            return (record._id !== actionData._id) ? record : {...actionData}
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
        case actions_constants.EDIT_RECORD: {
            return records.map(i => record(i, action));
        }
        case actions_constants.FETCH_RECORDS: {
            return action.data;
        }
        case actions_constants.UPDATE_LOGIN: {
            if(action.user)
                return records;
            else return [];
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

export const user = (user='', action) => {
    switch(action.type) {
        case actions_constants.UPDATE_LOGIN: {
            return action.user;
        }
        default: return user;
    }
}

const loginDetector = store => next => action => {
    next(action);
    if(action.type == actions_constants.UPDATE_LOGIN) {
        if (store.getState().user)
            fetchData();
        else
            store.dispatch({type: actions_constants.FETCH_RECORDS, data: []})
    }
}

export const store = applyMiddleware(loginDetector)(createStore)(combineReducers({records, filter, sort, user}), initialState);

async function fetchData () {
    let data = await post('/data', {period: 3, buyer: 'Женя'});
    if (data.res !== false) {
      store.dispatch({
        type: actions_constants.FETCH_RECORDS,
        data
      });
    }
  }


(async () => {
    const res = get(`/user`).then(res => {
        if (res.name)
            store.dispatch(updateLogin(res.name));
    });
})();
