import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import LineForm from './lineForm';
import {Buttons} from './modal2';
import { ThemeProvider } from '@mui/material/styles';
import { color_theme } from '../color-theme';

const addButtonsList = [{name: 'Добавить', id: 'Add', faIcon: 'fa fa-plus-square fa-2x',
    style: {margin: '0 10px', color: 'green'}},
{name: 'Отменить', id: 'Cancel', faIcon: 'fa fa-ban fa-2x', style: {margin: '0 10px', color: 'red'}}];

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
            <ThemeProvider theme={color_theme}>
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
            </ThemeProvider>
        );    
    }
}

AddForm.propsTypes = {
    onData: PropTypes.func,
    user: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired
}