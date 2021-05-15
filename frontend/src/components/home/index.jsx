import React from 'react';
import './home.css'

const Home = () => {
    return ( 
        <div>
            <div className="card subcribe-card" style={{width: "30rem"}}>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Subscribe for newslatter</h6>
                    <form>
                        <input type="text" className="form-control" placeholder="Full Name"/>
                        <input type="text" className="form-control mt-2" placeholder="Email"/>
                        <div className="d-grid gap-2 mt-2">
                            <button type="submit" className="submit">Subscribe</button>
                        </div>
                    </form>
                    <p className="forgot" align="center">
                        <a href="/login">Admin Login <i class="fa fa-arrow-right" aria-hidden="true"></i></a>
                    </p>
                </div>
            </div>
        </div>
     );
}
 
export default Home;