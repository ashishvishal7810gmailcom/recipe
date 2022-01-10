import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay,CardBody, CardSubtitle, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../../shared/baseUrl';
import { Loading } from '../../LoadingComponent';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCourses } from '../../../redux/Courses/ActionCreator';

const mapStateToProps = state => {
    return {
        courses: state.courses
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    fetchCourses: (initialRoute) => dispatch(fetchCourses(initialRoute))
});

function RenderSingleCourse({ course }) {
    return(
        <Card>
            <Link to={`/purchased/${course._id}`} className="text-decoration-none">
                    <Card>
                        <CardImg width="100%" src={`${imageUrl}${course.image}`} alt={course.title} height="150px" />
                        <CardBody className="text-center text-dark text-capitalize">
                            <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>{course.title}</CardTitle>
                            <CardSubtitle>Price : ${course.price/100}</CardSubtitle>
                        </CardBody>
                    </Card>
            </Link>
        </Card>
    );
}

const RenderCourses = (props) => {
    const courses = props.courses.courses.map((course) => {
        return (
            <div key={course._id} className="col-10 offset-1 offset-md-0 col-md-6 col-lg-4 mb-2 mt-2">
                <RenderSingleCourse course={course} />
            </div>
        );
    });

    if (props.courses.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.courses.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.courses.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(props.courses == null || props.courses.courses.length == 0) {
        return (
        <h4>Purchased List is Empty</h4>
        );
    }
    else
        return (
            <div className="container">
                <div className="row mt-4 mb-4">
                    {courses}
                </div>
            </div>
        );
}


class PurchasedCourses extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        if(!this.props.courses.isLoading)
        await this.props.fetchCourses('purchased');
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Purchased</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-4">
                            <h3>Courses</h3>
                            <hr />
                        </div>
                        <div>
                            {
                                // (this.props.courses == null || this.props.courses.courses.length == 0)?
                                // <h4>Purchased List is Empty</h4>:
                                <RenderCourses
                                    courses={this.props.courses}
                                />
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchasedCourses));