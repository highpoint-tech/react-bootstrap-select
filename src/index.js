import $ from 'jquery';
import React, { createElement as t } from 'react';

export default React.createClass({
  getInitialState() {
    return { open: false };
  },
  onHTMLClick() {
    this.setState({ open: false });
  },
  componentDidUpdate() {
    const $this = $(this.refs.root);
    $(this.refs.select).selectpicker('refresh');
    var $select = $this.find('div.bootstrap-select');
    $select.toggleClass('open', this.state.open);
  },
  componentWillUnmount() {
    const $this = $(this.refs.root);
    $('html').off('click', this.onHTMLClick);
    $this.find('button').off('click');
    $this.find('.dropdown-menu').off('click');
  },
  componentDidMount() {
    const $this = $(this.refs.root);
    $(this.refs.select).selectpicker();

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
  render: function () {
    return (
      t('div', { ref: 'root' },
        t('select', { ref: 'select', ...this.props })
      )
    );
  }
});
