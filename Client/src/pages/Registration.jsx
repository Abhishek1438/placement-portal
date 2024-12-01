import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  Button,
  Input,
  Tabs,
  Layout,
  Typography,
  message,
  Form,
} from "antd";
import { SendOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import axios from "axios";
import { server } from "../constants/config";

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

const Registration = () => {
  const [registrationData, setRegistrationData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Compose your message...",
    toolbarButtonSize: "small",
    minHeight: 300,
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "superscript",
      "subscript",
      "|",
      "ul",
      "ol",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "brush",
      "|",
      "selectall",
      "align",
      "undo",
      "redo",
      "cut",
      "hr",
      "eraser",
      "table",
      "|",
      "link",
      "unlink",
      "|",
      "fullsize",
      "|",
      "print",
      "about",
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/admin/allStudents`);
        setRegistrationData(response.data.data);
      } catch (err) {
        setError(err);
        message.error("Failed to fetch student data");
      }
    };

    fetchData();
  }, []);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleSendMail = async () => {
    const selectedStudents = registrationData.filter((student) =>
      selectedRowKeys.includes(student.key)
    );
    const emails = selectedStudents.map((student) => student.email);
    console.log("Sending emails to:", emails);
    message.success("Emails sent successfully");
  };

  const handleSendAllMail = (values) => {
    console.log("Sending email to all students:", values);
    message.success("Email sent to all students");
    setSubject("");
    setContent("");
  };

  const columns = [
    {
      title: "Roll Number",
      dataIndex: "RollNo",
      key: "RollNo",
    },
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
      title: "CGPA",
      dataIndex: "cgpa",
      key: "cgpa",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
  ];

  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <Title level={2} style={{ margin: "16px 0" }}>
          Student Registration Data
        </Title>
        {error ? (
          <div className="error">Error: {error.message}</div>
        ) : (
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <UserOutlined style={{ marginRight: "10px" }} />
                  Registrations
                </span>
              }
              key="1"
            >
              <Table
                rowSelection={{
                  selectedRowKeys,
                  onChange: onSelectChange,
                }}
                columns={columns}
                dataSource={registrationData}
                pagination={{ pageSize: 10 }}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendMail}
                style={{ marginTop: 16 }}
              >
                Send Mail to Selected Students
              </Button>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <MailOutlined style={{ marginRight: "10px" }} />
                  Send Mail
                </span>
              }
              key="2"
            >
              <Form onFinish={handleSendAllMail} layout="vertical">
                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[
                    { required: true, message: "Please input the subject!" },
                  ]}
                >
                  <Input placeholder="Enter subject" />
                </Form.Item>
                <Form.Item
                  name="content"
                  label="Content"
                  rules={[
                    { required: true, message: "Please input the content!" },
                  ]}
                >
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onBlur={(newContent) => setContent(newContent)}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SendOutlined />}
                  >
                    Send Mail to All Students
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        )}
      </Content>
    </Layout>
  );
};

export default Registration;
