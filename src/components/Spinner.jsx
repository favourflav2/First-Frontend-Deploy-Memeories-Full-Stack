import { MDBSpinner } from 'mdb-react-ui-kit'
import React from 'react'

export default function Spinner() {
  return (
    <div className='spinER'>
         <MDBSpinner className='me-2' style={{width:"3rem", height:"3rem", marginTop:"300px"}}>
      <span className='visually-hidden'>Loading...</span>
    </MDBSpinner>
    </div>
   
  )
}

