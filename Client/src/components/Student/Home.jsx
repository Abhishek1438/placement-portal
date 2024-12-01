import React, { useState } from "react";
import { Card, Button, Typography, Tag, Modal, Row, Col, Spin } from "antd";
import { GlobalOutlined, LinkedinOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const dummyCurrentCompanies = [
  {
    id: "1",
    companyName: "TechCorp",
    website: "https://techcorp.com",
    linkedIn: "https://linkedin.com/company/techcorp",
    jobDesignation: "Software Engineer",
    workLocation: "New York, NY",
    currentProcess: "Technical Interview",
    status: "In Progress",
    aboutCompany:
      "TechCorp is a leading software company specializing in AI and machine learning solutions.",
    jobDescription:
      "We are looking for a talented Software Engineer to join our team and work on cutting-edge projects.",
    eligibilityCriteria:
      "Bachelor's degree in Computer Science, 3+ years of experience in software development.",
  },
  {
    id: "2",
    companyName: "DataSystems Inc.",
    website: "https://datasystems.com",
    linkedIn: "https://linkedin.com/company/datasystems",
    jobDesignation: "Data Analyst",
    workLocation: "San Francisco, CA",
    currentProcess: "Final Round",
    status: "Selected",
    aboutCompany:
      "DataSystems Inc. is a data analytics firm providing insights to Fortune 500 companies.",
    jobDescription:
      "Join our team as a Data Analyst and help transform complex data into actionable insights for our clients.",
    eligibilityCriteria:
      "Master's degree in Statistics or related field, proficiency in SQL and Python.",
  },
];

const dummyCompletedCompanies = [
  {
    id: "3",
    companyName: "CloudNet",
    website: "https://cloudnet.com",
    linkedIn: "https://linkedin.com/company/cloudnet",
    jobDesignation: "Cloud Engineer",
    workLocation: "Seattle, WA",
    status: "Not Selected",
    aboutCompany:
      "CloudNet is a cloud infrastructure provider offering scalable solutions to businesses worldwide.",
    jobDescription:
      "We were seeking a Cloud Engineer to help design and implement robust cloud architectures for our clients.",
    eligibilityCriteria:
      "Bachelor's degree in Computer Science or related field, AWS or Azure certification preferred.",
  },
  {
    id: "4",
    companyName: "SecureNet",
    website: "https://securenet.com",
    linkedIn: "https://linkedin.com/company/securenet",
    jobDesignation: "Cybersecurity Analyst",
    workLocation: "Washington, D.C.",
    status: "Unregistered",
    aboutCompany:
      "SecureNet is a leading cybersecurity firm protecting government and corporate networks.",
    jobDescription:
      "We were looking for a Cybersecurity Analyst to join our team in identifying and mitigating security threats.",
    eligibilityCriteria:
      "Bachelor's degree in Cybersecurity or related field, CISSP certification preferred.",
  },
];

const CompanyCard = ({ company, showStatus = false }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Selected":
        return "success";
      case "In Progress":
        return "processing";
      case "Not Selected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card
      title={company.companyName}
      extra={
        <div>
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: "8px" }}
          >
            <GlobalOutlined />
          </a>
          <a href={company.linkedIn} target="_blank" rel="noopener noreferrer">
            <LinkedinOutlined />
          </a>
        </div>
      }
      actions={[
        <Button key="details" onClick={showModal}>
          Show Details
        </Button>,
      ]}
    >
      <Text strong>{company.jobDesignation}</Text>
      <p>
        <strong>Location:</strong> {company.workLocation}
      </p>
      {showStatus && company.currentProcess && (
        <p>
          <strong>Current Process:</strong> {company.currentProcess}
        </p>
      )}
      {showStatus && company.status && (
        <p>
          <strong>Status:</strong>{" "}
          <Tag color={getStatusColor(company.status)}>{company.status}</Tag>
        </p>
      )}

      <Modal
        title={`${company.companyName} - ${company.jobDesignation}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <div style={{ height: "400px", overflowY: "auto", padding: "20px" }}>
          <div style={{ marginBottom: "20px" }}>
            <Title level={4}>About Company</Title>
            <Text>{company.aboutCompany}</Text>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Title level={4}>Job Description</Title>
            <Text>{company.jobDescription}</Text>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Title level={4}>Eligibility Criteria</Title>
            <Text>{company.eligibilityCriteria}</Text>
          </div>
          {showStatus && company.currentProcess && (
            <div style={{ marginBottom: "20px" }}>
              <Title level={4}>Current Process</Title>
              <Text>{company.currentProcess}</Text>
            </div>
          )}
          {showStatus && company.status && (
            <div>
              <Title level={4}>Status</Title>
              <Tag color={getStatusColor(company.status)}>{company.status}</Tag>
            </div>
          )}
        </div>
      </Modal>
    </Card>
  );
};

const Home = () => {
  // connect to backend

  //   const [currentCompanies, setCurrentCompanies] = useState([]);
  //   const [completedCompanies, setCompletedCompanies] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  //   const [selectedCompany, setSelectedCompany] = useState(null);
  //   const [modalVisible, setModalVisible] = useState(false);

  //   useEffect(() => {
  //     const fetchCompanies = async () => {
  //       try {
  //         // Replace these with actual API calls
  //         const currentResponse = await fetch("/api/current-companies");
  //         const completedResponse = await fetch("/api/completed-companies");

  //         const currentData = await currentResponse.json();
  //         const completedData = await completedResponse.json();

  //         setCurrentCompanies(currentData);
  //         setCompletedCompanies(completedData);
  //         setLoading(false);
  //       } catch (err) {
  //         setError("Failed to fetch companies");
  //         setLoading(false);
  //       }
  //     };

  //     fetchCompanies();
  //   }, []);

  //   const showCompanyDetails = (company) => {
  //     setSelectedCompany(company);
  //     setModalVisible(true);
  //   };

  //   const handleModalClose = () => {
  //     setModalVisible(false);
  //   };

  //   if (loading) {
  //     return (
  //       <div style={{ textAlign: "center", padding: "50px" }}>
  //         <Spin size="large" />
  //       </div>
  //     );
  //   }

  //   if (error) {
  //     return (
  //       <div style={{ textAlign: "center", color: "red" }}>Error: {error}</div>
  //     );
  //   }

  return (
    <div style={{ padding: "24px" }}>
      <section style={{ marginBottom: "48px" }}>
        <Title level={3}>Current Companies</Title>
        <Row gutter={[16, 16]}>
          {dummyCurrentCompanies.map((company) => (
            <Col xs={24} sm={12} lg={8} key={company.id}>
              <CompanyCard company={company} showStatus={true} />
            </Col>
          ))}
        </Row>
      </section>

      <section>
        <Title level={3}>Completed Processes</Title>
        <Row gutter={[16, 16]}>
          {dummyCompletedCompanies.map((company) => (
            <Col xs={24} sm={12} lg={8} key={company.id}>
              <CompanyCard company={company} showStatus={true} />
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default Home;
