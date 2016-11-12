'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _youtubePlayer = require('youtube-player');

var _youtubePlayer2 = _interopRequireDefault(_youtubePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import style from './style';
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
/**
 * Check whether a `props` change should result in the video being updated.
 *
 * @param {Object} prevProps
 * @param {Object} props
 */
function shouldUpdateVideo(prevProps, props) {
  // A changing video should always trigger an update
  if (prevProps.videoId !== props.videoId) {
    return true;
  }

  // Otherwise, a change in the start/end time playerVars also requires a player
  // update.
  var prevVars = prevProps.opts.playerVars || {};
  var vars = props.opts.playerVars || {};

  return prevVars.start !== vars.start || prevVars.end !== vars.end;
}

/**
 * Neutralise API options that only require a video update, leaving only options
 * that require a player reset. The results can then be compared to see if a
 * player reset is necessary.
 *
 * @param {Object} opts
 */
function filterResetOptions(opts) {
  return Object.assign({}, opts, {
    playerVars: Object.assign({}, opts.playerVars, {
      autoplay: 0,
      start: 0,
      end: 0
    })
  });
}

/**
 * Check whether a `props` change should result in the player being reset.
 * The player is reset when the `props.opts` change, except if the only change
 * is in the `start` and `end` playerVars, because a video update can deal with
 * those.
 *
 * @param {Object} prevProps
 * @param {Object} props
 */
function shouldResetPlayer(prevProps, props) {
  return !(0, _lodash2['default'])(filterResetOptions(prevProps.opts), filterResetOptions(props.opts));
}

/**
 * Check whether a props change should result in an id or className update.
 *
 * @param {Object} prevProps
 * @param {Object} props
 */
function shouldUpdatePlayer(prevProps, props) {
  return prevProps.id === props.id || prevProps.className === props.className;
}

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
          className: _react2['default'].PropTypes.string,

          // https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
          opts: _react2['default'].PropTypes.object,

          // event subscriptions
          onReady: _react2['default'].PropTypes.func,
          onError: _react2['default'].PropTypes.func,
          onPlay: _react2['default'].PropTypes.func,
          onPause: _react2['default'].PropTypes.func,
          onEnd: _react2['default'].PropTypes.func,
          onStateChange: _react2['default'].PropTypes.func,
          onPlaybackRateChange: _react2['default'].PropTypes.func,
          onPlaybackQualityChange: _react2['default'].PropTypes.func
        };
      }

      return get;
    }()
  }, {
    key: 'defaultProps',
    get: function () {
      function get() {
        return {
          opts: {},
          onReady: function () {
            function onReady() {}

            return onReady;
          }(),
          onError: function () {
            function onError() {}

            return onError;
          }(),
          onPlay: function () {
            function onPlay() {}

            return onPlay;
          }(),
          onPause: function () {
            function onPause() {}

            return onPause;
          }(),
          onEnd: function () {
            function onEnd() {}

            return onEnd;
          }(),
          onStateChange: function () {
            function onStateChange() {}

            return onStateChange;
          }(),
          onPlaybackRateChange: function () {
            function onPlaybackRateChange() {}

            return onPlaybackRateChange;
          }(),
          onPlaybackQualityChange: function () {
            function onPlaybackQualityChange() {}

            return onPlaybackQualityChange;
          }()
        };
      }

      return get;
    }()

    /**
      * Expose PlayerState constants for convenience. These constants can also be
      * accessed through the global YT object after the YouTube IFrame API is instantiated.
      * https://developers.google.com/youtube/iframe_api_reference#onStateChange
      */

  }, {
    key: 'PlayerState',
    get: function () {
      function get() {
        return {
          UNSTARTED: -1,
          ENDED: 0,
          PLAYING: 1,
          PAUSED: 2,
          BUFFERING: 3,
          CUED: 5
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
    key: 'componentDidUpdate',
    value: function () {
      function componentDidUpdate(prevProps) {
        if (shouldUpdatePlayer(prevProps, this.props)) {
          this.updatePlayer();
        }

        if (shouldResetPlayer(prevProps, this.props)) {
          this.resetPlayer();
        }

        if (shouldUpdateVideo(prevProps, this.props)) {
          this.updateVideo();
        }
      }

      return componentDidUpdate;
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
     * https://developers.google.com/youtube/iframe_api_reference#onReady
     *
     * @param {Object} event
     *   @param {Object} target - player object
     */

  }, {
    key: 'onPlayerReady',
    value: function () {
      function onPlayerReady(event) {
        this.props.onReady(event);
      }

      return onPlayerReady;
    }()
    /**
     * https://developers.google.com/youtube/iframe_api_reference#onError
     *
     * @param {Object} event
     *   @param {Integer} data  - error type
     *   @param {Object} target - player object
     */

  }, {
    key: 'onPlayerError',
    value: function () {
      function onPlayerError(event) {
        this.props.onError(event);
      }

      return onPlayerError;
    }()

    /**
     * https://developers.google.com/youtube/iframe_api_reference#onStateChange
     *
     * @param {Object} event
     *   @param {Integer} data  - status change type
     *   @param {Object} target - actual YT player
     */

  }, {
    key: 'onPlayerStateChange',
    value: function () {
      function onPlayerStateChange(event) {
        this.props.onStateChange(event);
        switch (event.data) {

          case YouTube.PlayerState.ENDED:
            this.props.onEnd(event);
            break;

          case YouTube.PlayerState.PLAYING:
            this.props.onPlay(event);
            break;

          case YouTube.PlayerState.PAUSED:
            this.props.onPause(event);
            break;

          default:
            return;
        }
      }

      return onPlayerStateChange;
    }()
  }, {
    key: 'onPlayerPlaybackRateChange',


    /**
     * https://developers.google.com/youtube/iframe_api_reference#onPlaybackRateChange
     *
     * @param {Object} event
     *   @param {Float} data    - playback rate
     *   @param {Object} target - actual YT player
     */
    value: function () {
      function onPlayerPlaybackRateChange() {
        this.props.onPlaybackRateChange(event);
      }

      return onPlayerPlaybackRateChange;
    }()

    /**
     * https://developers.google.com/youtube/iframe_api_reference#onPlaybackQualityChange
     *
     * @param {Object} event
     *   @param {String} data   - playback quality
     *   @param {Object} target - actual YT player
     */

  }, {
    key: 'onPlayerPlaybackQualityChange',
    value: function () {
      function onPlayerPlaybackQualityChange(event) {
        this.props.onPlaybackQualityChange(event);
      }

      return onPlayerPlaybackQualityChange;
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
    key: 'resetPlayer',


    /**
     * Shorthand for destroying and then re-creating the Youtube Player
     */
    value: function () {
      function resetPlayer() {
        this.internalPlayer.destroy().then(this.createPlayer);
      }

      return resetPlayer;
    }()

    /**
     * Method to update the id and class of the Youtube Player iframe.
     * React should update this automatically but since the Youtube Player API
     * replaced the DIV that is mounted by React we need to do this manually.
     */

  }, {
    key: 'updatePlayer',
    value: function () {
      function updatePlayer() {
        var _this2 = this;

        this.internalPlayer.getIframe().then(function (iframe) {
          iframe.setAttribute('id', _this2.props.id);
          iframe.setAttribute('class', _this2.props.className);
        });
      }

      return updatePlayer;
    }()
  }, {
    key: 'updateVideo',


    /**
     * Call Youtube Player API methods to update the currently playing video.
     * Depeding on the `opts.playerVars.autoplay` this function uses one of two
     * Youtube Player API methods to update the video.
     */
    value: function () {
      function updateVideo() {
        if (typeof this.props.videoId === 'undefined' || this.props.videoId === null) {
          this.internalPlayer.stopVideo();
          return;
        }

        // set queueing options
        var autoplay = false;
        var opts = {
          videoId: this.props.videoId
        };
        if ('playerVars' in this.props.opts) {
          autoplay = this.props.opts.playerVars.autoplay === 1;
          if ('start' in this.props.opts.playerVars) {
            opts.startSeconds = this.props.opts.playerVars.start;
          }
          if ('end' in this.props.opts.playerVars) {
            opts.endSeconds = this.props.opts.playerVars.end;
          }
        }

        // if autoplay is enabled loadVideoById
        if (autoplay) {
          this.internalPlayer.loadVideoById(opts);
          return;
        }
        // default behaviour just cues the video
        this.internalPlayer.cueVideoById(opts);
      }

      return updateVideo;
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
          _react2['default'].createElement('div', { style: style.gridItemInner, id: this.props.id, className: this.props.className, ref: this.refContainer })
        );
      }

      return render;
    }()
  }]);

  return YouTube;
}(_react2['default'].Component);

exports['default'] = YouTube;
