import * as React from 'react';
import PropTypes from 'prop-types';
import './filters-section.css';
import { cn } from '../common/classnames';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';


const classes = {
    filtersSection: 'filters-section',
    filtersSectionItem: 'filters-section-item',
    filtersSectionSelected: 'filters-section-selected',
    filtersSectionTitle: 'filters-section-title'
}

export const FiltersSection = (props) => {
    const [age, handleChange] = React.useState(10);
    const items = () => props.list.map((e, i) => 
        <option key={i} value={e.value}>{e.name}</option>
    )

    return (
        <div className={classes.filtersSection}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{props.title}</InputLabel>
                <NativeSelect
                    defaultValue={props.selected}
                    inputProps={{
                        name: props.title,
                        id: 'uncontrolled-native',
                    }}
                    onChange={e => props.onSelect(e.target.value)}
                >
                {items()}
                </NativeSelect>
            </FormControl>
        </div>
    )
};

FiltersSection.propTypes = {
    list: PropTypes.array.isRequired, // {name: 'name, value: 0}
    onSelect: PropTypes.func.isRequired,
    title: PropTypes.string,
    selected: PropTypes.string.isRequired
}
