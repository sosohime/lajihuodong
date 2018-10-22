import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

import fetch from 'LIB/fetch';
import { initConfig } from 'LIB/wechat';

import Index from './components/Index';
import SleepingPosture from './components/SleepingPosture/SleepingPosture';
import Postures from './components/SleepingPosture/Postures';
import Lottery from './components/Lottery/Lottery'

import './index.less';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    // TODO: get wechat sign
    fetch('/getsign')
      .then(res => {
        initConfig({...res})
      })
  }

  render() {
    return (
      <div className="container">
        <div style={{ position: 'relative', height: '100%' }}>
          <Link to="sleepingpPosture">sleepingpPosture</Link>
          <Link to="lottery">Lottery</Link>
          {this.props && this.props.children && React.cloneElement(this.props.children, {
            changeTitle: title => this.setState({ title })
          }) || 'no content'}
        </div>

      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="sleepingpPosture">
        <IndexRoute component={SleepingPosture} />
        <Route path="*" component={Postures} />
      </Route>
      <Route path="lottery" component={Lottery} />
    </Route>
  </Router>
, document.getElementById('app'));
