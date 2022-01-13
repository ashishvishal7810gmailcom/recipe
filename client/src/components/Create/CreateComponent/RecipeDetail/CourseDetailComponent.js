import React, { Component } from 'react';
import { Card, CardImg, CardSubtitle, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { imageUrl } from '../../../../shared/baseUrl';
import { Loading } from '../../../LoadingComponent';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { connect } from 'react-redux';
import { fetchCourse } from '../../../../redux/Courses/ActionCreator';

const mapStateToProps = state => {
  return {
    course : state.course
  }
}

const mapDispatchToProps = (dispatch) => ({
    fetchCourse: (initialRoute, courseId) => dispatch(fetchCourse(initialRoute, courseId)),
});


function RenderItem({item, currentContentAsHTML}) {
        return(
            <React.Fragment>
                <div className="col-12 col-md-6">
                    <Card>
                        <CardImg width="100%" src={`${imageUrl}${item.image}`} alt={item.title} height="150px" />
                        <CardBody className="text-center text-dark text-capitalize">
                            <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>{item.title}</CardTitle>
                            <CardSubtitle>Price : ${item.price/100}</CardSubtitle>
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

class ItemDetail extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(!this.props.course.isLoading)
        this.props.fetchCourse('sell',this.props.courseId);
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
                        <Link to={`/sell/${this.props.courseId}/${topic._id}`} className="text-decoration-none">
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
                            <BreadcrumbItem><Link to='/sell'>Sell</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.course.course.title}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-4">
                            <h5>{this.props.course.course.title} 
                                <Link to={`${this.props.course.course._id}/edit`} className="pull-right shadow-none">
                                    <i className="fa fa-edit fa-lg">
                                    </i>
                                </Link>
                            </h5>
                            <hr />
                        </div>
                        <div className="col-8">
                            <Link to={`/sell/${this.props.course.course._id}/createtopics`} className="pull-right shadow-none">
                                <span className="fa fa-plus fa-lg"></span>  Create New Topic
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <RenderItem item={this.props.course.course}
                            description = {description}
                            data = {data}
                            currentContentAsHTML = {currentContentAsHTML}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemDetail));