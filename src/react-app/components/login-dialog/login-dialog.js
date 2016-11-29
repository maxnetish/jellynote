import React from 'react';
import {Component as RefluxComponent} from 'reflux';

import Modal from 'elemental/lib/components/Modal';
import ModalBody from 'elemental/lib/components/ModalBody';
import ModalHeader from 'elemental/lib/components/ModalHeader';
import ModalFooter from 'elemental/lib/components/ModalFooter';
import Button from 'elemental/lib/components/Button';
import Form from 'elemental/lib/components/Form';
import FormField from 'elemental/lib/components/FormField';
import FormInput from 'elemental/lib/components/FormInput';


import * as LoginDialogFlux from './login-dialog-flux';

class LoginDialog extends RefluxComponent {

    constructor(props) {
        super(props);

        this.state = {};
        this.store = LoginDialogFlux.LoginDialogStore; // <- the only thing needed to tie the store into this component
    }

    render() {
        let formId = 'jellynote-login-form',
            usernameId = 'jellynote-login-form-input-username',
            passwordId = 'jellynote-login-form-input-password';

        return <Modal width="small" isOpen={this.props.isOpen} onCancel={this.onCancel.bind(this)}>
            <ModalHeader text="Login" showCloseButton onClose={this.onCancel.bind(this)}/>
            <ModalBody>
                <Form id={formId} onSubmit={this.onFormSubmit.bind(this)} name={formId} method="POST">
                    <FormField label="Login" htmlFor={usernameId}>
                        <FormInput autoFocus type="text" placeholder="Enter user name" name="username" required
                                   id={usernameId}/>
                    </FormField>
                    <FormField label="Password" htmlFor={passwordId}>
                        <FormInput type="password" placeholder="Password" name="password" id={passwordId}/>
                    </FormField>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button type="primary" submit form={formId}>Login</Button>
                <Button type="link-cancel" onClick={this.onCancel.bind(this)}>Cancel</Button>
            </ModalFooter>
        </Modal>;
    }

    onCancel(e) {
        this.props.onClose();
    }

    onFormSubmit(e) {
        e.preventDefault();
        let form = e.target;
        LoginDialogFlux.LoginDialogActions.login({
            username: form.username.value,
            password: form.password.value
        });
    }

}

LoginDialog.propTypes = {
    isOpen: React.PropTypes.bool,
    onClose: React.PropTypes.func
};

export default LoginDialog;