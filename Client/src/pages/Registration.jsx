import React, { useEffect } from "react";
import classes from "./RollList.module.css";
import { useState } from "react";
import Banner from "../components/Banner";
import BasicTable from "../components/BasicTable";

const Registration = () => {
  const [registrationData, setregistrationData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/admin/getAllRegistration"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setregistrationData(result.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      <Banner />
      <BasicTable data={registrationData} key={registrationData?.rollNumber} />
    </div>
  );
};

export default Registration;
