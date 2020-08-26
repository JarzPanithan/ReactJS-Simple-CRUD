import React, { Component } from 'react';
import { Button, Col, Container, Form, InputGroup, Modal, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faEdit, faPlus, faSave, faSmile, faTrash } from '@fortawesome/free-solid-svg-icons';
import Navbar from './HeaderNavbar';
import Footer from './Footer';
import '../App.css';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            product: [],
            addProduct: {
                name: "",
                price: "",
                developer: "",
                publisher: "",
                date: ""
            },
            editProduct: {
                name: "",
                price: "",
                developer: "",
                publisher: "",
                date: ""
            },
            showUpdateModal: false,
            showRemoveModal: false
        }
    }

    componentDidMount() {
        this.getAllProducts();
    }

    getAllProducts = ()=> {
        fetch("http://localhost:4000/products").then((response)=> response.json())
        .then((response)=> {
            this.setState({products: response.data})
        }).catch((error)=> {
            console.error(error);
        });
    }

    addProduct = ()=> {
        const { addProduct } = this.state;
        fetch(`http://localhost:4000/products/add?name=${addProduct.name}&price=${addProduct.price}&developer=${addProduct.developer}&publisher=${addProduct.publisher}&date=${addProduct.date}`)
        .then((response)=> response.json())
        .catch((error)=> {
            console.error(error);
        });
        this.refreshPage();
    }

    findProduct = (id)=> {
        fetch(`http://localhost:4000/products/find?id=${id}`).then((response)=> response.json())
        .then((response)=> {
            this.setState({product: response.data}, ()=> {
                console.log(JSON.stringify(this.state.product));
            });
        }).then(this.openUpdateModal)
        .catch((error)=> {
            console.error(error);
        });
    }

    updateProduct = (id)=> {
        const { editProduct } = this.state;
        fetch(`http://localhost:4000/products/update?name=${editProduct.name}&price=${editProduct.price}&developer=${editProduct.developer}&publisher=${editProduct.publisher}&date=${editProduct.date}&id=${id}`)
        .then((response)=> response.json())
        .then(this.closeUpdateModal)
        .catch((error)=> {
            console.error(error);
        });
        this.closeUpdateModal();
        this.refreshPage();
    }

    findDeleteProduct = (id)=> {
        fetch(`http://localhost:4000/products/find?id=${id}`).then((response)=> response.json())
        .then((response)=> {
            this.setState({product: response.data}, ()=> {
                console.log(JSON.stringify(this.state.product));
            });
        }).then(this.openRemoveModal)
        .catch((error)=> {
            console.error(error);
        });
    }

    deleteProduct = (id)=> {
        fetch(`http://localhost:4000/products/delete?id=${id}`).then((response)=> response.json())
        .catch((error)=> {
            console.error(error);
        });
        this.closeRemoveModal();
        this.refreshPage();
    }

    closeUpdateModal = ()=> {
        this.setState({showUpdateModal: false});
    }

    openUpdateModal = ()=> {
        this.setState({showUpdateModal: true});
    }

    closeRemoveModal = ()=> {
        this.setState({showRemoveModal: false});
    }

    openRemoveModal = ()=> {
        this.setState({showRemoveModal: true});
    }

    refreshPage = ()=> {
        window.location.reload();
    }

    render() { 
        let { products, addProduct, editProduct, showUpdateModal, showRemoveModal } = this.state;
        let findProduct = this.state.product;
        return (
            <div>
                <Navbar/>
                <div className="container-fluid app">
                <h1>Product List</h1>
                {products.length > 0 ? <div className="addProduct">
                    <Form>
                        <Form.Row>
                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Name</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="text" 
                                        placeholder="Product Name"
                                        onChange={(e)=> this.setState({addProduct: {...addProduct, name: e.target.value}})}
                                        value={addProduct.name}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={1.5}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Price</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="text"
                                        placeholder="Product Price"
                                        onChange={(e)=> this.setState({addProduct: {...addProduct, price: e.target.value}})}
                                        value={addProduct.price}
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Developer</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="text"
                                        placeholder="Product Developer"
                                        onChange={(e)=> this.setState({addProduct: {...addProduct, developer: e.target.value}})}
                                        value={addProduct.developer}
                                    />
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Publisher</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="text"
                                        placeholder="Product Publisher"
                                        onChange={(e)=> this.setState({addProduct: {...addProduct, publisher: e.target.value}})}
                                        value={addProduct.publisher}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={2}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Date</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="text"
                                        placeholder="Product Date"
                                        onChange={(e)=> this.setState({addProduct: {...addProduct, date: e.target.value}})}
                                        value={addProduct.date}
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Row><br/>
                        <Button variant="success" onClick={this.addProduct} block>
                            <FontAwesomeIcon icon={faPlus}/>&nbsp;Add Product
                        </Button>
                    </Form>
                </div> : null}<br/> 
                <div className="container-fluid productTable">
                    {products.length > 0 ? <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Developer</th>
                                <th>Publisher</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product)=>
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.developer}</td>
                                    <td>{product.publisher}</td>
                                    <td>{product.date}</td>
                                    <td>
                                        <Button variant="warning" onClick={()=> this.findProduct(product.id)}>
                                            <FontAwesomeIcon icon={faEdit}/>&nbsp;Edit
                                        </Button>
                                        &nbsp;&nbsp;
                                        <Button variant="danger" onClick={()=> this.findDeleteProduct(product.id)}>
                                            <FontAwesomeIcon icon={faTrash}/>&nbsp;Remove
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table> : <div>
                        <p className="noData">No Data!!</p>
                        <p>Please, turn on the database server!!&nbsp;<FontAwesomeIcon icon={faSmile}/></p>
                    </div>}
                    <div>
                        <Modal show={showUpdateModal} animation>
                            <Modal.Header closeButton onClick={()=> this.closeUpdateModal()}>
                                <Modal.Title>Edit Product</Modal.Title>
                            </Modal.Header>
                            {findProduct.map((product)=>
                                <div key={product.id}>
                                    <Modal.Body>
                                        <Container>
                                            <Row>
                                                <Col xs={12} md={8}>
                                                    <p>ID: {product.id}</p>
                                                    <p>Name: {product.name}</p>
                                                    <p>Price: ${product.price}</p>
                                                    <p>Developer: {product.developer}</p>
                                                    <p>Publisher: {product.publisher}</p>
                                                    <p>Date: {product.date}</p>
                                                </Col>
                                                <Col xs={12} md={8}>
                                                    <Form>
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text>ID</InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                type="text"
                                                                value={product.id}
                                                                readOnly
                                                            />
                                                        </InputGroup>
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text>Name</InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Product Name"
                                                                onChange={(e)=> this.setState({editProduct: {
                                                                    ...editProduct, name: e.target.value
                                                                }})}
                                                                value={editProduct.name}
                                                            />
                                                        </InputGroup>
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text>Price</InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Product Price"
                                                                onChange={(e)=> this.setState({editProduct: {
                                                                    ...editProduct, price: e.target.value
                                                                }})}
                                                                value={editProduct.price}
                                                            />
                                                        </InputGroup>
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text>Developer</InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Product Developer"
                                                                onChange={(e)=> this.setState({editProduct: {
                                                                    ...editProduct, developer: e.target.value
                                                                }})}
                                                                value={editProduct.developer}
                                                            />
                                                        </InputGroup>
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text>Publisher</InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Product Publisher"
                                                                onChange={(e)=> this.setState({editProduct: {
                                                                    ...editProduct, publisher: e.target.value
                                                                }})}
                                                                value={editProduct.publisher}
                                                            />
                                                        </InputGroup>
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text>Date</InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Product Date"
                                                                onChange={(e)=> this.setState({editProduct: {
                                                                    ...editProduct, date: e.target.value
                                                                }})}
                                                                value={editProduct.date}
                                                            />
                                                        </InputGroup>
                                                    </Form>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="danger" onClick={()=> this.closeUpdateModal()}>
                                            <FontAwesomeIcon icon={faBackward}/>&nbsp;Close
                                        </Button>
                                        <Button variant="success" onClick={()=> this.updateProduct(product.id)}>
                                            <FontAwesomeIcon icon={faSave}/>&nbsp;Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </div>
                            )}
                        </Modal>
                        <div>
                            <Modal show={showRemoveModal} animation>
                                <Modal.Header closeButton onClick={()=> this.closeRemoveModal()}>
                                    <Modal.Title>Delete Product</Modal.Title>
                                </Modal.Header>
                                    {findProduct.map((product)=>
                                        <div key={product.id}>
                                            <Modal.Body>
                                                <span>Are you sure to delete <b>{product.name}</b> product?</span>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="danger" onClick={()=> this.closeRemoveModal()}>
                                                    <FontAwesomeIcon icon={faBackward}/>&nbsp;No
                                                </Button>
                                                <Button variant="success" onClick={()=> this.deleteProduct(product.id)}>
                                                    <FontAwesomeIcon icon={faTrash}/>&nbsp;Yes
                                                </Button>
                                            </Modal.Footer>
                                        </div>
                                    )}
                            </Modal>
                        </div>
                    </div>
                </div>
                <Footer/>
                </div>
            </div>
        );
    }
}

export default Products;