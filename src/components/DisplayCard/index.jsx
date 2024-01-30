
function DisplayCard({resumeData}) {

  return (
    <div className="resumeDisplay">
        <div className="personalDetailsDisp">
          <h1>{resumeData.fullName}</h1>
            <div className="contactDisp">
              <p>Phone: {resumeData.phone}</p>
              <p>Email: {resumeData.email}</p>
            </div>
              <p className="aboutDisp">About Me: {resumeData.aboutMe}</p>
        </div>

          <div className="workDisp">
            <h2>Work Experience</h2>
            <div className="workDispItems">
              {resumeData.workExperience.map((experience, index) => (
                <div key={index}>
                  <p>{experience.role} at {experience.companyName}</p>
                  <p>{experience.from} - {experience.till}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="educationDisp">
              <h2>Education</h2>
              <div className="educationItemsDisp">
                {resumeData.education.map((education, index) => (
                  <div key={index}>
                    <p>{education.learned}</p>
                    <p>{education.from} - {education.till}</p>
                  </div>
                ))}
              </div>
          </div>
    </div>
  );
}
  

export default DisplayCard;
