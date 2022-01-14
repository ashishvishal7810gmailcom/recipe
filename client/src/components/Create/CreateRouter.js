import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postItem } from '../../redux/Create/ActionCreator';
import Create from './CreateComponent/MainComponent';
import ItemDetail from './CreateComponent/RecipeDetail/RecipeDetailComponent';
import CreateRecipe from './CreateComponent/Recipe/Create/MainComponent';
import EditRecipe from './CreateComponent/Recipe/Edit/MainComponent';

const mapStateToProps = state => {
    return {
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    postItem: (item, history) => dispatch(postItem(item, history)),
});

  


class CreateRouter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {

        const CreatePage = () => {
            return(
              <Create/>
              );
        }
        const ItemWithIdPage = ({match}) => {
            return(
                <ItemDetail
                    recipeId = {match.params.recipeId}
                />
            );
        }

        const CreateRecipePage = () => {
            return(
                <CreateRecipe 
                postItem={this.props.postItem}
                />
            );
        }

        const EditRecipePage = ({match}) => {
            return(
                <EditRecipe
                    recipeId={match.params.recipeId}
                />
            );
        }

       

        

        return (
            <div>
                {console.log(this.props.match)}
                <Switch>
                    <Route exact path={this.props.match.url} component={CreatePage} />
                    <Route exact path={this.props.match.url+'/createrecipe'} component={CreateRecipePage} />
                    <Route exact path={this.props.match.url+'/:recipeId/edit'} component={EditRecipePage} />
                   <Route path={this.props.match.url+'/:recipeId'} component={ItemWithIdPage} />
                </Switch>
          </div>
        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateRouter));