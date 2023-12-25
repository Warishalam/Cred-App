import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const Login = () => {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        const payload={email,password}
        // console.log(payload)
        fetch(`https://reqres.in/api/login`,{
            method:"post",
            body:JSON.stringify(payload),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        // .then((res)=>console.log(res))
        .then((res)=>{
           const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'login sucessfull'
        })
          if(res.token){
            //
            navigate("/adminpanel")
          }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:'center'}}>
    <form action="" onSubmit={handleSubmit}>
       <div className='row' style={{display:"flex"}}>
           <div className='col-12' style={{textAlign:"left", marginTop:"10px"}}>
           <label htmlFor="" >Email</label>
              <input type="text" placeholder='Enter your email' className='form-control'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
               />
           </div>
       </div> 
       <div className='row' >
           <div className='col-12' style={{textAlign:"left",marginTop:"left"}}>
              <label htmlFor="">Password</label>
              <input type="password" placeholder='Password' className='form-control'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
           </div>
       </div>
         <div className="">
              <button type="submit" class="btn btn-primary" style={{marginTop:"20px",width:"100%"}}>SUBMIT</button>
         </div>
         </form>
         
    </div>
  )
}

export default Login