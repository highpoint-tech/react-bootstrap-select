/* eslint-disable no-alert */
import 'bootstrap-select';
import React from 'react';
import { render } from 'react-dom';
import { compose, withState, withProps, mapProps } from 'recompose';
import Select from '../src';

const enhance = compose(
  withState('value', 'set', 2),
  withProps(({ set, value }) => ({
    navigate() {
      window.location = 'another route';
    },
    reset() {
      set(value);
    }
  })),
  mapProps(({ set, value, navigate, reset, ...props }) => ({
    ...props,
    value,
    bs: {
      mobile: true
    },
    onChange: () => {
      const confirmedChange = confirm('confirm change?');
      if (confirmedChange) return void navigate();
      reset();
    }
  }))
);

const El = enhance(({ value, onChange, bs }) => (
  <div>
    <Select value={value} onChange={onChange} bs={bs}>
      <option value={1}>1 Minute</option>
      <option value={2}>2 Minutes</option>
    </Select>
    <Select
      container={{ style: { marginTop: 100 } }}
      bs={{ container: 'body' }}
    >
      <option value={3}>3 Minutes</option>
      <option value={4}>4 Minutes</option>
    </Select>
  </div>
));

render(<El />, document.querySelector('.app-container'));
