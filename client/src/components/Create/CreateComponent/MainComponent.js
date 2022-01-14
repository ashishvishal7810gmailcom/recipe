import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay,CardBody, CardSubtitle, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../../shared/baseUrl';
import { Loading } from '../../LoadingComponent';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import { postItem, fetchRecipes } from '../../../redux/Create/ActionCreator';
const mapStateToProps = state => {
    return {
        recipe: state.recipe
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    fetchRecipes: () => dispatch(fetchRecipes()),
    postItem: (item, history) => dispatch(postItem(item, history)),
});

function RenderSellItem({ item }) {
    return(
        <Card>
            <Link to={`/create/${item._id}`} className="text-decoration-none">
                    <Card>
                        <CardImg width="100%" src={`${imageUrl}${item.image}`} alt={item.title} height="150px" />
                        <CardBody className="text-center text-dark text-capitalize">
                            <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>{item.title}</CardTitle>
                            <CardSubtitle>{item.description}</CardSubtitle>
                        </CardBody>
                    </Card>
            </Link>
        </Card>
    );
}

const RenderItems = (props) => {

    const recipes = props.recipe.recipes.map((item) => {
        return (
            <div key={item._id} className="col-10 offset-1 offset-md-0 col-md-6 col-lg-4 mb-2 mt-2">
                <RenderSellItem item={item} />
            </div>
        );
    });

    if (props.recipe.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.recipe.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.recipe.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(props.recipe == null || props.recipe.recipes.length == 0) {
        return (
        <h4>You have not created any course.</h4>
        );
    }
    else
        return (
            <div className="container">
                <div className="row mt-4 mb-4">
                    {recipes}
                </div>
            </div>
        );
}


class Sell extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if(!this.props.recipe.isLoading)
        this.props.fetchRecipes();
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Create Recipe</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-6">
                            <h3>My Created Recipes</h3>
                            <hr />
                        </div>
                        <div className="col-6">
                            <Link to="/create/createrecipe" className="pull-right shadow-none">
                                <span className="fa fa-plus fa-lg"></span>  Create Recipe
                            </Link>
                        </div>
                        <div>
                            {
                                // null
                                // (this.props.recipe.recipes == null || this.props.recipe.recipes.length == 0)?
                                // <h4>Selling List is Empty</h4>:
                                <RenderItems
                                    recipe={this.props.recipe}
                                />
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sell));


// export default Sell;