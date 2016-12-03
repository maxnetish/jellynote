import React from 'react';
import {Component as RefluxComponent} from 'reflux';

import Button from 'elemental/lib/components/Button';
import Card from 'elemental/lib/components/Card';
import Glyph from 'elemental/lib/components/Glyph';

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

    componentWillUnmount() {
        UserBadgeFlux.UserBadgeActions.componentUnmount();
    }

    render() {
        console.info('Render UserBadge, state: ', this.state);

        let internalMarkup = {
            'LOGGED': <Card>
                <div className="u-text-center">
                    <span>Logged in as <b>{this.state.user.userName}</b></span>
                    <Button type="link-cancel" onClick={this.handleLogout.bind(this)}>
                        <Glyph icon="log-out"/>
                        &nbsp;Logout
                    </Button>
                </div>
            </Card>,
            'ANON': <Card>
                <div className="u-text-center">
                    <Button type="link-primary" onClick={this.handleLogin}>
                        <Glyph icon="log-in"/>
                        &nbsp;Login
                    </Button>
                </div>
                <LoginDialog isOpen={this.state.loginDialogVisible}
                             onCancel={UserBadgeFlux.UserBadgeActions.loginCancel}
                             onFullfill={UserBadgeFlux.UserBadgeActions.loginDialogFullfilled}/>
            </Card>,
            'UNKNOWN': <div></div>
        };

        return <div className="sidebar-item user-badge">
            {internalMarkup[this.state.mode]}
        </div>;
    }

    handleLogin() {
        UserBadgeFlux.UserBadgeActions.login();
    }

    handleLogout() {
        UserBadgeFlux.UserBadgeActions.logout();
    }
}

export default UserBadge;