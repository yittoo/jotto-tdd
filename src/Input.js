import React, { Component } from 'react';
import {connect} from 'react-redux';

class Input extends Component {
  render() { 
    return ( <div>
      <button>BUTTON</button>
    </div> );
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps)(Input);