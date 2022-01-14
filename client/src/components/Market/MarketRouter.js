import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MarketCourses from './MarketComponent/MainComponent';
import ItemDetail from './MarketComponent/CourseDetail/CourseDetailComponent';


const mapStateToProps = state => {
    return {
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
});

  


class MarketRouter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {

        const MarketCoursesPage = () => {
            return(
              <MarketCourses/>
              );
        }

        const RecipeDetailsPage = ({match}) => {
            return(
              <ItemDetail
                recipeId = {match.params.recipeId}
              />
              );
        }


        return (
            <div>
                <Switch>
                    <Route exact path={this.props.match.url} component={MarketCoursesPage} />
                    <Route exact path={this.props.match.url+'/:recipeId'} component={RecipeDetailsPage} />
                </Switch>
          </div>
        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MarketRouter));