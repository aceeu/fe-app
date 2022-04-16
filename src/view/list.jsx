import * as React from 'react';
import PropTypes from 'prop-types';
import './list.css';
import moment from 'moment';
import 'moment/locale/ru';
import LineForm from './lineForm';
import { ShowModal } from './modal2';
import { post } from '../communicate';
import AddForm from './addForm';
import { editedRecord, deleteRecord, newRecord } from '../store';
import { Buttons } from './modal2';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { color_theme } from '../color-theme';
import { DataGrid } from '@mui/x-data-grid';

const editButtonsList = [{ name: 'Изменить', id: 'Edit', faIcon: 'fa fa-pencil fa-2x', style: { margin: '0 10px', color: 'green' } },
{ name: 'Отмена', id: 'Cancel', faIcon: 'fa fa-plus-square fa-2x', style: { margin: '0 10px', color: 'red' } }];

export class Editform extends React.PureComponent {
    onData = data => this.data = data;
    onClick = id => {
        if (id === 'Cancel')
            this.props.onClick();
        if (id === 'Edit' && this.data) {
            this.props.onClick(this.data)
        }
    }

    render() {
        let obj = this.props.line;
        return (
            <ThemeProvider theme={color_theme}>
                <LineForm
                    editMode
                    _id={obj._id}
                    user={this.props.user}
                    creator={obj.creator}
                    buyDate={moment(obj.buyDate)}
                    category={obj.category}
                    buyer={obj.buyer}
                    product={obj.product}
                    sum={obj.sum}
                    whom={obj.whom}
                    note={obj.note}
                    categories={this.props.categories}
                    onData={this.onData}
                />
                <Buttons
                    buttonsList={editButtonsList}
                    onClick={id => this.onClick(id)}
                >
                </Buttons>
            </ThemeProvider>
        );
    }
}

export class ListViewContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            countPerPage: undefined
        }
    }
    onEdit = async (line) => {
        const { store } = this.context;
        // TODO: надо чтобы форма только изменяла существующие данные а не копировала туда потом обратно
        let data = await ShowModal({},
            <Editform
                line={line}
                categories={store.getState().categories}
                user={store.getState().user}
            />
        );
        if (data) {
            if (data.category === '') {
                // remove data
                const deldata = { _id: data._id };
                const res = await post('/deldata', deldata);
                if (res.res)
                    store.dispatch(deleteRecord(deldata._id));
                else
                    window.alert(res.text);
                return;
            }
            // send data to the server
            const res = await post('/editdata', data);
            console.log(JSON.stringify(data));
            if (res.res)
                store.dispatch(editedRecord(data));
            else
                window.alert(res.text);
        }
    }

    onButtonAdd = async () => {
        const { store } = this.context;
        let data = await ShowModal({ purpose: true },
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

    onSliderChange = (val) => {
        this.setState({ page: val }, () => console.log(val));
    }

    // page from zero
    getRecords = () => this.context.store.getState().data.records || [];

    onRowsDisplayed = count => this.setState({ countPerPage: count });

    totalSum() {
        const summary = this.context.store.getState().data.summary;
        const keys = Object.keys(summary);
        return keys.reduce((a, k) => a + summary[k], 0)
    }
    render() {
        const records = this.getRecords();
        const pages = Math.ceil(records.length / this.state.countPerPage);
        let navigatorValues = [];
        for (let i = 1; i <= pages; ++i)
            navigatorValues.push(i);
        return (
            <div className={'viewcontainer'}>
                <div className={'viewcontainer--tools'}>
                    <Button variant="contained" onClick={this.onButtonAdd}>
                        Добавить
                    </Button>
                    <div>
                        Сумма: {this.totalSum()}
                    </div>
                </div>
                <ListView
                    records={records}
                    onEdit={this.onEdit}
                    start={(this.state.page - 1) * (this.state.countPerPage || 1)}
                    totalRowsDisplayed={this.onRowsDisplayed}
                />
            </div>
        );
    }
}

ListViewContainer.contextTypes = {
    store: PropTypes.object
}

const ListView = ({ records, onEdit }) => {

    const columns = [
        {
            field: 'buyer',
            headerName: 'Покупатель',
            width: 100,
            editable: false,
        },
        {
            field: 'date',
            headerName: 'Дата',
            width: 150,
            editable: false,
        },
        {
            field: 'category',
            headerName: 'Категория',
            type: 'number',
            width: 200,
            editable: false,
        },
        {
            field: 'product',
            headerName: 'Название',
            width: 200,
            editable: false,
        },
        {
            field: 'sum',
            headerName: 'Сумма',
            type: 'number',
            width: 80,
            editable: false,
        },
        {
            field: 'note',
            headerName: 'Примечание',
            width: 120,
            editable: false,
        },
    ]

    const rows = records.map(e => ({
        date: moment(e.buyDate).format('D MMMM YYYY'),
        ...e,
        id: e._id
    })).sort((a, b) => moment(b.buyDate) - moment(a.buyDate))

    return (
        <div style={{ flexGrow: 1, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                autoPageSize
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                onCellClick={({row}) => {
                    onEdit(row)
                }}
            />
        </div>)

}
