import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { convertToRaw } from 'draft-js';
// import { convertFromRaw } from 'draft-js';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { editTopic } from '../../../../../redux/EditTopic/ActionCreator';
import { fetchTopics, editTopic } from '../../../../../redux/Topic/ActionCreator';

const mapStateToProps = state => {
    return {
        // editTopic: state.editTopic,
        topics: state.topics 
    }
}

const mapDispatchToProps = (dispatch) => ({
    editTopic: (courseId, topicId, topic, history) => dispatch(editTopic(courseId, topicId, topic, history)),
    fetchTopics: (courseId, topicId) => dispatch(fetchTopics(courseId, topicId))
});

  
class EditTopic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            editorState: EditorState.createEmpty()
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    async componentDidMount() {
        await this.props.fetchTopics(this.props.courseId, this.props.topicId);
        if(this.props.topics.topics.length != 0) {
            const theory = EditorState.createWithContent(
                convertFromRaw(JSON.parse(this.props.topics.topics.theory))
            );

            this.setState({
                title: this.props.topics.topics.title,
                editorState: theory
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const rawState = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
        const item = new FormData();
        item.append("title", this.state.title);
        item.append("theory", rawState);
        this.props.editTopic(this.props.courseId, this.props.topicId, item, this.props.history);
    }

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
                                <Label htmlFor="title">Topic Name</Label>
                                <Input type="text" id="title" name="title"
                                    value={this.state.title}
                                    onChange={this.handleInputChange}
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditTopic));
// export default withRouter(EditTopic);