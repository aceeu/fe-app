import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import LineForm from './lineForm';
import {Buttons} from './modal2';

const addButtonsList = [{name: 'Add', id: 'Add', faIcon: 'fa fa-plus-square fa-2x',
    style: {margin: '0 10px', color: 'green'}},
{name: 'Cancel', id: 'Cancel', faIcon: 'fa fa-ban fa-2x', style: {margin: '0 10px', color: 'red'}}];

export default class AddForm extends React.PureComponent {
    data;
    onData = data => this.data = data;

    onClick = id => {
        if (id === 'Cancel')
            this.props.onClick();
        if (id === 'Add' && this.data)
            this.props.onClick(this.data)
    }

    render() {
        const props = this.props;
        return (
            <React.Fragment>
                <LineForm   
                    onData={this.onData}
                    user={props.user}
                    creator={props.user}
                    buyDate={moment()}
                    category={''}
                    buyer={''}
                    product={''}
                    sum={0}
                    whom={''}
                    note={''}
                    categories={props.categories}
                    onEnter={() => this.onClick('Add')}
                />
                <Buttons
                    buttonsList={addButtonsList}
                    onClick={id => this.onClick(id)}
                />
            </React.Fragment>
        );    
    }
}

AddForm.propsTypes = {
    onData: PropTypes.func,
    user: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired
}