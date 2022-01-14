import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MarketRecipes from './MarketComponent/MainComponent';
import ItemDetail from './MarketComponent/CourseDetailComponent';


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

        const MarketRecipesPage = () => {
            return(
              <MarketRecipes/>
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
                    <Route exact path={this.props.match.url} component={MarketRecipesPage} />
                    <Route exact path={this.props.match.url+'/:recipeId'} component={RecipeDetailsPage} />
                </Switch>
          </div>
        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MarketRouter));