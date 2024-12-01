import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  message,
  Checkbox,
  Row,
  Col,
} from "antd";
import axios from "axios";

const PlacementPredictor = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const languages = [
    "C#",
    "C++",
    "Go",
    "Java",
    "JavaScript",
    "Kotlin",
    "PHP",
    "Python",
    "Ruby",
    "Rust",
    "Swift",
    "TypeScript",
  ];
  const dsaTopics = [
    "Array",
    "Backtracking",
    "Bit Manipulation",
    "Divide and Conquer",
    "Dynamic Programming",
    "Graph Algorithms",
    "Greedy Algorithms",
    "Hashing",
    "Linked List",
    "Recursion",
    "Searching Algorithms",
    "Sorting Algorithms",
    "Stacks and Queues",
    "String Algorithms",
    "Tree Algorithms",
  ];
  const fundamentalTopics = [
    "Algorithms",
    "Calculus",
    "Complexity Analysis",
    "Data Structures",
    "Differential Equations",
    "Discrete Mathematics",
    "Graph Theory",
    "Linear Algebra",
    "Logic",
    "Mathematics",
    "Number Theory",
    "Numerical Analysis",
    "Probability",
    "Set Theory",
    "Statistics",
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    setResult("");

    const data = {
      CGPA: values.CGPA,
      "Internship Experience": values.Internship_Experience,
      "Projects Undertaken": values.Projects_Undertaken,
      "Soft Skills": values.Soft_Skills,
      ...languages.reduce(
        (acc, lang) => ({
          ...acc,
          [lang]: values.Languages.includes(lang) ? 1 : 0,
        }),
        {}
      ),
      ...dsaTopics.reduce(
        (acc, topic) => ({
          ...acc,
          [topic]: values.DSA_Topics.includes(topic) ? 1 : 0,
        }),
        {}
      ),
      ...fundamentalTopics.reduce(
        (acc, topic) => ({
          ...acc,
          [topic]: values.Fundamental_Topics.includes(topic) ? 1 : 0,
        }),
        {}
      ),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/student/predict",
        data
      );
      const likelihood = response.data.placement_likelihood;
      setResult(`Predicted Placement Likelihood: ${likelihood}`);
      message.success("Prediction successful!");
    } catch (error) {
      console.error("Error:", error);
      setResult("Server error. Please try again.");
      message.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "auto",
        padding: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
      }}
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          CGPA: 7.5,
          Internship_Experience: 0,
          Projects_Undertaken: 0,
          Soft_Skills: 5,
          Languages: [],
          DSA_Topics: [],
          Fundamental_Topics: [],
        }}
      >
        <Form.Item
          label="CGPA (6-10)"
          name="CGPA"
          rules={[{ required: true, message: "Please enter your CGPA" }]}
        >
          <InputNumber min={6} max={10} step={0.01} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Internship Experience"
          name="Internship_Experience"
          rules={[
            {
              required: true,
              message: "Please indicate internship experience",
            },
          ]}
        >
          <InputNumber min={0} max={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Projects Undertaken (0-5)"
          name="Projects_Undertaken"
          rules={[
            {
              required: true,
              message: "Please enter the number of projects undertaken",
            },
          ]}
        >
          <InputNumber min={0} max={5} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Soft Skills (0-10)"
          name="Soft_Skills"
          rules={[{ required: true, message: "Please rate your soft skills" }]}
        >
          <InputNumber min={0} max={10} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Languages Known" name="Languages">
          <Checkbox.Group>
            <Row>
              {languages.map((lang) => (
                <Col span={8} key={lang}>
                  <Checkbox value={lang}>{lang}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="DSA Topics Covered" name="DSA_Topics">
          <Checkbox.Group>
            <Row>
              {dsaTopics.map((topic) => (
                <Col span={8} key={topic}>
                  <Checkbox value={topic}>{topic}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="Fundamental Topics Covered" name="Fundamental_Topics">
          <Checkbox.Group>
            <Row>
              {fundamentalTopics.map((topic) => (
                <Col span={8} key={topic}>
                  <Checkbox value={topic}>{topic}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Predict Placement Likelihood
          </Button>
        </Form.Item>
      </Form>

      {result && (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
};

export default PlacementPredictor;
