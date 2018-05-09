'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactStyleProptype = require('react-style-proptype');

var _reactStyleProptype2 = _interopRequireDefault(_reactStyleProptype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Timer extends _react.Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.timerId = null;
    this.prevTime = null;
    this.state = { remaining: props.remaining };
  }

  getChildContext() {
    return { remaining: this.state.remaining };
  }

  componentDidMount() {
    this.timerId = setInterval(this.handleTick.bind(this), this.props.interval);
    this.prevTime = Date.now();
  }
    
    componentWillUnmount() {
	this.clearTimer();
    }

    clearTimer() {
    clearInterval(this.timerId);
    this.timerId = null;
    this.prevTime = null;
  }

    handleTick() {
	const currentTime = Date.now();
	const elapsed = currentTime - this.prevTime;
	const nextRemaining = this.state.remaining - elapsed;
	if (nextRemaining <= 0) {
	if (this.props.afterComplete !== null) {
            this.props.afterComplete();
	}
	    this.clearTimer();
	} else {
	if (this.props.afterTick !== null) {
            this.props.afterTick(nextRemaining);
	}
	this.prevTime = currentTime;
	this.setState({ remaining: nextRemaining });
    }
  }

  render() {
    const { style, children } = this.props;
    return _react2.default.createElement(
      'div',
      { style: style },
      children
    );
  }
}
exports.default = Timer;
Timer.propTypes = {
  interval: _propTypes2.default.number, // msec
  remaining: _propTypes2.default.number.isRequired, // msec
  afterTick: _propTypes2.default.func, // callback after each ticks
  afterComplete: _propTypes2.default.func, // callback after remaining <= 0
  style: _reactStyleProptype2.default, // container style object
  children: _propTypes2.default.node // children react element node
};
Timer.defaultProps = {
  interval: 1000,
  afterTick: null,
  afterComplete: null,
  style: {},
  children: null
};
Timer.childContextTypes = {
  remaining: _propTypes2.default.number
};
