import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoadingRedirect() {
    const [count, setCount] = React.useState(2)
    const navigate = useNavigate()

    React.useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount)=> --currentCount)
        }, 1000)

        count === 0 && navigate('/login')
        return ()=> clearInterval(interval)
    },[count,navigate])
  return (
    <div className='spinER' style={{marginTop:"300px"}}>
      <h5 style={{color:"red"}}>Redirecting you in {count} seconds</h5>
    </div>
  )
}
