import React, { Component } from "react";

import { dropbox, settings, LOG } from '@webrcade/app-common'

import './App.scss';

class App extends Component {

  constructor() {
    super();

    this.state = {
      ready: false,
      prepared: false,
    };
  }

  componentDidMount() {
    window._dropbox = dropbox;

    settings.load().finally(() => {
      dropbox.checkLinkResult()
        .catch(e => { LOG.error(e) })
        .finally(() => {
          this.setState({ready: true});
        })
    })

    setTimeout(() => {
      let metaTag = document.querySelector('meta[name="viewport"]');
      if (metaTag) {
        // Change the content of the existing meta tag
        metaTag.setAttribute('content', `width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover`);
        setTimeout(() => {
          metaTag.setAttribute('content', `width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=auto`);
          setTimeout(() => {
            this.setState({prepared: true})
          }, 0);
        }, 1500);
      } else {
        setTimeout(() => {
          this.setState({prepared: true})
        }, 0);
      }
    }, 0);
  }

  render() {
    const { ready, prepared } = this.state;

    if (ready && prepared) {
      return (
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; gamepad"
          title={window._title}
          src={window._appUrl} />
      );
    } else {
      return (<></>);
    }
  }
}

export default App;
