import 'bootstrap-select';
import $ from 'jquery';
import PropTypes from 'prop-types';
import React from 'react';

const events = [
  'show',
  'shown',
  'hide',
  'hidden',
  'loaded',
  'rendered',
  'refreshed',
  'changed'
];

const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

const prefixEvent = event => `on${capitalizeFirstLetter(event)}`;

const cleanupSelectProps = obj => {
  const newObj = { ...obj };
  delete newObj.bs;
  delete newObj.container;
  delete newObj['bs-events'];
  return newObj;
};

const guid = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

class ReactBS extends React.Component {
  constructor(props, context) {
    super(props, context);
    const id = props.id || guid();
    this.state = { id, open: false };
    this.onHTMLClick = this.onHTMLClick.bind(this);
  }
  onHTMLClick() {
    if (this.state.open) this.setState({ open: false });
  }
  handleBsEvents() {
    const eventsProp = this.props['bs-events'];
    if (eventsProp === undefined) return;
    events.forEach(event => {
      const fn = eventsProp[prefixEvent(event)];
      if (fn === undefined) return;
      this.$select.on(`${event}.bs.select`, (...args) => fn(...args));
    });
  }
  cancelBsEvents() {
    const eventsProp = this.props['bs-events'];
    if (eventsProp === undefined) return;
    events.forEach(event => {
      const fn = eventsProp[prefixEvent(event)];
      if (fn === undefined) return;
      this.$select.off(`${event}.bs.select`, fn);
    });
  }
  componentDidUpdate() {
    this.$select.selectpicker('refresh');
    this.$menu.toggleClass('open', this.state.open);
  }
  componentWillUnmount() {
    this.cancelBsEvents();
    $(document)
      .off(`click.rbs-${this.state.id}`)
      .off(`keyup.rbs-${this.state.id}`);
    this.$root.find('button').off('click');
    this.$container.off('click');
    this.$select.selectpicker('destroy');
  }
  toggle() {
    const open = !this.state.open;
    this.setState({ open });
  }
  componentDidMount() {
    this.$container = this.props.bs.container
      ? $(this.props.bs.container)
      : this.$root;
    this.$select.selectpicker(this.props.bs);
    this.$menu = this.props.bs.container
      ? this.$select.data('selectpicker').$bsContainer
      : this.$container.find('> .bootstrap-select');
    this.handleBsEvents();

    $(document)
      .on(`click.rbs-${this.state.id}`, this.onHTMLClick)
      .on(`keyup.rbs-${this.state.id}`, e => {
        if (e.key === 'Escape') this.onHTMLClick();
      });

    this.$root.find('button').on('click', e => {
      e.stopPropagation();
      if (this.$select.is(':disabled')) return;
      this.toggle();
    });

    const itemSelector = '> .bootstrap-select > .dropdown-menu > ul > li > a';

    this.$container
      .on('click', itemSelector, () => {
        if (this.props.multiple) return;
        this.toggle();
      })
      .on('keyup', itemSelector, e => {
        if (e.key === ' ' || e.key === 'Enter') $(e.target).click();
      });
  }
  render() {
    return (
      <div
        ref={container => {
          this.$root = $(container);
        }}
        {...this.props.container}
      >
        <select
          ref={select => {
            this.$select = $(select);
          }}
          {...cleanupSelectProps(this.props)}
        />
      </div>
    );
  }
}

ReactBS.defaultProps = {
  bs: {}
};

ReactBS.propTypes = {
  bs: PropTypes.object,
  'bs-events': PropTypes.objectOf(PropTypes.func),
  container: PropTypes.object,
  id: PropTypes.string,
  multiple: PropTypes.bool
};

export default ReactBS;
