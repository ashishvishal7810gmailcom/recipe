import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { convertToRaw } from 'draft-js';
// import { convertFromRaw } from 'draft-js';
import { withRouter } from 'react-router-dom';
import convert from 'image-file-resize';


const options = [
    { value: 'CP', label: 'CP' },
    { value: 'WEB DEV', label: 'WEB DEV' },
    { value: 'ML', label: 'ML' },
    { value: 'DL', label: 'DL' }
  ];
class CreateCourse extends Component {

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
        // console.log(this.state);
        // console.log(this.state.editorState.getCurrentContent());

        // console.log(this.state.editorState.getCurrentContent().getPlainText());
        const rawState = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
        // console.log(rawState);

        // const data = EditorState.createWithContent(
        //     convertFromRaw(JSON.parse(rawState))
        // );
        // console.log(data);
        // console.log(data.getCurrentContent().getPlainText());

        // console.log(this.state.editorState);
        var tags = this.state.selectedOption.map((option) => {
            var tag = option.value;
            return tag;
        });
        console.log(tags);


        console.log(this.state.editorState);


        const item = new FormData();
        item.append("title", this.itemname.value);
        item.append("price", this.price.value);
        item.append("category", tags);
        item.append("courseImage", this.state.selectedFile);
        item.append("description", rawState);


        console.log(item)
        this.props.postItem(item, this.props.history);
        //  to do
        // push history to created course
        // 

        
        
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    // On file select (from the pop up)
	onFileChange = event => {
        // Update the state
        // this.setState({ selectedFile: event.target.files[0] });
        // const image = event.target.files[0];
        // new Compressor(image, {
        // quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
        // success: (compressedResult) => {
        //     // compressedResult has the compressed file.
        //     // Use the compressed file to upload the images to your server.  
        //     this.setState({ selectedFile: compressedResult });      
        //     // setCompressedFile(compressedResult)
        // },
        // });
        convert({ 
            file: event.target.files[0],  
            width: 300, 
            height: 200, 
            type: 'jpeg'
            }).then(resp => {
                this.setState({ selectedFile: resp });
            }).catch(error => {
                 alert("please reselect Image");
            })
	};

    onEditorStateChange = (editorState) => {
        // console.log(this.state.editorState.getCurrentContent().getPlainText());
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
                                    required
                                />
                            </FormGroup>
                            
                            <FormGroup>
                                <Label htmlFor="ingredients">Ingredients</Label>
                                <Input type="text" id="ingredients" name="ingredients"
                                    innerRef={(input) => this.ingredients = input} 
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="description">Description</Label>
                                <Input type="textarea" id="description" name="description"
                                    innerRef={(input) => this.description = input} 
                                    required
                                />
                            </FormGroup>
                            <FormGroup className="mb-4 mt-4">
                                <Label htmlFor="itemImage">Image</Label>
                                <Input type="file" id="itemImage" name="itemImage"
                                    onChange={this.onFileChange} 
                                    required
                                />
                            </FormGroup>
                            <FormGroup style = {{minHeight: "400px"}}>
                                {/* <Label>Course Description</Label> */}
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

export default withRouter(CreateCourse);