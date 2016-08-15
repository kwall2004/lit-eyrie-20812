import React from 'react';
import styles from './settings.less';

const Settings = React.createClass({
    render() {
        return (
            <div className="settings">
                <h1>
                    Settings
                </h1>
                <button
                    onClick={() => this.props.increment('Two')}>
                    +
                </button>
                <span>
                    {this.props.counters.find(function(counter) {
                        return counter.get('name') == 'Two';
                    }).get('value')}
                </span>
            </div>
        )
    }
});

module.exports = Settings;