
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
    UPDATE_LOGIN: 'UPDATE_LOGIN',
    FETCH_CATEGORIES: 'FETCH_CATEGORIES',
    SETSUMMARY: 'SETSUMMARY'
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

export const fetchCategories = (categories) => ({type: actions_constants.FETCH_CATEGORIES, categories});

export const setSummary = (summary) => ({type: actions_constants.SETSUMMARY, summary});

const emptyData = {records: [], summary: {}};
const initialState = {
    data: emptyData,
    period: Period.lastDay,
    filter: {},// {'columnName': ''}, // some text filter
    sort: '',
    user: '', // login user
    categories: []
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

export const data = (data = emptyData, action) => {
    switch(action.type) {
        case actions_constants.ADD_RECORD: {
            return {...data, records: [...data.records, record({}, action)]}
        }
        case actions_constants.EDIT_RECORD: {
            return { ...data, records: data.records.map(i => record(i, action))};
        }
        case actions_constants.DELETE_RECORD: {
            return {...data, records: data.records.filter(v => v.id !== action.id)};
        }
        case actions_constants.FETCH_RECORDS: {
            return action.data;
        }
        case actions_constants.UPDATE_LOGIN: {
            if(action.user)
                return data;
            else return emptyData;
        }
        case actions_constants.SETSUMMARY: {
            return  {records: data.records, summary: action.summary};
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

export const sort = (sort = sort_options.SORT_NATURAL, action) => {
    switch(action.type) {
        case actions_constants.CHANGE_SORT: {
            return action.sort;
        }
        default: return sort;
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

export const categories = (categories=[], action) => {
    switch (action.type) {
        case actions_constants.FETCH_CATEGORIES: {
            return action.categories;
        }
        default: return categories;
    }
}

const stateModifyDetector = store => next => action => {
    next(action);
    if(action.type === actions_constants.UPDATE_LOGIN ||
        action.type === actions_constants.CHANGE_PERIOD ||
        action.type === actions_constants.CHANGE_FILTER) {
        if (store.getState().user)
            fetchData(store);
        else
            store.dispatch({type: actions_constants.FETCH_RECORDS, data: emptyData})
    }
}

export const store = applyMiddleware(stateModifyDetector)(createStore)(
    combineReducers({data, filter, sort, period, user, categories}), initialState
);

// function getStartData(period) {

//   switch (period) {
//     case Period.lastDay: return moment().subtract(1, 'days').toDate();
//     case Period.lastWeek: return moment().subtract(7, 'days').toDate();
//     case Period.thisMonth: return moment().startOf('month').toDate();
//     case Period.last30days: return moment().subtract(30, 'days').toDate();
//     case Period.lastYear: return moment().startOf('year').toDate();
//     default: throw Error('invalid period');
//   }
// }

function getFromToDates(period) {
    const res = {fromDate: null, toDate: moment().toDate()}
    switch (period) {
        case Period.lastWeek:
            res.fromDate = moment().subtract(7, 'days').toDate()
            break
        case Period.thisMonth:
            res.fromDate = moment().startOf('month').toDate();
            break
        case Period.last30days:
            res.fromDate = moment().subtract(30, 'days').toDate();
            break
        case Period.lastYear:
            res.fromDate = moment().startOf('year').toDate();
            break
        case Period.prevMonth: 
            res.fromDate = moment().subtract(1, 'months').startOf('month')
            res.toDate = moment().subtract(1, 'months').endOf('month')
            break
        case Period.lastDay: 
        default:
            res.fromDate = moment().subtract(1, 'days').toDate()
    }
    return res    
}

async function fetchData (state) {
    const filter = state.getState().filter;

    const data = await post('/data', {...getFromToDates, filter});
    if (data.res !== false) {
      store.dispatch({
        type: actions_constants.FETCH_RECORDS,
        data: {records: data.res, summary: data.summary}
      });
    }
}

export function fetchCategoriesAndApply() {
    get('/categories').then(r => {
        r.res.sort((a, b) => (b.entry - a.entry));
        const categories = r.res.map(v => v.cat);
        store.dispatch(fetchCategories(categories));
    })
}


(async () => {
    get(`/user`).then(res => {
        if (res.name) {
            store.dispatch(updateLogin(res.name));
            fetchCategoriesAndApply();
        }
    });
})();
