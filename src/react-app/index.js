import React from 'react';
import {Component as ReactComponent} from 'react';

import {Router, browserHistory} from 'react-router'
import {Route} from 'react-router'

import Header from './components/header';
import Sidebar from './components/sidebar';

import IndexComponent from 'bundle-loader?lazy&name=dashboard!./routes/home';
import LetterEdit from 'bundle-loader?lazy&name=letter-edit!./routes/letter-edit';
import LetterView from 'bundle-loader?lazy&name=letter-view!./routes/letter-view';

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
        return <div className="main-wrapper">
            <Sidebar/>
            <div className="main-right-pane">
                <Header/>
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
    }
}

export {
    JellynoteApp
};