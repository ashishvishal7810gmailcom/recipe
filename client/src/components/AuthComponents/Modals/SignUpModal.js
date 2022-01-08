import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import FBLogin from '../Logins/FacebookLoginComponent';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem,CardBody, CardHeader } from 'reactstrap';
import GLogin from '../Logins/GoogleLoginComponent';
import { th } from 'react-html-attributes';

class SignUpModal extends Component {

    constructor(props) {
        super(props);
        this.handleSignup=this.handleSignup.bind(this);
    }

    handleSignup(event) {
        this.props.toggleModal();
        this.props.signupUser({name: this.name.value, email:this.email.value, username: this.email.value, password: this.passwords.value});
        event.preventDefault();
    }

    render() {
        return(

            <React.Fragment>
                <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal} centered>
                    <ModalHeader toggle={this.props.toggleModal}>Register</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSignup}>

                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" name="name"
                                    innerRef={(input) => this.name = input} 
                                    required/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="text" id="email" name="email"
                                    innerRef={(input) => this.email = input} 
                                    required/>
                            </FormGroup>
                            <FormGroup className="mt-2">
                                <Label htmlFor="passwords">Password</Label>
                                <Input type="password" id="passwords" name="passwords"
                                    innerRef={(input) => this.passwords = input}  
                                    required/>
                            </FormGroup>
                            <FormGroup className="text-center mt-2 mb-3">
                                <Button type="submit" value="submit" color="primary">Register</Button>
                            </FormGroup>
                            <FormGroup className="mb-2">
                                <FBLogin />
                            </FormGroup>
                            <FormGroup className="mb-2">
                                <GLogin />
                            </FormGroup>
                            <FormGroup className="text-center">
                                <Label>
                                    Already have an account?
                                </Label>
                                <Label>
                                    <a onClick={this.props.changeModal} className="nav-link">Login</a>
                                </Label>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default SignUpModal;