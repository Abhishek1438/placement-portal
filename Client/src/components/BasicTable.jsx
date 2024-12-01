import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Space,
  Table,
  Modal,
  Form,
  Input,
  notification,
  Card,
  Typography,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;

const BasicTable = ({ data, setIsUpdated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateModalform] = Form.useForm();
  const [addModalform] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updateModalLoading, setUpdateModalLoading] = useState(false);
  const [addModalLoading, setAddModalLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({ email: selectedUser.email });
      updateModalform.setFieldsValue(selectedUser);
    }
  }, [form, selectedUser, updateModalform]);

  const handleSearch = useCallback((value) => {
    setSearchText(value.toLowerCase());
  }, []);

  const filteredData = data?.filter((item) => {
    const searchValue = searchText.toLowerCase();
    return (
      item.rollNumber.toString().toLowerCase().includes(searchValue) ||
      item.name.toLowerCase().includes(searchValue) ||
      item.email.toLowerCase().includes(searchValue) ||
      item.cgpa.toString().toLowerCase().includes(searchValue) ||
      (item.error && item.error.toLowerCase().includes(searchValue))
    );
  });

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const showUpdateModal = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      console.log("heey");

      const response = await fetch("http://localhost:3000/admin/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: values.email,
          subject: "test",
          text: "test data",
        }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      notification.success({
        message: "Mail Sent",
        description: "The mail was sent successfully!",
      });
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      notification.error({
        message: "Mail Sending Failed",
        description: `There was an error sending the mail: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateModalOk = async () => {
    try {
      const values = await updateModalform.validateFields();
      setUpdateModalLoading(true);

      const response = await fetch(
        `http://localhost:3000/admin/updateRoll/${selectedUser?.rollNumber}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();

      if (response.ok) {
        notification.success({
          message: "Update Successful",
          description: "The student data has been updated successfully!",
        });
        setIsUpdated(true);
      } else {
        notification.error({
          message: "Update Failed",
          description:
            result.message ||
            "An error occurred while updating the student data.",
        });
      }
      updateModalform.resetFields();
      setIsUpdateModalOpen(false);
    } catch (error) {
      notification.error({
        message: "Update Failed",
        description: "An error occurred while updating the student data.",
      });
    } finally {
      setUpdateModalLoading(false);
    }
  };

  const handleAddModalOk = async () => {
    try {
      const values = await addModalform.validateFields();
      setAddModalLoading(true);

      const response = await fetch("http://localhost:3000/admin/addRoll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        notification.success({
          message: "Add Successful",
          description: "The student data has been added successfully!",
        });
        setIsUpdated(true);
      } else {
        notification.error({
          message: "Add Failed",
          description:
            result.message ||
            "An error occurred while adding the student data.",
        });
      }
      addModalform.resetFields();
      setIsAddModalOpen(false);
    } catch (error) {
      notification.error({
        message: "Add Failed",
        description: "An error occurred while adding the student data.",
      });
    } finally {
      setAddModalLoading(false);
    }
  };

  const handleDelete = async (rollNumber) => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/deleteRoll/${rollNumber}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await response.json();

      if (response.ok) {
        notification.success({
          message: "Student data deleted successfully",
          description: "The student data has been deleted successfully!",
        });
        setIsUpdated(true);
      } else {
        notification.error({
          message: "Delete Failed",
          description:
            result.message ||
            "An error occurred while deleting the student data.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Delete Failed",
        description: "An error occurred while deleting the student data.",
      });
    }
  };

  const columns = [
    { title: "Roll Number", dataIndex: "rollNumber", key: "rollNumber" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "CGPA", dataIndex: "cgpa", key: "cgpa" },
    { title: "Branch", dataIndex: "branch", key: "branch" },
    {
      title: "Errors",
      dataIndex: "error",
      key: "error",
      render: (error) => (
        <span style={{ color: error ? "red" : "green" }}>
          {error || "No error"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.error && (
            <Button type="primary" onClick={() => showModal(record)}>
              Send Mail
            </Button>
          )}
          <Button type="default" onClick={() => showUpdateModal(record)}>
            Update
          </Button>
          <Button danger onClick={() => handleDelete(record.rollNumber)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const sortedData = [...(filteredData || [])].sort((a, b) => {
    if (a.error && !b.error) return -1;
    if (!a.error && b.error) return 1;
    return 0;
  });

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Title level={2}>Student Management System</Title>
        <Space>
          <Input.Search
            placeholder="Search..."
            onSearch={handleSearch}
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
            Add User
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={sortedData}
          pagination={{
            defaultPageSize: 4,
            pageSizeOptions: [4, 10, 20, 30, 50],
          }}
          className="custom-table"
        />
      </Space>

      <Modal
        title="Send Mail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Send"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Update Student Data"
        open={isUpdateModalOpen}
        onOk={handleUpdateModalOk}
        onCancel={() => setIsUpdateModalOpen(false)}
        okText="Update"
        confirmLoading={updateModalLoading}
      >
        <Form form={updateModalform} layout="vertical">
          <Form.Item
            name="rollNumber"
            label="Roll Number"
            rules={[
              { required: true, message: "Please input the roll number!" },
            ]}
          >
            <Input style={{ textTransform: "uppercase" }} />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input style={{ textTransform: "uppercase" }} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input the email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="branch"
            label="Branch"
            rules={[{ required: true, message: "Please input the branch!" }]}
          >
            <Input style={{ textTransform: "uppercase" }} />
          </Form.Item>
          <Form.Item
            name="cgpa"
            label="CGPA"
            rules={[{ required: true, message: "Please input the CGPA!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add New User"
        open={isAddModalOpen}
        onOk={handleAddModalOk}
        onCancel={() => setIsAddModalOpen(false)}
        okText="Add"
        confirmLoading={addModalLoading}
      >
        <Form form={addModalform} layout="vertical">
          <Form.Item
            name="rollNumber"
            label="Roll Number"
            rules={[
              { required: true, message: "Please input the roll number!" },
            ]}
          >
            <Input style={{ textTransform: "uppercase" }} />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input style={{ textTransform: "uppercase" }} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input the email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="branch"
            label="Branch"
            rules={[{ required: true, message: "Please input the branch!" }]}
          >
            <Input style={{ textTransform: "uppercase" }} />
          </Form.Item>
          <Form.Item
            name="cgpa"
            label="CGPA"
            rules={[{ required: true, message: "Please input the CGPA!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default BasicTable;
