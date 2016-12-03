import Reflux from 'reflux';

import {session as sessionResource} from '../../resources';
import * as GlobalDispatcher from '../../main-dispatcher';

const actionSyncOptions = {sync: true};
const actionAsyncOptions = {sync: false};

const LoginDialogActions = Reflux.createActions({
    'componentMounted': actionSyncOptions,
    'componentWillReceiveProps': actionSyncOptions,
    'login': actionSyncOptions,
    'loginCompleted': actionAsyncOptions,
    'loginFailed': actionAsyncOptions,
    'cancel': actionSyncOptions
});

class LoginDialogStore extends Reflux.Store {
    constructor(props) {
        super(props);
        this.listenables = LoginDialogActions;
        this.state = {
            loading: false,
            error: null
        };
    }

    onComponentMounted (props) {
        this.props = props;
    }

    onComponentWillReceiveProps(newProps, oldProps) {
        this.props = newProps;
    }

    onLogin(data) {
        this.state.loading = true;
        this.state.error = null;
        this.trigger(this.state);

        sessionResource.postLogin(data)
            .then(function onSuccessLogin(response) {
                LoginDialogActions.loginCompleted(data);
                return response;
            })
            .catch(function (err) {
                LoginDialogActions.loginFailed(err);
            });
    }

    onLoginCompleted(data) {
        this.state.loading = false;
        this.state.error = null;
        this.props.onFullfill(data);
        sessionResource.clear();
        GlobalDispatcher.Dispatcher.emit(GlobalDispatcher.Event.USER_CHANGED, data);
        this.trigger(this.state);
    }

    onLoginFailed(err) {
        this.state.loading = false;
        this.state.error = err;
        this.trigger(this.state);
    }

    onCancel() {
        this.state.error = null;
        this.props.onCancel();
        this.trigger(this.state);
    }
}

export {
    LoginDialogActions,
    LoginDialogStore
}