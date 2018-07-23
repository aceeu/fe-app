import * as React from 'react';
import PropTypes from 'prop-types';
import './controls.css'
import { cn } from '../common/classnames';

const classes = {
    grid: 'grid',
    gridHeader: 'grid--header',
    gridHeaderItem: 'grid--header--item',
    gridItem: 'grid--item',
    gridItemOdd: 'grid--item--odd'
}

export class Grid extends React.Component {
    renderHeader() {
        return (
            <div className={classes.gridHeader}>{
                this.props.headers.map((header, i) => {
                    return (
                    <div 
                        key={i}
                        className={classes.gridHeaderItem}
                        style={{width: header.width}}
                    >
                        {header.label}
                    </div>);
                })
            }
            </div>
        )
    }
    renderRow(row, i) {
        let oddStyle = i % 2 ? undefined : classes.gridItemOdd;
        return (
            <div
                key={i} 
                className={cn(classes.gridItem, oddStyle)}> {
                row.map((rowItem, ri) => {
                    
                    return (
                        <div
                            key={ri}
                            className={classes.gridItem}
                            onClick={e => this.props.onItemClick(i)}
                            style={{width: this.props.headers[ri].width}}
                        > {rowItem}</div>
                    );
                })}
            </div>);
    }
    render() {
        return (
            <div className={classes.grid}>
                {this.renderHeader()}
                {this.props.list.map((row, i) => this.renderRow(row, i))}
            </div>
        );
    }
}

Grid.propTypes = {
    headers: PropTypes.array.isRequired,
    list: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired
}