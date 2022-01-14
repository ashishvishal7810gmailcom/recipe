import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postItem } from '../../redux/Create/ActionCreator';
import Sell from './CreateComponent/MainComponent';
import ItemDetail from './CreateComponent/RecipeDetail/RecipeDetailComponent';
import CreateCourse from './CreateComponent/Recipe/Create/MainComponent';
import EditCourse from './CreateComponent/Recipe/Edit/MainComponent';

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
              <Sell/>
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
                <CreateCourse 
                postItem={this.props.postItem}
                />
            );
        }

        const EditCoursePage = ({match}) => {
            return(
                <EditCourse
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
                    <Route exact path={this.props.match.url+'/:recipeId/edit'} component={EditCoursePage} />
                   <Route path={this.props.match.url+'/:recipeId'} component={ItemWithIdPage} />
                </Switch>
          </div>
        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateRouter));