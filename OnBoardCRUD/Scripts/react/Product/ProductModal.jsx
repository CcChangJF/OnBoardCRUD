import React from 'react'

export class AddProductModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Price: ''
        }
        this.handleCreateProduct = this.handleCreateProduct.bind(this);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCreateProduct(event) {
        var reloadData = () => { this.props.updateTableData(); };
        const modalId = this.props.id;
        fetch('/Product/CreateProduct', {
            method: 'POST',
            body: JSON.stringify(this.state)
        }).then(res => res.text())
            .then(function (res) {
                if ('True' === res) {
                    alert("Create product successful.");
                    //alert(modalId);
                    $(`#${modalId}`).modal('hide').modal('hide dimmer');
                    $('#add_Product_Form').trigger('reset');
                    reloadData();
                }
                else {
                    alert("Failed to create product.");
                }
            });
    }

    render() {
        return (
            <div className="ui small modal" id={this.props.id}>
                <i className="close icon" />
                <div className="header">
                    Create Product
                </div>
                <form className="ui form" id="add_Product_Form">
                    <div className="ui segment">
                        <div className="field">
                            <label>Name</label>
                            <input type="text" id="AddName" name="Name" placeholder="Name"
                                onChange={event => this.handleInputChange(event)} />
                        </div>
                        <div className="field">
                            <label>Price</label>
                            <input type="text" id="AddPrice" name="Price" placeholder="Price"
                                onChange={event => this.handleInputChange(event)} />
                        </div>
                    </div>
                </form>
                <div className="actions">
                    <div className="ui black cancel button">Cancel</div>
                    <div className="ui green submit button"
                        onClick={this.handleCreateProduct}>Submit</div>
                </div>
            </div>
        );
    }
}

export class EditProductModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Price: ""
        }
        this.handleEditProduct = this.handleEditProduct.bind(this);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleEditProduct(event) {
        let modalId = this.props.id;
        let reloadData = () => this.props.updateTableData();
        fetch('/Product/UpdateProduct/' + this.props.product.Id, {
            method: 'POST',
            body: JSON.stringify(this.state)
        }).then(res => res.text())
            .then(function (res) {
                if ('True' === res) {
                    alert("Update product successful.");
                    $(`#${modalId}`).modal('hide').modal('hide dimmer');
                    //$('#Edit_Product_Form').trigger('reset');
                    reloadData();
                }
                else {
                    alert("Failed to update product.");
                }
            });
    }

    componentDidMount() {
        let productName = this.props.product.Name;
        let productPrice = this.props.product.Price;
        if (!productPrice) {
            productPrice = "";
        }
        this.setState({
            Name: productName,
            Price: productPrice
        });
    }

    render() {
        return (
            <div className="ui small modal" id={this.props.id}>
                <i className="close icon" />
                <div className="header">
                    Edit Product
                </div>
                <form className="ui form" id="edit_Product_Form">
                    <div className="ui segment">
                        <div className="field">
                            <label className="Big">Name</label>
                            <input type="text" id="EditName" name="Name" value={this.state.Name}
                                onChange={event => this.handleInputChange(event)} />
                        </div>
                        <div className="field">
                            <label>Price</label>
                            <input type="text" id="EditPrice" name="Price" value={this.state.Price}
                                onChange={event => this.handleInputChange(event)} />
                        </div>
                    </div>
                </form>
                <div className="actions">
                    <div className="ui black cancel button">Cancel</div>
                    <div className="ui green submit button"
                        onClick={this.handleEditProduct}>Update</div>
                </div>
            </div>
        );
    }
}

export class DeleteProductModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    }

    handleDeleteProduct() {
        let modalId = this.props.id;
        let reloadData = () => this.props.updateTableData();
        fetch('/Product/DeleteProduct/' + this.props.productId, {
            method: 'POST',
        }).then(res => res.text())
            .then(function (res) {
                if ('True' === res) {
                    alert("Delete product info successful.");
                    $(`#${modalId}`).modal('hide').modal('hide dimmer');
                    reloadData();
                }
                else {
                    alert("Failed to delete product.");
                }
            });
    }

    render() {
        return (
            <div className="ui small modal" id={this.props.id}>
                <i className="close icon" />
                <div className="header">
                    Delete Product
                </div>
                <div className="ui segment">
                    <h3>Are you sure to delete this product?</h3>
                </div>
                <div className="actions">
                    <div className="ui black cancel button">Cancel</div>
                    <div className="ui red delete button"
                        onClick={this.handleDeleteProduct}>Delete</div>
                </div>
            </div>
        );
    }

}
