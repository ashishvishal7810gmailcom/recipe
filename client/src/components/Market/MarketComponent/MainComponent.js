import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay,CardBody, CardSubtitle, CardText, Button, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { imageUrl, baseUrl } from '../../../shared/baseUrl';
import { Loading } from '../../LoadingComponent';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCourses, purchaseCourse } from '../../../redux/Courses/ActionCreator';

const mapStateToProps = state => {
    return {
        // courses: state.courses
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
                        <CardImg left width="100%" src={`${imageUrl}${course.image}`} alt={course.title} height="150px" />
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
    const courses = props.courses.map((course) => {
        return (
            <div key={course._id} className="col-12 col-md-6 col-lg-4 mb-4">
                <RenderSingleCourse course={course} 
                    purchaseCourse = {props.purchaseCourse}
                    history = {props.history}
                />
            </div>
        );
    });

    // if (props.courses.isLoading) {
    //     return(
    //         <div className="container">
    //             <div className="row">
    //                 <Loading />
    //             </div>
    //         </div>
    //     );
    // }
    // else if (props.courses.errMess) {
    //     return(
    //         <div className="container">
    //             <div className="row">
    //                 <h4>{props.courses.errMess}</h4>
    //             </div>
    //         </div>
    //     );
    // }
    // else if(props.courses == null || props.courses.courses.length == 0) {
    //     return (
    //     <h4>There are not any available course.</h4>
    //     );
    // }
    // else
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
        this.state = {
            courses: [],
            loading: false,
            page: 0,
            prevY: 0,
            hasMore: true,
            errMess: null,
            infoMess: null,
            noCourseExists: false
        };
    }

    componentDidMount() {
        this.getCourses(this.state.page);

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.8
        };
        
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    getCourses(page) {
        this.setState({ loading: true });
        this.setState({errMess: null});
        this.setState({infoMess: null});
        this.setState({noCourseExists: false});
        const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(baseUrl+`market?page=${page}`,{
            headers: {
                'Authorization': bearer
            },
        })
        .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(course => {
            this.setState({ courses: [...this.state.courses, ...course] });
            // alert(course.length);
            this.setState({ loading: false });
            if(this.state.courses.length==0) {
                this.setState({noCourseExists: `No Courses exist` })
            }
            else if(course.length <= 18){
                this.setState({hasMore: false});
            }
            else {
                this.setState({ page: this.state.page+1 });
            }
            console.log("fetchedcourse");
            console.log(this.state.courses);
        })
        .catch(error => {
            this.setState({errMess: error.message});
            this.setState({loading: false});
        });
    }

     

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y && this.state.hasMore && !this.state.loading) {
            this.getCourses(this.state.page);            
        }
        this.setState({ prevY: y });
    }

    // async componentDidMount() {
    //     if(!this.props.courses.isLoading)
    //     await this.props.fetchCourses('market');
    // }

    render() {
        
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Market</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Courses</h3>
                            <hr />
                        </div>
                        <div className="row mt-4 mb-4">
                            {/* {alert("rendering")} */}
                            {this.state.courses.map((course) => {
                                    return (
                                    <div key={course._id} className="col-10 offset-1 offset-md-0 col-md-6 col-lg-4 mb-2 mt-2">
                                        <RenderSingleCourse course={course} 
                                            purchaseCourse = {this.props.purchaseCourse}
                                            history = {this.props.history}
                                        />
                                    </div>)
                                })
                            }
                        </div>
                        <div ref={loadingRef => (this.loadingRef = loadingRef)} >
                            {
                                this.state.loading ?
                                <Loading />:
                                null
                            }   
                        </div>
                        <div className="text-center">
                            {

                                (this.state.noCourseExists) ?
                                <h4>{this.state.noCourseExists}</h4>:
                                !this.state.hasMore ?
                                <h4>Yay!! you have visited it all</h4>:
                                this.state.errMess ?
                                <h4>{this.state.errMess}</h4>:
                                this.state.infoMess ?
                                <h4>{this.state.infoMess}</h4>:
                                null
                            }
                        </div>
                        
                    </div>
                </div>
            </React.Fragment>
        );

    }
}

export default withRouter(connect(mapDispatchToProps)(marketCourses));