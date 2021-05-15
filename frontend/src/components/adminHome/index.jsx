import React, { Component, useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./adminHome.css"
class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state={
            editorState: EditorState.createEmpty()
        }
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
          });
    }
    render() {
        const {editorState} = this.state
        return ( 
            <div>
                <div className="card mail-card">
                    <div className="card-body">
                        <form>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                            <button type="submit" className="submit mt-2">Send</button>
                            <p className="forgot" align="center">
                                By clicking on send button it will send this email to all the subscribed users.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default AdminHome;