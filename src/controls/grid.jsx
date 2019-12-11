import * as React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../common/classnames';
import './controls.css'

export const Grid = ({showColumns, headers, list = [], onItemClick}) => {
    
    const headersDiv = () => 
        <div
            className={'grid-header'}
            key={'header'}
        >
        {            
            showColumns.map((column, ci) => 
                <div
                    key={ci}
                    className={'grid-header-item'}
                    style={{width: headers[column].width + '%'}}
                    title={headers[column].label}
                >
                    {headers[column].label}
                </div>
            )
        }
        </div>;

    const body = (list) => 
        <React.Fragment>
            {
                list.map((row, i) => 
                    <div
                        key={i}
                        className={'grid-row'}
                    >
                        {   showColumns.map( column => 
                                <div
                                    className={cn('grid-row-item', column)}
                                    key={column}
                                    style={{width: headers[column].width + '%'}}
                                    title={row[column]}
                                    onClick={() => onItemClick(i)}
                                >
                                     {row[column]}
                                </div>
                            )
                        }
                    </div>)
            }
        </React.Fragment>;

    return ([
        headersDiv(),
        <div 
            className={'grid'}
        >
            { body(list) }
        </div>
    ]);
}

Grid.propTypes = {
    headers: PropTypes.object.isRequired,
    list: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired
}