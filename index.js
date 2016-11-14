'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _youtubePlayer = require('youtube-player');

var _youtubePlayer2 = _interopRequireDefault(_youtubePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    flex: '1',
    flexBasis: '33%',
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
    WebkitTransition: 'background 200ms',
    transition: 'background 200ms'
  },
  playButtonHover: {
    backgroundImage: 'url(\'./img/playred.png\')'
  }
};

var YouTube = function (_React$Component) {
  _inherits(YouTube, _React$Component);

  _createClass(YouTube, null, [{
    key: 'propTypes',
    get: function () {
      function get() {
        return {
          videoId: _react2['default'].PropTypes.string,

          // custom ID for player element
          id: _react2['default'].PropTypes.string,

          // custom class name for player element
          className: _react2['default'].PropTypes.string
        };
      }

      return get;
    }()
  }, {
    key: 'defaultProps',
    get: function () {
      function get() {
        return {
          opts: {}
        };
      }

      return get;
    }()
  }]);

  function YouTube(props) {
    _classCallCheck(this, YouTube);

    var _this = _possibleConstructorReturn(this, (YouTube.__proto__ || Object.getPrototypeOf(YouTube)).call(this, props));

    _this.container = null;
    _this.internalPlayer = null;
    return _this;
  }

  _createClass(YouTube, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        this.createPlayer();
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentWillUnmount',
    value: function () {
      function componentWillUnmount() {
        /**
         * Note: The `youtube-player` package that is used promisifies all Youtube
         * Player API calls, which introduces a delay of a tick before it actually
         * gets destroyed. Since React attempts to remove the element instantly
         * this method isn't quick enough to reset the container element.
         */
        this.internalPlayer.destroy();
      }

      return componentWillUnmount;
    }()
    /**
     * Initialize the Youtube Player API on the container and attach event handlers
     */

  }, {
    key: 'createPlayer',
    value: function () {
      function createPlayer() {
        // do not attempt to create a player server-side, it won't work
        if (typeof document === 'undefined') return;
        // create player
        var playerOpts = Object.assign({}, this.props.opts, {
          // preload the `videoId` video if one is already given
          videoId: this.props.videoId
        });
        this.internalPlayer = (0, _youtubePlayer2['default'])(this.container, playerOpts);
        // attach event handlers
        this.internalPlayer.on('ready', this.onPlayerReady);
        this.internalPlayer.on('error', this.onPlayerError);
        this.internalPlayer.on('stateChange', this.onPlayerStateChange);
        this.internalPlayer.on('playbackRateChange', this.onPlayerPlaybackRateChange);
        this.internalPlayer.on('playbackQualityChange', this.onPlayerPlaybackQualityChange);
      }

      return createPlayer;
    }()
  }, {
    key: 'refContainer',
    value: function () {
      function refContainer(container) {
        this.container = container;
      }

      return refContainer;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        return _react2['default'].createElement(
          'span',
          { style: style.gridItemOuter },
          _react2['default'].createElement('div', { style: style.gridItemInner, id: this.props.id, className: this.props.className, ref: this.refContainer.bind(this) })
        );
      }

      return render;
    }()
  }]);

  return YouTube;
}(_react2['default'].Component);

var YouTubeGrid = function (_Component) {
  _inherits(YouTubeGrid, _Component);

  _createClass(YouTubeGrid, null, [{
    key: 'propTypes',
    get: function () {
      function get() {
        return {
          youtubeUrls: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string).isRequired
        };
      }

      return get;
    }()
  }]);

  function YouTubeGrid(props) {
    _classCallCheck(this, YouTubeGrid);

    var _this2 = _possibleConstructorReturn(this, (YouTubeGrid.__proto__ || Object.getPrototypeOf(YouTubeGrid)).call(this, props));

    _this2.state = {
      active: -1
    };
    return _this2;
  }

  _createClass(YouTubeGrid, [{
    key: 'componentWillMount',
    value: function () {
      function componentWillMount() {
        console.log(this.props);
        console.log(this.state);
      }

      return componentWillMount;
    }()
  }, {
    key: 'expand',
    value: function () {
      function expand(num) {
        console.log('clicky');
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
        var _this3 = this;

        return this.props.youtubeUrls.map(function (videoId, index) {
          var active = _this3.state.active === index;
          var videoOrPlaceholder = active ? _react2['default'].createElement(YouTube, {
            id: videoId,
            videoId: videoId,
            opts: { playerVars: { autoplay: 1 } }
          }) : _react2['default'].createElement(
            'span',
            { style: style.gridItemOuter },
            _react2['default'].createElement('img', {
              style: style.gridItemInner,
              className: 'placeholder',
              src: 'http://img.youtube.com/vi/' + String(videoId) + '/mqdefault.jpg',
              alt: 'placeholder',
              onClick: function () {
                function onClick() {
                  return _this3.expand(index);
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
                return _this3.expand(index);
              }

              return onClick;
            }(),
            onMouseEnter: function () {
              function onMouseEnter() {
                return _this3.style = style.playButtonHover;
              }

              return onMouseEnter;
            }(),
            onMouseLeave: function () {
              function onMouseLeave() {
                return _this3.style = style.playButton;
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
