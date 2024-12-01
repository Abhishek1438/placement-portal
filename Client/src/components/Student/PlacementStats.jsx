import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Modal,
  Typography,
  Row,
  Col,
  Spin,
  Tag,
  Statistic,
} from "antd";
import {
  GlobalOutlined,
  LinkedinOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title, Text, Paragraph } = Typography;

const PlacementStats = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [ongoingCompanies, setOngoingCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await fetchSelectedStudents();
        const companiesResponse = await fetchOngoingCompanies();

        setSelectedStudents(studentsResponse.data);
        setOngoingCompanies(companiesResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchSelectedStudents = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 1, name: "John Doe", company: "Tech Corp", ctc: "15 LPA" },
            {
              id: 2,
              name: "Jane Smith",
              company: "Innovate Inc",
              ctc: "18 LPA",
            },
            {
              id: 3,
              name: "Bob Johnson",
              company: "Future Systems",
              ctc: "20 LPA",
            },
            {
              id: 4,
              name: "Alice Williams",
              company: "Data Dynamics",
              ctc: "17 LPA",
            },
            {
              id: 5,
              name: "Charlie Brown",
              company: "Tech Innovators",
              ctc: "22 LPA",
            },
            {
              id: 6,
              name: "David Miller",
              company: "Cloud Solutions",
              ctc: "19 LPA",
            },
            {
              id: 7,
              name: "Eva Garcia",
              company: "AI Research",
              ctc: "21 LPA",
            },
            {
              id: 8,
              name: "Frank Wilson",
              company: "Cyber Security Ltd",
              ctc: "16 LPA",
            },
            {
              id: 9,
              name: "Grace Lee",
              company: "FinTech Innovations",
              ctc: "23 LPA",
            },
            {
              id: 10,
              name: "Henry Taylor",
              company: "Mobile App Devs",
              ctc: "18 LPA",
            },
          ],
        });
      }, 1000);
    });
  };

  const fetchOngoingCompanies = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 1,
              companyName: "Tech Innovators",
              jobDesignation: "Software Engineer",
              currentProcess: "Technical Interview",
              eligibilityCriteria: "CGPA > 8.0",
              selectedStudents: [
                { id: 1, name: "Alice Williams", cgpa: 8.5 },
                { id: 2, name: "Charlie Brown", cgpa: 8.7 },
                { id: 3, name: "Eva Garcia", cgpa: 8.2 },
              ],
            },
            {
              id: 2,
              companyName: "Data Dynamics",
              jobDesignation: "Data Analyst",
              currentProcess: "HR Round",
              eligibilityCriteria: "CGPA > 7.5",
              selectedStudents: [
                { id: 4, name: "David Miller", cgpa: 7.8 },
                { id: 5, name: "Frank Wilson", cgpa: 7.9 },
              ],
            },
            {
              id: 3,
              companyName: "Cloud Solutions",
              jobDesignation: "Cloud Architect",
              currentProcess: "Technical Assessment",
              eligibilityCriteria: "CGPA > 8.5",
              selectedStudents: [
                { id: 6, name: "Grace Lee", cgpa: 8.8 },
                { id: 7, name: "Henry Taylor", cgpa: 8.6 },
              ],
            },
            {
              id: 4,
              companyName: "AI Research",
              jobDesignation: "Machine Learning Engineer",
              currentProcess: "Coding Round",
              eligibilityCriteria: "CGPA > 9.0",
              selectedStudents: [{ id: 8, name: "Ivy Chen", cgpa: 9.2 }],
            },
            {
              id: 5,
              companyName: "Cyber Security Ltd",
              jobDesignation: "Security Analyst",
              currentProcess: "Group Discussion",
              eligibilityCriteria: "CGPA > 7.0",
              selectedStudents: [
                { id: 9, name: "Jack Robinson", cgpa: 7.5 },
                { id: 10, name: "Kate Murphy", cgpa: 7.7 },
                { id: 11, name: "Liam Davis", cgpa: 7.3 },
              ],
            },
          ],
        });
      }, 1000);
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "CTC",
      dataIndex: "ctc",
      key: "ctc",
    },
  ];

  const showCompanyDetails = (company) => {
    setSelectedCompany(company);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>Error: {error}</div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Placement Statistics</Title>

      <Title level={3} style={{ marginTop: "24px" }}>
        Ongoing Recruitment Processes
      </Title>
      <Row gutter={[16, 16]}>
        {ongoingCompanies.map((company) => (
          <Col xs={24} sm={12} lg={8} key={company.id}>
            <Card
              hoverable
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              bodyStyle={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              <Title level={4}>{company.companyName}</Title>
              <Paragraph>
                <Text strong>Role:</Text> {company.jobDesignation}
              </Paragraph>
              <Paragraph>
                <Text strong>Current Process:</Text> {company.currentProcess}
              </Paragraph>
              <Paragraph>
                <Text strong>Eligibility:</Text> {company.eligibilityCriteria}
              </Paragraph>
              <div style={{ marginTop: "auto" }}>
                <Statistic
                  title="Students Selected"
                  value={company.selectedStudents.length}
                  prefix={<UserOutlined />}
                  style={{ marginBottom: "16px" }}
                />
                <Button
                  type="primary"
                  onClick={() => showCompanyDetails(company)}
                  block
                >
                  View Details
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={3} style={{ marginTop: "24px" }}>
        Selected Students
      </Title>
      <Table columns={columns} dataSource={selectedStudents} rowKey="id" />

      <Modal
        title={`${selectedCompany?.companyName} - Selected Students`}
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={600}
      >
        {selectedCompany && (
          <Table
            dataSource={selectedCompany.selectedStudents}
            columns={[
              { title: "Name", dataIndex: "name", key: "name" },
              { title: "CGPA", dataIndex: "cgpa", key: "cgpa" },
            ]}
            rowKey="id"
          />
        )}
      </Modal>
    </div>
  );
};

export default PlacementStats;
