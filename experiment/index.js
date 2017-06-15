import Select from '../src/index';
import { createElement as t } from 'react';
import { compose, withHandlers, withState, withProps, mapProps } from 'recompose';
import { render } from 'react-dom';
import 'bootstrap-select';

const enhance = compose(
  withState('value', 'set', 2),
  withProps(({ set, value }) => ({
    navigate(data) {
      global.location = `another route`;
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
    onChange: ev => {
      const confirmedChange = confirm('confirm change?');
      if (confirmedChange) return void navigate();
      reset();
    }
  }))
);

const El = enhance(({ value, onChange, bs }) =>
  t('div', null,
    t(Select, { value, onChange, bs },
      t('option', { value: 1 }, '1 Minute'),
      t('option', { value: 2 }, '2 Minutes')
    ),
    t(Select, { container: { style: { marginTop: 100 } }, bs: { container: 'body' } },
      t('option', { value: 3 }, '3 Minute'),
      t('option', { value: 4 }, '4 Minutes')
    )
  )
);

render(t(El), document.querySelector('.app-container'));
