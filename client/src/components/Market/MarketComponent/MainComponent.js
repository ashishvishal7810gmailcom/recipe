import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay,CardBody, CardSubtitle, CardText, Button, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../../shared/baseUrl';
import { Loading } from '../../LoadingComponent';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCourses, purchaseCourse } from '../../../redux/Courses/ActionCreator';

const mapStateToProps = state => {
    return {
        courses: state.courses
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    fetchCourses: (initialRoute) => dispatch(fetchCourses(initialRoute)),
    purchaseCourse: (initialRoute, courseId, history) => dispatch(purchaseCourse(initialRoute, courseId, history))
});

function RenderSingleCourse({course, purchaseCourse, history}) {
    return(
        <Card>
            <Link to={`/market/${course._id}`} className="text-decoration-none">
                    <Card>
                        <CardImg width="100%" src={`${imageUrl}${course.image}`} alt={course.title} height="150px" />
                        <CardBody className="text-center text-dark text-capitalize">
                            <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>{course.title}</CardTitle>
                            <CardSubtitle>Price : ${course.price/100}</CardSubtitle>
                        </CardBody>
                    </Card>
            </Link>
            <Button className="w-100" onClick={() => purchaseCourse('market',course._id, history)}>Buy</Button>
        </Card>
    );
}

const RenderCourses = (props) => {
    const courses = props.courses.courses.map((course) => {
        return (
            <div key={course._id} className="col-12 col-md-6 col-lg-4 mb-4">
                <RenderSingleCourse course={course} 
                    purchaseCourse = {props.purchaseCourse}
                    history = {props.history}
                />
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
    else
        return (
            <div className="container">
                <div className="row mt-4 mb-4">
                    {courses}
                </div>
            </div>
        );
}


class marketCourses extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        await this.props.fetchCourses('market');
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Market</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-4">
                            <h3>Courses</h3>
                            <hr />
                        </div>
                        <div>
                            {
                                (this.props.courses == null || this.props.courses.courses.length == 0)?
                                <h4>There are no courses</h4>:
                                <RenderCourses
                                    courses={this.props.courses}
                                    purchaseCourse = {this.props.purchaseCourse}
                                    history = {this.props.history}
                                />
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(marketCourses));