import React from 'react'

import {Link} from 'react-router'

class IndexComponent extends React.Component {
    render() {
        return (
            <div>
                <h1>Индекс</h1>
                <Link to={{ pathname: '/view/123', query: { name: 'ryan' } }}>
                    Hello
                </Link>
            </div>
        )
    }
}

module.exports = IndexComponent;