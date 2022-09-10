import React, { Component } from "react";

import { dropbox, settings, LOG } from '@webrcade/app-common'

class App extends Component {

  constructor() {
    super();

    this.state = {
      ready: false
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
  }

  render() {
    const { ready } = this.state;

    if (ready) {
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
