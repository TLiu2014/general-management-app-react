import React, { Component } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';
import './item.scss';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      updatedName: this.props.item.name,
      updatedValue: this.props.item.value,
    };
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  toggleEditMode(event) {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  submitEdit(event) {
    event.preventDefault();
    this.props.onEdit(event, this.state.updatedName, this.state.updatedValue);
    this.toggleEditMode(event);
  }

  render() {
    return (
      <tr>
        <th scope="row">{this.props.index + 1}</th>
        <th>{this.props.item.itemId}</th>
        <td>{this.state.isEdit ? <FormGroup>
          <Input type="text" name="updatedName" id="updatedName" placeholder="Enter an item name" defaultValue={this.props.item.name} onChange={this.handleChange}/>
        </FormGroup>
        : this.props.item.name}</td>
        <td>{this.state.isEdit ? <FormGroup>
          <Input type="text" name="updatedValue" id="updatedValue" placeholder="Enter an item value" defaultValue={this.props.item.value} onChange={this.handleChange}/>
        </FormGroup>
        : this.props.item.value}</td>
        <td>{this.state.isEdit && <Button type="button" color="primary" value={this.props.item.itemId} onClick={this.submitEdit}>Submit</Button>}
        <Button type="button" color={this.state.isEdit ? "secondary": "primary"} value={this.props.item.itemId} onClick={this.toggleEditMode}>{this.state.isEdit ? "Cancel" : "Edit" }</Button>
        <Button type="button" color="danger" value={this.props.item.itemId} onClick={this.props.onDelete}>Delete</Button></td>
      </tr>
    );
  }
}

export default Item;
