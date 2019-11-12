
import * as ReactDOM from 'react-dom';
import {removeFromBody, appendToBody} from './dom'

export default function defer(contentElementFunc) {
    const parent = appendToBody();
    const onClose = () => removeFromBody(parent);
    const body = function(resolve, reject) {
        ReactDOM.render(contentElementFunc(resolve), parent)
    };
    return new Promise(body).finally(onClose);
}
