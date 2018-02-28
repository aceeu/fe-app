import * as React from 'react';
import { TextInput } from '../controls/input';


export const AddForm = (props) => {
    return (
        <div style={{width: 200}}>
            <div>name</div>
            <TextInput onEnter={v => alert(v)}></TextInput>
            <div>sum</div>
            <TextInput type='text'></TextInput>
        </div>
    );
}
