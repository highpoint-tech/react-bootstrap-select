# react-bootstrap-select

This is a small React wrapper around bootstrap-select jQuery plugin.

Read [package.json]() for a reference on current peer dependencies.
You'll need them in your project for this component to work properly and look properly.

## installation

`npm i react-bootstrap-select@hp-mobile/react-bootstrap-select`  


## usage

```js
import Select from 'react-bootstrap-select';
import { createElement as t } from 'react';
import { render } from 'react-dom';
import 'bootstrap-select';

const el = t(Select, {
  bs: {
    // use bs prop to pass options to the bootstrap-select plugin
    mobile: true
  },
  name: 'my-select'
},
  t('option', { value: 1 }, '1 Minute'),
  t('option', { value: 2 }, '2 Minutes')
);

render(el, document.querySelector('.app-container'));
```

Refer to [experiment]() for a full example of this component working.
You can run it with `npm run experiment`.

## events

Pass any of the following events as props:

- `onShow`
- `onShown`
- `onHide`
- `onHidden`
- `onLoaded`
- `onRendered`
- `onRefreshed`
- `onChanged`

Documentation [here](https://silviomoreto.github.io/bootstrap-select/options/#events)
