import * as React from 'react';
import { cn } from '../common/classnames'
import './controls.css'

export const SheetNavigator = ({values, selected, onChange}) => {
    const onShift = (shift, pos) => {
        let next = NaN;
        if (shift) {
            next = selected + shift;
        } else if (pos) {
            next = pos;
        }
        if (isNaN(next))
            return;
        if (next < 0 || next > values.length)
            return;
        onChange(next);
    };
    return <div className={'sheetnavigator'}>
            <div className={cn('sheetnavigator-item')}
                onClick={() => onShift(NaN, 1)}
                title={'первый'}
            >
                {'<<'}
            </div>
            <div className={cn('sheetnavigator-item')}
                onClick={() => onShift(-1)}
                title={'предыдущий'}
            >
                {'<'}
            </div>
            <div
              className={cn('sheetnavigator-item')}
              
            >
              {selected} of {values.length}
            </div>
            <div className={cn('sheetnavigator-item')}
                onClick={() => onShift(1)}
                title={'следующий'}
            >
                {'>'}
            </div>
            <div className={cn('sheetnavigator-item')}
                onClick={() => onShift(NaN, values.length)}
                title={'последний'}
            >
                {'>>'}
            </div>
    </div>
}