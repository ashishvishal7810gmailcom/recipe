import React, { Component } from 'react';
import { Button} from 'reactstrap';
import LoginModal from './Modals/LoginModal';


class LoginButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return(

            <React.Fragment>

                <Button primary onClick={this.toggleModal} style={{borderRadius:'18px'}}>
                    <span className="fa fa-sign-in fa-lg"></span> Login
                    {this.props.auth.isFetching ?
                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                        : null
                    }
                </Button>

                <LoginModal isModalOpen={this.state.isModalOpen} 
                    toggleModal={this.toggleModal}
                    loginUser={this.props.loginUser} 
                    logoutUser={this.props.logoutUser}
                    signupUser={this.props.signupUser}
                    />
            </React.Fragment>
        );
    }
}

export default LoginButton;