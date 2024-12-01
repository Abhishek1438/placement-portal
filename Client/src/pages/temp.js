import { useState } from "react";
import classes from "./Register.module.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import RadioButtonGroup from "./RadioButtonGroup";

const Register = () => {
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    console.log(data);
    setFormData((prevData) => ({ ...prevData, ...data }));
    setForm1(false);
    setForm2(true);
  };

  const form2SubmitHandler = (e) => {
    e.preventDefault();
    const form2Data = {
      lor: e.target[0].value,
      alreadyPlaced: e.target[1].value,
    };
    setFormData((prevData) => ({ ...prevData, ...form2Data }));
    setForm2(false);
    setForm3(true);
  };

  const form3SubmitHandler = async () => {
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3000/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Data saved successfully:", result);
      navigate("/success"); // Redirect on successful submission
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className={classes.loginParentContainer}>
      <div
        className={`${classes.loginChildContainer}  ${
          form3 ? classes.widder : ""
        }`}
      >
        <div className={classes.icon}></div>
        <h2 className={classes.welcomeMessage}>Placement Registration Form</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={!form1 ? classes.displayNone : ""}
        >
          <label>Roll No.</label>
          <input
            type="text"
            {...register("RollNo", {
              required: true,
              pattern: /^S(?:20[2-4][1-9]|204[0-0])00[1-3]0[0-9]{3}$/,
            })}
            className={errors.RollNo ? classes.error : ""}
          ></input>
          <label>Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            style={{ textTransform: "capitalize" }}
          ></input>
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern:
                /^^[a-zA-Z]+\.[a-zA-Z]{1}[2-4][0-9]@(?:iiits\.in|IIITS\.IN)$/,
            })}
            style={{ textTransform: "lowercase" }}
            className={errors.email ? classes.error : ""}
          ></input>
          <label>Phone No.</label>
          <input
            type="number"
            {...register("phoneNo", {
              required: true,
              pattern: /^[6789]\d{9}$/,
            })}
            className={errors.phoneNo ? classes.error : ""}
          ></input>
          <label>CGPA</label>
          <input
            type="number"
            {...register("cgpa", { required: true, max: 10, min: 0 })}
            className={errors.cgpa ? classes.error : ""}
          ></input>
          <label>Gender</label>
          <select {...register("gender", { required: true })}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label>Branch</label>
          <select {...register("branch", { required: true })}>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
          </select>
          <label>I want to register for Campus Placements</label>
          <select {...register("wantToRegister", { required: true })}>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
          <button type="submit">Continue</button>
          <Link to="/login">
            <p className={classes.alreadyAccount}>Already have an account?</p>
          </Link>
        </form>

        <form className={!form2 ? classes.displayNone : ""}>
          <label>
            Are you planning to opt for LOR? If yes, you do not have to fill the
            remaining form as you are not eligible for placements.
          </label>
          <select name="lor">
            <option value="NO">NO</option>
            <option value="YES">YES</option>
          </select>
          <label>
            Are you already Placed (on-campus or off-campus)? If yes, you do not
            have to fill the remaining form as you are not eligible for
            placements.
          </label>
          <select name="already-placed">
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
          <button type="button" onClick={form2SubmitHandler}>
            Continue
          </button>
        </form>

        <form className={!form3 ? `${classes.displayNone}` : classes.form3}>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand that I will lose my placement eligibility if I do not
              clear the Placement Eligibility Test.
            </p>
            <RadioButtonGroup category="a" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand that I need to read the expression of interest
              carefully and understand it properly and I need to request any
              doubts before registering for company process. Any doubts
              regarding location, bond, package, salary structure, position
              should be requested before registering using the link for
              expression of interest.
            </p>
            <RadioButtonGroup category="b" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand that when I enter my details in the Excel Sheet
              circulated from the Placement Office that I am genuinely
              interested in the company. I understand that I will lose my
              placement eligibility if I enter details in the Excel sheet and do
              not participate in the process.
            </p>
            <RadioButtonGroup category="c" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand that I will lose my placement eligibility status if I
              intentionally enter incorrect details in the Excel Sheet. I will
              make sure my resume contains the correct CGPA and contains all
              other accurate details (In case of any doubt of my CGPA
              calculation, I will check with the academic office).
            </p>
            <RadioButtonGroup category="d" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand that if I enter incorrect information unintentionally
              and the placement office will not be responsible if I am not
              shortlisted for further process. For example, if I enter my Email
              incorrectly, CGPA incorrectly, etc.
            </p>
            <RadioButtonGroup category="e" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              {" "}
              I understand that if I am registering for placements and if I do
              not sit for multiple companies in a row I may lose placement
              eligibility.
            </p>
            <RadioButtonGroup category="f" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand that I will lose my placement eligibility if I do
              some malpractice, e.g., copying in tests.
            </p>
            <RadioButtonGroup category="g" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand that there can be some unexpected behavior in the
              test platform that when I am writing tests for some companies. I
              understand that the placement office is not responsible for any
              such event happening on the platform.
            </p>
            <RadioButtonGroup category="h" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              {" "}
              I understand that I will lose my placement eligibility if I
              negotiate for CTC package during the interview process with the
              company personnel.
            </p>
            <RadioButtonGroup category="i" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand that the Students should not get clarity from Hiring
              Managers or HR regarding the above mentioned details (CTC, etc.,)
              during the technical round and general interview process. Students
              can ask HRs and technical managers points not mentioned in the
              expression of interest in a positive manner.
            </p>
            <RadioButtonGroup category="j" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand that I will lose my placement eligibility if I
              negotiate for bond process and other non-monetary aspects during
              the interview.
            </p>
            <RadioButtonGroup category="k" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand that If a student has received an offer during the
              on-campus placements, the student must accept the job offer.
            </p>
            <RadioButtonGroup category="l" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand that I will lose my placement eligibility if I am
              placed off-campus.
            </p>
            <RadioButtonGroup category="m" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand that if I am participating in multiple drives at the
              same time, then as soon I get a first offer (in the form of an
              email from the company and not necessarily the offer letter) I
              will have to quit all other drives. I understand that if company A
              and company B have completed the process, and if company A
              declares the result first, I will not be eligible for company B
              and I do not have any choice.
            </p>
            <RadioButtonGroup category="n" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand that the institute is not responsible for any after
              placement actions a company does including the following: If a
              company withdraws the job offer at a later date, reduces the pay
              package of the initial offer, changes the job description of the
              student after he joins, and so on.
            </p>
            <RadioButtonGroup category="o" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand that I will lose my placement eligibility as soon as
              I get placed in a company.
            </p>
            <RadioButtonGroup category="p" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand the placement policies are subject to change and the
              institute has the authority to change the policy and announce it
              to students without due notice.
            </p>
            <RadioButtonGroup category="q" options={["Yes", "No"]} />
          </label>
          <label className={classes.radioButtonContainer}>
            <p>
              I understand that for any conflict the decision of the competent
              authority is final.
            </p>
            <RadioButtonGroup category="r" options={["Yes", "No"]} />
          </label>

          <label className={classes.remarks}>Remarks</label>
          <input type="text" name="remarks"></input>
          <button type="button" onClick={form3SubmitHandler}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
