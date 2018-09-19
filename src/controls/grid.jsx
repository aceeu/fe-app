import * as React from 'react';
import PropTypes from 'prop-types';
import './controls.css'
import { Cell, Column, Table } from '@blueprintjs/table';

const classes = {
    grid: 'grid',
    gridHeader: 'grid--header',
    gridHeaderItem: 'grid--header--item',
    gridItem: 'grid--item',
    gridItemOdd: 'grid--item--odd'
}

export class Grid extends React.Component {
    
    cell1Renderer = (rowIndex, columnIndex) => {
        return <Cell>{this.props.list[rowIndex][columnIndex]}</Cell>
    };

    headers() {
        return this.props.headers.map((header, ci) => (
            <Column name={header.label} cellRenderer={(rI) => this.cell1Renderer(rI, ci)}/>
        ));
    }

    render() {
        return (
            <Table numRows={this.props.list.length}>
                {this.headers()}
            </Table>
        );
    }
}

Grid.propTypes = {
    headers: PropTypes.array.isRequired,
    list: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired
}