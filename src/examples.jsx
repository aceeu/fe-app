import * as React from 'react';
import moment from 'moment';
import { ShowModal } from './view/modal2';
import AddForm from './view/addForm';
import { Editform } from './view/list';
import { Content } from './view/top-container';
import PropTypes from 'prop-types';
import {store, updateLogin, newRecord, setSummary, fetchCategories} from './store';
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
    await ShowModal({},
        <Editform
            line={data}
            categories={store.getState().categories}
            user={'ace'}
        />
    );
}

export function startExample() {
    for (let i = 0; i < 1000; ++i) {
        store.dispatch(newRecord(
            {
                creator: 'ace',
                date: moment().format('YYYY-MM-DD'),
                category: 'Продукты',
                buyer: 'Аня',
                product:'Хлеб',
                sum: i,
                note: 'Примечание бла бла бла'
            }));
    }

    const summary = {'одежда': 145, 'обувь': 230, 'еда': 300, 'ипотека': 250, 'Сене в школу': 1000, 'Прочее': 99, 'Бытовая химия': 400 };
    store.dispatch(setSummary(summary))
    const cats = [{"_id":"5bd43f4afb89480f45f297e9","cat":"Еда","entry":325},{"_id":"5bd43f4afb89480f45f297ea","cat":"Прочее","entry":75},{"_id":"5bd43f4afb89480f45f297eb","cat":"Коммунальные","entry":68},{"_id":"5bd43f4afb89480f45f297ec","cat":"Лекарства","entry":52},{"_id":"5bd43f4afb89480f45f297ed","cat":"Бытовая химия","entry":46},{"_id":"5bd43f4afb89480f45f297ee","cat":"Проезд","entry":46},{"_id":"5bd43f4afb89480f45f297ef","cat":"Одежда","entry":37},{"_id":"5bd43f4afb89480f45f297f1","cat":"Машина Митсубиси","entry":20},{"_id":"5bd43f4afb89480f45f297f2","cat":"Развлечения","entry":18},{"_id":"5bd43f4afb89480f45f297f3","cat":"Сене в школу","entry":14},{"_id":"5bd43f4afb89480f45f297f4","cat":"Лизе в школу","entry":13},{"_id":"5bd43f4afb89480f45f297f5","cat":"Подарки","entry":12},{"_id":"5bd43f4afb89480f45f297f6","cat":"Ипотека","entry":9},{"_id":"5bd43f4afb89480f45f297f7","cat":"Баумана12","entry":5},{"_id":"5c8779b6eb26a9752595bddc","cat":"Связь","entry":0},{"_id":"5d70075761e0e4195bcaee8f","cat":"Маше в школу","entry":0},{"_id":"5d70091f61e0e4195bcaee90","cat":"Не наши расходы","entry":0}];
    const categories = cats.map(v => v.cat);
    setTimeout(() => {
        store.dispatch(fetchCategories(categories));
        console.log('on categories');
    }, 2000);
    
}
