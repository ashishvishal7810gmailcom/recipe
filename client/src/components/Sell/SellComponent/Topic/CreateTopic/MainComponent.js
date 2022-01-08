import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { convertToRaw } from 'draft-js';
// import { convertFromRaw } from 'draft-js';

class CreateTopics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        const rawState = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
        const item = new FormData();
        item.append("title", this.topicname.value);
        item.append("theory", rawState);
        this.props.postTopic(this.props.courseId, item, this.props.history);
    }

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState: editorState
        });
    };



    render() {
        const { editorState } = this.state;

        return(
            <React.Fragment>
                <div className="container">
                    <div className="row">
                    <div className="mt-4">
                            <h4>Create New Topic</h4>
                            <hr />
                        </div>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup className="mb-3">
                                <Label htmlFor="topicname">Topic Name</Label>
                                <Input type="text" id="topicname" name="topicname"
                                    innerRef={(input) => this.topicname = input} 
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
                                    placeholder="Topic Details"
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

export default withRouter(CreateTopics);