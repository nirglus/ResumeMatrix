import React from 'react'
import Builder from '../../components/Builder'
import Display from '../../components/Display'
import { UserContext } from '../../context/User'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import "./Resume.css";

function Resume() {
  const {user} = useContext(UserContext);
  return (
    <div className='resume'>
      {user ? (
        <>
          <Builder/>
          <Display />
        </>
      ): (
        <div className='noUser'>
        <h1>Please <Link className="matrix" to="/login">login</Link> or <Link className="matrix" to="/login">register</Link></h1>
        </div>
      )}
    </div>
  )
}

export default Resume
