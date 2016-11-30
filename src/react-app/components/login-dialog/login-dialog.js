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
import Spinner from 'elemental/lib/components/Spinner';
import Glyph from 'elemental/lib/components/Glyph';
import Alert from 'elemental/lib/components/Alert';


import * as LoginDialogFlux from './login-dialog-flux';

class LoginDialog extends RefluxComponent {

    constructor(props) {
        super(props);
        this.store = LoginDialogFlux.LoginDialogStore; // <- the only thing needed to tie the store into this component
    }

    render() {
        console.log('On render: ', this.state);

        let formId = 'jellynote-login-form',
            usernameId = 'jellynote-login-form-input-username',
            passwordId = 'jellynote-login-form-input-password';

        return <Modal width="small" isOpen={this.props.isOpen} onCancel={this.onCancel.bind(this)}>
            <ModalHeader text="Login" showCloseButton onClose={this.onCancel.bind(this)}/>
            <ModalBody>
                <Form id={formId} onSubmit={this.onFormSubmit.bind(this)} name={formId} method="POST">
                    <FormField label="Login" htmlFor={usernameId}>
                        <FormInput autoFocus type="text" placeholder="Enter user name" name="username" required
                                   id={usernameId} disabled={this.state.loading}/>
                    </FormField>
                    <FormField label="Password" htmlFor={passwordId}>
                        <FormInput type="password" placeholder="Password" name="password" id={passwordId}
                                   disabled={this.state.loading}/>
                    </FormField>
                </Form>
                {/*{if (this.state.error) {return <Alert type="danger"><strong>Error:</strong> {this.state.error}</Alert>;}}*/}
                {this.state.error ? <Alert type="danger"><strong>Error:</strong> {this.state.error}</Alert> : null}
            </ModalBody>
            <ModalFooter>
                <Button type="primary" submit form={formId} disabled={this.state.loading}>
                    {this.state.loading ? <Spinner type="inverted"/> : <Glyph icon="log-in"/>}
                    &nbsp;Login
                </Button>
                <Button type="link-cancel" onClick={this.onCancel.bind(this)}
                        disabled={this.state.loading}>Cancel</Button>
            </ModalFooter>
        </Modal>;
    }

    onCancel(e) {
        e.preventDefault();
        LoginDialogFlux.LoginDialogActions.cancel();
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
    onClose: React.PropTypes.func,
    onFullfill: React.PropTypes.func
};

export default LoginDialog;