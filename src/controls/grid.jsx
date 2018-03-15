import * as React from 'react';
import PropTypes from 'prop-types';
import './controls.css'

const classes = {
    grid: 'grid',
    gridHeader: 'grid--header',
    gridHeaderItem: 'grid--header--item',
    gridItem: 'grid--item'
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
    renderRow(row) {
        return (
            <div
                key={row} 
                className={classes.gridItem}> {
                row.map((rowItem, i) => {
                    return (
                        <div
                            key={i}
                            onClick={e => this.props.onItemClick(row)}
                            style={{width: this.props.headers[i].width}}
                        > {rowItem}</div>
                    );
                })}
            </div>);
    }
    render() {
        return (
            <div className={classes.grid}>
                {this.renderHeader()}
                {this.props.list.map(row => this.renderRow(row))}
            </div>
        );
    }
}

Grid.propTypes = {
    headers: PropTypes.array.isRequired,
    list: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired
}