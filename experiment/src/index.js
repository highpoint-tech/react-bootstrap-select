import 'bootstrap-select';
import $ from 'jquery';
import React, { Component } from 'react';
import { render } from 'react-dom';
import Select from '../../src';
import SelectModal from './modal';

class El extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      v1: 2,
      v2: 3,
      v3: 5
    };

    this.setValue = this.setValue.bind(this);
  }

  setValue({ target }) {
    this.setState({ [target.id]: $(target).val() });
  }

  render() {
    return (
      <div>
        <Select
          id="v1"
          value={this.state.v1}
          onChange={this.setValue}
          bs={{ mobile: true }}
          container={{ style: { marginBottom: '1rem' } }}
        >
          <option value={1}>1 Minute</option>
          <option value={2}>2 Minutes</option>
        </Select>
        <Select
          id="v2"
          value={this.state.v2}
          onChange={this.setValue}
          container={{ style: { marginBottom: '1rem' } }}
        >
          <option value={3}>3 Minute</option>
          <option value={4}>4 Minutes</option>
        </Select>
        <SelectModal value={this.state.v3} setValue={this.setValue} />
      </div>
    );
  }
}

render(<El />, document.querySelector('.app-container'));
