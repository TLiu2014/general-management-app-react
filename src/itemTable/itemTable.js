import React, { Component } from 'react';
import { Table, Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Environment } from '../config';
import './itemTable.scss';
import Item from '../item/item.js';

class ItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      newItemName: "",
      newItemValue: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(Environment.API_URL + "/items", {
      method: 'POST',
      headers: Environment.HTTP_OPTIONS.headers,
      body: JSON.stringify({
        name: this.state.newItemName,
        value: this.state.newItemValue,
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log('POST item response', result);
        this.setState({
          newItemName: "",
          newItemValue: "",
          items: [...this.state.items, result]
        });
      },
      (error) => {
        this.setState({
          // isLoaded: true,
          error
        });
      }
    );
  }

  componentDidMount() {
    fetch(Environment.API_URL + "/items", {
      method: 'GET',
      headers: Environment.HTTP_OPTIONS.headers
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log('GET all items response', result);
        this.setState({
          isLoaded: true,
          items: result.sort((a, b) => a.itemId < b.itemId)
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  deleteItem(event) {
    event.preventDefault();
    const itemId = event.target.value;
    this.setState({
      items: this.state.items.filter(e => e.itemId !== itemId)
    });
    fetch(Environment.API_URL + "/items/" + itemId, {
      method: 'DELETE',
      headers: Environment.HTTP_OPTIONS.headers
    })
    .then(res => res.json())
    .then(
      (result) => {
        // console.log('DELETE response', result);
      },
      (error) => {
        this.setState({
          error
        });
      }
    );
  }

  updateItem(event, updatedName, updatedValue) {
    event.preventDefault();
    const itemId = event.target.value;
    this.setState({
      items: [...this.state.items.filter(e => e.itemId !== itemId), {
        itemId: itemId,
        name: updatedName,
        value: updatedValue
      }].sort((a, b) => (a.itemId < b.itemId ? -1: 1))
    });
    fetch(Environment.API_URL + "/items/" + itemId, {
      method: 'PUT',
      headers: Environment.HTTP_OPTIONS.headers,
      body: JSON.stringify({
        name: updatedName,
        value: updatedValue,
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log('PUT response', result);
      },
      (error) => {
        this.setState({
          error
        });
      }
    );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const itemTableView = items.map((item, index) =>
        <Item item={item} index={index} key={item.itemId} onDelete={this.deleteItem} onEdit={this.updateItem.bind(this)}/>
      );
      return (
        <div id="item-table">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Value</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {itemTableView}
            </tbody>
          </Table>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col sm={6}>
              <FormGroup>
                <Label for="newItemName">Name</Label>
                  <Input type="text" name="newItemName" id="newItemName" placeholder="Enter an item name" value={this.state.newItemName} onChange={this.handleChange}/>
              </FormGroup>
              </Col>
              <Col sm={6}>
              <FormGroup >
                <Label for="newItemValue">Value</Label>
                <Input type="text" name="newItemValue" id="newItemValue" placeholder="Enter a value" value={this.state.newItemValue} onChange={this.handleChange} />
              </FormGroup>
              </Col>
              <Col sm={2}>
              <FormGroup>
                <Button type="submit" color="primary">Submit</Button>
              </FormGroup>
              </Col>
            </Row>
          </Form>
        </div>
      );
    }
  }
}

export default ItemTable;
