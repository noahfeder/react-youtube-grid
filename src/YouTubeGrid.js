import React, { Component } from 'react';
import youTubePlayer from 'youtube-player';

const style = {
  videoGrid: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '0',
    padding: '0px 5px',
  },
  gridItem: {
    position: 'relative',
    padding: '0px 5px 10px 5px',
    height: 'auto',
    flex: '1',
    flexBasis: '33%',
    boxSizing: 'border-box',
    margin: 'auto',
  },
  gridItemOuter: {
    height: '0',
    padding: '0 0 56.25% 0',
    width: '100%',
    display: 'block',
    position: 'relative',
    margin: 'auto',
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
    margin: 'auto',
  },
  playButton: {
    position: 'absolute',
    width: '60px',
    height: '42px',
    left: 'calc(50% - 30px)',
    top: 'calc(50% - 21px)',
    cursor: 'pointer',
    backgroundImage: `url('./img/playdark.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    WebkitTransition: 'background 200ms',
    transition: 'background 200ms',
  },
  playButtonHover: {
    backgroundImage: `url('./img/playred.png')`,
  },
}

class YouTube extends React.Component {
  static get propTypes() {
    return {
      videoId: React.PropTypes.string,

      // custom ID for player element
      id: React.PropTypes.string,

      // custom class name for player element
      className: React.PropTypes.string,
    };
  }
  static get defaultProps() {
    return {
      opts: {},
    };
  }

  constructor(props) {
    super(props);

    this.container = null;
    this.internalPlayer = null;
  }

  componentDidMount() {
    this.createPlayer();
  }

  componentWillUnmount() {
     /**
      * Note: The `youtube-player` package that is used promisifies all Youtube
      * Player API calls, which introduces a delay of a tick before it actually
      * gets destroyed. Since React attempts to remove the element instantly
      * this method isn't quick enough to reset the container element.
      */
    this.internalPlayer.destroy();
  }
  /**
   * Initialize the Youtube Player API on the container and attach event handlers
   */
  createPlayer() {
    // do not attempt to create a player server-side, it won't work
    if (typeof document === 'undefined') return;
    // create player
    const playerOpts = {
      ...this.props.opts,
      // preload the `videoId` video if one is already given
      videoId: this.props.videoId,
    };
    this.internalPlayer = youTubePlayer(this.container, playerOpts);
    // attach event handlers
    this.internalPlayer.on('ready', this.onPlayerReady);
    this.internalPlayer.on('error', this.onPlayerError);
    this.internalPlayer.on('stateChange', this.onPlayerStateChange);
    this.internalPlayer.on('playbackRateChange', this.onPlayerPlaybackRateChange);
    this.internalPlayer.on('playbackQualityChange', this.onPlayerPlaybackQualityChange);
  };

  refContainer(container) {
    this.container = container;
  };

  render() {
    return (
      <span style={ style.gridItemOuter } >
        <div style={ style.gridItemInner} id={this.props.id} className={this.props.className} ref={this.refContainer.bind(this)} />
      </span>
    );
  }
}



export default class YouTubeGrid extends Component {
  static get propTypes() {
    return {
      youtubeUrls: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      active: -1
    }
  }

  componentWillMount() {
    console.log(this.props)
    console.log(this.state)
  }

  expand(num) {
    console.log('clicky')
    this.setState({
      active: num
    });
  }

  videos() {
    return this.props.youtubeUrls.map( (videoId, index) => {
      let active = (this.state.active === index) ;
      let videoOrPlaceholder = active ?
        <YouTube
          id={ videoId }
          videoId={ videoId }
          opts={ { playerVars: {autoplay: 1} } }
        /> :
        <span style={ style.gridItemOuter }>
          <img
            style={ style.gridItemInner }
            className="placeholder"
            src={ `http://img.youtube.com/vi/${videoId}/mqdefault.jpg` }
            alt="placeholder"
            onClick={ () => this.expand(index) }
          />
        </span>;
      let button = active ? '' :
      <div
        className="playButton"
        style={ style.playButton }
        onClick={ () => this.expand(index) }
        onMouseEnter={ () => this.style = style.playButtonHover }
        onMouseLeave={ () => this.style = style.playButton }
      />;
      return (
        <div key={ videoId } style={ style.gridItem } >
          { videoOrPlaceholder }
          { button }
        </div>
      )
    });
  }

  render() {
    return (
        <div className='YouTubeGrid' style={ style.videoGrid }>
          {this.videos()}
        </div>
    )
  }
}
