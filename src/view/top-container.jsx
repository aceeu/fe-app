import * as React from 'react';
import './top-container.css';
import { PropTypes } from 'prop-types';
import { ListViewContainer } from './list';
import { ActionsSection } from './actions-section';
import { FiltersSection } from './filters-section';
import { newPeriod, newFilter, updateLogin, fetchCategoriesAndApply } from '../store';
import { timePeriods, BUYERS } from '../define';
import Summary from './summary';
import { LoginPanel } from './login-panel';
import { get } from '../communicate';

const classes = {
    topContainer: 'top-container',
    actionSection: 'action-section',
    fiterSection: 'filter-section',
    listSection: 'list-section'
}

export const TopContainer = (props, {store}) => {
    const onLogin = (user) => {
        store.dispatch(updateLogin(user));
        fetchCategoriesAndApply();
    }

    const user = store.getState().user;

    return (
        <div className={classes.topContainer}>
            <LoginPanel
                user={user}
                onLogin={onLogin}
            />
            <Content/>
        </div>

    )   
}

TopContainer.contextTypes = {
    store: PropTypes.object
}

const Content = (props, {store}) => {
    const user = store.getState().user;
    if (user == '' || user == null)
        return null;

    const filter = store.getState().filter;
    let buyerFilter = filter.buyer ? filter.buyer : '';
    const buyers = BUYERS.map(value => {
        return value === '' ? {name: 'Все', value} : 
        { name : value, value}});

    return (
        <React.Fragment>
            <FiltersSection 
                title={'Период:'}
                selected={store.getState().period}
                list={timePeriods} onSelect={(val => 
                    store.dispatch(newPeriod(val))
                )}
            > 
            </FiltersSection>
            <FiltersSection 
                title={'Покупатель:'}
                selected={buyerFilter}
                list={buyers}
                onSelect={(val => 
                    store.dispatch(newFilter({buyer: val}))
                )}
            > 
            </FiltersSection>
            <ActionsSection className={classes.actionSection}> </ActionsSection>
            <div className={classes.listSection}>
                <ListViewContainer/>
            </div>
            <Summary summary={store.getState().data.summary}/>
        </React.Fragment>
    );
}

Content.contextTypes = {
    store: PropTypes.object
}