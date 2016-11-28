import React from 'react';
import {Component as ReactComponent} from 'react';

import UserBadge from './components/user-badge/user-badge';

class JellynoteApp extends ReactComponent {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         color: props.initialColor
    //     };
    // }

    render() {

        return <div className="main-wrapper">
            <aside className="main-left-pane">
                <UserBadge {...this.props}/>
            </aside>

            <div className="main-right-pane">
                <header className="main-header">
                    <h1>Hello</h1>
                </header>
                <div className="row main-content">
                    <p>Webapp loaded</p>
                    <p>Mode: {this.props.mode}</p>
                    <footer className="row main-footer"></footer>
                </div>
            </div>
        </div>;
    }
}

export {
    JellynoteApp
};