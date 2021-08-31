import { Fragment, useState } from "react";
import {  useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addEducation } from "../../actions/profile";
const AddExperience = ({history}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const { school, degree, fieldofstudy, from, to, current, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
      e.preventDefault();
      dispatch(addEducation(formData,history))
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Add An Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any School/Bootcamp that you have attend in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e)=> onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="* degree" name="degree"
          value={degree} 
          onChange={(e) => onChange(e)}
          
          required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* school" name="school"
          value={school} 
          onChange={(e) => onChange(e)}
          required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="field of study" name="fieldofstudy"
          value={fieldofstudy} 
          onChange={(e) => onChange(e)}
           />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" 
          value={from} 
          onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" checked={current} name="current"  
            value={current} 
            onChange={(e) => {
                setFormData({...formData, current: !current});
                toggleDisabled(!toDateDisabled)
            }}
            
            
            /> Current School
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to"
           value={to} 
           onChange={(e) => onChange(e)}
           disabled={toDateDisabled ? 'disabled' : ''}
            />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description} 
          onChange={(e) => onChange(e)}
          
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link to="/dashboard" className="btn btn-light my-1" >
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default withRouter(AddExperience);
