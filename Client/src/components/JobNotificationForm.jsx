import { useState } from "react";
import classes from "./JobNotificationForm.module.css";
import Banner from "./Banner";

const JobNotificationForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    linkedIn: "",
    address: "",
    workLocation: "",
    jobDesignation: "",
    typeOfEmployment: "",
    eligibilityCriteria: "",
    applicableBranch: "",
    stipend: "",
    ctc: "",
    otherBenefits: "",
    bond: "",
    jobDescription: "",
    aboutCompany: "",
    selectionProcess: "",
    contactName: "",
    contactDesignation: "",
    contactEmail: "",
    contactMobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/admin/jobnotification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      // console.log("Success:", result);

      // Optionally, you can clear the form or handle success here
      setFormData({
        companyName: "",
        website: "",
        linkedIn: "",
        address: "",
        workLocation: "",
        jobDesignation: "",
        typeOfEmployment: "",
        eligibilityCriteria: "",
        applicableBranch: "",
        stipend: "",
        ctc: "",
        otherBenefits: "",
        bond: "",
        jobDescription: "",
        aboutCompany: "",
        selectionProcess: "",
        contactName: "",
        contactDesignation: "",
        contactEmail: "",
        contactMobile: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={classes.container}>
      <Banner />
      <h3>Job Notification Form</h3>
      <form onSubmit={handleSubmit}>
        <div className={classes.gridSpan4}>
          <p>Company Name</p>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
        <div className={classes.gridSpan4}>
          <p>Website</p>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div className={classes.gridSpan4}>
          <p>LinkedIn</p>
          <input
            type="text"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleChange}
          />
        </div>
        <div className={classes.gridSpan4}>
          <p>Address</p>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className={classes.gridSpan4}>
          <p>Work Location</p>
          <input
            type="text"
            name="workLocation"
            value={formData.workLocation}
            onChange={handleChange}
          />
        </div>

        <div className={classes.gridSpan2}>
          <p>Job Designation</p>
          <input
            type="text"
            name="jobDesignation"
            value={formData.jobDesignation}
            onChange={handleChange}
          />
        </div>
        <div className={classes.gridSpan2}>
          <p>Type Of Employment</p>
          <input
            type="text"
            name="typeOfEmployment"
            value={formData.typeOfEmployment}
            onChange={handleChange}
          />
        </div>
        <div className={classes.gridSpan3}>
          <p>Eligibility Criteria</p>
          <input
            type="text"
            name="eligibilityCriteria"
            value={formData.eligibilityCriteria}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Applicable Branch</p>
          <input
            type="text"
            name="applicableBranch"
            value={formData.applicableBranch}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Stipend</p>
          <input
            type="text"
            name="stipend"
            value={formData.stipend}
            onChange={handleChange}
          />
        </div>

        <div>
          <p>CTC</p>
          <input
            type="text"
            name="ctc"
            value={formData.ctc}
            onChange={handleChange}
          />
        </div>
        <div className={classes.gridSpan4}>
          <p>Other Benefits</p>
          <input
            type="text"
            name="otherBenefits"
            value={formData.otherBenefits}
            onChange={handleChange}
          />
        </div>
        <div className={classes.gridSpan4}>
          <p>Bond if any</p>
          <input
            type="text"
            name="bond"
            value={formData.bond}
            onChange={handleChange}
          />
        </div>
        <div className={classes.gridSpan4}>
          <p>Job Description</p>
          <input
            type="text"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
          />
        </div>
        <div className={classes.gridSpan4}>
          <p>About the Company</p>
          <input
            type="text"
            name="aboutCompany"
            value={formData.aboutCompany}
            onChange={handleChange}
          />
        </div>
        <div className={classes.gridSpan4}>
          <p>Selection Process</p>
          <input
            type="text"
            name="selectionProcess"
            value={formData.selectionProcess}
            onChange={handleChange}
          />
        </div>

        <div className={classes.gridSpan2}>
          <p>Company Contact Name</p>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
          />
        </div>
        <div className={classes.gridSpan2}>
          <p>Company Contact Designation</p>
          <input
            type="text"
            name="contactDesignation"
            value={formData.contactDesignation}
            onChange={handleChange}
          />
        </div>
        <div className={classes.gridSpan2}>
          <p>Company Contact Email ID</p>
          <input
            type="text"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
          />
        </div>
        <div className={classes.gridSpan2}>
          <p>Company Contact Mobile Number</p>
          <input
            type="text"
            name="contactMobile"
            value={formData.contactMobile}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobNotificationForm;
