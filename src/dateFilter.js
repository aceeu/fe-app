import moment from 'moment';

export const dateFilter = {
    LASTDAY: 'lastday',
    LASTWEEK: 'lastweek',
    THISMONTH: 'thismonth', // last 30 days
    LASTMONTH: 'lastmonth',
    LASTYEAR: 'lastyear'
}

// const TOMMOROW_DATE = date('Y-m-d', time() + 86400);

export const isinNlastDays = (nDays, dateStr) => { // число и '2018-02-06'
    const from = moment().subtract(nDays, 'days')
    const now = moment();
    return moment(dateStr).isBetween(from, now);
}

const isBeetween = (dateStr, from) => moment(dateStr).isBetween(from, moment());

const dataFilters = [
    {
        name: dateFilter.LASTDAY,
        isIn: (dateStr) => {
            return isinNlastDays(1, dateStr);
        }
    },
    {
        name: dateFilter.LASTWEEK,
        isIn: (dateStr) => {
            const from = moment().subtract(1, 'week');
            return isBeetween(dateStr, from);
        }
    },
    {
        name: dateFilter.THISMONTH,
        isIn: (dateStr) => {
            const from = moment().startOf('month');
            return isBeetween(dateStr, from);
        }
    },
    {
        name: dateFilter.LASTMONTH,
        isIn: (dateStr) => isinNlastDays(30, dateStr)
    },
    {
        name: dateFilter.LASTYEAR,
        isIn: (dateStr) => {
            const from = moment().startOf('year');
            return isBeetween(dateStr, from);
        }

    }
]

export const isInRangeDate = (dateStr, period) => {
    const f = dataFilters.find(filter => period == filter.name)
    return f ? f.isIn(dateStr) : false;
}