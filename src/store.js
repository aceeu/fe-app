import { createStore, combineReducers, applyMiddleware } from 'redux';
import { get, post } from './communicate';
import moment from 'moment';
import { Period } from './define';

export const actions_constants = {
    ADD_RECORD: 'ADD_RECORD',
    FETCH_RECORDS: 'FETCH_RECORDS',
    DELETE_RECORD: 'DELETE_RECORD',
    EDIT_RECORD: 'EDIT_RECORD',
    CHANGE_SORT: 'CHANGE_SORT',
    CHANGE_FILTER: 'CHANGE_FILTER',
    CHANGE_PERIOD: 'CHANGE_PERIOD',
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

export const newRecord = ({creator, buyDate, category, buyer, product, sum, whom, note, _id}) => {
    return {
        type: actions_constants.ADD_RECORD,
        ...newRecordTemplate,
        _id,
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

export const deleteRecord = (id) => {
    return {
        type: actions_constants.DELETE_RECORD,
        id
    }
}

export const newSort = (sort = sort_options.SORT_BY_TIME) => ({type: actions_constants.CHANGE_SORT, sort})

export const newPeriod = (period) => ({type: actions_constants.CHANGE_PERIOD, period})

export const updateLogin = (userName) => ({type: actions_constants.UPDATE_LOGIN, user: userName});

export const newFilter = (filter) => ({type: actions_constants.CHANGE_FILTER, filter});

const emptyData = {records: [], summary: {}};
const initialState = {
    data: emptyData,
    period: Period.lastDay,
    filter: {},// {'columnName': ''}, // some text filter
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

export const data = (data = [], action) => {
    switch(action.type) {
        case actions_constants.ADD_RECORD: {
            return {...data, records: [...data.records, record({}, action)]}
        }
        case actions_constants.EDIT_RECORD: {
            return { ...data, records: data.records.map(i => record(i, action))};
        }
        case actions_constants.DELETE_RECORD: {
            return data.filter(v => v.id != action.id);
        }
        case actions_constants.FETCH_RECORDS: {
            return action.data;
        }
        case actions_constants.UPDATE_LOGIN: {
            if(action.user)
                return data;
            else return {records: [], summary:{}};
        }
        default: return data;
    }
}


export const filter = (state = {}, action) => {
    switch(action.type) {
        case actions_constants.CHANGE_FILTER: {
            return {...state, ...action.filter};
        }
        default: return state;
    }
}

export const period = (state = Period.lastDay, action) => {
    switch (action.type) {
        case actions_constants.CHANGE_PERIOD: {
            return action.period;
        }
        default: return state;
    }
}

export const sort = (sort = '', action) => {
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

const stateModifyDetector = store => next => action => {
    next(action);
    if(action.type == actions_constants.UPDATE_LOGIN ||
        action.type == actions_constants.CHANGE_PERIOD ||
        action.type == actions_constants.CHANGE_FILTER) {
        if (store.getState().user)
            fetchData(store);
        else
            store.dispatch({type: actions_constants.FETCH_RECORDS, data: []})
    }
}

export const store = applyMiddleware(stateModifyDetector)(createStore)(
    combineReducers({data, filter, sort, period, user}), initialState
);

function getStartData(period) {

  switch (period) {
    case Period.lastDay: return moment().subtract(1, 'days').toDate();
    case Period.lastWeek: return moment().subtract(7, 'days').toDate();
    case Period.thisMonth: return moment().startOf('month').toDate();
    case Period.last30days: return moment().subtract(30, 'days').toDate();
    case Period.lastYear: return moment().startOf('year').toDate();
    default: throw 'invalid period';
  }
}

async function fetchData (state) {
    let fromDate = getStartData(state.getState().period);
    let filter = state.getState().filter;
    let data = await post('/data', {fromDate, filter});
    if (data.res !== false) {
      store.dispatch({
        type: actions_constants.FETCH_RECORDS,
        data: {records: data.res, summary: data.summary}
      });
    }
  }


(async () => {
    const res = get(`/user`).then(res => {
        if (res.name)
            store.dispatch(updateLogin(res.name));
    });
})();
