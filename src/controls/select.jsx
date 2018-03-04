import * as React from 'react';
import PropTypes from 'prop-types';

export const Select = ({options, ...props}) => {
    const ops = options.map((o, i) => <option key={i}>{o}</option>)
    return (
        <select
            onChange={e => props.onSelect(e.target.value)}
            {...props}
        >
            {ops}
        </select>
    );
}

Select.propTypes = {
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
}