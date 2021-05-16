import React, {Component} from 'react';
import './home.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { subscribeUser } from '../../dataService';
import {validateSubscribeForm} from '../../validator';
toast.configure();

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                fullName: '',
                email: ''
            }
        }
    }

    handleSubmit = (event) => {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
    
        this.setState({
          user
        });
    }
    

    subscribeUser = async (user) => {
        const params = { 
            fullName: user.fullName,
            email: user.email
        }
        await subscribeUser(params).then((result) =>{
          if(result.status) {
            this.notify('You are successfully subscribed', 'success', 'bottom-right', '5000', false);
            this.setState({user: {fullName: '', email: ''}})
          } else {
            this.notify(result.errors, 'error', 'top-center', false, true)
          }
        })
      }
     validateForm = (event) => {
        event.preventDefault();
        
        var payload = validateSubscribeForm(this.state.user);
        if (payload.success) {
          this.setState({
            errors: {}
          });
          var user = {
            fullName: this.state.user.fullName,
            email: this.state.user.email,
          };
          this.subscribeUser(user);
        } else {
          const errors = payload.errors;
          this.notify(payload.errorsList[0], "error", "top-center", false, false)
          this.setState({
            errors
          });
        }
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
    render() {
        return ( 
            <div>
                <div className="card subcribe-card" style={{width: "30rem"}}>
                    <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">Subscribe for newslatter</h6>
                        <form onSubmit={this.validateForm}>
                            <input type="text" className="form-control" name="fullName" placeholder="Full Name" onChange={this.handleSubmit}/>
                            <input type="text" className="form-control mt-2" name="email" placeholder="Email" onChange={this.handleSubmit}/>
                            <div className="d-grid gap-2 mt-2">
                                <button type="submit" className="subscribe">Subscribe</button>
                            </div>
                        </form>
                        <p className="forgot" align="center">
                            <a href="/login">Admin Login <i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                        </p>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Home;