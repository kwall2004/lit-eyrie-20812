import React from 'react';
import { Row, Col } from 'react-bootstrap';

const EventIndicator = React.createClass({
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="31.291643">
        <g transform="translate(-359.17059,-516.27049)">
          <path className="indicator-ball" d="m 370.74492,541.58801 a 3.3366601,3.3366601 0 1 1 -6.67332,0 3.3366601,3.3366601 0 1 1 6.67332,0 z"
            transform="matrix(1.2591757,0,0,1.2591757,-90.339816,-139.23951)" />
          <path className="indicator-bell" d="m 359.99305,542.48768 c 0,0 -0.75755,-0.75761 0.0632,-2.36754 0.61961,-1.07319 2.84106,-1.6415 3.94591,-2.90419 0,-9.72726 -1.17412,-13.80603 8.32508,-13.85803 9.49921,0.052 8.32509,4.13077 8.32509,13.85803 1.10485,1.26269 3.32326,1.82573 3.94591,2.90419 0.82075,1.60993 0.0632,2.36754 0.0632,2.36754 l -12.3342,-0.12627 z" />
        </g>
      </svg>
    )
  }
});

module.exports = EventIndicator;
