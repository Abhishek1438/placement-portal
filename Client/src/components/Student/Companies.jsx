import React, { useEffect, useState } from "react";
import {
  Card,
  Pagination,
  Button,
  Typography,
  Modal,
  Row,
  Col,
  Spin,
  Tag,
} from "antd";
import { GlobalOutlined, LinkedinOutlined } from "@ant-design/icons";
import axios from "axios";

const { Text, Title } = Typography;

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const pageSize = 6;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/jobnotification"
        );
        setCompanies(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showCompanyDetails = (company) => {
    setSelectedCompany(company);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentCompanies = companies.slice(startIndex, startIndex + pageSize);

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
      <Title level={2}>Available Job Opportunities</Title>
      <Row gutter={[16, 16]}>
        {currentCompanies.map((company) => (
          <Col xs={24} sm={12} lg={8} key={company.id}>
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
                  <a
                    href={company.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinOutlined />
                  </a>
                </div>
              }
              actions={[
                <Button
                  type="primary"
                  onClick={() => showCompanyDetails(company)}
                >
                  View Details
                </Button>,
              ]}
            >
              <div style={{ marginBottom: "12px" }}>
                <Tag color="blue">{company.typeOfEmployment}</Tag>
                <Tag color="green">₹{company.ctc}</Tag>
              </div>
              <p>
                <Text strong>Role:</Text> {company.jobDesignation}
              </p>
              <p>
                <Text strong>Location:</Text> {company.workLocation}
              </p>
              <p>
                <Text strong>Eligibility:</Text> {company.eligibilityCriteria}
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={companies.length}
        onChange={handlePageChange}
        style={{ marginTop: "24px", textAlign: "center" }}
      />

      <Modal
        title={selectedCompany?.companyName}
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {selectedCompany && (
          <div style={{ padding: "20px" }}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Text strong>About Company:</Text>
                <p>{selectedCompany.aboutCompany}</p>
              </Col>

              <Col span={12}>
                <Title level={4}>Job Details</Title>
                <p>
                  <Text strong>Designation:</Text>{" "}
                  {selectedCompany.jobDesignation}
                </p>
                <p>
                  <Text strong>Type:</Text> {selectedCompany.typeOfEmployment}
                </p>
                <p>
                  <Text strong>Location:</Text> {selectedCompany.workLocation}
                </p>
                <p>
                  <Text strong>CTC:</Text> {selectedCompany.ctc}
                </p>
                <p>
                  <Text strong>Stipend:</Text> {selectedCompany.stipend}
                </p>
                <p>
                  <Text strong>Bond:</Text> {selectedCompany.bond}
                </p>
              </Col>

              <Col span={12}>
                <Title level={4}>Requirements</Title>
                <p>
                  <Text strong>Branch:</Text> {selectedCompany.applicableBranch}
                </p>
                <p>
                  <Text strong>Eligibility:</Text>{" "}
                  {selectedCompany.eligibilityCriteria}
                </p>
                <p>
                  <Text strong>Selection Process:</Text>{" "}
                  {selectedCompany.selectionProcess}
                </p>
              </Col>

              <Col span={24}>
                <Title level={4}>Job Description</Title>
                <p>{selectedCompany.jobDescription}</p>
              </Col>

              <Col span={24}>
                <Title level={4}>Benefits</Title>
                <p>{selectedCompany.otherBenefits}</p>
              </Col>

              <Col span={24}>
                <Title level={4}>Contact Information</Title>
                <p>
                  <Text strong>Name:</Text> {selectedCompany.contactName}
                </p>
                <p>
                  <Text strong>Designation:</Text>{" "}
                  {selectedCompany.contactDesignation}
                </p>
                <p>
                  <Text strong>Email:</Text> {selectedCompany.contactEmail}
                </p>
                <p>
                  <Text strong>Mobile:</Text> {selectedCompany.contactMobile}
                </p>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Companies;
