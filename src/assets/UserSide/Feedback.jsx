import React, { useState } from "react";
import "./Feedback.css";
import axios from 'axios'
const Feedback = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    }); 
  };  
    
const validate = () => {
  let newErrors = {};

  if (!formData.title.trim()) {
    newErrors.title = "Feedback title is required";
  }

  if (!formData.type) {
    newErrors.type = "Please select feedback type";
  }

  if (!formData.description.trim()) {
    newErrors.description = "Description cannot be empty";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


const handleSubmit = async(e) => {
  e.preventDefault();

  if (!validate()) return;

  console.log("Feedback Submitted:", formData);

await axios.post("http://localhost:5000/feedback",formData,{ withCredentials: true })
  setFormData({
    title: "",
    type: "",
    description: "",
  });
  setErrors({});
};


return (
  <div className="feedback-container">
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>User Feedback</h2>

      <label>Feedback Title</label>
      <input
        type="text"
        name="title"
        placeholder="Enter feedback title"
        value={formData.title}
        onChange={handleChange}
      />
      {errors.title && <p className="error">{errors.title}</p>}

      <label>Feedback Type</label>
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="">Select type</option>
        <option value="Bug">Bug</option>
        <option value="Suggestion">Suggestion</option>
        <option value="Complaint">Complaint</option>
        <option value="Other">Other</option>
      </select>
      {errors.type && <p className="error">{errors.type}</p>}

      <label>Description</label>
      <textarea
        name="description"
        placeholder="Describe your feedback..."
        value={formData.description}
        onChange={handleChange}
      ></textarea>
      {errors.description && (
        <p className="error">{errors.description}</p>
      )}

      <button type="submit" >Submit Feedback</button>
    </form>
  </div>
);
};

export default Feedback;