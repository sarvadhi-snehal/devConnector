import { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch,useSelector} from "react-redux"
import {login} from '../../actions/auth'
function Register() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {  email, password } = formData;
  const onChange = e => setFormData({...formData, [e.target.name] : e.target.value})
  const onSubmit = async e =>{
      e.preventDefault();
    
       dispatch(login(email,password))
  }
  if(isAuthenticated){
    return <Redirect to="/dashboard" />
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Login Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
         <div className="form-group">
          <input type="email"
          value={email}
          onChange={e => onChange(e)} 
           placeholder="Email Address" name="email" />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
          onChange={e => onChange(e)} 
            placeholder="Password"
            name="password"
            minLength="6"
          />
        </div>
          <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
}

export default Register;
