import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Select from '../../../src';

class SelectModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggle}>Toggle Modal</button>
        <Modal show={this.state.show} onHide={this.toggle}>
          <Modal.Header closeButton>
            <Modal.Title>Select</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Select
              id="v3"
              value={this.props.value}
              onChange={this.props.setValue}
              bs={{ container: 'body' }}
            >
              <option value={5}>5 Minutes</option>
              <option value={6}>6 Minutes</option>
            </Select>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggle}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

SelectModal.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

export default SelectModal;
