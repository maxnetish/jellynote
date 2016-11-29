import Reflux from 'reflux';

import {session as sessionResource} from '../../resources';

const actionSyncOptions = {sync: true};
const actionAsyncOptions = {sync: false};

const LoginDialogActions = Reflux.createActions({
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
            userName: '',
            password: '',
            error: null
        };
    }

    onLogin(data) {
        this.state.loading = true;
        this.state.error = false;
        this.trigger(this.state);

        sessionResource.postLogin(data)
            .then(function onSuccessLogin(response) {
                LoginDialogActions.loginCompleted();
                return response;
            })
            .catch(function (err) {
                LoginDialogActions.loginFailed(err);
            });
    }

    onLoginCompleted() {
        this.state.loading = false;
        this.state.error = null;
        sessionResource.get(true);
        this.trigger(this.state);
    }

    onLoginFailed(err) {
        this.state.loading = false;
        this.state.error = err;
        this.trigger(this.state);
    }

    onCancel() {

    }
}

export {
    LoginDialogActions,
    LoginDialogStore
}