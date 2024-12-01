import React from "react";
import { Layout, Typography, Space, Button } from "antd";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
  let navigate = useNavigate();

  const navigateToStudentLogin = () => {
    navigate("/student-login");
  };

  const navigateToAdminLogin = () => {
    navigate("/admin-login");
  };

  const navigateToStudentRegister = () => {
    navigate("/student-register");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: 0 }}>
        <Title level={2} style={{ margin: "10px 20px", color: "#1890ff" }}>
          Placement Portal
        </Title>
      </Header>
      <Content style={{ padding: "50px", background: "#f0f2f5" }}>
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            background: "#fff",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "40px" }}
          >
            Welcome to the Placement Portal
          </Title>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Button
              type="primary"
              icon={<UserOutlined />}
              size="large"
              block
              onClick={navigateToStudentLogin}
              style={{ height: "50px", fontSize: "16px" }}
            >
              Student Login
            </Button>
            <Button
              type="default"
              icon={<UserOutlined />}
              size="large"
              block
              onClick={navigateToAdminLogin}
              style={{ height: "50px", fontSize: "16px" }}
            >
              Admin Login
            </Button>
            <Button
              type="dashed"
              icon={<UserAddOutlined />}
              size="large"
              block
              onClick={navigateToStudentRegister}
              style={{ height: "50px", fontSize: "16px" }}
            >
              Student Register
            </Button>
          </Space>
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage;
