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

export const newPeriod = (period) => ({type: actions_constants.CHANGE_PERIOD, period})

export const updateLogin = (userName) => ({type: actions_constants.UPDATE_LOGIN, user: userName});

const initialState = {
    records: [],
    period: Period.lastDay,
    filter: '', // some text filter
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
    if(action.type == actions_constants.UPDATE_LOGIN || action.type == actions_constants.CHANGE_PERIOD) {
        if (store.getState().user)
            fetchData(store.getState().period);
        else
            store.dispatch({type: actions_constants.FETCH_RECORDS, data: []})
    }
}

export const store = applyMiddleware(stateModifyDetector)(createStore)(
    combineReducers({records, filter, sort, period, user}), initialState
);

function getStartData(period) {
  const Period = {
    lastDay: 1,
    lastWeek: 2,
    lastMonth: 3,
    lastYear: 4
  };
  switch (period) {
    case Period.lastDay: return moment().subtract(1, 'days').toDate();
    case Period.lastWeek: return moment().subtract(7, 'days').toDate();
    case Period.lastMonth: return moment().subtract(1, 'months').toDate();
    case Period.lastYear: return moment().subtract(50, 'days').toDate();
    default: throw 'invalid period';
  }
}

async function fetchData (period, buyer = '') {
    let fromDate = getStartData(period);
    let data = await post('/data', {fromDate, buyer});
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
