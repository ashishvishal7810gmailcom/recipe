import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEqual from 'lodash.isequal';
import { postItem, fetchSellItem, editCourse } from '../../redux/Sell/ActionCreator';
import { postTopic, fetchTopics /*editTopic*/ } from '../../redux/Topic/ActionCreator';
import { editTopic } from '../../redux/EditTopic/ActionCreator';
import Sell from './SellComponent/MainComponent';
import ItemDetail from './SellComponent/CourseDetail/CourseDetailComponent';
import CreateCourse from './SellComponent/Course/CreateCourse/MainComponent';
import CreateTopics from './SellComponent/Topic/CreateTopic/MainComponent';
import EditCourse from './SellComponent/Course/EditCourse/MainComponent';
import TopicRender from './SellComponent/CourseDetail/TopicComponent';
import EditTopic from './SellComponent/Topic/EditTopic/MainComponent';

const mapStateToProps = state => {
    return {
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    postItem: (item, history) => dispatch(postItem(item, history)),
    postTopic: (courseId, topic, history) => dispatch(postTopic(courseId, topic, history)),
});

  


class SellRouter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {

        const SellPage = () => {
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

        const CreateCoursePage = () => {
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

        const EditTopicPage = ({match}) => {
            return(
                <EditTopic
                    courseId={match.params.itemId}
                    topicId={match.params.topicId}
                />
            );
        }

        const CreateTopicPage = ({match}) => {
            return(
                <CreateTopics 
                    postTopic = {this.props.postTopic}
                    courseId={match.params.itemId}
                />
            );
        }

        const TopicPage = ({match}) => {
            return(
                <TopicRender 
                    courseId={match.params.itemId}
                    topicId={match.params.topicId}
                />
            );
        }


        return (
            <div>
                {console.log(this.props.match)}
                <Switch>
                    <Route exact path={this.props.match.url} component={SellPage} />
                    <Route exact path={this.props.match.url+'/createcourse'} component={CreateCoursePage} />
                    <Route exact path={this.props.match.url+'/:itemId/createtopics'} component={CreateTopicPage} />
                    <Route exact path={this.props.match.url+'/:itemId/edit'} component={EditCoursePage} />
                    <Route exact path={this.props.match.url+'/:itemId/:topicId'} component={TopicPage} />
                    <Route exact path={this.props.match.url+'/:itemId/:topicId/edit'} component={EditTopicPage} />
                    <Route path={this.props.match.url+'/:itemId'} component={ItemWithIdPage} />
                </Switch>
          </div>
        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SellRouter));