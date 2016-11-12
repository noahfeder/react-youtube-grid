'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _YouTube = require('./YouTube.js');

var _YouTube2 = _interopRequireDefault(_YouTube);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import style from './style.js';


var style = {
  videoGrid: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '0',
    padding: '0px 5px'
  },
  gridItem: {
    position: 'relative',
    padding: '0px 5px 10px 5px',
    height: 'auto',
    flexGrow: '1',
    flexShrink: '100%',
    boxSizing: 'border-box',
    margin: 'auto'
  },
  gridItemOuter: {
    height: '0',
    padding: '0 0 56.25% 0',
    width: '100%',
    display: 'block',
    position: 'relative',
    margin: 'auto'
  },
  gridItemInner: {
    maxWidth: '100%',
    maxHeight: '100%',
    height: '100%',
    display: 'block',
    position: 'absolute',
    right: '0',
    left: '0',
    top: '0',
    bottom: '0',
    margin: 'auto'
  },
  playButton: {
    position: 'absolute',
    width: '60px',
    height: '42px',
    left: 'calc(50% - 30px)',
    top: 'calc(50% - 21px)',
    cursor: 'pointer',
    backgroundImage: 'url(\'./img/playdark.png\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    webkitTransition: 'background 200ms',
    transition: 'background 200ms'
  },
  playButtonHover: {
    backgroundImage: 'url(\'./img/playred.png\')'
  }
};

var YouTubeGrid = function (_Component) {
  _inherits(YouTubeGrid, _Component);

  _createClass(YouTubeGrid, null, [{
    key: 'defaultProps',

    // static get propTypes() {
    //   return {
    //     youtubeUrls: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    //   }
    // }

    get: function () {
      function get() {
        return {
          youtubeUrls: []
        };
      }

      return get;
    }()
  }]);

  function YouTubeGrid(props) {
    _classCallCheck(this, YouTubeGrid);

    var _this = _possibleConstructorReturn(this, (YouTubeGrid.__proto__ || Object.getPrototypeOf(YouTubeGrid)).call(this, props));

    _this.state = {
      active: 0
    };
    return _this;
  }

  _createClass(YouTubeGrid, [{
    key: 'expand',
    value: function () {
      function expand(num) {
        this.setState({
          active: num
        });
      }

      return expand;
    }()
  }, {
    key: 'videos',
    value: function () {
      function videos() {
        var _this2 = this;

        return this.props.youtubeUrls.map(function (videoId, index) {
          var active = _this2.state.active === index;
          var videoOrPlaceholder = active ? _react2['default'].createElement(_YouTube2['default'], {
            id: videoId,
            videoId: videoId,
            opts: { playerVars: { autoplay: 1 } }
          }) : _react2['default'].createElement(
            'span',
            null,
            _react2['default'].createElement('img', {
              className: 'placeholder',
              src: 'http://img.youtube.com/vi/' + String(videoId) + '/mqdefault.jpg',
              alt: 'placeholder',
              onClick: function () {
                function onClick() {
                  return _this2.expand(index);
                }

                return onClick;
              }()
            })
          );
          var button = active ? '' : _react2['default'].createElement('div', {
            className: 'playButton',
            style: style.playButton,
            onClick: function () {
              function onClick() {
                return _this2.expand(index);
              }

              return onClick;
            }(),
            onMouseEnter: function () {
              function onMouseEnter() {
                return _this2.style = style.playButtonHover;
              }

              return onMouseEnter;
            }(),
            onMouseLeave: function () {
              function onMouseLeave() {
                return _this2.style = style.playButton;
              }

              return onMouseLeave;
            }()
          });
          return _react2['default'].createElement(
            'div',
            { key: videoId, style: style.gridItem },
            videoOrPlaceholder,
            button
          );
        });
      }

      return videos;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        return _react2['default'].createElement(
          'div',
          { className: 'YouTubeGrid', style: style.videoGrid },
          this.videos()
        );
      }

      return render;
    }()
  }]);

  return YouTubeGrid;
}(_react.Component);

exports['default'] = YouTubeGrid;
