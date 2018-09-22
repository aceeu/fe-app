import * as React from 'react';
import './top-container.css';
import { ListViewContainer } from './list';
import { ActionsSection } from './actions-section';
import { FiltersSection } from './filters-section';
import { store, newPeriod, newFilter } from '../store';
import { timePeriods, BUYERS } from '../define';

 
const classes = {
    topContainer: 'top-container',
    actionSection: 'action-section',
    fiterSection: 'filter-section',
    listSection: 'list-section'
}


export const TopContainer = (props) => {
    const filter = store.getState().filter;
    let buyerFilter = filter.column == 'buyer' ? filter.text : undefined;

    return (
        <div className={classes.topContainer}>
            <ActionsSection className={classes.actionSection}> </ActionsSection>
            <FiltersSection 
                title={'Фильтры:'}
                selected={store.getState().period}
                list={timePeriods} onSelect={(val => 
                    store.dispatch(newPeriod(val))
                )}
            > 
            </FiltersSection>
            <FiltersSection 
                title={'Фильтр по покупателю:'}
                selected={buyerFilter}
                list={BUYERS.map(v => ({name: v == '' ? 'Все' : v, value: v}))}
                onSelect={(val => 
                    store.dispatch(newFilter({column: 'buyer', text: val}))
                )}
            > 
            </FiltersSection>
            <div className={classes.listSection}>
                <ListViewContainer/>
            </div>
        </div>

    )   
}