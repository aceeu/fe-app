import * as React from 'react';
import { ShowModal } from './view/modal2';
import AddForm from './view/addForm';
import { Editform } from './view/list';
import './font-awesome.css';


export default async function exampes() {
    let data = await ShowModal({},
        <AddForm 
            user={'anna'}
            categories={['one', 'two']}
        />
    );
    console.table(data);
    await ShowModal({},
        <Editform
            line={data}
            categories={['one', 'two']}
            user={'ace'}
        />
    );
}