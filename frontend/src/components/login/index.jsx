import React, {useState} from 'react';
import './login.css'
import { loginUser } from "../../dataService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
toast.configure();

const Login = ({setToken}) => {
    let history = useHistory();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        })
        if (!token.status) {
        notify(token.errors, 'error', 'top-center', false, true)
        } else {
            history.push('/')
            window.location.href = '/'
            notify(token.message, 'success', 'bottom-right', '5000', false)
        }
        setToken(token)
    }
    const notify = (msg, type, location, timer, progressBar) => {
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
    return ( 
        <div>
            <div className="login-card">
                <p className="sign" align="center">
                    Sign in
                </p>
                    <form className="login-form" onSubmit={handleSubmit}>
                        
                            <input type="text" className="un" align="center" placeholder="Username" onChange={e => setUserName(e.target.value)}/>
                        
                            <input type="password" className="pass" align="center" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                        
                            <button type="submit" className="submit" align="center">Login</button>
                    
                    </form>
                    <p className="forgot" align="center">
                        <a href="/"><i className="fa fa-arrow-left" aria-hidden="true"></i> Subscribe</a>
                    </p>
                </div>
        </div>
     );
}
 
export default Login;