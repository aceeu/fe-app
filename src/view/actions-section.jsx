import * as React from 'react';
import AddForm from './addForm';
import { newRecord } from '../store';
import { ShowModal } from './modal2';
import { PropTypes } from 'prop-types';
import { post } from '../communicate';
import { Button, Intent } from "@blueprintjs/core";

export class ActionsSection extends React.Component {

    onButtonAdd = async() => {
        const {store} = this.context;
        let data = await ShowModal({purpose: true},
            <AddForm 
                user={store.getState().user}
                categories={store.getState().categories}
            />
        );
        if (data) {
            // send data to the server
            const res = await post('/adddata', data);
            if (res.res)
                store.dispatch(newRecord(res.row)); // сервер вернет строку с _id
        }
    }

    renderButtonAdd() {
        return (
            <Button onClick={this.onButtonAdd} intent={Intent.SUCCESS}>Добавить</Button>
        );
    }

    render () {
        const { store } = this.context;
        const user = store.getState().user;
        return (
        <div className={this.props.className}>
            {user ? this.renderButtonAdd() : null}
        </div>
        );
    }
}

ActionsSection.contextTypes = {
    store: PropTypes.object
}