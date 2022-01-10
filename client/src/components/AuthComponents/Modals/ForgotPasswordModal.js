import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';

class ForgotPasswordModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.handleForgotPassword=this.handleForgotPassword.bind(this);
    }

    handleForgotPassword(event) {
        this.toggleModalForgotPassword();
        alert("Sorry, Forgot password featured is not available")
        // alert(this.email.value);
        event.preventDefault();

    }

    render() {
        return(

            <React.Fragment>
                <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal} centered>
                    <ModalHeader toggle={this.props.toggleModal}>Reset Password</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleForgotPassword}>
                            <FormGroup>
                                <Label htmlFor="email" className="mt-2 mb-3 text-center">We will send an email to your box, just follow that link to set your new password.</Label>
                                <Input type="text" id="email" name="email"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup className="text-center mt-4 mb-3">
                                <Button type="submit" value="submit" color="primary">Reset</Button>
                            </FormGroup>
                            <FormGroup className="text-center">
                                <Label>
                                    <a onClick={this.props.changeModal} className="nav-link">Back to Login</a>
                                </Label>
                            </FormGroup>                          
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default ForgotPasswordModal;