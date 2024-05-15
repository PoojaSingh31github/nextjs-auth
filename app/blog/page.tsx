"use client";
import { useState } from "react";
import axios from "axios";

const CreateBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/blog", formData);
      console.log("response data isssssss",response.data);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div>
      <h1>Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          className="border"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label>Content:</label>
        <textarea
          className="border"
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
