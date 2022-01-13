import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import SearchAS from './SearchASComponent';
import LoginButton from './AuthComponents/LoginModalComponent';
import Avatar from 'react-avatar';
import { NavDropdown} from 'react-bootstrap';
import { imageUrl } from '../shared/baseUrl';
import LoginModal from './AuthComponents/Modals/LoginModal';
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    handleLogout() {
        this.props.logoutUser();
    }

    

    
    
    render() {
        const Popup = () => {
            alert(this.props.fetchSuggestions);
        }

        const navItems = () => {
            // if(this.props.auth.isAuthenticated) {
                return (
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to="/home">
                                <span className="fa fa-home fa-lg"></span> Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/market">
                                <span className="fa fa-shopping-cart fa-lg"></span> Market
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/sell">
                                <span className="fa fa-plus fa-lg"></span> Sell
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/purchased">
                                <span className="fa fa-shopping-basket fa-lg"></span> Purchased
                            </NavLink>
                        </NavItem>
                    </Nav>
                )

            // }
        }
        
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container mt-2">
                        
                        <div className="row">
                            <div className="col-2 mt-2">
                                <NavbarBrand className="mr-auto" href="/">
                                    <img src={`${imageUrl}images/logo.jpeg`} height="40" width="60"
                                        alt="Onepiece" />
                                </NavbarBrand>
                            </div>
                            <div className="col-8 mt-2">
                                <SearchAS fetchSearches={this.props.fetchSearches}/>
                            </div>
                            <div className="col-2">
                                <Nav navbar className="pull-right">
                                    {this.props.auth.isAuthenticated ?

                                        <NavDropdown title={
                                            <Avatar name={this.props.auth.user.username} size="42" 
                                                textSizeRatio="2"
                                                round='20'
                                                fgColor='#fff'
                                                maxInitials='2'
                                                className="round"
                                                // color="lightgreen"
                                            />
                                            } 
                                            id="collasible-nav-dropdown"
                                        >
                                            {/* pass the props */}
                                            <NavDropdown.Item href={`${this.props.auth.user.username}`}>Profile</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/home" onClick={this.handleLogout}>Logout</NavDropdown.Item>                                                                            
                                        </NavDropdown>
                                        :
                                        null
                                    }
                                </Nav>
                            </div>
                            
                            <div className="col-12 mt-4 mb-2">
                                <NavbarToggler onClick={this.toggleNav} />
                                <Collapse isOpen={this.state.isNavOpen} navbar>
                                    { this.props.auth.isAuthenticated ? 
                                        <Nav navbar>
                                            <NavItem>
                                                <NavLink className="nav-link" to="/home">
                                                    <span className="fa fa-home fa-lg"></span> Home
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className="nav-link" to="/recipes">
                                                    <span className="fa fa-list fa-lg"></span> Recipes
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className="nav-link" to="/create">
                                                    <span className="fa fa-plus fa-lg"></span> Create
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className="nav-link" to="/favourites">
                                                    <span className="fa fa-heart fa-lg"></span> Favourite
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                        :
                                        <Nav navbar>
                                            <NavItem>
                                                <NavLink className="nav-link" to="/home">
                                                    <span className="fa fa-home fa-lg"></span> Home
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className="nav-link" onClick={this.toggleModal} to="/market">
                                                    <span className="fa fa-shopping-cart fa-lg"></span> Market
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className="nav-link" onClick={this.toggleModal} to="/sell">
                                                    <span className="fa fa-plus fa-lg"></span> Sell
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className="nav-link"onClick={this.toggleModal} to="/purchased">
                                                    <span className="fa fa-shopping-basket fa-lg"></span> Purchased
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    }
                                    <Nav className="ms-auto" navbar>
                                        <NavItem>
                                            { !this.props.auth.isAuthenticated ?
                                                <LoginButton auth={this.props.auth}
                                                    loginUser={this.props.loginUser} 
                                                    logoutUser={this.props.logoutUser} 
                                                    signupUser={this.props.signupUser}
                                                    />
                                                :
                                                <div>
                                                <Button primary onClick={this.handleLogout} style={{borderRadius:'20px'}}>
                                                    <span className="fa fa-sign-out fa-lg"></span> Logout
                                                    {this.props.auth.isFetching ?
                                                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                        : null
                                                    }
                                                    {/* to do
                                                        create a dashboard on ONclick
                                                    */}
                                                </Button>
                                                </div>
                                            }

                                        </NavItem>
                                    </Nav> 
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </Navbar>
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

export default Header;