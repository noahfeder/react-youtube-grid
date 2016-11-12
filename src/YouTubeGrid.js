import React, { Component } from 'react';

// import style from './style.js';
import YouTube from './YouTube.js';

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
    flexGrow: '1',
    flexShrink: '100%',
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
    webkitTransition: 'background 200ms',
    transition: 'background 200ms',
  },
  playButtonHover: {
    backgroundImage: `url('./img/playred.png')`,
  },
}

export default class YouTubeGrid extends Component {
  // static get propTypes() {
  //   return {
  //     youtubeUrls: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  //   }
  // }

  static get defaultProps() {
    return {
      youtubeUrls: [],
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      active: 0
    }
  }

  expand(num) {
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
        <span>
          <img
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
