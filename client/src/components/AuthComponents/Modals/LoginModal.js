import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import FBLogin from '../Logins/FacebookLoginComponent';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem,CardBody, CardHeader } from 'reactstrap';
import GLogin from '../Logins/GoogleLoginComponent';
import ForgotPasswordModal from './ForgotPasswordModal';
import SignUpModal from './SignUpModal';


class LoginModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpenSignup: false,
            isModalOpenForgotPassword: false
        };
        this.toggleModalsignup = this.toggleModalsignup.bind(this);
        this.toggleModalForgotPassword = this.toggleModalForgotPassword.bind(this);

        this.openForgotModal=this.openForgotModal.bind(this);
        this.openSignupModal=this.openSignupModal.bind(this);
        this.openSignupToSigninModal=this.openSignupToSigninModal.bind(this);
        this.openForgotToSigninModal=this.openForgotToSigninModal.bind(this);

        this.handleLogin = this.handleLogin.bind(this);

    }

    toggleModalsignup() {
        this.setState({
            isModalOpenSignup: !this.state.isModalOpenSignup
        });
    }
    toggleModalForgotPassword() {
        this.setState({
            isModalOpenForgotPassword: !this.state.isModalOpenForgotPassword
        });
    }


    

    openSignupModal(event) {
        this.props.toggleModal();
        this.toggleModalsignup();
    }
    openForgotModal(event) {
        this.props.toggleModal();
        this.toggleModalForgotPassword();
    }

    openSignupToSigninModal(event) {
        this.toggleModalsignup();
        this.props.toggleModal();
    }
    
    openForgotToSigninModal(event) {
        this.toggleModalForgotPassword();
        this.props.toggleModal();
    }


    handleLogin(event) {
        this.props.toggleModal();
        this.props.loginUser({username: this.email.value, password: this.password.value});
        event.preventDefault();
    }

    render() {
        return(

            <React.Fragment>

                <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal} centered>
                    <ModalHeader toggle={this.props.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="text" id="email" name="email"
                                    innerRef={(input) => this.email = input} />
                            </FormGroup>
                            <FormGroup className="mt-2">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check className="mt-2">
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                                <Label check className="pull-right">
                                    <a onClick={this.openForgotModal} className="nav-link">Forgot Password</a>
                                </Label>
                            </FormGroup>
                            <FormGroup className="text-center mt-3 mb-3">
                                <Button type="submit" value="submit" color="primary">Login</Button>
                            </FormGroup>
                            <FormGroup className="mb-2">
                                <FBLogin />
                            </FormGroup>
                            <FormGroup className="mb-2">
                                <GLogin />
                            </FormGroup> 
                            <FormGroup className="text-center">
                                <Label>
                                    Don't have an account?
                                </Label>
                                <Label>
                                    <a onClick={this.openSignupModal} className="nav-link">Register</a>
                                </Label>
                            </FormGroup>
                                                       
                        </Form>
                    </ModalBody>
                </Modal>
                
                <ForgotPasswordModal isModalOpen={this.state.isModalOpenForgotPassword} 
                    toggleModal={this.toggleModalForgotPassword}
                    changeModal={this.openForgotToSigninModal}
                    />
                
                <SignUpModal isModalOpen={this.state.isModalOpenSignup} 
                    toggleModal={this.toggleModalsignup}
                    changeModal={this.openSignupToSigninModal}
                    signupUser={this.props.signupUser}
                    />

            </React.Fragment>
        );
    }
}

export default LoginModal;