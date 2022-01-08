import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PurchasedCourses from './PurchasedComponent/MainComponent';
import CourseDetails from './PurchasedComponent/CourseDetail/CourseDetailComponent';
import TopicTheoryRender from './PurchasedComponent/CourseDetail/TopicComponent';


const mapStateToProps = state => {
    return {
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
});

  


class PurchasedRouter extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {

        const PurchasedCoursesPage = () => {
            return(
              <PurchasedCourses/>
              );
        }

        const CourseDetailsPage = ({match}) => {
            return(
              <CourseDetails
                courseId = {match.params.courseId}
              />
              );
        }

        const TopicTheoryPage = ({match}) => {
            return(
              <TopicTheoryRender
                courseId = {match.params.courseId}
                topicId = {match.params.topicId}
              />
              );
        }

        return (
            <div>
                <Switch>
                    <Route exact path={this.props.match.url} component={PurchasedCoursesPage} />
                    <Route exact path={this.props.match.url+'/:courseId'} component={CourseDetailsPage} />
                    <Route exact path={this.props.match.url+'/:courseId/:topicId'} component={TopicTheoryPage} />
                </Switch>
          </div>
        );

    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchasedRouter));