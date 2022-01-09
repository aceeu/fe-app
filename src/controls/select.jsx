import * as React from 'react';
import PropTypes from 'prop-types';
import './controls.css';

export const classes = {
    negative: 'textinput--negative'
  };

export const Select = ({options, ...props}) => {
    const ops = options.map((o, i) => <option key={i}>{o}</option>)
    return (
        <select
            onChange={e => props.onSelect(e.target.value)}
            className={props.negative ? classes.negative : ''}
            {...props}
        >
            {ops}
        </select>
    );
}

Select.propTypes = {
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    negative: PropTypes.bool
}