import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"20px",
      background:"pink",color:"white",padding:"20px"
    }}>
        <Link to="/">Login</Link>
        <Link to="/landingpage">Landing Page</Link>
        <Link to="/showthe">Show the Offer</Link>
        <Link to="/spanning">Spanning the Wheel</Link>
        <Link to="/congratulation">Congratulation </Link>
        <Link to="/redeeming">Redeeming </Link>
    </div>
  )
}

export default Navbar