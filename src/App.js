import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import ItemTable from './itemTable/itemTable.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <Row>
        <Col sm={{ size: 10, offset: 1 }}>
          <ItemTable></ItemTable>
        </Col>
      </Row>
    </div>
    );
  }
}

export default App;
