import React from 'react';
import ReactDOM from 'react-dom';
import { Dropdown, Pagination } from 'semantic-ui-react';

const limitOptions = [
    { key: '0', value: '10', text: '10' },
    { key: '1', value: '20', text: '20' },
    { key: '2', value: '50', text: '50' },
    { key: '3', value: '100', text: '100' },
];

export class PaginationHeader extends React.Component {
    constructor(props) {
        super(props);
        this.handleLimitChange = this.handleLimitChange.bind(this);
    }

    handleLimitChange(value) {
        this.props.onLimitChange(value);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="ui segment">
                Records per page: &nbsp; &nbsp;
                <Dropdown inline options={limitOptions}
                    defaultValue={limitOptions[1].value}
                    onChange={(e, { value }) => this.handleLimitChange(value)} />
            </div>
        );
    }
}

export class PaginationFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    handlePageChange(activePage) {
        this.props.onPageChange(activePage);
        
    }

    render() {
        return (
            <div className="ui center aligned segment">
                Total Count: {this.props.totalItems} &nbsp; &nbsp; &nbsp;
                <Pagination
                    totalPages={this.props.totalPages}
                    activePage={this.props.activePage}
                    onPageChange={(e, { activePage }) => this.handlePageChange(activePage)} />
            </div>
        );
    }
}