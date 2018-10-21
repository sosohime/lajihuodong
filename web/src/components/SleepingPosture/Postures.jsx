import React from 'react';
import { Link } from 'react-router';

export default class Postures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        activePosture: props.routeParams
    }
  }
  componentDidMount() {
    
  }

  routeToPosture = (item) => {
    console.log(item)
  }
  
  render() {
    const {
        activePosture
    } = this.state;

    return (
      <div>
        this is Postures
      </div>
    );
  }
}


