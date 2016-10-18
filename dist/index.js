'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var events = ['show', 'shown', 'hide', 'hidden', 'loaded', 'rendered', 'refreshed', 'changed'];

var capitalizeFirstLetter = function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var prefixEvent = function prefixEvent(event) {
  return 'on' + capitalizeFirstLetter(event);
};

var cleanupSelectProps = function cleanupSelectProps(obj) {
  var newObj = _extends({}, obj);
  delete newObj.bs;
  delete newObj.container;
  delete newObj['bs-events'];
  return newObj;
};

var ReactBS = (0, _react.createClass)({
  getInitialState: function getInitialState() {
    return { open: false };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      bs: {}
    };
  },
  onHTMLClick: function onHTMLClick() {
    this.setState({ open: false });
  },
  handleBsEvents: function handleBsEvents() {
    var _this = this;

    var eventsProp = this.props['bs-events'];
    if (eventsProp === undefined) return;
    events.map(function (event) {
      var fn = eventsProp[prefixEvent(event)];
      if (fn === undefined) return;
      _this.$select.on(event + '.bs.select', function () {
        return fn.apply(undefined, arguments);
      });
    });
  },
  cancelBsEvents: function cancelBsEvents() {
    var _this2 = this;

    var eventsProp = this.props['bs-events'];
    if (eventsProp === undefined) return;
    events.map(function (event) {
      var fn = eventsProp[prefixEvent(event)];
      if (fn === undefined) return;
      _this2.$select.off(event + '.bs.select', fn);
    });
  },
  componentDidUpdate: function componentDidUpdate() {
    this.$select.selectpicker('refresh');
    var $bsSelect = this.$container.find('div.bootstrap-select');
    $bsSelect.toggleClass('open', this.state.open);
  },
  componentWillUnmount: function componentWillUnmount() {
    this.cancelBsEvents();
    (0, _jquery2.default)('html').off('click', this.onHTMLClick);
    this.$root.find('button').off('click');
    this.$container.off('click');
  },
  componentDidMount: function componentDidMount() {
    var _this3 = this;

    this.$container = this.props.bs.container ? (0, _jquery2.default)(this.props.bs.container) : this.$root;
    this.$select.selectpicker(this.props.bs);
    this.handleBsEvents();

    (0, _jquery2.default)('html').on('click', this.onHTMLClick);

    this.$root.find('button').on('click', function (e) {
      e.stopPropagation();
      if (_this3.$select.is(':disabled')) return;
      var open = !_this3.state.open;
      _this3.setState({ open: open });
    });

    this.$container.on('click', ' > .bootstrap-select > .dropdown-menu > ul > li > a', function () {
      if (_this3.props.multiple) return;
      var open = !_this3.state.open;
      _this3.setState({ open: open });
    });
  },
  render: function render() {
    var _this4 = this;

    return (0, _react.createElement)('div', _extends({
      ref: function ref(container) {
        return _this4.$root = (0, _jquery2.default)(container);
      }
    }, this.props.container), (0, _react.createElement)('select', _extends({
      ref: function ref(select) {
        return _this4.$select = (0, _jquery2.default)(select);
      }
    }, cleanupSelectProps(this.props))));
  }
});

ReactBS.propTypes = {
  bs: _react.PropTypes.object,
  'bs-events': _react.PropTypes.objectOf(_react.PropTypes.func)
};

exports.default = ReactBS;
