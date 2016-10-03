import $ from 'jquery';
import React, { createElement as t } from 'react';

export default React.createClass({
  getInitialState() {
    return { open: false };
  },
  componentDidUpdate() {
    const $this = $(this.refs.root);
    $(this.refs.select).selectpicker('refresh');
    var $select = $this.find('div.bootstrap-select');
    $select.toggleClass('open', this.state.open);
  },
  componentWillUnmount() {
    const $this = $(this.refs.root);
    $this.find('button').off('click');
    $this.find('.dropdown-menu').off('click');
  },
  componentDidMount() {
    const $this = $(this.refs.root);
    $(this.refs.select).selectpicker();

    $this.find('button').on('click', e => {
      e.stopPropagation();
      this.setState({ open: !this.state.open });
    });

    $this.find('.dropdown-menu').on('click', 'li a', () => {
      if (this.props.multiple) return;
      this.setState({ open: !this.state.open });
    });
  },
  render: function () {
    return (
      t('div', { ref: 'root' },
        t('select', { ref: 'select', ...this.props })
      )
    );
  }
});
