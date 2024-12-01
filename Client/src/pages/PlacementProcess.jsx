import React, { useState, useEffect } from "react";
import {
  Select,
  DatePicker,
  TimePicker,
  Input,
  Table,
  Button,
  Typography,
  message,
  Form,
  Card,
  Modal,
  Spin,
  Row,
  Col,
} from "antd";
import { SendOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { server } from "../constants/config";

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

const PlacementProcess = () => {
  const [form] = Form.useForm();
  const [companyData, setCompanyData] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchCompanyData();
    fetchStudentData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(`${server}/admin/jobnotification`);
      setCompanyData(response.data.data);
    } catch (err) {
      message.error("Failed to fetch company data");
    }
  };

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`${server}/admin/allStudents`);
      setStudents(
        response.data.data.map((student, index) => ({
          key: index,
          name: student.name,
          email: student.email,
          rollNumber: student.rollNumber,
        }))
      );
    } catch (err) {
      message.error("Failed to fetch student data");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Roll Number",
      dataIndex: "rollNumber",
      key: "rollNumber",
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSendMail = async () => {
    try {
      setLoading(true);
      const formValues = await form.validateFields();
      const selectedStudents = students.filter((student) =>
        selectedRowKeys.includes(student.key)
      );
      const emails = selectedStudents.map((student) => student.email);

      const mailData = {
        ...formValues,
        recipients: emails,
      };

      await axios.post(`${server}/admin/sendPlacementEmails`, mailData);

      message.success("Emails sent successfully");
      setModalVisible(false);
    } catch (error) {
      message.error("Failed to send emails");
    } finally {
      setLoading(false);
    }
  };

  const placementProcesses = [
    "Interview",
    "Written Test",
    "Group Discussion",
    "Technical Test",
    "HR Round",
    "Case Study",
    "Presentation",
    "Coding Test",
    "Aptitude Test",
  ];

  return (
    <Card
      title={<Title level={2}>Placement Process</Title>}
      style={{ margin: 20 }}
    >
      <Form form={form} layout="vertical">
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name="company"
              label="Company"
              rules={[{ required: true, message: "Please select a company" }]}
            >
              <Select placeholder="Select Company">
                {companyData.map((company, index) => (
                  <Option key={index} value={company.companyName}>
                    {company.companyName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="process"
              label="Process"
              rules={[{ required: true, message: "Please select a process" }]}
            >
              <Select placeholder="Select Process" mode="multiple">
                {placementProcesses.map((process) => (
                  <Option key={process} value={process}>
                    {process}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="time"
              label="Time"
              rules={[{ required: true, message: "Please select a time" }]}
            >
              <TimePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="venue"
              label="Venue"
              rules={[{ required: true, message: "Please enter a venue" }]}
            >
              <Input placeholder="Enter Venue" />
            </Form.Item>

            <Form.Item name="additionalInfo" label="Additional Information">
              <TextArea
                rows={4}
                placeholder="Enter any additional information"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={students}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 400 }}
        style={{ marginTop: 24 }}
      />

      <Button
        type="primary"
        icon={<SendOutlined />}
        onClick={() => setModalVisible(true)}
        style={{ marginTop: 16 }}
        disabled={selectedRowKeys.length === 0}
      >
        Send Mail to Selected Students
      </Button>

      <Modal
        title="Confirm Email"
        visible={modalVisible}
        onOk={handleSendMail}
        onCancel={() => setModalVisible(false)}
        confirmLoading={loading}
      >
        <p>
          Are you sure you want to send emails to {selectedRowKeys.length}{" "}
          selected students?
        </p>
        <p>
          The email will include all the placement process details you've
          entered.
        </p>
      </Modal>
    </Card>
  );
};

export default PlacementProcess;
