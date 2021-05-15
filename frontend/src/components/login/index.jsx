import React from 'react';
import './login.css'

const Login = () => {
    return ( 
        <div>
            <div className="login-card">
                <p className="sign" align="center">
                    Sign in
                </p>
                    <form className="login-form">
                        
                            <input type="text" className="un" align="center" placeholder="Username"/>
                        
                            <input type="password" className="pass" align="center" placeholder="Password"/>
                        
                            <button type="submit" className="submit" align="center">Login</button>
                    
                    </form>
                    <p className="forgot" align="center">
                        <a href="/login"><i class="fa fa-arrow-left" aria-hidden="true"></i> Subscribe</a>
                    </p>
                </div>
        </div>
     );
}
 
export default Login;