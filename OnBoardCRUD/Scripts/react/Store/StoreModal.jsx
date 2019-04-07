import React from 'react'

export class AddStoreModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Address: ''
        }
        this.handleCreateStore = this.handleCreateStore.bind(this);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCreateStore(event) {
        var reloadData = () => { this.props.updateTableData(); } ;
        const modalId = this.props.id;
        fetch('/Store/CreateStore', {
            method: 'POST',
            body: JSON.stringify(this.state)
        }).then(res => res.text())
            .then(function (res) {
                if ('True' === res) {
                    alert("Create store successful.");
                    //alert(modalId);
                    $(`#${modalId}`).modal('hide').modal('hide dimmer');
                    $('#add_Store_Form').trigger('reset');
                    reloadData();
                }
                else {
                    alert("Failed to create store.");
                }
            });
    }

    render() {
        return (
            <div className="ui small modal" id={this.props.id}>
                <i className="close icon" />
                <div className="header">
                    Create Store
                </div>
                <form className="ui form" id="add_Store_Form">
                    <div className="ui segment">
                        <div className="field">
                            <label>Name</label>
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
                        onClick={this.handleCreateStore}>Submit</div>
                </div>
            </div>
        );
    }
}

export class EditStoreModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Address: ""
        }
        this.handleEditStore = this.handleEditStore.bind(this);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleEditStore(event) {
        let modalId = this.props.id;
        let reloadData = () => this.props.updateTableData();
        fetch('/Store/UpdateStore/' + this.props.store.Id, {
            method: 'POST',
            body: JSON.stringify(this.state)
        }).then(res => res.text())
            .then(function (res) {
                if ('True' === res) {
                    alert("Update store info successful.");
                    $(`#${modalId}`).modal('hide').modal('hide dimmer');
                    //$('#Edit_store_Form').trigger('reset');
                    reloadData();
                }
                else {
                    alert("Failed to update store.");
                }
            });
    }

    componentDidMount() {
    }

    render() {
        let storeName = this.props.store.Name;
        let storeAddr = this.props.store.Address;
        return (
            <div className="ui small modal" id={this.props.id}>
                <i className="close icon" />
                <div className="header">
                    Edit Store
                </div>
                <form className="ui form" id="edit_Store_Form">
                    <div className="ui segment">
                        <div className="field">
                            <label>Name</label>
                            <input type="text" id="EditName" name="Name" value={storeName}
                                onChange={event => this.handleInputChange(event)} />
                        </div>
                        <div className="field">
                            <label>Address</label>
                            <input type="text" id="EditAddress" name="Address" value={storeAddr}
                                onChange={event => this.handleInputChange(event)} />
                        </div>
                    </div>
                </form>
                <div className="actions">
                    <div className="ui black cancel button">Cancel</div>
                    <div className="ui green submit button"
                        onClick={this.handleEditStore}>Update</div>
                </div>
            </div>
        );
    }
}

export class DeleteStoreModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteStore = this.handleDeleteStore.bind(this);
    }

    handleDeleteStore() {
        let modalId = this.props.id;
        let reloadData = () => this.props.updateTableData();
        fetch('/Store/DeleteStore/' + this.props.storeId, {
            method: 'POST',
        }).then(res => res.text())
            .then(function (res) {
                if ('True' === res) {
                    alert("Delete store successful.");
                    $(`#${modalId}`).modal('hide').modal('hide dimmer');
                    reloadData();
                }
                else {
                    alert("Failed to delete store.");
                }
            });
    }

    render() {
        return (
            <div className="ui small modal" id={this.props.id}>
                <i className="close icon" />
                <div className="header">
                    Delete Store
                </div>
                <div className="ui segment">
                    <h3>Are you sure to delete this store?</h3>
                </div>
                <div className="actions">
                    <div className="ui black cancel button">Cancel</div>
                    <div className="ui red delete button"
                        onClick={this.handleDeleteStore}>Delete</div>
                </div>
            </div>
        );
    }

}
