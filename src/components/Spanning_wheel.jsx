import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../components/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import styles from "../styles/Table.module.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import nullData from "../images/data-null.gif";
import { Drawer, Modal, TextField, Tooltip, Typography } from "@mui/material";
import Timeline_sidebar from "../components/Timeline_sidebar";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Timeline_drawer from "../components/Timeline_drawer";
import Moment from "react-moment";
import swal from "sweetalert";
import TimePicker from "react-time-picker";
import Add_Candidate_Modal from "../Modals/Add_Candidate_Modal";
import Swal from 'sweetalert2'

function Directory() {
  const storage = window.sessionStorage;
  let id = storage.getItem("reqID")
  // console.log(id)
  const user_id = storage.getItem("USER_GUID");
  const [data, setData] = useState([]);
  const [show_exp, setShow_exp] = useState(false);
  const [show_work, setShow_work] = useState(false);
  const [formData, setFormData] = useState({});
  const [source_data, setSource_Data] = useState([]);
  const [source_val, setSource_Val] = useState("");
  const req = window.location.href.split("/").pop();
  const [openMappingDrawer, setOpenMappingDrawer] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [details,setDetails] = useState([])
  const[srHr_data,setSrHr_Data]=useState([])
  const USER_GUID=storage.getItem("USER_GUID")
  let req_ID = storage.getItem("reqID")
  const[state_data,setState_Data]=useState("")
  const[city_data,setCity_Data]=useState("")
  const exp_ref = useRef();
  const work_ref = useRef();
  const navigate = useNavigate();

let hr_name;
let status;
let position;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const inputRef = useRef(null);

  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleClick6=()=> {
    handleOpen()
    inputRef.current.focus();
  }

   const position_name=storage.getItem("POSITION_NAME")
  useEffect(() => {
    if (user_id === "" || user_id === null) {
      navigate("/");
    }
  }, [storage]);

  const get_directory = async () => {
    try {
      let res = await fetch(
        `http://beta-hire.equinoxlab.com/api/Candidate_Dashboard.svc/get_candidate_data/${id}/all/${user_id}`
      );
      let data = await res.json();
      console.log(data.data)
      // console.log(id)
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const get_timline_data = async (id) => {
    try {
      let res = await fetch(
        `http://beta-hire.equinoxlab.com/api/Candidate_Dashboard.svc/get_candiadte_timeline/${id}`
      );
      let data = await res.json();
      setTimeline(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const get_information =(number)=>{
     data?.forEach((ele)=>{
      console.log(ele)
      console.log(number)
      if(ele.MOBILE == number){
        hr_name = ele.HR_NAME;
        status = ele.STATUS;
        position = ele.POSITION_NAME
      }
     })
  }

  const handleExp = (e) => {
    if (exp_ref.current.checked == true) {
      work_ref.current.checked = false;
      setShow_work(false);
    }
    setShow_exp(!show_exp);
  };

  const handleWork = (e) => {
    if (work_ref.current.checked == true) {
      exp_ref.current.checked = false;
      setShow_exp(false);
    }
    setShow_work(!show_work);
  };

  function isValidEmail(email){
     return /\S+@\S+\.\S+/.test(email);
  }

  const collect_info = (e) => {
    let inputName = e.target.name;

  setFormData({
        ...formData,
        [inputName]: e.target.value,
        CREATED_BY: user_id,
        IS_MAP: "1",
        REQ_ID: id,
        IS_EXP: show_exp ? "1" : "0",
        IS_WORKING: show_work ? "1" : "0"
      });
      
  };
  const handleEmailChange=(e)=>{
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // add_candidate(formData);
    if(isValidEmail(formData?.EMAIL)){
      add_candidate(formData)
    }
    else{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer:3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: "Please Enter valid Email ID"
      })
    }
  };

  const add_candidate = async (formData) => {
  
    let flag1 = false;
    let flag2 = false;
    let flag3 = false;
    let flag4 = false;
    let flag5 = false;
    let flag6 = false;
    let flag7 = false;
    let flag8 = false;
    let flag9 = false;


    for (let x in formData) {
      if (x === "EMAIL") {
        flag1 = true;
      }
      if (x === "MOBILE") {
        flag2 = true;
      }
      if (x === "NAME") {
        flag3 = true;
      }
      if (x === "SOURCE_OF_CANDIDATE") {
        flag4 = true;
      }
    }
    if (
      flag1 === false ||
      flag2 === false ||
      flag3 === false ||
      flag4 === false 
    ) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: "All Fields Are Compulsary!!"
      })

    } else if (formData.MOBILE.length !== 10) {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer:500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: "Please Enter valid Mobile Number"
      })
      
    }
    else if(formData.EMAIL === ""||formData.MOBILE === ""||formData.NAME === ""||formData.SOURCE_OF_CANDIDATE === ""){
 
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: "All Fields Are Compulsary!!"
    })
    }
    else {
      try {
        let res = await fetch(
          "http://beta-hire.equinoxlab.com/api/Candidate_Dashboard.svc/insert_candidate",
          {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({
              // ADDRESS: formData.ADDRESS,
              // CREATED_BY: formData.CREATED_BY,
              // CURRENT_COMPANY: formData.CURRENT_COMPANY,
              // CURRENT_DESIGNATION: formData.CURRENT_DESIGNATION,
              // CURRENT_GROSS: formData.CURRENT_GROSS,
              // EMAIL: formData.EMAIL,
              // EXP: formData.EXP,
              // EXP_IN: formData.EXP_IN,
              // IS_EXP: formData.IS_EXP,
              // IS_MAP: formData.IS_MAP,
              // IS_WORKING: formData.IS_WORKING,
              // MOBILE: formData.MOBILE,
              // NAME: formData.NAME,
              // NOTICE_PERIOD: formData.NOTICE_PERIOD,
              // REQ_ID: formData.REQ_ID,
              // SOURCE_OF_CANDIDATE: formData.SOURCE_OF_CANDIDATE,
              // STATE:formData.STATE,
              // CITY:formData.CITY,

                 "NAME":formData.NAME,
                 "MOBILE":formData.MOBILE,
                 "EMAIL":formData.EMAIL,
                "ADDRESS":formData.ADDRESS,
                "IS_EXP":formData.IS_EXP,
                "EXP_IN":formData.EXP_IN,
                "EXP":formData.EXP,
                "IS_WORKING":formData.IS_WORKING,
                "NOTICE_PERIOD":formData.NOTICE_PERIOD,
                "CREATED_BY":formData.CREATED_BY,
                "IS_MAP":formData.IS_MAP,
                "REQ_ID":formData.REQ_ID,
                "CURRENT_GROSS": formData.CURRENT_GROSS,
                "CURRENT_DESIGNATION":formData.CURRENT_DESIGNATION,
                "CURRENT_COMPANY":formData.CURRENT_COMPANY,
                "CITY":city_data,
               "STATE":state_data
              //   "CITY":formData.CITY,
              //  "STATE":formData.STATE
            }),
          }
        );
        let data = await res.json();
        console.log(data)
        // console.log(data.response[0].MESSAGE)
        // console.log(formData.NAME)
        // console.log(status)
        if(data.response[0].MESSAGE ==`Candidate is already in the system`){
          get_information(formData.MOBILE);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            width:"600px",
            paddingLeft:"-50px",
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
            customClass: {
              title: 'custom-title-class',
            }
          })
          Toast.fire({
            icon: 'info',
            title: `Candidate with these Number is Already in the system,<br/>  Status:${status} <br/> HR Name:${hr_name} <br/> Position:${position}`
          })
        }
        else{
          get_directory();
          handleClose();
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
            title: 'Candidate added Successfully'
          })
        }

      } catch (error) {
        console.log(error);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: "Something Went Wrong"
        })
      }
    }
  };

  const get_details = async (can_ID) => {
    try {
      let res = await fetch(
        `http://beta-hire.equinoxlab.com/api/Candidate_Dashboard.svc/get_call_status_timeline/${can_ID}/${id}`
      );
      let data = await res.json();
      setDetails(data.data);

    } catch (error) {
      console.log(error);
    }
  };

  const get_source = async () => {
    try {
      let res = await fetch(
        "http://beta-hire.equinoxlab.com/api/Master.svc/get_Source_of_candidate_select2/"
      );
      let data = await res.json();
      setSource_Data(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDrawer = (condition) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    } else if (condition === "hrMapping") {
      setOpenMappingDrawer(false);
    }
  };

  const handleTimeline = (row, data) => {
    setOpenMappingDrawer(true);
   
    get_details(data.rowData[9]);
  };

  const handleNavigate = (row, data) => {
    storage.setItem("can_ID", data.rowData[9]);
    navigate("/candidate_details");
  };

  useEffect(() => {
    get_directory();
    get_source();
  }, []);

  const get_srHr=async()=>{
    try {
      let res=await fetch(`http://beta-hire.equinoxlab.com/api/Candidate_Dashboard.svc/get_candidate_data_hr_head/${req_ID}/all`)
      let data=await res.json()
      // console.log(data.data)
      setSrHr_Data(data.data)
    } catch (error) {
      console.log(error)
    }
}

useEffect(()=>{
  get_srHr()
},[])

  const options = {
    filterType: "checkbox",
  };
  const columns = [
    {
      name: "NAME",
      label: "NAME",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "MOBILE",
      label: "MOBILE",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "EMAIL",
      label: "EMAIL",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "ADDRESS",
      label: "ADDRESS",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "EXP",
      label: "EXP",
      options: {
        filter: true,
        sort: false,
        customBodyRender:(row)=>{
          return(
             <p style={{marginLeft:"10%",marginTop:"15px"}}>{row}</p>
          )
        }
      },
    },
    {
      name: "NOTICE_PERIOD",
      label: "NOTICE PERIOD",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "CREATED_ON",
      label: "CREATED ON",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (row, data) => {
          return <Moment format="DD MMM YYYY">{row}</Moment>;
        },
      },
    },
    {
      name: "STATUS",
      label: "STATUS",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (row, data) => {
          return (
            <button
              id={styles.status_btn}
              onClick={() => handleNavigate(row, data)}
              style={{
                backgroundColor:
                row == "New"
                ? "#9932CC"
                : row == "Offer Sent"
                ? "orange"
                : row == "Offer Accepted"
                ? "green"
                : row == "Not Contactable"
                ? "Grey"
                : row == "Call Back"
                ? "#F56EB3"
                : row === "Shortlisted"
                ? "Green"
                : row==="Ringing"
                ? "#609EA2"
                : row==="Wrong Number"
                ? "#F55050"
                : row==="Will Revert"
                ? "#FFEA20"
                : row==="Call Back"
                ? "#8DCBE6"
                : row==="Shortlisted"
                ? "#ABC270"
                : row==="Not Contactable"
                ? "#C780FA"
                : row==="Not Suitable"
                ? "#39B5E0"
                : row==="Not Interested"
                ? "#FF7B54"
                : row==="For Future Openings"
                ? "#3C6255"
                : row==="Selected"
                ? "#FD8A8A"
                : row==="On Hold"
                ? "#F8F988"
                : row==="Rejected"
                ? "#DC0000"
                : row==="Skip"
                ? "#181D31"
                : row==="Scheduled"
                ? "#46C2CB"
                : row==="Offer Sent"
                ? "#00FFF6"
                : row==="Offer on Hold"
                ? "#D989B5"
                : row==="Offer Accepted"
                ? "#03C988"
                : row==="Offer Not Accepted"
                ? "#DC0000"
                : row==="Joining"
                ? "#FFD56F"
                : row==="Backed Out"
                ? "#58287F"
                :"#61876E",
              }}
            >
              {row}
            </button>
          );
        },
      },
    },
    {
      name: "",
      label: "Timeline",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (row, data) => {
          return (
            <>
              <div id={styles.actions2}>
                <Tooltip title="Timeline" placement="left">
                  <TrendingUpIcon
                    onClick={() => handleTimeline(row, data)}
                    // data-toggle="modal"
                    // data-target="#exampleModalCenter3"
                  />
                </Tooltip>
              </div>
            </>
          );
        },
      },
    },
    {
      name: "CAN_ID",
      label: "NOTICE PERIOD",
      options: {
        filter: true,
        sort: false,
        display: "none",
      },
    },
  ];



  return (
    <>
      <MiniDrawer header_name="Directory" />
      <div id={styles.directory_table}>
        <div style={{display:"flex",justifyContent:"start",marginTop:"5px",marginBottom:"10px"}}>
        <button type="button" class="btn btn-primary" onClick={()=>navigate("/Admin")}>Back</button>
        </div>
      {USER_GUID==="3559ee6e-4d5d-4bf0-9308-6a6161b3b848"?(<> <MUIDataTable
          title={<h4 style={{ textAlign: "left" }}>Candidate Directory ({position_name})</h4>}
          data={srHr_data}
          columns={columns}
          options={{
            options: options,
            selectableRows: "none",
            viewColumns: false,
            print: false,
            responsive: "standard",
            download: true,
            fixedHeader: true,
            tableBodyMaxHeight: "650px",
            setTableProps: () => {
              return {
                padding: "default",
              };
            },
            // customToolbar: () => {
            //   return (
            //     <button
            //       className="btn btn-primary"
 
            //       onClick={handleClick6}
            //     >
            //       ADD CANDIDATE
            //     </button>
            //   );
            // },
          }}
        /></>):(<>
           <MUIDataTable
          title={<h4 style={{ textAlign: "left" }}>Candidate Directory ({position_name})</h4>}
          data={data}
          columns={columns}
          options={{
            options: options,
            selectableRows: "none",
            viewColumns: false,
            print: false,
            responsive: "standard",
            download: true,
            fixedHeader: true,
            tableBodyMaxHeight: "650px",
            setTableProps: () => {
              return {
                padding: "default",
              };
            },
            customToolbar: () => {
              return (
                <button
                  className="btn btn-primary"
 
                  onClick={handleClick6}
                >
                  ADD CANDIDATE
                </button>
              );
            },
          }}
        />
        </>)}


      </div>

      {/* Side Bar for inprogress ans assigned status */}

      <Drawer
        anchor="right"
        open={openMappingDrawer}
        onClose={toggleDrawer("hrMapping")}
        sx={{ zIndex: "9999" }}
      >
        <Timeline_drawer
          clickEvent={toggleDrawer("hrMapping")}
          timeline={details}
        />
      </Drawer>

      {/* Modal for adding cadidate */}



      {source_data.length>1?<Add_Candidate_Modal
           open={open}
           handleClose={handleClose}
           handleOpen={handleOpen}
           setOpen={setOpen}
           styles={styles}
           collect_info={collect_info}
           handleSubmit={handleSubmit}
           work_ref={work_ref}
           handleWork={handleWork}
           show_exp={show_exp}
           show_work={show_work}
           exp_ref={exp_ref}
           handleExp={handleExp}
           source_data={source_data}
           inputRef={inputRef}
           handleEmailChange={handleEmailChange}
           email={email}
           setCity_Data={setCity_Data}
           setState_Data={setState_Data}
          //  handleChange={handleChange}
          //  error={error}
        />:<></>}

    </>
  );
}

export default Directory;
