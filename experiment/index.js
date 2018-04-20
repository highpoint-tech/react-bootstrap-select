/* eslint-disable no-alert */
import 'bootstrap-select';
import { createElement as t } from 'react';
import { render } from 'react-dom';
import { compose, withState, withProps, mapProps } from 'recompose';
import Select from '../dist/index';

const enhance = compose(
  withState('value', 'set', 2),
  withProps(({ set, value }) => ({
    navigate() {
      window.location = `another route`;
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

const El = enhance(({ value, onChange, bs }) =>
  t(
    'div',
    null,
    t(
      Select,
      { value, onChange, bs },
      t('option', { value: 1 }, '1 Minute'),
      t('option', { value: 2 }, '2 Minutes')
    ),
    t(
      Select,
      { container: { style: { marginTop: 100 } }, bs: { container: 'body' } },
      t('option', { value: 3 }, '3 Minute'),
      t('option', { value: 4 }, '4 Minutes')
    )
  )
);

render(t(El), document.querySelector('.app-container'));
