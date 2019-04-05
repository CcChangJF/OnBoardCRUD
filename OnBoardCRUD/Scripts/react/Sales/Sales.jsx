import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Button, Dropdown } from 'semantic-ui-react';
import {
    AddSalesModal,
    EditSalesModal,
    DeleteSalesModal
} from './SalesModal.jsx';
import { PaginationHeader, PaginationFooter } from '../Share/Pagination.jsx';

export class SalesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],
            pageLimit: "20",
            activePage: "1",
            totalPages: "10",
            count: "0",
            tableData: [],
            products: [],
            customers: [],
            stores: []
        };
        this.loadData = this.loadData.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
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
        fetch("/Sales/GetList?" + query)
            .then(res => res.json())
            .then(
                (result) => {
                    var pages = Math.ceil(parseInt(result["Count"]) / parseInt(this.state.pageLimit));
                    this.setState({
                        count: result["Count"],
                        serviceList: result["Sales"],
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
        const addModal = <AddSalesModal id={"sales_Add_Modal"}
            customers={this.state.customers}
            updateTableData={() => this.loadData()} />
        ReactDOM.render(addModal, document.getElementById('add_Modal_Div'));
        $('#sales_Add_Modal').modal('show');
    }

    update(sales) {
        const editModal = <EditSalesModal id={"sales_Edit_Modal"}
            sales={sales} updateTableData={() => this.loadData()} />;
        ReactDOM.render(editModal, document.getElementById('edit_Modal_Div'));
        $('#sales_Edit_Modal').modal('show');
    }

    delete(id) {
        //ajax call logic
        const deleteModal = <DeleteSalesModal id={"sales_Delete_Modal"}
            salesId={id} updateTableData={() => this.loadData()} />
        ReactDOM.render(deleteModal, document.getElementById('delete_Modal_Div'))
        $('#sales_Delete_Modal').modal('show');
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
                    <td className="two wide">{service.Product.Name}</td>
                    <td className="two wide">{service.Customer.Name}</td>
                    <td className="two wide">{service.Store.Name}</td>
                    <td className="two wide">{service.DateSold.slice(0, 10)}</td>
                    <td className="four wide">
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
                        onClick={this.add.bind(this)}>New Sales</Button>
                </div>
                <div id="add_Modal_Div"></div>
                <div id="edit_Modal_Div"></div>
                <div id="delete_Modal_Div"></div>
                <div>
                    <PaginationHeader pageLimit={this.state.pageLimit}
                        onLimitChange={(value) => { this.handleLimitChange(value) }} />
                    <table id="sales_Main_Table" className="ui striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Product</th>
                                <th className="two wide">Customer</th>
                                <th className="two wide">Store</th>
                                <th className="two wide">Date Sold</th>
                                <th className="four wide">Actions</th>
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
    <SalesTable />,
    document.getElementById('SalesPage')
);