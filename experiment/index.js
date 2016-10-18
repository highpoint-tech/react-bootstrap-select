import Select from '../src/index';
import { createElement as t } from 'react';
import { render } from 'react-dom';
import 'bootstrap-select';

const el =
  t('div', null,
    t(Select, null,
      t('option', { value: 1 }, '1 Minute'),
      t('option', { value: 2 }, '2 Minutes')
    ),
    t(Select, { container: { style: { marginTop: 100 } }, bs: { container: 'body' } },
      t('option', { value: 3 }, '3 Minute'),
      t('option', { value: 4 }, '4 Minutes')
    )
  );

render(el, document.querySelector('.app-container'));
