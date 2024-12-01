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
import {
  GlobalOutlined,
  LinkedinOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import axios from "axios";
import { server } from "../constants/config";

const { Text, Title } = Typography;

const JobNotification = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const pageSize = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/admin/jobnotification`);
        setJobData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showJobDetails = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentJobs = jobData.slice(startIndex, startIndex + pageSize);

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
      <Banner title="Job Notifications" />
      <Title level={2}>Available Job Opportunities</Title>
      <Row gutter={[16, 16]}>
        {currentJobs.map((job, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              title={job.companyName}
              extra={
                <div>
                  <a
                    href={job.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginRight: "8px" }}
                  >
                    <GlobalOutlined />
                  </a>
                  <LinkedinOutlined /> {/* Add LinkedIn link if available */}
                </div>
              }
              actions={[
                <Button type="primary" onClick={() => showJobDetails(job)}>
                  View Details
                </Button>,
                <Link to="/admin/express-of-interest" state={job}>
                  <Button icon={<SendOutlined />}>Send EOI</Button>
                </Link>,
              ]}
            >
              <div style={{ marginBottom: "12px" }}>
                <Tag color="blue">{job.typeOfEmployment}</Tag>
                <Tag color="green">₹{job.ctc}</Tag>
              </div>
              <p>
                <Text strong>Role:</Text> {job.jobDesignation}
              </p>
              <p>
                <Text strong>Location:</Text> {job.workLocation}
              </p>
              <p>
                <Text strong>Eligibility:</Text> {job.eligibilityCriteria}
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={jobData.length}
        onChange={handlePageChange}
        style={{ marginTop: "24px", textAlign: "center" }}
      />

      <Modal
        title={selectedJob?.companyName}
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {selectedJob && (
          <div style={{ padding: "20px" }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Title level={4}>Job Details</Title>
                <p>
                  <Text strong>Designation:</Text> {selectedJob.jobDesignation}
                </p>
                <p>
                  <Text strong>Type:</Text> {selectedJob.typeOfEmployment}
                </p>
                <p>
                  <Text strong>Location:</Text> {selectedJob.workLocation}
                </p>
                <p>
                  <Text strong>CTC:</Text> {selectedJob.ctc}
                </p>
                <p>
                  <Text strong>Stipend:</Text> {selectedJob.stipend}
                </p>
                <p>
                  <Text strong>Bond:</Text> {selectedJob.bond}
                </p>
              </Col>

              <Col span={12}>
                <Title level={4}>Requirements</Title>
                <p>
                  <Text strong>Branch:</Text> {selectedJob.applicableBranch}
                </p>
                <p>
                  <Text strong>Eligibility:</Text>{" "}
                  {selectedJob.eligibilityCriteria}
                </p>
                <p>
                  <Text strong>Selection Process:</Text>{" "}
                  {selectedJob.selectionProcess}
                </p>
              </Col>

              <Col span={24}>
                <Title level={4}>Benefits</Title>
                <p>{selectedJob.otherBenefits}</p>
              </Col>

              <Col span={24}>
                <Title level={4}>Contact Information</Title>
                <p>
                  <Text strong>Name:</Text> {selectedJob.contactName}
                </p>
                <p>
                  <Text strong>Designation:</Text>{" "}
                  {selectedJob.contactDesignation}
                </p>
                <p>
                  <Text strong>Email:</Text> {selectedJob.contactEmail}
                </p>
                <p>
                  <Text strong>Mobile:</Text> {selectedJob.contactMobile}
                </p>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default JobNotification;
