import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
import { Loading } from '../LoadingComponent';
import { Card, CardImg,CardBody, CardSubtitle, Button, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { imageUrl } from '../../shared/baseUrl';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        searches: state.searches
    }
  }
const mapDispatchToProps = (dispatch) => ({
});

function RenderSingleCourse({course, history}) {
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
        </Card>
    );
}

class SearchedCourses extends Component {
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
        this.getcourses(this.state.page);

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

    getcourses(page) {
        if(this.props.searches.searchTerm == null || this.props.searches.searchTerm.length<1){
            this.setState({hasMore: true});
            this.setState({infoMess: "Type something in the searchbox to search"});
        }
        else {
            this.setState({ loading: true });
            this.setState({errMess: null});
            this.setState({infoMess: null});
            this.setState({noCourseExists: false});
            const bearer = 'Bearer ' + localStorage.getItem('token');
            fetch(baseUrl+'search?searchTerm='+this.props.searches.searchTerm+'&page='+page,{
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
            .then(searchResult => {
                this.setState({ courses: [...this.state.courses, ...searchResult] });
                console.log(searchResult);
                this.setState({ loading: false });
                if(this.state.courses.length==0) {
                    this.setState({noCourseExists: `No Course exist with title: ${this.props.searches.searchTerm}` })
                }
                else if(searchResult.length < 18){
                    this.setState({hasMore: false});
                }
                else {
                    this.setState({ page: this.state.page+1 });
                }
            })
            .catch(error => {
                this.setState({errMess: error.message});
                this.setState({loading: false});

            });
        }
    }

     

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y && this.state.hasMore) {
            this.getcourses(this.state.page);            
        }
        this.setState({ prevY: y });
    }
    

    render() {
        // To change the loading icon behavior
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        return (
            <div className="container">
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Search</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row mt-4 mb-4">
                    {this.state.courses.map((course) => {
                            return (
                            <div key={course._id} className="col-10 offset-1 offset-md-0 col-md-6 col-lg-4 mb-2 mt-2">
                                <RenderSingleCourse course={course} 
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
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchedCourses));

// export default withRouter(SearchedCourses);