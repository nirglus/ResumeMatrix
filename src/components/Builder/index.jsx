import { useState, useContext } from "react"
import { currentYear, minimumInput } from "../../helpers/dates";
import { db } from "../../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { UserContext } from "../../context/User";
import "./Builder.css";

function Builder() {

  const {currentUser, setSubmitedResume, submitedResume} = useContext(UserContext);
  const [resumeData, setResumeData] = useState({
    fullName: '',
    role: '',
    aboutMe: '',
    phone: '',
    email: '',
    workExperience: [{ companyName: '', role: '', timeFrame: '', skills: ['']}],
    education: [{ learned: '', educationTimeFrame: '' }]
});

const handleInputChange = (e, index, field, section, fieldIndex) => {
    const { name, value } = e.target;
    const data = [...resumeData[section]];
    if(fieldIndex){
        data[index][field][fieldIndex] = value;
    }else{
        data[index][field] = value;
    }
    
    setResumeData({ ...resumeData, [section]: data });
};

const addField = (section) => {
    setResumeData({
        ...resumeData,
        [section]: [...resumeData[section], {skills: [''] }]
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(resumeData);
    const docRef = await addDoc(collection(db, "resumes"), {...resumeData, userID: currentUser.id})
    setSubmitedResume(true);
    console.log({submitedResume});
    console.log("Resume has been added to 'resumes' with the ID:", docRef.id);
};

const removeField = (itemIndex, field) =>{
  setResumeData(prevData => ({
    ...prevData, [field]: prevData[field].filter((item, index) => index !== itemIndex) 
  }))
}

return (
    <form className="createForm" onSubmit={handleSubmit}>
        <h1>Let's <span className="matrix">create</span> a resume!</h1>
         
         <div className="formHeading">
            <div className="numberDiv">1</div>
            <h2>Personal Details</h2>
         </div>
        <div className="personalInputs">
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" value={resumeData.fullName} onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })} required />
          
          <label htmlFor="role">Role:</label>
          <input type="text" id="role" name="role" value={resumeData.role} onChange={(e) => setResumeData({ ...resumeData, role: e.target.value })} required />
          
          <label htmlFor="aboutMe">About Me:</label>
          <textarea id="aboutMe" name="aboutMe" value={resumeData.aboutMe} onChange={(e) => setResumeData({ ...resumeData, aboutMe: e.target.value })} rows="4"></textarea>

          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" value={resumeData.phone} onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })} required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={resumeData.email} onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })} required />
        </div>

        <div className="formHeading">
            <div className="numberDiv">2</div>
            <h2>Work Experience</h2>
        </div>
        <div className="workExpSection">
            {resumeData.workExperience.map((experience, index) => (
                <div key={index} className="workExpInputs">
                    <label>Company Name:</label>
                    <input type="text" value={experience.companyName} onChange={(e) => handleInputChange(e, index, 'companyName', 'workExperience')} required />

                    <label>Role:</label>
                    <input type="text" value={experience.role} onChange={(e) => handleInputChange(e, index, 'role', 'workExperience')} required />

                    <label>From year:</label>
                    <input type="number" value={experience.from} onChange={(e) => handleInputChange(e, index, 'from', 'workExperience')} min={minimumInput} max={currentYear} required />

                    <label>Till year:</label>
                    <input type="number" value={experience.till} onChange={(e) => handleInputChange(e, index, 'till', 'workExperience')} min={minimumInput} max={currentYear} required />

                    <label htmlFor="skill">Skill:</label>
                    <input type="text" value={experience.skills} onChange={(e) => handleInputChange(e, index, 'skills', 'workExperience', '0')} required />

                    <button className="removeBtn" onClick={() => removeField(index, "workExperience")}>Remove <i className="bi bi-trash3"></i></button>
                </div>
            ))}
        </div>
        <button className="addBtn" type="button" onClick={() => addField('workExperience')}>Add Experience <i className="bi bi-plus-circle-dotted"></i></button>

        <div className="formHeading">
            <div className="numberDiv">3</div>
            <h2>Education</h2>
        </div>
        
        <div className="educationSection">
            {resumeData.education.map((education, index) => (
                <div key={index} className="educationInputs">
                    <label>What you learned:</label>
                    <input type="text" value={education.learned} onChange={(e) => handleInputChange(e, index, 'learned', 'education')} required />

                    <label>From year:</label>
                    <input type="number" value={education.from} onChange={(e) => handleInputChange(e, index, 'from', 'education')} min={minimumInput} max={currentYear} required />

                    <label>Till year:</label>
                    <input type="number" value={education.till} onChange={(e) => handleInputChange(e, index, 'till', 'education')} min={minimumInput} max={currentYear} required />
                    <button className="removeBtn"  onClick={() => removeField(index, "education")}>Remove <i className="bi bi-trash3"></i></button>
                </div>
            ))}
        </div>
        <button className="addBtn" type="button" onClick={() => addField('education')}>Add Education <i className="bi bi-plus-circle-dotted"></i></button>

        <button className="submitBtn" type="submit">Save Resume <i className="bi bi-floppy"></i></button>
    </form>
);
}


export default Builder
