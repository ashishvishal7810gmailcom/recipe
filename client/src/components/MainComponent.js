import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Dashboard from './Dashboard/DashboardComponent';
import CreateRouter from './Create/CreateRouter';
import MarketRouter from './Market/MarketRouter';
import SearchedCourses from './RenderSearchCourse/RenderCourse';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser, loginUser, logoutUser } from '../redux/AuthSuggestions/ActionCreators';
import jwt_decode from 'jwt-decode';

const mapStateToProps = state => {
    return {
      auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
  signupUser: (creds) => dispatch(signupUser(creds)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser())
});

class Main extends Component {

  componentDidMount() {
    const storedToken = localStorage.getItem("token");
    if (storedToken){
      let decodedData =jwt_decode(storedToken);
      let expirationDate = decodedData.exp;
        var current_time = Date.now() / 1000;
        if(expirationDate < current_time)
        {
          this.props.logoutUser();
        }
    }
    console.log("consolemounted")
  }
  

  render() {
    const HomePage = () => {
      return(
        <Home 
        />
      );
    }
    const DashboardPage = () => {
      return(
        this.props.auth.isAuthenticated
        ?
        <Dashboard 
          auth={this.props.auth}
        />
        :
        <div>
          {this.props.history.push("/home")}
        </div>
      );
    }

    const CreatePage = ({match}) => {
      return(
        this.props.auth.isAuthenticated
        ?
        <CreateRouter match={match}/>
        :
        <div>
          {this.props.history.push("/home")}
        </div>
      );
    }

    const RecipesPage = ({match}) => {
      return(
        this.props.auth.isAuthenticated
        ?
        <MarketRouter match={match}/>
        :
        <div>
          {this.props.history.push("/home")}
        </div>
      );
    }

    const FavouritesPage = ({match}) => {
      return(
        this.props.auth.isAuthenticated
        ?
        null
        :
        <div>
          {this.props.history.push("/home")}
        </div>
      );
    }
    const SearchPage = () => {
      return(
        this.props.auth.isAuthenticated
        ?
        <SearchedCourses />
        :
        <div>
          {this.props.history.push("/home")}
        </div>
      );
    }

    return (
      <div>
        <Header auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser} 
          signupUser={this.props.signupUser}
          />   
        {/* <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}> */}
            <Switch>
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/search" component={SearchPage} />
              <Route path="/recipes" component={RecipesPage} />
              <Route path="/create" component={ CreatePage } />
              <Route path="/favourites" component={FavouritesPage} />
              <Route path="/:User" component={DashboardPage} />
              <Redirect to="/home" />
            </Switch>
          {/* </CSSTransition>
        </TransitionGroup> */}
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
