import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Directory from "./Directory";
import Basic_info from "../Candidate_form_units/Basic_info";
import Educational_details from "../Candidate_form_units/Educational_details";
import Company_exp from "../Candidate_form_units/Company_exp";
import Certification from "../Candidate_form_units/Certification";
import Family_details from "../Candidate_form_units/Family_details";
import MiniDrawer from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const steps = [
  "Basic Information",
  "Educational Information",
  "Experience",
  "Certification",
  "Other Details",
];
const pages = [
  <Basic_info />,
  <Educational_details />,
  <Company_exp />,
  <Certification />,
  <Family_details />,
];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const navigate = useNavigate();
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <>
      {/* <MiniDrawer /> */}
      <Box sx={{ width: "80%", margin: "auto", marginTop: "4%px" }}>
      <div style={{display:"flex",justifyContent:"start",marginTop:"20px",marginBottom:"2%"}}>
        {/* <button type="button" class="btn btn-primary" onClick={()=>navigate("/Candidate_database")}>Back</button> */}
        </div>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button  variant="contained" onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div style={{ height: "30%" }}>
                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                  {/* Step {activeStep + 1} */}
                  {pages[activeStep]}
                </Typography>
              </div>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button  variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "inline-block" }}
                    >
                      Step {activeStep + 1} already completed
                      {/* {pages[activeStep+1]} */}
                    </Typography>
                  ) : (
                    <Button  variant="contained" onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Save"}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </>
  );
}
