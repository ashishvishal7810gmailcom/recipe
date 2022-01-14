import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay,CardBody, CardSubtitle, CardText, Button, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { imageUrl, baseUrl } from '../../../shared/baseUrl';
import { Loading } from '../../LoadingComponent';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRecipes } from '../../../redux/Recipe/ActionCreator';

const mapStateToProps = state => {
    return {
        // recipes: state.recipes
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    fetchRecipes: (initialRoute) => dispatch(fetchRecipes(initialRoute)),
});

function RenderSingleCourse({recipe, history}) {
    return(
        <Card>
            <Link to={`/recipes/${recipe._id}`} className="text-decoration-none">
                    <Card>
                        <CardImg left width="100%" src={`${imageUrl}${recipe.image}`} alt={recipe.title} height="150px" />
                        <CardBody className="text-center text-dark text-capitalize">
                            <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>{recipe.title}</CardTitle>
                            <CardSubtitle>Written By : {recipe.author.name}</CardSubtitle>
                        </CardBody>
                    </Card>
            </Link>
        </Card>
    );
}

const RenderCourses = (props) => {
    const recipes = props.recipes.map((course) => {
        return (
            <div key={course._id} className="col-12 col-md-6 col-lg-4 mb-4">
                <RenderSingleCourse course={course} 
                    history = {props.history}
                />
            </div>
        );
    });

    // if (props.recipes.isLoading) {
    //     return(
    //         <div className="container">
    //             <div className="row">
    //                 <Loading />
    //             </div>
    //         </div>
    //     );
    // }
    // else if (props.recipes.errMess) {
    //     return(
    //         <div className="container">
    //             <div className="row">
    //                 <h4>{props.recipes.errMess}</h4>
    //             </div>
    //         </div>
    //     );
    // }
    // else if(props.recipes == null || props.recipes.recipes.length == 0) {
    //     return (
    //     <h4>There are not any available course.</h4>
    //     );
    // }
    // else
        return (
            <div className="container">
                <div className="row mt-4 mb-4">
                    {recipes}
                </div>
            </div>
        );
}


class marketCourses extends Component {



    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
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
        fetch(baseUrl+`recipe?page=${page}`,{
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
            this.setState({ recipes: [...this.state.recipes, ...course] });
            // alert(course.length);
            this.setState({ loading: false });
            if(this.state.recipes.length==0) {
                this.setState({noCourseExists: `No Courses exist` })
            }
            else if(course.length <= 18){
                this.setState({hasMore: false});
            }
            else {
                this.setState({ page: this.state.page+1 });
            }
            console.log("fetchedcourse");
            console.log(this.state.recipes);
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


    render() {
        
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Recipes</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Recipes</h3>
                            <hr />
                        </div>
                        <div className="row mt-4 mb-4">
                            {/* {alert("rendering")} */}
                            {this.state.recipes.map((recipe) => {
                                    return (
                                    <div key={recipe._id} className="col-10 offset-1 offset-md-0 col-md-6 col-lg-4 mb-2 mt-2">
                                        <RenderSingleCourse recipe={recipe} 
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