import * as React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../common/classnames';
import './controls.css'

export const Grid = props => {
    
    const headers = () => 
        <div
            className={'grid-header'}
        >
        {            
            props.showColumns.map((column, ci) => 
                <div
                    key={ci}
                    className={'grid-header-item'}
                    style={{width: props.headers[column].width}}
                    title={props.headers[column].label}
                >
                    {props.headers[column].label}
                </div>
            )
        }
        </div>;

    const body = () => 
        <React.Fragment>
            {
                props.list.map((row, i) => 
                    <div
                        key={i}
                        className={'grid-row'}
                    >
                        {   props.showColumns.map( column => 
                                <div
                                    className={cn('grid-row-item', column)}
                                    key={column}
                                    style={{width: props.headers[column].width}}
                                    title={row[column]}
                                    onClick={() => props.onItemClick(i)}
                                >
                                     {row[column]}
                                </div>
                            )
                        }
                    </div>)
            }
        </React.Fragment>;

    return (
            <div 
                className={'grid'}
            >
                { headers() }
                { body() }
            </div>
    );
}

Grid.propTypes = {
    headers: PropTypes.array.isRequired,
    list: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired
}