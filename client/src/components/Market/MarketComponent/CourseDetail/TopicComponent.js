import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay,CardBody, CardSubtitle, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loading } from '../../../LoadingComponent';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { fetchTopicTheory } from '../../../../redux/Courses/ActionCreator';


const mapStateToProps = state => {
  return {
    topicTheory: state.topicTheory
  }
}

const mapDispatchToProps = (dispatch) => ({
    fetchTopicTheory: (initialRoute, courseId, topicId) => dispatch(fetchTopicTheory(initialRoute, courseId, topicId)),
});


class TopicTheoryRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        if(!this.props.topicTheory.isLoading)
        this.props.fetchTopicTheory('market',this.props.courseId, this.props.topicId)
    }
    render() {

        // console.log("printingid")
        // console.log(this.props.courseId);
        // console.log(this.props.topicId);

        if (this.props.topicTheory.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }

        else if (this.props.topicTheory.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.topicTheory.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (this.props.topicTheory.topic.length != 0)   
        {
            const data = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.topicTheory.topic.theory)));
            let currentContentAsHTML = convertToHTML(data.getCurrentContent());
            
            const description = data.getCurrentContent().getPlainText();

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-4">
                            <h5>{this.props.topicTheory.topic.title}
                            </h5>
                            <hr />
                        </div>
                    </div>
                    <div className="row mt-4 mb-4">
                        <div className="col-12">
                            <div dangerouslySetInnerHTML={{__html: currentContentAsHTML}}></div>
                        </div>
                        
                        
                    </div>

                </div>
            );
        }
        else
            return(
                <div></div>
            );

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopicTheoryRender));
