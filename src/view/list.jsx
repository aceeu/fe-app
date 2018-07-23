import * as React from 'react';
import PropTypes from 'prop-types';
import './list.css';
import moment from 'moment';
import 'moment/locale/ru';
import { DateFormat } from '../define';
import { Grid } from '../controls/grid';
import LineForm from './lineForm';
import { ShowModal } from './modal';
import {post} from '../communicate';
import { editedRecord } from '../store';

export class ListViewContainer extends React.Component {

    onEdit = async (obj) => {
        const {store} = this.context;
        let data = await ShowModal({}, 
            <LineForm надо чтобы форма только изменяла существующие данные а не копировала туда потом обратно
                _id={obj._id}
                user={store.getState().user}
                creator={obj.creator}
                buyDate={moment(obj.buyDate)}
                category={obj.category}
                buyer={obj.buyer}
                product={obj.product}
                sum={obj.sum}
                whom={obj.whom}
                note={obj.note}
            />);
        if (data) {
            // send data to the server
             const res = await post('/adddata', data);
             console.log(res);
             if (res.res)
              store.dispatch(editedRecord(data));
            else
                window.alert(res.text);
        }
    }

    render () {
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
    moment.locale('ru');
    const gridProps = {
        headers: [
            // {label: '#', width: 20},
            // {label: 'в/создания', width: 100},
            // {label: 'в/изменения', width: 100},
            {label: 'Дата покупки', width: 150},
            {label: 'Название', width: 200},
            {label: 'Категория', width: 130},
            // {label: 'Кто занес', width: 100},
            {label: 'Покупатель', width: 100},
            {label: 'Сумма', width: 100},
            {label: 'Примечание', width: 180}
        ],
        list: records.map((e, i) => {
            return [
                moment(e.buyDate).format('D MMMM YYYY'),
                e.product,
                e.category,
                // e.creator,
                e.buyer,
                e.sum,
                e.note
            ]
        }),
        onItemClick: (i) => {console.log(records[i]); onEdit(records[i]);}
    }
    return (
        <Grid {...gridProps}/>
    );
}
