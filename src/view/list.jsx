import * as React from 'react';
import PropTypes from 'prop-types';
import './list.css';
import moment from 'moment';
import 'moment/locale/ru';
import { Grid } from '../controls/grid';
import LineForm from './lineForm';
import { ShowModal } from './modal2';
import { post } from '../communicate';
import { editedRecord, deleteRecord } from '../store';
import { Slider } from '@blueprintjs/core';
import { Buttons } from './modal2';

const RecordsPerPage = 20;
const editButtonsList = [{name: 'Изменить', id: 'Edit'}, {name: 'Отмена', id: 'Cancel'}];

class Editform extends React.PureComponent {
    data;
    onData = data => this.data = data;

    onClick = id => {
        console.log('onEditClick ' + JSON.stringify(this.data));
        if (id == 'Cancel')
            this.props.onClick();
        if (id == 'Edit' && this.data)
            this.props.onClick(this.data)
    }

    render() {
        let obj = this.props.line;
        return (
            <React.Fragment>
                <LineForm
                    editMode={true}
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
            </React.Fragment>
        );
    }
}

export class ListViewContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {page: 0}
    }
    onEdit = async (line) => {
        const {store} = this.context;
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
                const deldata = {_id: data._id};
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

    onSliderChange = (val) => {
        this.setState({page: val}, () => console.log(val));
    }

    // page from zero
    getRecords = () => {
        const from = (this.state.page) * RecordsPerPage;
        let to = (this.state.page + 1) * RecordsPerPage;
        const records = this.context.store.getState().data.records || [];
        to = Math.min(records.length, to);
        return records.slice(from, to);
    }

    render () {
        const {store} = this.context;
        return (
            <div className={'viewcontainer'}>
                {
                    store.getState().data.records.length > RecordsPerPage ?
                        <Slider
                            className={'slider'}
                            min={0}
                            max={Math.floor(store.getState().data.records.length / RecordsPerPage)}
                            stepSize={1}
                            labelStepSize={1}
                            onChange={val => this.onSliderChange(val)}
                            value={this.state.page}
                            showTrackFill={false}
                        /> : null
                }
                <ListView records={this.getRecords()}
                    onEdit={this.onEdit}
                />
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
        onItemClick: (i) => onEdit(records[i])
    }
    return (
        <Grid {...gridProps}/>
    );
}
