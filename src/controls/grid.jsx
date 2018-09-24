import * as React from 'react';
import PropTypes from 'prop-types';
import './controls.css'
import { Cell, Column, Table, RegionCardinality } from '@blueprintjs/table';

const classes = {
    grid: 'grid',
    gridHeader: 'grid--header',
    gridHeaderItem: 'grid--header--item',
    gridItem: 'grid--item',
    gridItemOdd: 'grid--item--odd'
}

export class Grid extends React.Component {
    
    onItemClick(rowIndex) {
        this.props.onItemClick(rowIndex);
    }

    cell1Renderer = (rowIndex, columnIndex) => {
        return <Cell
        >
            <span onClick={e => this.onItemClick(rowIndex)}>
                {this.props.list[rowIndex][columnIndex]}
            </span>
            
        </Cell>
    };

    headers() {
        return this.props.headers.map((header, ci) => (
            <Column name={header.label} cellRenderer={(rI) => this.cell1Renderer(rI, ci)}/>
        ));
    }

    render() {
        return (
            <Table 
                numRows={this.props.list.length}
                selectionModes={[RegionCardinality.FULL_ROWS]}
            >
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