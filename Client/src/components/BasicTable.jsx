import React, { useState, useEffect } from "react";
import { Button, Space, Table, Modal, Form, Input, notification } from "antd";

const BasicTable = ({ data, setIsUpdated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // New state for add user modal
  const [form] = Form.useForm();
  const [updateModalform] = Form.useForm();
  const [addModalform] = Form.useForm(); // Form for add user
  const [loading, setLoading] = useState(false);
  const [UpdateModalLoading, setIsUpdateModalLoading] = useState(false);
  const [AddModalLoading, setIsAddModalLoading] = useState(false); // Loading state for add user
  const [selectedUser, setSelectedUser] = useState({});
  const [searchText, setSearchText] = useState(""); // New state for search query

  useEffect(() => {
    form.setFieldsValue({
      email: selectedUser?.email,
    });
    updateModalform.setFieldsValue(selectedUser);
  }, [form, selectedUser, updateModalform]);

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  const filteredData = data?.filter((item) => {
    const searchValue = searchText.toLowerCase();
    return (
      item.rollNumber.toString().toLowerCase().includes(searchValue) || // Convert to string and then to lower case
      item.name.toLowerCase().includes(searchValue) ||
      item.email.toLowerCase().includes(searchValue) ||
      item.cgpa.toString().toLowerCase().includes(searchValue) ||
      (item.error && item.error.toLowerCase().includes(searchValue))
    );
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const showAddModal = () => {
    // Function to show add user modal
    setIsAddModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const response = await fetch("http://localhost:3000/admin/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: values.email,
          subject: "test",
          text: "test data",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

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
    const values = await updateModalform.validateFields();
    setIsUpdateModalLoading(true);
    // values.rollNumber = values.rollNumber.toUpperCase;
    // values.name = values.name.toUpperCase;
    // values.branch = values.branch.toUpperCase;

    try {
      const response = await fetch(
        `http://localhost:3000/admin/updateRoll/${selectedUser.rollNumber}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
          },
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
      setIsUpdateModalLoading(false);
    }
  };

  const handleAddModalOk = async () => {
    // Function to handle add user modal submission
    const values = await addModalform.validateFields();
    setIsAddModalLoading(true);

    try {
      const response = await fetch("http://localhost:3000/admin/addRoll", {
        // API endpoint for adding user
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      setIsAddModalLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdateModalCancel = () => {
    setIsUpdateModalOpen(false);
  };

  const handleAddModalCancel = () => {
    // Function to handle add user modal cancel
    setIsAddModalOpen(false);
  };

  const handleDelete = async (rollNumber) => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/deleteRoll/${rollNumber}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
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
    {
      title: "Roll Number",
      dataIndex: "rollNumber",
      key: "rollNumber",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "rollNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "CGPA",
      dataIndex: "cgpa",
      key: "rollNumber",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "rollNumber",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Errors",
      dataIndex: "error",
      key: "rollNumber",
      render: (error) => (
        <p>
          {error ? <span style={{ color: "red" }}>{error}</span> : "No error"}
        </p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.error && (
            <Button
              type="primary"
              onClick={() => {
                setSelectedUser(record);
                showModal();
              }}
            >
              Send Mail
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => {
              setSelectedUser(record);
              showUpdateModal();
            }}
          >
            Update
          </Button>
          <Button
            danger
            onClick={() => {
              handleDelete(record.rollNumber);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  data?.sort((a, b) => {
    if (a.error && !b.error) return -1;
    if (!a.error && b.error) return 1;
    return 0;
  });

  const paginationConfig = {
    defaultPageSize: 4,
    pageSizeOptions: [4, 10, 20, 30, 50],
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search..."
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={showAddModal}>
          Add User
        </Button>
      </Space>
      {selectedUser && (
        <Modal
          title="Send Mail"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
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
      )}
      {selectedUser && (
        <Modal
          title="Update Student Data"
          open={isUpdateModalOpen}
          onOk={handleUpdateModalOk}
          onCancel={handleUpdateModalCancel}
          okText="Update"
          confirmLoading={UpdateModalLoading}
        >
          <Form form={updateModalform} layout="vertical">
            <Form.Item
              name="rollNumber"
              label="Roll Number"
              rules={[
                { required: true, message: "Please input the roll number!" },
              ]}
              style={{ textTransform: "uppercase" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input the name!" }]}
              style={{ textTransform: "uppercase" }}
            >
              <Input />
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
              style={{ textTransform: "uppercase" }}
            >
              <Input />
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
      )}
      {selectedUser && (
        <Modal
          title="Add New User"
          open={isAddModalOpen}
          onOk={handleAddModalOk}
          onCancel={handleAddModalCancel}
          okText="Add"
          confirmLoading={AddModalLoading}
        >
          <Form form={addModalform} layout="vertical">
            <Form.Item
              name="rollNumber"
              label="Roll Number"
              rules={[
                { required: true, message: "Please input the roll number!" },
              ]}
              style={{ textTransform: "uppercase" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input the name!" }]}
              style={{ textTransform: "uppercase" }}
            >
              <Input />
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
              style={{ textTransform: "uppercase" }}
            >
              <Input />
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
      )}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={paginationConfig}
        className="custom-pagination"
      />
    </>
  );
};

export default BasicTable;
