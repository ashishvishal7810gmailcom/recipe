import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Select from 'react-select';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { convertToRaw } from 'draft-js';
// import { convertFromRaw } from 'draft-js';
import { withRouter } from 'react-router-dom';
import convert from 'image-file-resize';


class CreateRecipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            selectedFile: null,
            editorState: EditorState.createEmpty(),
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        const rawState = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
        const item = new FormData();
        item.append("title", this.itemname.value);
        item.append("ingredients", this.ingredients.value);
        item.append("description", this.description.value);
        item.append("Image", this.state.selectedFile);
        item.append("steps", rawState);

        for (var pair of item.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        
        this.props.postItem(item, this.props.history);
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };
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



    render() {
        const { selectedOption } = this.state;
        const { editorState } = this.state;
        return(
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="mt-4">
                            <h4>Create New Recipe</h4>
                            <hr />
                        </div>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="itemname">Recipe Name</Label>
                                <Input type="text" id="itemname" name="itemname"
                                    innerRef={(input) => this.itemname = input} 
                                    placeholder = 'Recipe Name'
                                    required
                                />
                            </FormGroup>
                            
                            <FormGroup className="mt-2">
                                <Label htmlFor="ingredients">Ingredients</Label>
                                <Input rows="5" type="textarea" id="ingredients" name="ingredients"
                                    innerRef={(input) => this.ingredients = input} 
                                    placeholder = 'Write Each Ingredients in a new line'
                                    required
                                />
                            </FormGroup>
                            <FormGroup className="mt-2">
                                <Label htmlFor="description">Description</Label>
                                <Input rows="5" type="textarea" id="description" name="description"
                                    innerRef={(input) => this.description = input} 
                                    placeholder = 'Description of Dish'
                                    required
                                />
                            </FormGroup>
                            <FormGroup className="mb-4 mt-4">
                                <Label htmlFor="itemImage" style={{"paddingRight":"10px"}}>Image of Dish </Label>
                                <Input type="file" id="itemImage" name="itemImage"
                                    onChange={this.onFileChange} 
                                    required
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

export default withRouter(CreateRecipe);