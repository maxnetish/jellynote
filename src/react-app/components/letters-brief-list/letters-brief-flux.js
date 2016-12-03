import Reflux from 'reflux';

import {session as sessionResource} from '../../resources';
import * as GlobalDispatcher from '../../main-dispatcher';

const actionSyncOptions = {sync: true};
const actionAsyncOptions = {sync: false};

const LetterBriefListActions = Reflux.createActions({
    'componentMounted': actionAsyncOptions,
    'componentUnmount': actionSyncOptions
});

class LettersBriefListStore extends Reflux.Store {
    constructor(props) {
        super(props);
        this.listenables = LetterBriefListActions;
        this.state = {

        };
    }

    onComponentMounted() {

    }

    onComponentUnmount () {

    }
}

export {
    LetterBriefListActions,
    LettersBriefListStore
}