import * as React from 'react';
import { AddForm } from './addForm';
import { store, newRecord } from '../store';
import { ShowModal } from './modal';

export const ActionsSection = (props) => {

    const onButton = () => {
        ShowModal({}, <AddForm />)
            .then((data) => {
                if (data)
                    store.dispatch(newRecord(data));
            });
    }

    return (
        <div className={props.className}>
            <button onClick={e => onButton(e)}>
                Добавить
            </button>
        </div>
    );
}