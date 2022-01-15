import * as React from 'react';
import './top-container.css';
import { PropTypes } from 'prop-types';
import { ListViewContainer } from './list';
import { FiltersSection } from './filters-section';
import { newPeriod, newFilter, updateLogin, fetchCategoriesAndApply } from '../store';
import { timePeriods, BUYERS } from '../define';
import Summary from './summary';
import { LoginPanel } from './login-panel';
import Switch from '@mui/material/Switch';

const classes = {
    content: 'content',
    topContainer: 'top-container',
    actionSection: 'action-section',
    filtersContainer: 'filters-container',
    fiterSection: 'filter-section',
    listSection: 'list-section',
    controlsSection: 'controls-section'
}

export const TopContainer = (props, {store}) => {
    const onLogin = (user) => {
        store.dispatch(updateLogin(user));
        if (user)
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

export const Content = (props, {store}) => {
    const [showBarChart, setShowBarChart] = React.useState(false);
    const user = store.getState().user;
    if (!user)
        return null;

    const filter = store.getState().filter;
    const buyerFilter = filter.buyer ? filter.buyer : '';
    const categoryFilter = filter.category ? filter.category : '';
    const buyers = [{name: 'Все', value: 'Все'}, ...BUYERS.map(value => ({ name : value, value}))];
    const categoriesList = [{name: 'Все', value: 'Все'}, ...store.getState().categories.map(c => ({name: c, value: c}))]

    return (
        <div className={classes.content}>
            <div className={classes.controlsSection}>
                <div className={classes.filtersContainer}>
                    <FiltersSection 
                        title={'Период:'}
                        selected={store.getState().period}
                        list={timePeriods} onSelect={(val => store.dispatch(newPeriod(val))
                        )}
                    />
                    <FiltersSection 
                        title={'Покупатель:'}
                        selected={buyerFilter}
                        list={buyers}
                        onSelect={(val => store.dispatch(newFilter({buyer: val}))
                        )}
                    />
                    <FiltersSection 
                        title={'Категория:'}
                        selected={categoryFilter}
                        list={categoriesList}
                        onSelect={(val => store.dispatch(newFilter({category: val}))
                        )}
                    />
                </div>
                <Switch
                    checked={showBarChart}
                    onChange={() => setShowBarChart(!showBarChart)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
            {showBarChart ? <Summary summary={store.getState().data.summary}/> : null}
            <ListViewContainer categories={store.getState().categories}/>
        </div>
    );
}

Content.contextTypes = {
    store: PropTypes.object
}