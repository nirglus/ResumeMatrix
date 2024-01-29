import { useState, useContext } from "react"
import { currentYear, minimumInput } from "../../helpers/dates";
import { db } from "../../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { UserContext } from "../../context/User";

function Builder() {

  const {currentUser} = useContext(UserContext);
  const [usersResume, setUsersResume] = useState();
  const [resumeData, setResumeData] = useState({
    fullName: '',
    aboutMe: '',
    phone: '',
    email: '',
    workExperience: [{ companyName: '', role: '', timeFrame: '' }],
    education: [{ learned: '', educationTimeFrame: '' }]
});

const handleInputChange = (e, index, field, section) => {
    const { name, value } = e.target;
    const data = [...resumeData[section]];
    data[index][field] = value;
    setResumeData({ ...resumeData, [section]: data });
};

const addField = (section) => {
    setResumeData({
        ...resumeData,
        [section]: [...resumeData[section], { companyName: '', role: '', timeFrame: '' }]
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(resumeData);
    const docRef = addDoc(collection(db, "resumes"), {...resumeData, userID: currentUser.id})
    console.log("Resume has been added to 'resumes' with the ID:", docRef.id);
};

const removeField = (itemIndex, field) =>{
  setResumeData(prevData => ({
    ...prevData, [field]: prevData[field].filter((item, index) => index !== itemIndex) 
  }))
}

return (
    <form onSubmit={handleSubmit}>

        <h2>Personal Details</h2>
        <div className="personalInputs">
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" value={resumeData.fullName} onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })} required />

          <label htmlFor="aboutMe">About Me:</label>
          <textarea id="aboutMe" name="aboutMe" value={resumeData.aboutMe} onChange={(e) => setResumeData({ ...resumeData, aboutMe: e.target.value })} rows="4"></textarea>

          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" value={resumeData.phone} onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })} required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={resumeData.email} onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })} required />
        </div>

        <h2>Work Experience</h2>
        <div className="workExpInputs">
            {resumeData.workExperience.map((experience, index) => (
                <div key={index}>
                    <label>Company Name:</label>
                    <input type="text" value={experience.companyName} onChange={(e) => handleInputChange(e, index, 'companyName', 'workExperience')} required />

                    <label>Role:</label>
                    <input type="text" value={experience.role} onChange={(e) => handleInputChange(e, index, 'role', 'workExperience')} required />

                    <label>From year:</label>
                    <input type="text" value={experience.from} onChange={(e) => handleInputChange(e, index, 'from', 'workExperience')} min={minimumInput} max={currentYear} required />

                    <label>Till year:</label>
                    <input type="text" value={experience.till} onChange={(e) => handleInputChange(e, index, 'till', 'workExperience')} min={minimumInput} max={currentYear} required />
                    <button onClick={() => removeField(index, "workExperience")}>Remove -</button>
                </div>
            ))}
        </div>
        <button type="button" onClick={() => addField('workExperience')}>Add Experience</button>

        <h2>Education</h2>
        <div className="educationInputs">
            {resumeData.education.map((education, index) => (
                <div key={index}>
                    <label>What you learned:</label>
                    <input type="text" value={education.learned} onChange={(e) => handleInputChange(e, index, 'learned', 'education')} required />

                    <label>From year:</label>
                    <input type="number" value={education.from} onChange={(e) => handleInputChange(e, index, 'from', 'education')} min={minimumInput} max={currentYear} required />

                    <label>Till year:</label>
                    <input type="number" value={education.till} onChange={(e) => handleInputChange(e, index, 'till', 'education')} min={minimumInput} max={currentYear} required />
                    <button onClick={() => removeField(index, "education")}>Remove -</button>
                </div>
            ))}
        </div>
        <button type="button" onClick={() => addField('education')}>Add Education</button>

        <button type="submit">Save Resume</button>
    </form>
);
}


export default Builder
