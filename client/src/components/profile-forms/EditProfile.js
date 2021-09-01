import { useState, Fragment, useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import {createOrUpdateProfile ,getCurruentProfile} from '../../actions/profile'
import { Link, withRouter } from 'react-router-dom';
function EditProfile({history}) {
    const dispatch = useDispatch();
     const {profile,loading} = useSelector(state => state.profile)

  const [displaySocialInputs, toggleSocialInput] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const onSubmit = (e) => {
      e.preventDefault();
      dispatch(createOrUpdateProfile(formData,history, true))
  }

  useEffect(() => {
      dispatch(getCurruentProfile())
      setFormData({
        company : loading || !profile.company ? '' : profile.company,
        website : loading || !profile.website ? '' : profile.website,
        location : loading || !profile.location ? '' : profile.location,
        status : loading || !profile.status ? '' : profile.status,
        skills : loading || !profile.skills ? '' : profile.skills,
        githubusername : loading || !profile.githubusername ? '' : profile.githubusername,
        bio : loading || !profile.bio ? '' : profile.bio,
        twitter : loading || !profile.twitter ? '' : profile.twitter,
        facebook : loading || !profile.facebook ? '' : profile.facebook,
        linkedin : loading || !profile.linkedin ? '' : profile.linkedin,
        youtube : loading || !profile.youtube ? '' : profile.youtube,
        instagram : loading || !profile.instagram ? '' : profile.instagram,
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loading,dispatch])
  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e)=> onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" 
          onChange={(e) => onChange(e)}
          value={company}/>
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website"
          onChange={(e) => onChange(e)}
          value={website} />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location"
          onChange={(e) => onChange(e)}
          value={location} />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills"
          onChange={(e) => onChange(e)}
          value={skills} />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            onChange={(e) => onChange(e)}
          value={githubusername}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio"
            onChange={(e) => onChange(e)}
            value={bio}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInput(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input type="text" placeholder="Twitter URL" name="twitter" 
                onChange={(e) => onChange(e)}
                value={twitter}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input type="text" placeholder="Facebook URL" name="facebook" 
                onChange={(e) => onChange(e)}
                value={facebook}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input type="text" placeholder="YouTube URL" name="youtube" 
                onChange={(e) => onChange(e)}
                value={youtube}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input type="text" placeholder="Linkedin URL" name="linkedin" 
                onChange={(e) => onChange(e)}
                value={linkedin}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input type="text" placeholder="Instagram URL" name="instagram" 
                onChange={(e) => onChange(e)}
                value={instagram}/>
            </div>
          </Fragment>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment> 
  );
}

export default withRouter(EditProfile);
