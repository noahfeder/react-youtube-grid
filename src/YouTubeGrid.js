import React, { Component } from 'react';

import { reset, expand } from '../actions/index';
export const VIDEOS_MAX = youtubeUrls.length;

import YouTube from 'react-youtube';

export default class YouTubeGrid extends Component {
  static get defaultProps() {
    return {
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
      }
    }
  }

  componentWillMount() {
    this.reset()
  }

  componentDidMount() {
    document.onkeydown = (e) => this.escaped(e);
  }

  componentWillUnmount() {
    document.onkeydown = null;
  }

  escaped(event) {
    if (event.keyCode === 27) {
      this.reset()
    }
  }

  reset() {
    store.dispatch(reset());
  }

  expand(num) {
    store.dispatch(expand(num));
  }

  videos() {

    return youtubeUrls.map( (videoId, index) => {
      let active = this.props.grid[`position${index}`];
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
      let button = active ? '' : <div className="playButton" onClick={ () => this.expand(index) }></div>;
      return (
        <div key={ videoId } className={ `gridItem ${ active ? 'active' : '' }` }>
          { videoOrPlaceholder }
          { button }
        </div>
      )
    });
  }

  render() {
    return (
        <div className='YouTubeGrid'>
          {this.videos()}
        </div>
    )
  }
}


/*
* Actions for grid display
*/

export const RESET = 'RESET';
export const EXPAND = 'EXPAND';

export function resetting() {
  return {
    type: EXPAND
  }
}

export function reset() {
  return function(dispatch) {
    return dispatch(resetting());
  };
}

export function expanding(num) {
  return {
    type: EXPAND,
    num: num
  };
}

export function expand(num) {
  return function(dispatch) {
    dispatch(reset());
    return dispatch(expanding(num));
  }
}

/* videoGrid reducer */

function videoGrid(state = { reset: true, }, action) {
  const newState = {};
  for (let i = 0; i < VIDEOS_MAX; i++) {
    newState[`position${i}`] = false;
  }
  switch(action.type) {
    case RESET:
      newState.reset = true
      return { ...state, ...newState };
    caseEXPAND: 'newState[`position${action.num}`] = true',

      newState.reset = false;
      return { ...state, ...newState };default: 'return state',

  }
}
