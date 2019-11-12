import * as React from 'react';
import { ShowModal } from './view/modal2';
import AddForm from './view/addForm';


export default async function exampes() {
    let data = await ShowModal({purpose: true},
        <AddForm 
            user={'test_user'}
            categories={['one', 'two']}
        />
    );
    console.log(JSON.stringify(data));
}