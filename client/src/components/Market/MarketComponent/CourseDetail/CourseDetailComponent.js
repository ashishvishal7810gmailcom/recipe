import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardSubtitle, CardText, CardBody, CardTitle, 
    Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../../../shared/baseUrl';
import { Loading } from '../../../LoadingComponent';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCourse, purchaseCourse } from '../../../../redux/Courses/ActionCreator';
const mapStateToProps = state => {
  return {
    course : state.course
  }
}

const mapDispatchToProps = (dispatch) => ({
    fetchCourse: (initialRoute, courseId) => dispatch(fetchCourse(initialRoute, courseId)),
    purchaseCourse: (initialRoute, courseId, history) => dispatch(purchaseCourse(initialRoute, courseId, history))

});



function RenderCourse({course, description, data, currentContentAsHTML, purchaseCourse, history}) {
        return(
            <React.Fragment>
                <div className="col-12 col-md-6">
                    <Card>
                        <CardImg width="100%" src={`${imageUrl}${course.image}`} alt={course.title} height="150px" />
                        <CardBody className="text-center text-dark text-capitalize">
                            <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>{course.title}</CardTitle>
                            <CardSubtitle>Price : ${course.price/100}</CardSubtitle>
                            <Button className="w-100" onClick={() => purchaseCourse('market',course._id, history)}>Buy</Button>
                        </CardBody>

                    </Card>
                </div>
                <div className="col-12 col-md-6">
                    <Card>
                        <CardBody className="text-center text-dark text-capitalize">
                            <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>Course Description</CardTitle>
                            <hr />
                            <CardSubtitle>
                                <div dangerouslySetInnerHTML={{__html: currentContentAsHTML}}></div>
                            </CardSubtitle>
                        </CardBody>
                    </Card>
                </div>
            </React.Fragment>
            
        );

}

class CourseDetails extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCourse('market',this.props.courseId);
    }

    render() {
        
        if (this.props.course.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }

        else if (this.props.course.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.course.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (this.props.course.course.length != 0)   
        {
            const data = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.course.course.description)));
            let currentContentAsHTML = convertToHTML(data.getCurrentContent());

            const description = data.getCurrentContent().getPlainText();

            const topics = this.props.course.course.topics.map((topic) => {
                return (
                    <li>
                        <Link to={`/market/${this.props.courseId}/${topic._id}`} className="text-decoration-none">
                            {topic.title}
                        </Link>
                    </li>
                )
            })

            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/market'>Market</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.course.course.title}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h5>{this.props.course.course.title} 
                            </h5>
                            <hr />
                        </div>
                        <div className="col-8">
                        </div>
                    </div>
                    <div className="row">
                        <RenderCourse course={this.props.course.course}
                            description = {description}
                            data = {data}
                            currentContentAsHTML = {currentContentAsHTML}
                            purchaseCourse = {this.props.purchaseCourse}
                            history = {this.props.history}
                        />
                    </div>
                    <div className="row mt-4 mb-4">
                        <div className="col-12 mt-2">
                            <h4>Topics</h4>
                            <hr />
                        </div>
                        <div className="col-12">
                            <ol>
                                {topics}
                            </ol>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseDetails));