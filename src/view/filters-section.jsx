import * as React from 'react';
import PropTypes from 'prop-types';
import './filters-section.css';
import { cn } from '../common/classnames';

const classes = {
    top: 'filters-section',
    item: 'filters-section-item',
    selected: 'filters-section-selected',
    title: 'filters-section-title'
}

export const FiltersSection = (props) => {
    const renderItems = () => {
        return props.list.map(e => 
            <div 
                className={cn(classes.item, e.value == props.selected ? classes.selected : undefined)}
                onClick={() => {props.onSelect(e.value)}}
            >
                {e.name}
            </div>
        );
    }

    return (
        <div className={classes.top}>
            <div className={classes.title}>{props.title}</div>
            {renderItems()}
        </div>
    )
}

FiltersSection.propTypes = {
    list: PropTypes.array.isRequired, // {name: 'name, value: 0}
    onSelect: PropTypes.func.isRequired,
    title: PropTypes.string,
    selected: PropTypes.number.isRequired
}