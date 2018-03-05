import * as React from 'react';
import PropTypes from 'prop-types';
import './list.css';
import moment from 'moment';
import { DateFormat } from '../define';
import { Grid } from '../controls/grid';

export class ListViewContainer extends React.Component {

    onEdit(id) {
        alert('onEdit:' + id);
    }

    render () {
        console.log(this.context);
        const {store} = this.context;
        return (
            <div className={'viewcontainer'}>
                <ListView records={store.getState().records} onEdit={this.onEdit}/>
            </div>
        );
    }
}

ListViewContainer.contextTypes = {
    store: PropTypes.object
}

const ListView = ({records, onEdit}) => {
    const gridProps = {
        headers: [
            {label: '#', width: 10},
            {label: 'в/создания', width: 100},
            {label: 'в/изменения', width: 100},
            {label: 'Кто занес', width: 100},
            {label: 'Покупатель', width: 100},
            {label: 'Категория', width: 100},
            {label: 'Дата покупки', width: 100},
            {label: 'Название', width: 130},
            {label: 'Сумма', width: 80},
            {label: 'Примечание', width: 150}
        ],
        list: records.map((e, i) => {
            return [i,
                moment(e.created).format(DateFormat),
                moment(e.edited).format(DateFormat),
                e.creator,
                e.buyer,
                e.category,
                e.buyDate,
                e.product,
                e.sum,
                e.note
            ]
        }),
        onItemClick: (row) => {console.log(row), onEdit(row);}
    }
    return (
        <Grid {...gridProps}/>
    );
}
