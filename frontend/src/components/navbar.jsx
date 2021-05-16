import React from 'react';
import { Redirect } from 'react-router';

const NavBar = () => {
    return ( 
        <nav className="navbar navbar-light">
                <div className="container-fluid">
                    <h5>Send bulk emails</h5>
                    <form className="d-flex">
                        
                        <a href='/' onClick={() => {
                            localStorage.clear()
                            return <Redirect to='/' push={true} />
                        }} className="logout" type="submit"><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
                    </form>
                </div>
            </nav>
     );
}
 
export default NavBar;