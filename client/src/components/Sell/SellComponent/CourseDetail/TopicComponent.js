import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay,CardBody, CardSubtitle, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTopics } from '../../../../redux/Topic/ActionCreator';
import { Loading } from '../../../LoadingComponent';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';

const mapStateToProps = state => {
  return {
    topics: state.topics
  }
}

const mapDispatchToProps = (dispatch) => ({
    fetchTopics: (courseId, topicId) => dispatch(fetchTopics(courseId, topicId)),
});


class TopicRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        if(!this.props.topics.isLoading)
        this.props.fetchTopics(this.props.courseId, this.props.topicId)
    }
    render() {

        // console.log("printingid")
        // console.log(this.props.courseId);
        // console.log(this.props.topicId);

        if (this.props.topics.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }

        else if (this.props.topics.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.topics.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (this.props.topics.topics.length != 0)   
        {
            const data = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.topics.topics.theory)));
            let currentContentAsHTML = convertToHTML(data.getCurrentContent());
            
            const description = data.getCurrentContent().getPlainText();

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-6 mt-4">
                            <h5>{this.props.topics.topics.title} 
                                <Link to={`${this.props.topics.topics._id}/edit`} className="pull-right shadow-none">
                                    <i className="fa fa-edit fa-lg">
                                    </i>
                                </Link>
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


        
        // return (
        //     <React.Fragment>
        //         <div className="container">
        //             <div className="row">
        //                 {/* <Breadcrumb>
        //                     <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
        //                     <BreadcrumbItem><Link to='/home/sell'>Home</Link></BreadcrumbItem>
        //                     <BreadcrumbItem active>Sell</BreadcrumbItem>
        //                 </Breadcrumb> */}
        //                 <div className="col-12 mt-4">
        //                     <h4>Topic</h4>
        //                     <hr />
        //                 </div>
        //             </div>
        //         </div>
        //     </React.Fragment>
        // );

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopicRender));
// export default TopicRender;