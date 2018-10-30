import React, { Component } from 'react';
import { Table, Button, Input } from 'reactstrap';
import { Environment } from '../config';
import './itemTable.scss';

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
          items: result
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

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const itemTableView = items.map((item, index) =>
        <tr key={item.itemId}>
          <th scope="row">{index + 1}</th>
          <th>{item.itemId}</th>
          <td>{item.name}</td>
          <td>{item.value}</td>
        </tr>
      );
      return (
        <div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              {itemTableView}
            </tbody>
          </Table>
          <form onSubmit={this.handleSubmit}>
            <Input placeholder="Name" name="newItemName" value={this.state.newItemName} onChange={this.handleChange}/>
            <Input placeholder="Value" name="newItemValue" value={this.state.newItemValue} onChange={this.handleChange}/>
            <Button type="submit" color="primary">Submit</Button>
          </form>
        </div>
      );
    }
  }
}

export default ItemTable;
