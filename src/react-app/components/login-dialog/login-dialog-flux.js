import Reflux from 'reflux';

const actionSyncOptions = {sync: true};
const actionAsyncOptions = {sync: false};

const LoginDialogActions = Reflux.createActions({
    'login': actionSyncOptions,
    'loginComleted': actionAsyncOptions,
    'loginFailed': actionAsyncOptions,
    cancel: actionSyncOptions
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

    onLogin() {

    }

    onLoginCompleted(user) {

    }

    onLoginFailed(err) {

    }

    onCancel() {

    }
}

export {
    LoginDialogActions,
    LoginDialogStore
}