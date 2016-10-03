import Select from '../src/index';
import { createElement as t } from 'react';
import { render } from 'react-dom';
import 'bootstrap-select';

const el = t(Select, null,
  t('option', { value: 1 }, '1 Minute'),
  t('option', { value: 2 }, '2 Minutes')
);

render(el, document.querySelector('.app-container'));
