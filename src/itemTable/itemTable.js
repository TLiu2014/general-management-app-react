import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Environment } from '../config';
import './itemTable.scss';

class ItemTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch(Environment.API_URL + "/item/1", Environment.HTTP_OPTIONS)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
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
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const itemTableView = items.map((item, index) =>
        <tr key={item.item_id}>
          <th scope="row">{index}</th>
          <th>{item.item_id}</th>
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
      </div>
      );
    }
  }
}

export default ItemTable;
