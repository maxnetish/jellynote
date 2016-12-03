import React from 'react';
import UserBadge from '../user-badge/user-badge';

function Sidebar(props) {
    return  <aside className="main-left-pane">
        <UserBadge {...props}/>
    </aside>
}

export default Sidebar;