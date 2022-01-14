import React, { Component } from 'react';
import { Card, CardImg, CardSubtitle, CardImgOverlay, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { imageUrl } from '../../../../shared/baseUrl';
import { Loading } from '../../../LoadingComponent';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { connect } from 'react-redux';
import { fetchRecipe } from '../../../../redux/Recipe/ActionCreator';
import { deleteRecipe } from '../../../../redux/Create/ActionCreator';

const mapStateToProps = state => {
  return {
    singleRecipe : state.singleRecipe
  }
}

const mapDispatchToProps = (dispatch) => ({
    fetchRecipe: (initialRoute, recipeId) => dispatch(fetchRecipe(initialRoute, recipeId)),
    deleteRecipe: (recipeId, history) => dispatch(deleteRecipe(recipeId, history)),

});


function RenderItem({item, currentContentAsHTML, deleteRecipe, history}) {
    const ingredients = item.ingredients.map((ingredient) => {
        return <li>{ingredient}</li>
    });
        return(
            <React.Fragment>
                <div className="row mb-2">
                    <div className="col-10 offset-1">
                        <Card>
                            <CardImg width="100%" src={`${imageUrl}${item.image}`} alt={item.title} height="200px" />
                            <CardImgOverlay>
                                <Button className="btn btn-danger" color="primary" onClick={() => deleteRecipe(item._id, history)}>
                                        <span className="fa fa-trash fa-lg"></span>
                                </Button>
                            </CardImgOverlay>
                            <CardBody className="text-center text-dark text-capitalize">
                                <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>{item.title}</CardTitle>
                                <CardSubtitle style={{"paddingBottom":"10px"}}>Written By: <i>{item.author.name}</i></CardSubtitle>
                                <CardSubtitle>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(item.updatedAt)))}</CardSubtitle>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-10 offset-1">
                        <Card className="mb-2">
                            <CardBody className="text-dark text-capitalize">
                                <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>Dish Description</CardTitle>
                                <hr />
                                <CardSubtitle><i>{item.description}</i></CardSubtitle>
                            </CardBody>
                            
                        </Card>
                        <Card>
                            <CardBody className="text-dark text-capitalize">
                                <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>Dish Ingredients</CardTitle>
                                <hr />
                                <CardSubtitle><ol>{ingredients}</ol></CardSubtitle>
                            </CardBody>
                        </Card>
                        
                    </div>
                    <div className="col-10 offset-1">
                    <Card>
                        <CardBody className="text-dark">
                            <CardTitle style={{"fontWeight":"bold", "fontSize":"22px"}}>Recipe Steps</CardTitle>
                            <hr />
                            <CardSubtitle>
                                <div dangerouslySetInnerHTML={{__html: currentContentAsHTML}}></div>
                            </CardSubtitle>
                        </CardBody>
                    </Card>
                </div>
                </div>
                
            </React.Fragment>
            
        );
}

class ItemDetail extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(!this.props.singleRecipe.isLoading)
        this.props.fetchRecipe('create',this.props.recipeId);
    }

    render() {
        
        if (this.props.singleRecipe.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }

        else if (this.props.singleRecipe.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.singleRecipe.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (this.props.singleRecipe.recipe.length != 0)   
        {
            const data = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.singleRecipe.recipe.steps)));
            let currentContentAsHTML = convertToHTML(data.getCurrentContent());

            const steps = data.getCurrentContent().getPlainText();

            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/create'>Create</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.singleRecipe.recipe.title}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-5">
                            <h5>{this.props.singleRecipe.recipe.title} 
                                <Link to={`${this.props.singleRecipe.recipe._id}/edit`} className="pull-right shadow-none">
                                    <i className="fa fa-edit fa-lg">
                                    </i>
                                </Link>
                            </h5>
                            <hr />
                        </div>
                        <div className="col-7">
                            <Button className="btn btn-danger pull-right" color="primary" onClick={() => this.props.deleteRecipe(this.props.singleRecipe.recipe._id, this.props.history)}>
                                    <span className="fa fa-trash fa-lg"></span> Delete Recipe
                            </Button>
                        </div>
                    </div>
                    
                    <div className="row mt-4 mb-4">
                        <RenderItem item={this.props.singleRecipe.recipe}
                            deleteRecipe = {this.props.deleteRecipe}
                            history = {this.props.history}
                            steps = {steps}
                            data = {data}
                            currentContentAsHTML = {currentContentAsHTML}
                        />
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