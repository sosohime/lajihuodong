import React from 'react';
import { Link } from 'react-router';

import './index.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="index">
        <Link to="sleepingpPosture">
          <img src={require('../images/index.jpg')} alt=""/>
        </Link>
      </div>
    );
  }
}
