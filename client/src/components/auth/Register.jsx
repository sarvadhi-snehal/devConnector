import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const onChange = e => setFormData({...formData, [e.target.name] : e.target.value})
  const onSubmit = async e =>{
      e.preventDefault();
      if(password !== password2){
          console.log("reenter password")
      }
      else {
        // const newUser = {
        //     name,email,password
        // }   

        // try {
        //     const config = {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }
      
         
        //     const res = await axios.post('/api/users',newUser,config)
        //     console.log(res.data)
        // } catch (error) {
        //     console.log(error.response.data)
        // }
        console.log("successful")
    }
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" 
          placeholder="Name"
          value={name}
          onChange={e => onChange(e)} 
          name="name"
            required />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            value={password2}
            onChange={e => onChange(e)} 
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
}

export default Register;
