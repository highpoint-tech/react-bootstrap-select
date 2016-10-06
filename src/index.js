import $ from 'jquery';
import React, { createElement as t, PropTypes, createClass } from 'react';

const events = ['show', 'shown', 'hide', 'hidden', 'loaded', 'rendered', 'refreshed', 'changed'];

const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

const prefixEvent = event => `on${capitalizeFirstLetter(event)}`;

const cleanupSelectProps = obj => {
  const newObj = { ...obj };
  delete newObj.bs;
  delete newObj['bs-events'];
  return newObj;
};

const ReactBS = createClass({
  getInitialState() {
    return { open: false };
  },
  onHTMLClick() {
    this.setState({ open: false });
  },
  handleBsEvents() {
    const $select = $(this.refs.select);
    const eventsProp = this.props['bs-events'];
    if (eventsProp === undefined) return;
    events.map(event => {
      const fn = eventsProp[prefixEvent(event)];
      if (fn === undefined) return;
      $select.on(`${event}.bs.select`,(...args) => fn(...args));
    });
  },
  cancelBsEvents() {
    const $select = $(this.refs.select);
    const eventsProp = this.props['bs-events'];
    if (eventsProp === undefined) return;
    events.map(event => {
      const fn = eventsProp[prefixEvent(event)];
      if (fn === undefined) return;
      $select.off(`${event}.bs.select`, fn);
    });
  },
  componentDidUpdate() {
    const $this = $(this.refs.root);
    $(this.refs.select).selectpicker('refresh');
    var $select = $this.find('div.bootstrap-select');
    $select.toggleClass('open', this.state.open);
  },
  componentWillUnmount() {
    const $this = $(this.refs.root);
    this.cancelBsEvents();
    $('html').off('click', this.onHTMLClick);
    $this.find('button').off('click');
    $this.find('.dropdown-menu').off('click');
  },
  componentDidMount() {
    const $this = $(this.refs.root);
    const $select = $(this.refs.select);
    $select.selectpicker(this.props.bs);

    this.handleBsEvents();

    $('html').on('click', this.onHTMLClick);

    $this.find('button').on('click', e => {
      e.stopPropagation();
      const open = !this.state.open;
      this.setState({ open });
    });

    $this.find('.dropdown-menu').on('click', 'li a', () => {
      if (this.props.multiple) return;
      const open = !this.state.open;
      this.setState({ open });
    });
  },
  render() {
    return (
      t('div', { ref: 'root' },
        t('select', { ref: 'select', ...cleanupSelectProps(this.props) })
      )
    );
  }
});

ReactBS.propTypes = {
  bs: PropTypes.object,
  'bs-events': PropTypes.objectOf(PropTypes.func)
};

export default ReactBS;
