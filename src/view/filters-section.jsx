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
    const [displayList, setDisplayList] = React.useState(false);
    const renderItems = () => props.list.map((e, i) => 
            <div 
                key={i}
                className={cn(classes.filtersSectionItem, e.value === props.selected && classes.filtersSectionSelected)}
                onClick={() => {props.onSelect(e.value)}}
            >
                {e.name}
            </div>
        );

    const fa = displayList ? 'fa fa-compress' : 'fa fa-expand';
    return (
        <div className={classes.filtersSection}>
            <div
                className={classes.filtersSectionTitle}
                onClick={() => setDisplayList(!displayList)}
            >
                {props.title}
            </div>
            <i 
                className={fa}
                aria-hidden='true'
                onClick={() => setDisplayList(!displayList)}
            >
            </i>
            {displayList && renderItems()}
        </div>
    )
};

FiltersSection.propTypes = {
    list: PropTypes.array.isRequired, // {name: 'name, value: 0}
    onSelect: PropTypes.func.isRequired,
    title: PropTypes.string,
    selected: PropTypes.string.isRequired
}
