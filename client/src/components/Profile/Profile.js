import { Fragment, useEffect } from "react";
import Snipper from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({ match }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [dispatch, match.params.id]);
  const state = useSelector((state) => state);
  const { profile, loading } = state.profile;

  const auth = state.auth;

  return (
    <Fragment>
      {profile === null || loading ? (
        <Snipper />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Proile
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div class="profile-exp bg-white p-2">
              <h2 class="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                profile.experience.map((exp) => (
                  <ProfileExperience key={exp._id} exp={exp} />
                ))
              ) : (
                <h1> No working experience</h1>
              )}
            </div>
            <div class="profile-edu bg-white p-2">
              <h2 class="text-primary">Eduction</h2>
              {profile.education.length > 0 ? (
                profile.education.map((edu) => (
                  <ProfileEducation key={edu._id} edu={edu} />
                ))
              ) : (
                <h1> No School</h1>
              )}
            </div>
                { profile.githubusername && 
                    <ProfileGithub username={profile.githubusername} />
                }

          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
