import React from 'react';
import { Link } from 'react-router';
import styles from './clientSetup.less';

const ClientSetup = React.createClass({
    render() {
        return (
            <div className="client-setup">
                <h1>
                    Client Setup
                </h1>
                <button
                    onClick={() => this.props.increment('One')}>
                    +
                </button>
                <span>
                    {this.props.counters.find(counter => {
                        return counter.get('name') == 'One';
                    }).get('value')}
                </span>
                <nav>
                    <ul>
                        <li>
                            <Link to="/clientSetup/a">Component 1a</Link>
                        </li>
                    </ul>
                </nav>
                <main>
                    {this.props.children && React.cloneElement(this.props.children, {
                        counters: this.props.counters,
                        increment: this.props.increment
                    })}
                </main>
            </div>
        )
    }
});

module.exports = ClientSetup;