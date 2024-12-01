import React, { useState } from "react";
import { Layout, Menu, Typography, Card, Row, Col } from "antd";
import {
  HomeOutlined,
  BankOutlined,
  BarChartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import PlacementPredictor from "./PlacementPredictor";
import Companies from "./Companies";
import PlacementStats from "./PlacementStats";
import Home from "./Home";
import logo from "../../assets/logo1.png";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const StudentDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("home");

  const menuItems = [
    { key: "home", icon: <HomeOutlined />, label: "Home" },
    { key: "companies", icon: <BankOutlined />, label: "Companies" },
    {
      key: "predictor",
      icon: <BarChartOutlined />,
      label: "Placement Predictor",
    },
    { key: "stats", icon: <LineChartOutlined />, label: "Placement Stats" },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case "home":
        return (
          <div>
            <Title level={2}>Welcome to Your Dashboard</Title>
            <p>Here you can find an overview of your placement journey.</p>
            <Home />
          </div>
        );
      case "companies":
        return (
          <div>
            <Title level={2}>Companies</Title>
            <p>Explore companies that are hiring and their requirements.</p>
            <Companies />
          </div>
        );
      case "predictor":
        return (
          <div>
            <Title level={2}>Placement Predictor</Title>
            <PlacementPredictor />
          </div>
        );
      case "stats":
        return (
          <div>
            <PlacementStats />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} theme="light">
        <div
          style={{
            height: "32px",
            margin: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} height="30px" />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key)}
          style={{ height: "100%", borderRight: 0 }}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Title level={3} style={{ margin: "16px 24px" }}>
            Student Dashboard
          </Title>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentDashboard;
