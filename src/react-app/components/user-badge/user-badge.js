import React from 'react';
import {Component as RefluxComponent} from 'reflux';

import Button from 'elemental/lib/components/Button';

import * as UserBadgeFlux from './user-badge-flux';

import LoginDialog from '../login-dialog/login-dialog';

class UserBadge extends RefluxComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.store = UserBadgeFlux.UserBadgeStore; // <- the only thing needed to tie the store into this component
    }

    componentDidMount() {
        UserBadgeFlux.UserBadgeActions.componentMounted();
    }

    render() {
        console.info('Render UserBadge, state: ', this.state);

        let internalMarkup = {
            'LOGGED': <div>Logged in as <span>{this.state.user.userName}</span>
                <form action="/logout" method="post">
                    <div>
                        <input type="submit" value="Log Out"/>
                    </div>
                </form>
            </div>,
            'ANON': <div>
                <Button type="link-primary" onClick={this.handleLogin}>Login</Button>
                <LoginDialog isOpen={this.state.loginDialogVisible} onClose={UserBadgeFlux.UserBadgeActions.loginCancel}/>
            </div>,
            'UNKNOWN': <div></div>
        };

        return <div className="user-badge">
            {internalMarkup[this.state.mode]}
        </div>;
    }

    handleLogin() {
        UserBadgeFlux.UserBadgeActions.login();
    }
}

export default UserBadge;