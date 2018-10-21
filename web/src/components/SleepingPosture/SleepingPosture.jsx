import React from 'react';
import { Link } from 'react-router';

import './index.less';

export default class SleepPosture extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    
  }

  routeToPosture = (item) => {
    console.log(item)
  }
  
  render() {
    const postures = [1,2,3,4]

    return (
      <div className="sleepingPosture">
        <ul onChange={this.routeToPosture}>
          {postures.map(item => <li onClick={() => this.routeToPosture(item)}><Link to={`/sleepingpPosture/${item}`}>{`第${item}种`}</Link></li>)}
        </ul>
      </div>
    );
  }
}


