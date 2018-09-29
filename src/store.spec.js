import { store, newRecord, newSort } from './store';
import { dateFilter } from './dateFilter';

it('add new record to store', () => {
    store.dispatch(newRecord('ace', '2018-02-23', 'Продукты', 'Аня', 'Хлеб', 20, '', ''));
    store.dispatch(newSort(dateFilter.LASTWEEK));
    expect(store.getState().data.records.length).toBe(1);
    expect(store.getState().sort).toBe(dateFilter.LASTWEEK);
    expect(store.getState().filter).toBe('');
});