import React from 'react';

export const Summary = (props) => {
    const keys = Object.keys(props.summary);
    return (
        keys.map(p => {
            return <div>
                <span>{p}:</span><span>{props.summary[p]}</span>
            </div>
        })
    );
}