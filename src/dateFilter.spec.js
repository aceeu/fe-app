import {
    isinNlastDays,
    isInRangeDate,
    dateFilter
} from './dateFilter';

it('isinNlastDays', () => {
    expect(isinNlastDays(30, '2018-02-01')).toBeTruthy();
    expect(isinNlastDays(5, '2018-02-01')).toBeFalsy();
});

it('isInRangeDate', () => {
    expect(isInRangeDate('2018-02-20', dateFilter.LASTWEEK)).toBeTruthy();
    expect(isInRangeDate('2018-02-05', dateFilter.THISMONTH)).toBeTruthy();
    expect(isInRangeDate('2018-01-05', dateFilter.THISMONTH)).toBeFalsy();
})  