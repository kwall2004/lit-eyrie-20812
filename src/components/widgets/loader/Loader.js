import React from 'react';
import Spinner from 'react-spin';

const Loader = React.createClass({
  render() {
    if (this.props.loading) {
      return (
        <div style={this.props.style}>
          <Spinner config={this.props.config} />
        </div>
      )
    }
    else {
      return (
        <div>
          {this.props.children}
        </div>
      )
    }
  }
});

module.exports = Loader;
