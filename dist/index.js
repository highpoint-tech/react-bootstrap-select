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

exports.default = _react2.default.createClass({
  getInitialState: function getInitialState() {
    return { open: false };
  },
  componentDidUpdate: function componentDidUpdate() {
    var $this = (0, _jquery2.default)(this.refs.root);
    (0, _jquery2.default)(this.refs.select).selectpicker('refresh');
    var $select = $this.find('div.bootstrap-select');
    $select.toggleClass('open', this.state.open);
  },
  componentWillUnmount: function componentWillUnmount() {
    var $this = (0, _jquery2.default)(this.refs.root);
    $this.find('button').off('click');
    $this.find('.dropdown-menu').off('click');
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    var $this = (0, _jquery2.default)(this.refs.root);
    (0, _jquery2.default)(this.refs.select).selectpicker();

    $this.find('button').on('click', function (e) {
      e.stopPropagation();
      _this.setState({ open: !_this.state.open });
    });

    $this.find('.dropdown-menu').on('click', 'li a', function () {
      if (_this.props.multiple) return;
      _this.setState({ open: !_this.state.open });
    });
  },

  render: function render() {
    return (0, _react.createElement)('div', { ref: 'root' }, (0, _react.createElement)('select', _extends({ ref: 'select' }, this.props)));
  }
});
