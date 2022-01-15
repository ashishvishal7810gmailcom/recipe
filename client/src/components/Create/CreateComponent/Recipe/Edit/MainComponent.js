import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editRecipe } from '../../../../../redux/Create/ActionCreator';
import { fetchRecipe } from '../../../../../redux/Recipe/ActionCreator';
import convert from 'image-file-resize';


const mapStateToProps = state => {
  return {
    singleRecipe : state.singleRecipe
  }
}

const mapDispatchToProps = (dispatch) => ({
    fetchRecipe: (initialRoute, recipeId) => dispatch(fetchRecipe(initialRoute, recipeId)),
    editRecipe: (item, recipeId, history) => dispatch(editRecipe(item, recipeId, history)),
});




class EditRecipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            selectedFile: null,
            editorState: EditorState.createEmpty(),
            itemname:'',
            ingredients: [],
            description:''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        await this.props.fetchRecipe('create',this.props.recipeId);
        console.log(this.props.singleRecipe.recipe);

        if(!this.props.singleRecipe.errMess) {
            const data = EditorState.createWithContent(
                convertFromRaw(JSON.parse(this.props.singleRecipe.recipe.steps))
            );

            
            this.setState ({ 
                itemname: this.props.singleRecipe.recipe.title,
                ingredients: this.props.singleRecipe.recipe.ingredients.join("\r\n"),
                description: this.props.singleRecipe.recipe.description,
                editorState: data
            })
        }
    }
    

    handleSubmit(event) {
        const rawState = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
        const item = new FormData();
        item.append("title", this.state.itemname);
        item.append("ingredients", this.state.ingredients);
        item.append("description", this.state.description);
        item.append("Image", this.state.selectedFile);
        item.append("steps", rawState);
        console.log(this.state.selectedFile);
        for (var value of item.values()) {
            console.log(value); 
        }
        this.props.editRecipe(item, this.props.recipeId, this.props.history);
        this.props.history.push(`/create/${this.props.recipeId}`);
        event.preventDefault();
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    // On file select (from the pop up)
	onFileChange = event => {
        convert({ 
            file: event.target.files[0],  
            width: 600, 
            height: 400, 
            type: 'jpeg'
            }).then(resp => {
                this.setState({ selectedFile: resp });
            }).catch(error => {
                 alert("please reselect Image");
            })
	};

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState: editorState
        });
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }



    render() {
        const { selectedOption } = this.state;
        const { editorState } = this.state;
        return(
            <React.Fragment>
                <div className="container">
                    <div className="row">
                    <div className="mt-4">
                        <h4>Edit Recipe</h4>
                        <hr />
                    </div>
                    
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="itemname">Recipe Name</Label>
                                <Input type="text" id="itemname" name="itemname"
                                    value={this.state.itemname}
                                    onChange={this.handleInputChange}
                                    placeholder = 'Recipe Name'
                                />
                            </FormGroup>
                            <FormGroup className="mt-2">
                                <Label htmlFor="ingredients">Ingredients</Label>
                                <Input rows="5" type="textarea" id="ingredients" name="ingredients"
                                    value={this.state.ingredients}
                                    onChange={this.handleInputChange}
                                    placeholder = 'Write Each Ingredients in a new line'
                                />
                            </FormGroup>
                            <FormGroup className="mt-2">
                                <Label htmlFor="description">Description</Label>
                                <Input rows="5" type="textarea" id="description" name="description"
                                    value={this.state.description}
                                    onChange={this.handleInputChange}
                                    placeholder = 'Description of Dish'
                                />
                            </FormGroup>
                            <FormGroup className="mb-4">
                                <Label for="itemImage" style={{"paddingRight":"10px"}}>Image</Label>
                                <Input type="file" id="itemImage" name="itemImage"
                                    onChange={this.onFileChange} 
                                />
                            </FormGroup>
                            <FormGroup style = {{minHeight: "400px"}}>
                                <Editor
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    placeholder="Recipe Steps"
                                />
                            </FormGroup>
                            
                            <FormGroup className="text-center mt-2 mb-3">
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditRecipe));
