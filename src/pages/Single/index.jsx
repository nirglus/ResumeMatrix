import DisplayCard from "../../components/DisplayCard"
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/User";
import { useState, useEffect, useContext } from "react";
import { db } from "../../config/firebaseConfig";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Single.css";

function Single() {
  
  let {id: resumeID} = useParams(); 
  const [resumeData, setResumeData] = useState();
  const {currentUser} = useContext(UserContext);
  const pdfRef = useRef();
  const downloadPDF = () =>{
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio);
      const imgY = 0;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('resume.pdf');
    });
  };
  
  const fetchResume = async() =>{
    const docRef = doc(db, "resumes", resumeID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setResumeData(docSnap.data());
      console.log({resumeData});
    } else {
      console.log("No such document!");
    }
  }
  useEffect(() =>{
    fetchResume();
    console.log({resumeID});
  }, [resumeID]);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className="singlePage">
      {resumeData ? (
        <>
        <div className="singleBtns">
          <button className="download" onClick={downloadPDF}>Download PDF <i className="bi bi-download"></i></button>
          <Link className="download" to={`/account/${currentUser.id}`}>Back to resumes <i className="bi bi-arrow-return-left"></i></Link>
        </div>
          <div ref={pdfRef} className="pdfContainer"> 
            <DisplayCard resumeData={resumeData} />
          </div>
          <button className="download bottom" onClick={downloadPDF}>Download PDF <i className="bi bi-download"></i></button>
        </>
      ): (
        <div className="loading">
          <img src="https://media.tenor.com/t5DMW5PI8mgAAAAj/loading-green-loading.gif" alt="loading" />
        </div>
      )}
      
    </div>
  )
}

export default Single
