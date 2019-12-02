import * as React from 'react';
import moment from 'moment';
import { ShowModal } from './view/modal2';
import AddForm from './view/addForm';
import { Editform } from './view/list';
import { Content } from './view/top-container';
import PropTypes from 'prop-types';
import {store, updateLogin, newRecord} from './store';
import { LoginPanel } from './view/login-panel';
import './view/top-container.css';
import './font-awesome.css';

const classes = {
    topContainer: 'top-container',
    actionSection: 'action-section',
    fiterSection: 'filter-section',
    listSection: 'list-section'
}

export class Example extends React.PureComponent {

    constructor(props) {
        super(props);
        store.dispatch(updateLogin('ace'));
    }
    getChildContext() {
        return  {
            store
        }
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe (
            () => this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return (
            <div className={classes.topContainer}>
            <LoginPanel
                user={store.getState().user}
                onLogin={user => {}}
            />
            <LoginPanel
                user={''}
                onLogin={user => {}}
            />
            <Content/>
        </div>
        )
    }
}

Example.childContextTypes = {
    store: PropTypes.object.isRequired
  }


export async function showModalExample() {

    let data = await ShowModal({},
        <AddForm 
            user={store.getState().user}
            categories={store.getState().categories}
        />
    );
    console.table(data);
    await ShowModal({},
        <Editform
            line={data}
            categories={store.getState().categories}
            user={'ace'}
        />
    );
}

store.dispatch(newRecord(
    {
        creator: 'ace',
        date: moment().format('YYYY-MM-DD'),
        category: 'Продукты',
        buyer: 'Аня',
        product:'Хлеб',
        sum: 20,
        note: 'Примечание бла бла бла'
    }));
