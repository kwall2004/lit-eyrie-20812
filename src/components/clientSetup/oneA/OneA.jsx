import React from 'react';
import styles from './one-a.less';

const OneA = React.createClass({
    render() {
        return (
            <div className="one-a">
                <h1>
                    Component 1A
                </h1>
                <button
                    onClick={() => this.props.increment('OneA')}>
                    +
                </button>
                <span>
                    {this.props.counters.find(function(counter) {
                        return counter.get('name') == 'OneA';
                    }).get('value')}
                </span>
            </div>
        )
    }
});

module.exports = OneA;