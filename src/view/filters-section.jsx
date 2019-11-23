import * as React from 'react';
import PropTypes from 'prop-types';
import './filters-section.css';
import { cn } from '../common/classnames';

const classes = {
    filtersSection: 'filters-section',
    filtersSectionItem: 'filters-section-item',
    filtersSectionSelected: 'filters-section-selected',
    filtersSectionTitle: 'filters-section-title'
}

export const FiltersSection = (props) => {
    const renderItems = () => 
        props.list.map(e => 
            <div 
                className={cn(classes.filtersSectionItem, e.value === props.selected ? classes.filtersSectionSelected : undefined)}
                onClick={() => {props.onSelect(e.value)}}
            >
                {e.name}
            </div>
        );

    return (
        <div className={classes.filtersSection}>
            <div className={classes.filtersSectionTitle}>{props.title}</div>
            {renderItems()}
        </div>
    )
};

FiltersSection.propTypes = {
    list: PropTypes.array.isRequired, // {name: 'name, value: 0}
    onSelect: PropTypes.func.isRequired,
    title: PropTypes.string,
    selected: PropTypes.number.isRequired
}
