import kendo from 'kendo-ui-web/scripts/kendo.upload.min';
import React from 'react';
import ReactDOM from 'react-dom';

const Upload = React.createClass({
  componentDidMount() {
    var element = ReactDOM.findDOMNode(this);

    this.upload = new kendo.ui.Upload(element, this.props.options);
  },

  //don't run render again, create widget once, then leave it alone
  shouldComponentUpdate() {
    return false;
  },

  componentWillUnmount() {
    if (this.upload) {
      this.upload.destroy();
    }
  },

  render() {
    return <input name={this.props.name} type="file" />;
  },
});

export default Upload;
