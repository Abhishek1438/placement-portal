import React, { useEffect } from "react";
import classes from "./RollList.module.css";
import { useState } from "react";
import TableComponent from "../components/TableComponent";
import Banner from "../components/Banner";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import BasicTable from "../components/BasicTable";

const { Dragger } = Upload;

const RollList = () => {
  const [rollListData, setRollListData] = useState();
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/getAllRolls"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setRollListData(result.data); // Assuming response data contains the `data` field
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
    setIsUpdated(false);
  }, [isUpdated]);

  const onChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      setRollListData(info.file.response.rollList);
      console.log(info.file.response);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const onDrop = (e) => {
    console.log("Dropped file", e.dataTransfer.files);
  };

  return (
    <div className={classes.container}>
      <Banner />
      <div className={classes.rollList}>
        <Dragger
          name="rollList"
          action="http://localhost:3000/admin/upload-roll-list"
          onChange={onChange}
        >
          <h2>Upload Roll List</h2>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </div>
      <hr />

      {/* <div className={classes.filters}>
        <p>All</p>
        <p>Roll Number</p>
        <p>Email</p>
        <p>CGPA</p>
        <p>Resolved</p>

        <p>Total number of errors: 05</p>
      </div> */}

      {/* <table >
        <tr>
          <td>Roll Number</td>
          <td>Current value</td>
          <td>Correct value</td>
        </tr>
        <tr>
          <td>S20210010004</td>
          <td>abhishek.m20@gmail.com</td>
          <td>abhishek.m21@gmail.com</td>
        </tr>
      </table> */}
      {/* <TableComponent /> */}
      <BasicTable
        data={rollListData}
        setIsUpdated={setIsUpdated}
        key={rollListData?.rollNumber}
      />
    </div>
  );
};

export default RollList;
