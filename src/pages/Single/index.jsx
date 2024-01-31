import DisplayCard from "../../components/DisplayCard"
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

function Single() {
  
  let {id: resumeID} = useParams(); 
  const [resumeData, setResumeData] = useState();
  
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
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
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
  }, [resumeID])
  return (
    <div>
      {resumeData ? (
        <div ref={pdfRef}> 
          <DisplayCard resumeData={resumeData} />
        </div>
      ): null}
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  )
}

export default Single
