import React, { useState } from "react";
import { Form, Input, Button, Card, message, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/login",
        values,
        {
          withCredentials: true,
        }
      );
      message.success("Admin logged in successfully");
      navigate("/admin");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        message.error(
          error.response.data.message || "Login failed. Please try again."
        );
      } else {
        message.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
        width: "100%",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
        bodyStyle={{ padding: "40px" }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
          Admin Login
        </Title>
        <Form
          name="admin_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="email"
              style={{ height: "50px", fontSize: "16px" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Password"
              style={{ height: "50px", fontSize: "16px" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%", height: "50px", fontSize: "18px" }}
            >
              Log in as Admin
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;
