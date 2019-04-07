import React from 'react'

export class AddCustomerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Address: ''
        }
        this.handleCreateCustomer = this.handleCreateCustomer.bind(this);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCreateCustomer(event) {
        const modalId = this.props.id;
        let reloadData = () => this.props.updateTableData();
        fetch('/Customer/CreateCustomer', {
            method: 'POST',
            body: JSON.stringify(this.state)
        }).then(res => res.text())
            .then(function (res) {
                if ('True' === res) {
                    alert("Create customer successful.");
                    $(`#${modalId}`).modal('hide').modal('hide dimmer');
                    $('#add_Customer_Form').trigger('reset');
                    reloadData();
                }
                else {
                    alert("Failed to create customer.");
                }
            });
    }

    render() {
        return (
            <div className="ui small modal" id={this.props.id}>
                <i className="close icon" />
                <div className="header">
                    Create Customer
                </div>
                <form className="ui form" id="add_Customer_Form">
                    <div className="ui segment">
                        <div className="field">
                            <label >Name</label>
                            <input type="text" id="AddName" name="Name" placeholder="Name"
                                onChange={event => this.handleInputChange(event)} />
                        </div>
                        <div className="field">
                            <label>Address</label>
                            <input type="text" id="AddAddress" name="Address" placeholder="Address"
                                onChange={event => this.handleInputChange(event)} />
                        </div>
                    </div>
                </form>
                <div className="actions">
                    <div className="ui black cancel button">Cancel</div>
                    <div className="ui green submit button"
                        onClick={this.handleCreateCustomer}>Submit</div>
                </div>
            </div>
        );
    }
}

export class EditCustomerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Address: ""
        }
        this.handleEditCustomer = this.handleEditCustomer.bind(this);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleEditCustomer(event) {
        let modalId = this.props.id;
        let reloadData = () => this.props.updateTableData();
        fetch('/Customer/UpdateCustomer/' + this.props.customer.Id, {
            method: 'POST',
            body: JSON.stringify(this.state)
        }).then(res => res.text())
            .then(function (res) {
                if ('True' === res) {
                    alert("Update customer info successful.");
                    $(`#${modalId}`).modal('hide').modal('hide dimmer');
                    //$('#Edit_Customer_Form').trigger('reset');
                    reloadData();
                }
                else {
                    alert("Failed to update customer.");
                }
            });
    }

    componentDidMount() {

    }

    render() {
        let customerName = this.props.customer.Name;
        let customerAddr = this.props.customer.Address;
        return (
            <div className="ui small modal" id={this.props.id}>
                <i className="close icon" />
                <div className="header">
                    Edit Customer
                </div>
                <form className="ui form" id="edit_Customer_Form">
                    <div className="ui segment">
                        <div className="field">
                            <label >Name</label>
                            <input type="text" id="EditName" name="Name" value={customerName}
                                onChange={event => this.handleInputChange(event)} />
                        </div>
                        <div className="field">
                            <label>Address</label>
                            <input type="text" id="EditAddress" name="Address" value={customerAddr}
                                onChange={event => this.handleInputChange(event)} /> 
                        </div>
                    </div>
                </form>
                <div className="actions">
                    <div className="ui black cancel button">Cancel</div>
                    <div className="ui green submit button"
                        onClick={this.handleEditCustomer}>Update</div>
                </div>
            </div>
        );
    }
}

export class DeleteCustomerModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
    }

    handleDeleteCustomer() {
        let modalId = this.props.id;
        let reloadData = () => this.props.updateTableData();
        fetch('/Customer/DeleteCustomer/' + this.props.customerId, {
            method: 'POST',
        }).then(res => res.text())
            .then(function (res) {
                if ('True' === res) {
                    alert("Delete customer info successful.");
                    $(`#${modalId}`).modal('hide').modal('hide dimmer');
                    reloadData();
                }
                else {
                    alert("Failed to delete customer.");
                }
            });
    }

    render() {
        return (
            <div className="ui small modal" id={this.props.id}>
                <i className="close icon" />
                <div className="header">
                    Delete Customer
                </div>
                <div className="ui segment">
                    <h3>Are you sure to delete this Customer?</h3>
                </div>            
                <div className="actions">
                    <div className="ui black cancel button">Cancel</div>
                    <div className="ui red delete button"
                        onClick={this.handleDeleteCustomer}>Delete</div>
                </div>
            </div>
        );
    }

}
