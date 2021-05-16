import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./adminHome.css"
import { sendTOAll } from '../../dataService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import draftToHtml from 'draftjs-to-html';
import {validateMailForm} from '../../validator';
toast.configure();
const getHtml = editorState => draftToHtml(convertToRaw(editorState.getCurrentContent()));
class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state={
            editorState: EditorState.createEmpty(),
            message: {
                subject: '',
                message: ''
            },
            subject: '',
        }
        this.form = React.createRef();
        this.validateForm = this.validateForm.bind(this);
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
          });
    }
    notify = (msg, type, location, timer, progressBar) => {
        toast[type](msg,{
            position: location,
            autoClose: timer,
            hideProgressBar: progressBar,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
      } 
    async sendTOAll(message) {
        const params = { 
            subject: message.subject,
            message: message.message
        }
        await sendTOAll(params).then((result) =>{
          if(result.status) {
            this.notify('Email sent successfully please', 'success', 'bottom-right', '5000', false);
            this.form.current.reset();
            this.setState({editorState: EditorState.createEmpty()})
          } else {
            this.notify(result.errors, 'error', 'top-center', false, true)
          }
        })
      }
      validateForm(event) {
        event.preventDefault();
        const data = new FormData(this.form.current)
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        object["message"] = getHtml(this.state.editorState)
        var payload = validateMailForm(object);
        if (payload.success) {
          this.setState({
            errors: {}
          });
          var message = {
            subject: object.subject,
            message: object.message,
          };
          this.sendTOAll(message);
        } else {
          const errors = payload.errors;
          this.notify(payload.errorsList[0], "error", "top-center", false, false)
          this.setState({
            errors
          });
        }
      }
    render() {
        const {editorState} = this.state
        return ( 
            <div>
                <div className="card mail-card">
                    <div className="card-body">
                        <form ref={this.form} onSubmit={this.validateForm}>
                            <input type="text" className="form-control mb-2" name="subject" placeholder="Subject"/>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                name="message"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                            <button type="submit" className="send-mail mt-2">Send</button>
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