import "./DisplayCard.css";
function DisplayCard({resumeData}) {

  return (
    <div className="resumeDisplay">
        <div className="personalDetailsDisp">
          <h1 className="nameDisplay">{resumeData.fullName}</h1>
          <div className="decRow"></div>
          <p className="roleDisplay">{resumeData.role}</p>
            <div className="contactDisp">
              <p><i class="bi bi-telephone"> </i>
                {resumeData.phone}</p>
              <p><i class="bi bi-envelope-at"> </i>
                {resumeData.email}</p>
            </div>
        </div>

          <div className="workDisp">
            <div className="aboutDisp">
              <h2>Profile</h2>
              <p className="aboutDispP">{resumeData.aboutMe}</p>
            </div>
            <h2>Work Experience</h2>
            <div className="workDispItems">
              {resumeData.workExperience.map((experience, index) => (
                <div key={index}>
                  <p className="workPlaceDisp">{experience.role} at {experience.companyName}</p>
                  <p className="workPlaceTimeDisp">{experience.from} - {experience.till}</p>
                  {
                    experience.skills ?
                    (
                      <ul>
                      <li>{experience.skills[index]}</li>
                    </ul>
                    ) : null}
                  
                </div>
              ))}
            </div>
          </div>

          <div className="educationDisp">
              <h2>Education</h2>
              <div className="educationItemsDisp">
                {resumeData.education.map((education, index) => (
                  <div key={index}>
                    <p className="workPlaceDisp">{education.learned}</p>
                    <p className="workPlaceTimeDisp">{education.from} - {education.till}</p>
                  </div>
                ))}
              </div>
          </div>
    </div>
  );
}
  

export default DisplayCard;
