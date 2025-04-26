import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    dob: "",
    role: "Explorer",
    location: "",

  });


  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:9999/api/user/getSingleUser/${userId}`);
      setUser({
        username: res.data.username,
        email: res.data.email,
        dob: res.data.dob,
        role: res.data.role,
        location: res.data.location,
   
      });
    } catch (error) {
      console.error("Error fetching user:", error.message);
      toast.error("Failed to fetch user");
    }
  };

  useEffect(() => {
    fetchData(); 
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:9999/api/user/update/${userId}`, user);
      toast.success("User updated successfully");
      navigate("/userList"); 
    } catch (error) {
      console.error("Error updating user:", error.message);
      toast.error("Failed to update user");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={user.dob}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Role:</label>
        <select
          name="role"
          value={user.role}
          onChange={handleChange}
        >
          <option value="Admin">Admin</option>
          <option value="Explorer">Explorer</option>
        </select>
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={user.location}
          onChange={handleChange}
        />
      </div>
    
      <button type="submit">Update User</button>
    </form>
  );
};

export default Edit;
