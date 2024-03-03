import {useEffect} from 'react'
import Display from '../../components/Display'
import "./MyResumes.css";

function MyResumes() {

  useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);
    
  return (
    <div className='myResumes'>
        <h1>My <span className="matrix">Resumes</span></h1>
        <Display />
      
    </div>
  )
}

export default MyResumes
