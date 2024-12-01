import React, { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Select, Typography, Button, Input, Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import classes from "./ExpressOfInterest.module.css";
import axios from "axios";
import { server } from "../constants/config";
import { useLocation } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const ExpressOfInterest = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const location = useLocation();
  const [selectedCompany, setSelectedCompany] = useState(location.state);
  const [companyData, setCompanyData] = useState([]);
  const editor = useRef(null);
  // console.log(selectedCompany);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${server}/admin/jobnotification`);
      try {
        // console.log(response);
        setCompanyData(response.data.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  // const companyData = {
  //   "NextGen Solutions": {
  //     companyName: "NextGen Solutions",
  //     website: "https://www.nextgensolutions.com",
  //     linkedIn: "https://linkedin.com/company/nextgen-solutions",
  //     address: "456 Innovation Drive, Tech City",
  //     workLocation: "On-Site",
  //     jobDesignation: "Data Scientist",
  //     typeOfEmployment: "Part-Time",
  //     eligibilityCriteria: "M.Sc in Data Science",
  //     applicableBranch: "Data Science",
  //     stipend: "$3000",
  //     ctc: "$80,000",
  //     otherBenefits: "Flexible Hours",
  //     bond: "None",
  //     jobDescription: "Analyze and interpret complex data sets.",
  //     aboutCompany: "A dynamic company specializing in data analytics.",
  //     selectionProcess: "Technical Round, HR Round",
  //     contactName: "Jane Smith",
  //     contactDesignation: "Recruiter",
  //     contactEmail: "recruitment@nextgensolutions.com",
  //     contactMobile: "+0987654321",
  //   },
  //   // Add more companies here
  // };

  const handleCompanyChange = (value) => {
    const company = companyData[value];
    setSelectedCompany(company);
  };

  useEffect(() => {
    const company = selectedCompany;
    if (company) {
      setSubject(
        `${company.companyName}_EOI for ${company.jobDesignation} by 03rd September 2024`
      );

      // Auto-generate the content
      setContent(`
        Dear Student,
        \nGreetings of the day!!
        \n\n${company.companyName} has shown interest to hire students for the ${company.jobDesignation} position.
        \nPlease see the details below and fill in your academic information by the deadline.
        \n\nJob description:
        \n\n<table>
          <tr><td><b>Company Name:</b></td><td>${company.companyName}</td></tr>
          <tr><td><b>Website:</b></td><td><a href="${company.website}">${company.website}</a></td></tr>
          <tr><td><b>LinkedIn Link:</b></td><td><a href="${company.linkedIn}">${company.linkedIn}</a></td></tr>
          <tr><td><b>Address:</b></td><td>${company.address}</td></tr>
          <tr><td><b>Work Location:</b></td><td>${company.workLocation}</td></tr>
          <tr><td><b>Job Designation:</b></td><td>${company.jobDesignation}</td></tr>
          <tr><td><b>Type Of Employment:</b></td><td>${company.typeOfEmployment}</td></tr>
          <tr><td><b>Eligibility Criteria:</b></td><td>${company.eligibilityCriteria}</td></tr>
          <tr><td><b>Applicable Branch:</b></td><td>${company.applicableBranch}</td></tr>
          <tr><td><b>Stipend:</b></td><td>${company.stipend}</td></tr>
          <tr><td><b>CTC:</b></td><td>${company.ctc}</td></tr>
          <tr><td><b>Other Benefits:</b></td><td>${company.otherBenefits}</td></tr>
          <tr><td><b>Bond:</b></td><td>${company.bond}</td></tr>
          <tr><td><b>Job Description:</b></td><td>${company.jobDescription}</td></tr>
          <tr><td><b>Selection Process:</b></td><td>${company.selectionProcess}</td></tr>
          <tr><td><b>Contact Name:</b></td><td>${company.contactName}</td></tr>
          <tr><td><b>Contact Email:</b></td><td>${company.contactEmail}</td></tr>
          <tr><td><b>Contact Mobile:</b></td><td>${company.contactMobile}</td></tr>
        </table>
        \n\nThanks & Regards,
        \n[Your Name]
        \nSenior Training & Placement Officer
      `);
    }
  }, [selectedCompany]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("content", content);

    // Handle file upload and other form data
    // console.log(subject, content);
  };
  // console.log(companyData);

  return (
    <div className={classes.container}>
      <Title level={2}>Send Express Of Interest</Title>

      <Form
        className={classes.eoiForm}
        onSubmit={handleSubmit}
        layout="vertical"
      >
        <Form.Item label="Company">
          <Select
            placeholder="Select a Company"
            onChange={handleCompanyChange}
            value={selectedCompany ? selectedCompany.companyName : null}
          >
            {companyData.map((company, index) => (
              <Option key={index} value={index}>
                {company.companyName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Subject">
          <Input
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Content">
          <JoditEditor
            ref={editor}
            value={content}
            config={{
              readonly: false,
              placeholder: "Create Express of Interest",
              minHeight: 300,
              toolbarButtonSize: "small",
            }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </Form.Item>

        <Form.Item label="Attach Files">
          <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={handleSubmit}
            className={classes.submitButton}
          >
            Send EOI
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ExpressOfInterest;
