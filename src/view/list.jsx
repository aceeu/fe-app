import * as React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

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
        const res = <div onClick={e=>onEdit(e.id)} key={i}>
            <div> {e.creator} </div>
            <div> {e.category} </div>    
            <div> {moment(e.date).format('YYYY MM DD')} </div>
            <div> {e.buyer}</div>
            <div> {e.product}</div>
            <div> {e.sum}</div>
        </div>
        return res;
    });
    return (
        <React.Fragment>
            {list}
        </React.Fragment>
    );
}
