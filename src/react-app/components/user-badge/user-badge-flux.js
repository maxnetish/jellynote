import Reflux from 'reflux';
import {session as sessionResource} from '../../resources';

const actionSyncOptions = {sync: true};
const actionAsyncOptions = {sync: false};

const UserBadgeActions = Reflux.createActions({
    'componentMounted': actionAsyncOptions,
    'dataGet': actionAsyncOptions,
    'dataGetCompleted': actionAsyncOptions,
    'dataGetFailed': actionAsyncOptions,
    'login': actionSyncOptions,
    'loginCancel': actionSyncOptions
});

class UserBadgeStore extends Reflux.Store {
    constructor(props) {
        super(props);
        this.listenables = UserBadgeActions;
        this.state = {
            loading: false,
            user: {},
            retrievedOnce: false,
            loginDialogVisible: false,
            mode: 'UNKNOWN'
        };
    }

    onComponentMounted() {
        if (!this.retrievedOnce) {
            getData();
        }
    }

    onDataGet() {
        this.state.loading = true;
        this.state.retrievedOnce = true;
        this.trigger(this.state);
    }

    onDataGetCompleted(data) {
        this.state.loading = false;
        this.state.user = data;
        this.state.mode = data.userName ? 'LOGGED' : 'ANON';
        this.trigger(this.state);
    }

    onDataGetFailed(err) {
        this.state.loading = false;
        this.state.error = err;
        console.error(err);
        this.trigger(this.state);
    }

    onLogin() {
        this.state.loginDialogVisible = true;
        this.trigger(this.state);
    }

    onLoginCancel() {
        console.info('onLoginCancel throws');
        this.state.loginDialogVisible = false;
        this.trigger(this.state);
    }
}

function getData() {
    UserBadgeActions.dataGet();
    sessionResource.get()
        .then(function (result) {
            UserBadgeActions.dataGetCompleted(result);
            return result;
        })
        ['catch'](function (err) {
        UserBadgeActions.dataGetFailed(err);
    });
}

export {
    UserBadgeActions,
    UserBadgeStore
}