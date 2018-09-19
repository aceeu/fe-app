import * as React from 'react';
import './top-container.css';
import { ListViewContainer } from './list';
import { ActionsSection } from './actions-section';
import { FiltersSection } from './filters-section';
import { store, newPeriod } from '../store';
import { timePeriods } from '../define';

 
const classes = {
    topContainer: 'top-container',
    actionSection: 'action-section',
    fiterSection: 'filter-section',
    listSection: 'list-section'
}

export const TopContainer = (props) => {
    return (
        <div className={classes.topContainer}>
            <ActionsSection className={classes.actionSection}> </ActionsSection>
            <FiltersSection 
                title={'Фильтры'}
                selected={store.getState().period}
                list={timePeriods} onSelect={(val => 
                    store.dispatch(newPeriod(val))
                )}
            > 
            </FiltersSection>
            <div className={classes.listSection}>
                <ListViewContainer/>
            </div>
        </div>

    )   
}