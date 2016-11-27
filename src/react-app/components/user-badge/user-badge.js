import React from 'react';
import {Component as RefluxComponent} from 'reflux';

import * as UserBadgeFlux from './user-badge-flux';

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
            'ADMIN': <div>Logged in as <span>{this.state.user.userName}</span>
                <form action="/logout" method="post">
                    <div>
                        <input type="submit" value="Log Out"/>
                    </div>
                </form>
            </div>,
            'PUB': <div><a href="/login">Login</a></div>
        };

        return <div className="user-badge">
            {internalMarkup[this.props.mode]}
        </div>;
    }
}

export {
    UserBadge
};