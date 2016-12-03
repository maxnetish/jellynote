import React from 'react';
import {Component as RefluxComponent} from 'reflux';

import Button from 'elemental/lib/components/Button';
import Card from 'elemental/lib/components/Card';
import Glyph from 'elemental/lib/components/Glyph';

import * as LettersBriefFlux from './letters-brief-flux';

class LettersBriefList extends RefluxComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.store = LettersBriefFlux.LettersBriefListStore; // <- the only thing needed to tie the store into this component
    }

    render() {
        return <div className="sidebar-item letters-brief-list">
            Список здесь
        </div>;
    }
}

export default LettersBriefList;