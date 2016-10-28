const Select = require('..');
const { createElement: t } = require('react');
const { render } = require('react-dom');
require('bootstrap-select');

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
