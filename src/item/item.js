import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './item.scss';

class Item extends Component {
  render() {
    return (
      <tr>
        <th scope="row">{this.props.index + 1}</th>
        <th>{this.props.item.itemId}</th>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.value}</td>
        <td><Button type="button" color="primary" value={this.props.item.itemId}>Edit</Button>
        <Button type="button" color="danger" value={this.props.item.itemId}>Delete</Button></td>
      </tr>
    );
  }
}

export default Item;
