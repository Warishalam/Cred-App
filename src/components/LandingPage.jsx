import React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/Basic_info.module.css"
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
import { useRef } from "react";
function Basic_info() {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({})
  const [Fname, setFName] = useState("")
  const [Mname, setMname] = useState("")
  const [Lname, setLname] = useState("")
  const [dateOfB, setDateOfB] = useState("")
  const [homeTown, setHomeTown] = useState("")
  const [Resident, setResident] = useState("")
  const [pin, setPim] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [materialStatus, setMaterialStatus] = useState("")
  const [bloodGroup, setBlooddGroup] = useState("")
  const [gender, setGender] = useState("")
  const [mobileN, setMobileN] = useState("")
  const [positionAppliedF, setPositionAppliedF] = useState("")
  // const[refrence,setRefrence]=useState(data[0]?.REFERENCE)
  const [howdidyouknowthisPosition, setHowDidYouKnowThisPosition] = useState("")
  const [parentN, setParentN] = useState("")
  const [relation, setRelation] = useState("")
  const [familyOccup, setFamilyOccup] = useState("")

  const [basic, setBasic] = useState([])
  const [applied, setApplied] = useState([])
  const storage = window.sessionStorage;
  const [state_data, setState_data] = useState([])
  const [city_data, setCity_data] = useState([])
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedLastName=Lname.trim()
    const trimmedPinCode=pin.trim()
    const trimmedParentName = parentN.trim();
    if(!trimmedParentName|| !trimmedLastName|| 
      !trimmedPinCode ){
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Please All Fields Are Required",
      });
    }
    else{
      candidate_personal(formData)
    }
  }
  const handleChange = (e) => {
    let inputName = e.target.name

    setFormData({
      ...formData,
      [inputName]: e.target.value,
      "FirstName": Fname,
      "ConatctNumber": mobileN,
      "ResidentialAddress": Resident,
      "state": state,
      "city":city
    })
  }
  const candidate_personal = async () => {
    try {
      const res = await fetch(`http://beta-hire.equinoxlab.com/api/Master.svc/insert_candidate_personal_data`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "FIRSTNAME": Fname,
            "MIDDLENAME": Mname,
            "LASTNAME": Lname,
            "DATE_OF_BIRTH": dateOfB,
            "HOMETOWN": homeTown,
            "RESIDENTIAL_ADDRESS": Resident,
            "PIN": pin,
            "CITY": city,
            "STATE": state,
            "MARITAL_STATUS": materialStatus,
            "BLOOD_GROUP": bloodGroup,
            "GENDER": gender,
            "CAN_ID": id,
            "MOBILE": mobileN,
            "POSITION_APPLIED_FOR": positionAppliedF,
            "REFERENCE": howdidyouknowthisPosition,
            "PARENT_NAME": parentN,
            "RELATION": relation,
            "OCCUPATION": familyOccup,
          }),
        })
      let data = await res.json()
      basic_getInfo()
      setData(data.data)
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 500,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Successfully Added",
      });
    } catch (error) {
      console.log(error)
    }
  }

  const get_Position_applied = async () => {
    try {
      let res = await fetch(`http://beta-hire.equinoxlab.com/api/Master.svc/name_of_the_position/all`)
      let data = await res.json()
      setApplied(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    get_Position_applied()
  }, [])

  const basic_getInfo = async () => {
    try {
      let res = await fetch(`http://beta-hire.equinoxlab.com/api//Master.svc/get_candidate_personal_data/${id}`)
      let data = await res.json()
      setData(data.data)
      setFName(data?.data?.[0].FIRSTNAME)
      setMobileN(data?.data?.[0].MOBILE)
      setResident(data?.data?.[0].RESIDENTIAL_ADDRESS)
      setState(data?.data?.[0].STATE)
      console.log(data?.data?.[0].STATE)
      setCity(data?.data?.[0].CITY)
      console.log(data?.data?.[0].CITY)
      setMaterialStatus(data?.data?.[0].MARITAL_STATUS)
      setGender(data?.data?.[0].GENDER)
      setPositionAppliedF(data?.data?.[0].POSITION_APPLIED_FOR)
      setRelation(data?.data?.[0].RELATION)
      setParentN(data?.data?.[0].PARENT_NAME)
      setRelation(data?.data?.[0].RELATION)
      setFamilyOccup(data?.data?.[0].OCCUPATION)
      setBlooddGroup(data?.data?.[0].BLOOD_GROUP)
      setMname(data?.data?.[0].MIDDLENAME)
      setLname(data?.data?.[0].MIDDLENAME)
      setDateOfB(data?.data?.[0].DATE_OF_BIRTH)
      setHomeTown(data?.data?.[0].HOMETOWN)
      setPim(data?.data?.[0].PIN)
      setHowDidYouKnowThisPosition(data?.data?.[0].REFERENCE)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    basic_getInfo()
  }, [])

  const get_state = async () => {
    try {
      let res = await fetch(`https://orion.equinoxlab.com/api/Address.svc/Get_STATE_Dropdown`)
      let data = await res.json()
      setState_data(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    get_state()
  }, [])

  const get_city = async (state_data) => {
    try {
      let res = await fetch(`https://orion.equinoxlab.com/api/Address.svc/Get_CITY_Dropdown/${state}`)
      let data = await res.json()
      setCity_data(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleState = (e) => {
    setState(e.target.value)
    // console.log(e.target.value)
    get_city(e.target.value)
  }

  useEffect(()=>{
    get_city(state) 
  },[state])
  return (
    <div id={styles.main_page}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", marginLeft: "-11px" }} classsName="row">
          <div className="col-4 b-4" style={{ textAlign: "left", marginTop: "8px" }}>
            <label htmlFor="" style={{ color: "gray" }}>Position Applied For <span style={{ color: "red" }}>*</span></label>
            <select class="form-control" aria-label="Default select example" defaultValue={positionAppliedF} name="PositionApplied" onChange={(e) => setPositionAppliedF(e.target.value)} required>
              <option value={positionAppliedF}>{positionAppliedF}</option>
              {
                applied?.map((ele) => (
                  <>
                    <option value={ele.NAME_OF_THE_POSITION} style={{ display: data?.data?.[0].POSITION_APPLIED_FOR === ele.NAME_OF_THE_POSITION ? "none" : "block" }}>{ele.NAME_OF_THE_POSITION}</option>
                  </>
                ))
              }
            </select>
          </div>
          <div className="col-4 b-4" style={{ textAlign: "left", marginTop: "8px" }}>
            <label htmlFor="" style={{ color: "gray" }}>How Did You Know About This Position</label>
            <input type="text" name="HowDidYouKnowthisPosition" defaultValue={howdidyouknowthisPosition} className="form-control" onChange={(e) => setHowDidYouKnowThisPosition(e.target.value)} />
          </div>
          <div className="col-4 b-4" style={{ textAlign: "left", marginTop: "8px" }}>
            <label htmlFor="" style={{ color: "gray" }}>Contact Number <span id={styles.mandotry}>*</span> </label>
            <input type="number" defaultValue={mobileN} className="form-control" onChange={(e) => setMobileN(e.target.value)} required
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex" }} className="row">
          <div className="col-4 b-4" style={{ textAlign: "left", marginTop: "8px" }}>
            <label style={{ color: "gray" }}>First Name <span id={styles.mandotry}>*</span></label>
            <input type="text" required defaultValue={Fname} className="form-control" onChange={(e) => setFName(e.target.value)} />
          </div>
          <div className="col-4 b-4" style={{ textAlign: "left", marginTop: "8px" }}>
            <label style={{ color: "gray" }}>Middle Name</label>
            <input type="text" name="middleName" defaultValue={Mname} className="form-control" onChange={(e) => setMname(e.target.value)} />
          </div>
          <div className="col-4 b-4" style={{ textAlign: "left", marginTop: "8px" }}>
            <label style={{ color: "gray" }}>Last Name <span id={styles.mandotry}>*</span></label>
            <input type="text" required name="LastName" defaultValue={Lname} className="form-control" onChange={(e) => setLname(e.target.value)} />
          </div>
        </div>
        <div style={{ display: "flex" }} className="row">
          <div className="col-4" style={{ textAlign: "left", marginTop: "8px" }}>
            <label htmlFor="" style={{ color: "gray" }}>Date Of Birth<span id={styles.mandotry}>*</span></label>
            <input type="date" required name="DateofBirth" defaultValue={dateOfB} className="form-control" onChange={(e) => setDateOfB(e.target.value)} />
          </div>
          <div className="col-4" style={{ textAlign: "left", marginTop: "8px" }}>
            <label htmlFor="" style={{ color: "gray" }}>Home Town</label>
            <input type="text" name="HomeTown" defaultValue={homeTown} className="form-control" onChange={(e) => setHomeTown(e.target.value)} />
          </div>

          <div className="col-4" style={{ textAlign: "left", marginTop: "8px" }}>
            <label htmlFor="" style={{ color: "gray" }}>Residential Address <span id={styles.mandotry}>*</span></label>
            <textarea className="form-control" defaultValue={Resident} required
              style={{ height: "39px",resize: "none" }}
              onChange={(e) => setResident(e.target.value)} />
          </div>
        </div>

        <div style={{ display: "flex" }} className="row">
          <div className="col-4" style={{ textAlign: "left", marginTop: "8px" }}>
            <label htmlFor="" style={{ color: "gray" }}>State<span id={styles.mandotry}>*</span> </label>
            {/* <input type="text" className="form-control" defaultValue={state}  onChange={(e)=>setState(e.target.value)} required/> */}
            <select class="form-control" aria-label="Default select example" defaultValue={state} onChange={handleState} required>
              {state_data?.map((ele, id) => (
                <>
                  {state == ele.id ? <option value={ele.id} selected> {ele.text}</option> : <option value={ele.id} > {ele.text}</option>}
                </>
              ))}
            </select>
          </div>
          <div className="col-4" style={{ textAlign: "left", marginTop: "8px" }}>
            <label htmlFor="" style={{ color: "gray" }}>City<span id={styles.mandotry}>*</span> </label>
            {/* <input type="text" className="form-control" defaultValue={city} name="City" onChange={(e)=>setCity(e.target.value)} required/> */}
            <select className="form-control" aria-label="Default select example" defaultValue={city} name="City" onChange={(e) => setCity(e.target.value)} required>
              {city_data?.map((ele, id) => (
                <>
                  {city == ele.id ? <option value={ele.id} selected>{ele.text}</option> : <option value={ele.id}>{ele.text}</option>}
                </>
              ))}
            </select>
          </div>
          <div className="col-4" style={{ textAlign: "left", marginTop: "8px" }}>
            <label htmlFor="" style={{ color: "gray" }}>Pin <span id={styles.mandotry}>*</span></label>
            <input type="number" className="form-control" defaultValue={pin} name="Pin" onChange={(e) => setPim(e.target.value)}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 6);
              }}
              required />
          </div>
        </div>
        <div style={{ display: "flex" }} className="row">
          <div className="col-4" style={{ textAlign: "left", marginTop: "8px" }}>
            {" "}
            <label htmlFor="" style={{ color: "gray" }}>Marital Status<sapn id={styles.mandotry}>*</sapn></label>
            <select name="MaritalStatus" id="" className="form-control"
              defaultValue={materialStatus}
              onChange={(e) => setMaterialStatus(e.target.value)} required>
              <option selected value={materialStatus}>{materialStatus}</option>
              <option value="Married" style={{ display: materialStatus == "Married" ? "none" : "block" }}>Married</option>
              <option value="Unmarried" style={{ display: materialStatus == "Unmarried" ? "none" : "block" }}>Unmarried</option>
              <option value="Prefer not to say" style={{ display: materialStatus == "Prefer not to say" ? "none" : "block" }}>Prefer not to say</option>
            </select>
          </div>
          <div className="col-4" style={{ textAlign: "left", marginTop: "8px" }}>
            {" "}
            <label htmlFor="" style={{ color: "gray" }}>Blood Group</label>
            <input type="text" name="BloodGroup" defaultValue={bloodGroup} className="form-control" onChange={(e) => setBlooddGroup(e.target.value)} />
          </div>
          <div className="col-4" style={{ textAlign: "left", marginTop: "8px" }}>
            {" "}
            <label htmlFor="" style={{ color: "gray" }}>Gender<span id={styles.mandotry}>*</span></label>
            <select name="Gender" id="" className="form-control" defaultValue={gender} onChange={(e) => setGender(e.target.value)} required>
              <option selected value={gender}>{gender}</option>
              <option value="Male" style={{ display: gender == "Male" ? "none" : "block" }}>Male</option>
              <option value="Female" style={{ display: gender == "Female" ? "none" : "block" }}>Female</option>
              <option value="Other" style={{ display: gender == "Other" ? "none" : "block" }}>Other</option>
            </select>
          </div>
        </div>
        <h5 style={{ textAlign: "center", marginTop: "20px" }}>Family Details</h5>
        <div className="row" style={{ display: "flex" }}>
          <div className="col-4" style={{ textAlign: "left" }}>
            <label htmlFor="" style={{ color: "gray" }}>Name <span id={styles.mandotry}>*</span></label>
            <input type="text" name="family" className="form-control" defaultValue={parentN} onChange={(e) => setParentN(e.target.value)} required />
          </div>
          <div className="col-4" style={{ textAlign: "left" }}>
            <label htmlFor="" style={{ color: "gray" }}>Relation</label>
            <input type="text" name="familyRelation" defaultValue={relation} className="form-control" onChange={(e) => setRelation(e.target.value)} />
          </div>
          <div className="col-4" style={{ textAlign: "left" }}>
            <label htmlFor="" style={{ color: "gray" }}>Occupation</label>
            <input type="text" name="familyoccupation" defaultValue={familyOccup} className="form-control" onChange={(e) => setFamilyOccup(e.target.value)} />
          </div>
        </div>
        <button type="submit" class="btn btn-primary" id={styles.SubmitButton}>Submit</button>
      </form>
    </div>
  );
}

export default Basic_info;
