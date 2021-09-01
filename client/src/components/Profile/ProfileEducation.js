import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
const ProfileEducation = ({
  edu: { school, degree, fieldofstudy, to, from, description },
}) => {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format="YYY/MM/DD">{from}</Moment>-{" "}
        {!to ? "Now" : <Moment format="YYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Degree:</strong> {degree}
      </p>
      <p>
        <strong>Filed of studt:</strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  edu: PropTypes.object.isRequired,
};

export default ProfileEducation;
