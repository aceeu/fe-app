import * as React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './list.css'
import { ShowModal } from './modal';
import { AddForm } from './addForm';

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

const ListView = ({records, onEdit}) => {
    const list = records.map((e, i) =>  {
        const res = <div 
            onClick={e=>onEdit(e.id)} key={i}
            className={'viewcontainer'}
        >
            <div> {e.creator} </div>
            <div> {e.category} </div>    
            <div> {moment(e.date).format('YYYY MM DD')} </div>
            <div> {e.buyer}</div>
            <div> {e.product}</div>
            <div> {e.sum}</div>
        </div>
        return res;
    });

    const onButton = () => {
        let data = {
            name: '',
            sum: 0
        }

        const onData = (datai) => {
            data = datai;
        }

        ShowModal({}, <AddForm onData={onData}/>).then((el) => console.log(data));
    }

    return (
        <React.Fragment>
            {list}
            <button onClick={e => onButton(e)}>
                Добавить
            </button>
        </React.Fragment>
    );
}
