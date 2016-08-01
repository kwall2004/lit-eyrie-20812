import React from 'react';
import { Link } from 'react-router';
import styles from './one.less';

const One = React.createClass({
    render() {
        var child;
        if (this.props.children) {
            child = React.cloneElement(this.props.children, {
                counters: this.props.counters,
                increment: this.props.increment
            });
        } 

        return (
            <div className="one">
                <h1>
                    Component 1
                </h1>
                <button
                    onClick={() => this.props.increment(0)}>
                    +
                </button>
                <span>
                    {this.props.counters.getIn([0, 'value'])}
                </span>
                <nav>
                    <ul>
                        <li>
                            <Link to="/one/a">Component 1a</Link>
                        </li>
                    </ul>
                </nav>
                <main>
                    {child}
                </main>
            </div>
        )
    }
});

module.exports = One;