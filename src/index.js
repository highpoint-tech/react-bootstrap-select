import $ from 'jquery';
import 'bootstrap-select';
import React, { createElement as t, PropTypes, createClass } from 'react';

const events = ['show', 'shown', 'hide', 'hidden', 'loaded', 'rendered', 'refreshed', 'changed'];

const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

const prefixEvent = event => `on${capitalizeFirstLetter(event)}`;

const cleanupSelectProps = obj => {
  const newObj = { ...obj };
  delete newObj.bs;
  delete newObj.container;
  delete newObj['bs-events'];
  return newObj;
};

const ReactBS = createClass({
  getInitialState() {
    return { open: false };
  },
  getDefaultProps() {
    return {
      bs: {}
    };
  },
  onHTMLClick() {
    this.setState({ open: false });
  },
  handleBsEvents() {
    const eventsProp = this.props['bs-events'];
    if (eventsProp === undefined) return;
    events.map(event => {
      const fn = eventsProp[prefixEvent(event)];
      if (fn === undefined) return;
      this.$select.on(`${event}.bs.select`,(...args) => fn(...args));
    });
  },
  cancelBsEvents() {
    const eventsProp = this.props['bs-events'];
    if (eventsProp === undefined) return;
    events.map(event => {
      const fn = eventsProp[prefixEvent(event)];
      if (fn === undefined) return;
      this.$select.off(`${event}.bs.select`, fn);
    });
  },
  componentDidUpdate() {
    this.$select.selectpicker('refresh');
    const $bsSelect = this.$container.find('> .bootstrap-select');
    $bsSelect.toggleClass('open', this.state.open);
  },
  componentWillUnmount() {
    this.cancelBsEvents();
    $('html').off('click', this.onHTMLClick);
    this.$root.find('button').off('click');
    this.$container.off('click');
  },
  toggle() {
    const open = !this.state.open;
    this.setState({ open });
  },
  componentDidMount() {
    this.$container = this.props.bs.container ? $(this.props.bs.container) : this.$root;
    this.$select.selectpicker(this.props.bs);
    this.handleBsEvents();

    $('html').on('click', this.onHTMLClick);

    this.$root.find('button').on('click', e => {
      e.stopPropagation();
      if (this.$select.is(':disabled')) return;
      this.toggle();
    });

    this.$container.on('click', ' > .bootstrap-select > .dropdown-menu > ul > li > a', () => {
      if (this.props.multiple) return;
      this.toggle();
    });
  },
  render() {
    return (
      t('div', {
        ref: container => (this.$root = $(container)),
        ...this.props.container
      },
        t('select', {
          ref: select => (this.$select = $(select)),
          ...cleanupSelectProps(this.props)
        })
      )
    );
  }
});

ReactBS.propTypes = {
  bs: PropTypes.object,
  'bs-events': PropTypes.objectOf(PropTypes.func)
};

export default ReactBS;
