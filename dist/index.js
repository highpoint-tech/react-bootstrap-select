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
  delete newObj['bs-events'];
  return newObj;
};

var ReactBS = (0, _react.createClass)({
  getInitialState: function getInitialState() {
    return { open: false };
  },
  onHTMLClick: function onHTMLClick() {
    this.setState({ open: false });
  },
  handleBsEvents: function handleBsEvents() {
    var $select = (0, _jquery2.default)(this.refs.select);
    var eventsProp = this.props['bs-events'];
    if (eventsProp === undefined) return;
    events.map(function (event) {
      var fn = eventsProp[prefixEvent(event)];
      if (fn === undefined) return;
      $select.on(event + '.bs.select', function () {
        return fn.apply(undefined, arguments);
      });
    });
  },
  cancelBsEvents: function cancelBsEvents() {
    var $select = (0, _jquery2.default)(this.refs.select);
    var eventsProp = this.props['bs-events'];
    if (eventsProp === undefined) return;
    events.map(function (event) {
      var fn = eventsProp[prefixEvent(event)];
      if (fn === undefined) return;
      $select.off(event + '.bs.select', fn);
    });
  },
  componentDidUpdate: function componentDidUpdate() {
    var $this = (0, _jquery2.default)(this.refs.root);
    (0, _jquery2.default)(this.refs.select).selectpicker('refresh');
    var $select = $this.find('div.bootstrap-select');
    $select.toggleClass('open', this.state.open);
  },
  componentWillUnmount: function componentWillUnmount() {
    var $this = (0, _jquery2.default)(this.refs.root);
    this.cancelBsEvents();
    (0, _jquery2.default)('html').off('click', this.onHTMLClick);
    $this.find('button').off('click');
    $this.find('.dropdown-menu').off('click');
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    var $this = (0, _jquery2.default)(this.refs.root);
    var $select = (0, _jquery2.default)(this.refs.select);
    $select.selectpicker(this.props.bs);

    this.handleBsEvents();

    (0, _jquery2.default)('html').on('click', this.onHTMLClick);

    $this.find('button').on('click', function (e) {
      e.stopPropagation();
      var open = !_this.state.open;
      _this.setState({ open: open });
    });

    $this.find('.dropdown-menu').on('click', 'li a', function () {
      if (_this.props.multiple) return;
      var open = !_this.state.open;
      _this.setState({ open: open });
    });
  },
  render: function render() {
    return (0, _react.createElement)('div', { ref: 'root' }, (0, _react.createElement)('select', _extends({ ref: 'select' }, cleanupSelectProps(this.props))));
  }
});

ReactBS.propTypes = {
  bs: _react.PropTypes.object,
  'bs-events': _react.PropTypes.objectOf(_react.PropTypes.func)
};

exports.default = ReactBS;
