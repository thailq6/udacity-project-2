import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { handleLogin } from "../../actions/authedEmployee";
import "./login.css";

const Login = ({ dispatch, loggedIn }) => {
    const [credentials, setCredentials] = useState({ username: "thailq6", password: "pwthailq6" });

    if (loggedIn) {
        const redirectUrl = new URLSearchParams(window.location.search).get('redirectTo') || "/";
        return <Navigate to={redirectUrl} />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleLogin(credentials.username, credentials.password));
        setCredentials({ username: "", password: "" });
    };

    return (
        <div className="container-fluid text-center">
            <h1 className="fs-1 fw-bold">Employee Pool</h1>
            <img src="./login.svg" className="img-login" alt="Login" />
            <h2 className="fs-5 fw-bolder" data-testid="login-heading">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row mb-3">
                    <label htmlFor="username" className="col-sm-2 col-form-label">User</label>
                    <div className="col-sm-10">
                        <input type="text" id="username" name="username" value={credentials.username} onChange={handleChange} className="form-control" data-testid="username" />
                    </div>
                </div>
                <div className="form-group row mb-3">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} className="form-control" data-testid="password" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" data-testid="submit">Sign in</button>
            </form>
        </div>
    );
};

const mapStateToProps = ({ authedEmployee }) => ({
    loggedIn: !!authedEmployee
});

export default connect(mapStateToProps)(Login);
