import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import LineForm from './lineForm'


export class AddForm extends React.Component {

    render() {
        return (<LineForm   
            onData={this.props.onData}
            user={this.props.user}
            creator={this.props.user}
            buyDate={moment()}
            category={''}
            buyer={''}
            product={''}
            sum={0}
            whom={''}
            note={''}
            categories={this.props.categories}
        />);
    }
}

AddForm.propsTypes = {
    onData: PropTypes.func,
    user: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired
}