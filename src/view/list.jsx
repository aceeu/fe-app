import * as React from 'react';
import PropTypes from 'prop-types';
import './list.css'
import { ShowModal } from './modal';
import { AddForm } from './addForm';
import { store, newRecord } from '../store';
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
        return <ListView records={store.getState().records} onEdit={this.onEdit}/>
    }
}

ListViewContainer.contextTypes = {
    store: PropTypes.object
}

// const ListView = ({records, onEdit}) => {
//     const list = records.map((e, i) =>  {
//         const res = <div 
//             onClick={e=>onEdit(e.id)} key={i}
//             className={'viewcontainer'}
//         >
//             <div> {i} </div>
//             <div> {moment(e.created).format(DateFormat)} </div>
//             <div> {moment(e.edited).format(DateFormat)} </div>
//             <div> {e.creator} </div>
//             <div> {e.buyer}</div>
//             <div> {e.category} </div>    
//             <div> {e.buyDate} </div>
//             <div> {e.product}</div>
//             <div> {e.sum}</div>
//             <div> {e.note}</div>
//         </div>
//         return res;
//     });

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
        onItemClick: (i) => {console.log(i), onEdit(records[i]);}
    }

    const onButton = () => {
        ShowModal({}, <AddForm />)
            .then((data) => {
                if (data)
                    store.dispatch(newRecord(data));
            });
    }

    return (
        <React.Fragment>
            <Grid {...gridProps}/>
            <button onClick={e => onButton(e)}>
                Добавить
            </button>
        </React.Fragment>
    );
}
