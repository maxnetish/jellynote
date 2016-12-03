import React from 'react';
import {Component as ReactComponent} from 'react';

import {Router, browserHistory} from 'react-router'
import {Route} from 'react-router'

import UserBadge from './components/user-badge/user-badge';

import IndexComponent from 'bundle-loader?lazy!./routes/home';
import LetterEdit from 'bundle-loader?lazy!./routes/letter-edit';
import LetterView from 'bundle-loader?lazy!./routes/letter-view';

function lazyLoadComponent(lazyModule) {
    return (location, cb) => {
        lazyModule(module => {
            cb(null, module)
        })
    };
}

class JellynoteApp extends ReactComponent {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         color: props.initialColor
    //     };
    // }


    render() {
        let x = <div className="main-wrapper">
            <aside className="main-left-pane">
                <UserBadge {...this.props}/>
            </aside>

            <div className="main-right-pane">
                <header className="main-header">
                    <h1>Hello</h1>
                </header>
                <div className="main-content">
                    <Router history={ browserHistory }>
                        <Route path="/" getComponent={ lazyLoadComponent(IndexComponent) } />
                        <Route path="view/:id" getComponent={ lazyLoadComponent(LetterView) }/>
                        <Route path="edit/:id" getComponent={ lazyLoadComponent(LetterEdit) }/>
                    </Router>
                </div>
                <footer className="main-footer"></footer>
            </div>
        </div>;

        return x;

        /*
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
         */
    }
}

export {
    JellynoteApp
};