import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEqual from 'lodash.isequal';
import { postItem, fetchSellItem, editCourse } from '../../redux/Sell/ActionCreator';
import Sell from './CreateComponent/MainComponent';
import ItemDetail from './CreateComponent/RecipeDetail/CourseDetailComponent';
import CreateCourse from './CreateComponent/Recipe/CreateCourse/MainComponent';
import EditCourse from './CreateComponent/Recipe/EditCourse/MainComponent';

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
                    courseId = {match.params.itemId}
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
                    editCourse={this.props.editCourse}
                    courseId={match.params.itemId}
                />
            );
        }

       

        

        return (
            <div>
                {console.log(this.props.match)}
                <Switch>
                    <Route exact path={this.props.match.url} component={CreatePage} />
                    <Route exact path={this.props.match.url+'/createrecipe'} component={CreateRecipePage} />
                    <Route exact path={this.props.match.url+'/:itemId/edit'} component={EditCoursePage} />
                   <Route path={this.props.match.url+'/:itemId'} component={ItemWithIdPage} />
                </Switch>
          </div>
        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateRouter));