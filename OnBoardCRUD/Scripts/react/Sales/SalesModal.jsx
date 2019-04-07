import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import Datepicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export class AddSalesModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerOptions: [],
            storeOptions: [],
            productOptions: [],
            CustomerId: "",
            StoreId: "",
            ProductId: "",
            curDate: new Date()
        }
        this.handleCreateSales = this.handleCreateSales.bind(this);
        //const customerOptions = customers.map(item =>
        //    ({ key: item.Id, value: item.Id, text: item.Name }));
    }

    componentDidMount() {
        this.getCustomerData();
        this.getStoreData();
        this.getProductData();
        this.handleDateChange(new Date());
        this.refs.dateDropdown.cancelFocusInput();
        this.refs.dateDropdown.setOpen(false); 
    }

    getCustomerData() {
        fetch("/Customer/GetList")
            .then(res => res.json())
            .then((res) => {
                let customers = res["Customers"];
                let cusOpts = customers.map(item =>
                    ({ key: item.Id, value: item.Id, text: item.Name }));
                this.setState({ customerOptions: cusOpts })
            },
                (error) => {
                    this.setState({
                        customerOptions: null
                    })
                });
    }

    getProductData() {
        fetch("/Product/GetList")
            .then(res => res.json())
            .then((res) => {
                let products = res["Products"];
                let proOpts = products.map(item =>
                    ({ key: item.Id, value: item.Id, text: item.Name }));
                this.setState({ productOptions: proOpts })
            },
                (error) => {
                    this.setState({
                        productOptions: null
                    })
                });
    }

    getStoreData() {
        fetch("/Store/GetList")
            .then(res => res.json())
            .then((res) => {
                let stores = res["Stores"];
                let storeOpts = stores.map(item =>
                    ({ key: item.Id, value: item.Id, text: item.Name }));
                this.setState({ storeOptions: storeOpts });
            },
                (error) => {
                    this.setState({
                        storeOptions: null
                    })
                });
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCreateSales(event) {
        var reloadData = () => { this.props.updateTableData(); };
        const modalId = this.props.id;
        var params = JSON.stringify({
            "CustomerId": this.state.CustomerId,
            "StoreId": this.state.StoreId,
            "ProductId": this.state.ProductId,
            "DateSold": this.state.curDate
        })
        fetch('/Sales/CreateSales', {
            method: 'POST',
            body: params
        }).then(res => res.text())
            .then(function (res) {
                if ('True' === res) {
                    alert("Create Sales successful.");
                    //alert(modalId);
                    $(`#${modalId}`).modal('hide').modal('hide dimmer');
                    $('#add_Sales_Form').trigger('reset');
                    reloadData();
                }
                else {
                    alert("Failed to create Sales.");
                }
            });
    }

    handleProductChange(event, value) {
        this.setState({ ProductId: value });
    }

    handleCustomerChange(value) {
        this.setState({ CustomerId: value });
    }

    handleStoreChange(value) {
        this.setState({ StoreId: value });
    }

    handleDateChange(date) {
        this.setState({ curDate: date });
        this.refs.dateDropdown.cancelFocusInput();
        this.refs.dateDropdown.setOpen(false);
    }

    render() {
        //this.handleDateChange(new Date());
        return (
            <div className="ui small modal" id={this.props.id}>
                <i className="close icon" />
                <div className="header">
                    Create Sales
                </div>
                <form className="ui form" id="add_Sales_Form">
                    <div className="ui segment">
                        <div className="field">
                            <input type="hidden"></input>
                            <label> Date &nbsp; </label>
                            <Datepicker selected={this.state.curDate}
                                ref="dateDropdown"
                                onChange={(date) => this.handleDateChange(date)} />
                        </div>

                        <div className="field" style={{ width: "40%" }}>
                            <div className="ui text">Product </div>
                            <Dropdown options={this.state.productOptions} name="ProductId"
                                floating button scrolling fluid
                                onChange={(e, { value }) => this.handleProductChange(event, value)}
                                placeholder={"Select Product"} />
                        </div>

                        <div className="field" style={{ width: "40%" }}>
                            <div className="ui text"> Customer</div>
                            <input type="hidden" className="ui text" name="customer" />
                            <Dropdown options={this.state.customerOptions}
                                floating button scrolling fluid
                                onChange={(e, { value }) => this.handleCustomerChange(value)}
                                placeholder={"Select Customer"} />
                        </div>

                        <div className="field" style={{ width: "40%" }}>
                            <div className="ui text">Store</div>
                            <input type="hidden" className="ui text" name="store" />

                            <Dropdown options={this.state.storeOptions}
                                floating button scrolling fluid
                                onChange={(e, { value }) => this.handleStoreChange(value)}
                                placeholder={"Select Store"} />
                        </div>
                    </div>
                </form>
                <div className="actions">
                    <div className="ui black cancel button">Cancel</div>
                    <div className="ui green submit button"
                        onClick={this.handleCreateSales}>Submit</div>
                </div>
            </div>
        );
    }
}

export class EditSalesModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerOptions: [],
            storeOptions: [],
            productOptions: [],
            CustomerId: "",
            StoreId: "",
            ProductId: "",
            curDate: new Date()
        }
        this.handleEditSales = this.handleEditSales.bind(this);
    }


    componentDidMount() {
        this.getCustomerData();
        this.getProductData();
        this.getStoreData();
    }

    getCustomerData() {
        fetch("/Customer/GetList")
            .then(res => res.json())
            .then((res) => {
                let customers = res["Customers"];
                let cusOpts = customers.map(item =>
                    ({ key: item.Id, value: item.Id, text: item.Name }));
                this.setState({ customerOptions: cusOpts })
            },
                (error) => {
                    this.setState({
                        customerOptions: null
                    })
                });
    }

    getProductData() {
        fetch("/Product/GetList")
            .then(res => res.json())
            .then((res) => {
                let products = res["Products"];
                let proOpts = products.map(item =>
                    ({ key: item.Id, value: item.Id, text: item.Name }));
                this.setState({ productOptions: proOpts })
            },
                (error) => {
                    this.setState({
                        productOptions: null
                    })
                });
    }

    getStoreData() {
        fetch("/Store/GetList")
            .then(res => res.json())
            .then((res) => {
                let stores = res["Stores"];
                let storeOpts = stores.map(item =>
                    ({ key: item.Id, value: item.Id, text: item.Name }));
                this.setState({ storeOptions: storeOpts });
            },
                (error) => {
                    this.setState({
                        storeOptions: null
                    })
                });
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleEditSales(event) {
        let modalId = this.props.id;
        let reloadData = () => this.props.updateTableData();
        var params = JSON.stringify({
            "CustomerId": this.state.CustomerId,
            "StoreId": this.state.StoreId,
            "ProductId": this.state.ProductId,
            "DateSold": this.state.curDate
        }) 
        fetch('/Sales/UpdateSales/' + this.props.sales.Id, {
            method: 'POST',
            body: params
        }).then(res => res.text())
            .then(function (res) {
                if ('True' === res) {
                    alert("Update Sales info successful.");
                    $(`#${modalId}`).modal('hide').modal('hide dimmer');
                    //$('#Edit_Sales_Form').trigger('reset');
                    reloadData();
                }
                else {
                    alert("Failed to update Sales.");
                }
            });
    }

    handleProductChange(event, value) {
        this.setState({ ProductId: value });
    }

    handleCustomerChange(value) {
        this.setState({ CustomerId: value });
    }

    handleStoreChange(value) {
        this.setState({ StoreId: value });
    }

    handleDateChange(date) {
        this.setState({ curDate: date });
    }

    render() {
        let salesDate = this.props.sales.DateSold;
        return (
            <div className="ui small modal" id={this.props.id}>
                <i className="close icon" />
                <div className="header">
                    Edit Sales
                </div>
                <form className="ui form" id="edit_Sales_Form">
                    <div className="ui segment">
                        <div className="field">
                            <label> Date &nbsp; </label>
                            <Datepicker 
                                selected={salesDate}
                                onChange={(date) => this.handleDateChange(date)} />
                        </div>

                        <div className="field" style={{ width: "40%" }}>
                            <div className="ui text">Product </div>
                            <Dropdown options={this.state.productOptions} name="product"
                                floating button scrolling fluid
                                placeholder={this.props.sales.Product.Name}
                                onChange={(e, { value }) => this.handleProductChange(value)} />
                        </div>

                        <div className="field" style={{ width: "40%" }}>
                            <div className="ui text"> Customer</div>
                            <input type="hidden" className="ui text" name="customer" />
                            <Dropdown options={this.state.customerOptions}
                                floating button scrolling fluid
                                onChange={(e, { value }) => this.handleCustomerChange(value)}
                                placeholder={this.props.sales.Customer.Name} />
                        </div>

                        <div className="field" style={{ width: "40%" }}>
                            <div className="ui text">Store</div>
                            <input type="hidden" className="ui text" name="store" />
                            <Dropdown options={this.state.storeOptions}
                                floating button scrolling fluid
                                onChange={(e, { value }) => this.handleStoreChange(value)}
                                placeholder={this.props.sales.Store.Name} />
                        </div>
                    </div>

                </form>
                <div className="actions">
                    <div className="ui black cancel button">Cancel</div>
                    <div className="ui green submit button"
                        onClick={this.handleEditSales}>Update</div>
                </div>
            </div>
        );
    }
}

export class DeleteSalesModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteSales = this.handleDeleteSales.bind(this);
    }

    handleDeleteSales() {
        let modalId = this.props.id;
        let reloadData = () => this.props.updateTableData();
        fetch('/Sales/DeleteSales/' + this.props.salesId, {
            method: 'POST',
        }).then(res => res.text())
            .then(function (res) {
                if ('True' === res) {
                    alert("Delete Sales successful.");
                    $(`#${modalId}`).modal('hide').modal('hide dimmer');
                    reloadData();
                }
                else {
                    alert("Failed to delete Sales.");
                }
            });
    }

    render() {
        return (
            <div className="ui small modal" id={this.props.id}>
                <i className="close icon" />
                <div className="header">
                    Delete Sales
                </div>
                <div className="ui segment">
                    <h3>Are you sure to delete this Sales?</h3>
                </div>
                <div className="actions">
                    <div className="ui black cancel button">Cancel</div>
                    <div className="ui red delete button"
                        onClick={this.handleDeleteSales}>Delete</div>
                </div>
            </div>
        );
    }

}
