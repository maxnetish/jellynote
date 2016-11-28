import React from 'react';
import {Component as RefluxComponent} from 'reflux';

import Modal from 'elemental/lib/components/Modal';
import ModalBody from 'elemental/lib/components/ModalBody';
import ModalHeader from 'elemental/lib/components/ModalHeader';
import ModalFooter from 'elemental/lib/components/ModalFooter';
import Button from 'elemental/lib/components/Button';

import * as LoginDialogFlux from './login-dialog-flux';

class LoginDialog extends RefluxComponent {

    constructor(props) {
        super(props);

        this.state = {};
        this.store = LoginDialogFlux.LoginDialogStore; // <- the only thing needed to tie the store into this component
    }

    render() {
        return <Modal isOpen={this.props.isOpen} onCancel={this.onCancel.bind(this)}>
            <ModalHeader text="Login" showCloseButton onClose={this.onCancel.bind(this)}/>
            <ModalBody>Modal body here</ModalBody>
            <ModalFooter>
                <Button type="primary" onClick={this.onLogin.bind(this)}>Login</Button>
                <Button type="link-cancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
            </ModalFooter>
        </Modal>;
    }

    onCancel() {
        this.props.onClose();
    }

    onLogin() {

    }

}

LoginDialog.propTypes = {
    isOpen: React.PropTypes.bool,
    onClose: React.PropTypes.func
};

export default LoginDialog;