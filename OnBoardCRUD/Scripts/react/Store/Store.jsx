import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Button, Dropdown } from 'semantic-ui-react';
import {
    AddStoreModal,
    EditStoreModal,
    DeleteStoreModal
} from './StoreModal.jsx';
import { PaginationHeader, PaginationFooter } from '../Share/Pagination.jsx';

export class StoreTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],
            pageLimit: "20",
            activePage: "1",
            totalPages: "10",
            count: "0",
            tableData: [],
        };
        this.loadData = this.loadData.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.editStoreModalRef = React.createRef();
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var esc = encodeURIComponent;
        var params = {
            pageLimit: this.state.pageLimit,
            pageNum: this.state.activePage
        }
        var query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        fetch("/Store/GetList?" + query)
            .then(res => res.json())
            .then(
                (result) => {
                    var pages = Math.ceil(parseInt(result["Count"]) / parseInt(this.state.pageLimit));
                    this.setState({
                        count: result["Count"],
                        serviceList: result["Stores"],
                        totalPages: pages.toString()
                    }, function () {
                        this.setState({ tableData: this.getTableData() })
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        serviceList: null
                    });
                }
            )
    }

    add() {
        $('#store_Add_Modal').modal('show');
    }

    update(store) {
        const editModal = <EditStoreModal id={"store_Edit_Modal"}
            ref={this.editStoreModalRef}
            store={store} updateTableData={() => this.loadData()} />;
        ReactDOM.render(editModal, document.getElementById('edit_Modal_Div'));
        this.editStoreModalRef.current.updateNameAddr(store);
        $('#store_Edit_Modal').modal('show');
    }

    delete(id) {
        //ajax call logic
        const deleteModal = <DeleteStoreModal id={"store_Delete_Modal"}
            storeId={id} updateTableData={() => this.loadData()} />
        ReactDOM.render(deleteModal, document.getElementById('delete_Modal_Div'))
        $('#store_Delete_Modal').modal('show');
        this.loadData();
    }

    handleLimitChange(pageLimit) {
        this.setState({ pageLimit: pageLimit },
            function () { this.loadData(); });
    }

    handlePageChange(activePage) {
        this.setState({ activePage: activePage },
            function () { this.loadData(); });
    }

    getTableData() {
        let serviceList = this.state.serviceList;
        let tableData = null;
        if (serviceList != "") {
            tableData = serviceList.map(service =>
                <tr key={service.Id}>
                    <td className="two wide">{service.Name}</td>
                    <td className="four wide">{service.Address}</td>
                    <td className="eight wide">
                        <button className="ui yellow button"
                            onClick={this.update.bind(this, service)}>
                            <i className="edit icon"></i>
                            Edit
                        </button>
                        <button className="ui red button"
                            onClick={this.delete.bind(this, service.Id)}>
                            <i className="delete icon"></i>
                            Delete
                        </button>
                    </td>
                </tr>
            )
        }
        return tableData;
    }

    render() {
        return (
            <React.Fragment>
                <div className="ui container">
                    <Button className="ui blue button"
                        onClick={this.add.bind(this)}>New Store</Button>
                </div>
                <AddStoreModal id={"store_Add_Modal"}
                    updateTableData={() => this.loadData()} />
                <div id="edit_Modal_Div"></div>
                <div id="delete_Modal_Div"></div>
                <div>
                    <PaginationHeader pageLimit={this.state.pageLimit}
                        onLimitChange={(value) => { this.handleLimitChange(value) }} />
                    <table id="store_Main_Table" className="ui striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Name</th>
                                <th className="four wide">Address</th>
                                <th className="eight wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tableData}
                        </tbody>
                    </table>
                    <PaginationFooter totalPages={this.state.totalPages}
                        activePage={this.state.activePage}
                        totalItems={this.state.count}
                        onPageChange={(pageNum) => this.handlePageChange(pageNum)} />
                </div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <StoreTable />,
    document.getElementById('StorePage')
);