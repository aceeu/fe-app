import * as React from 'react';
import './top-container.css';
import { ListViewContainer } from './list';
import { ActionsSection } from './actions-section';

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
            <div className={classes.filterSection}> </div>
            <div className={classes.listSection}>
                <ListViewContainer/>
            </div>
        </div>

    )
}