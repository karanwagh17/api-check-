import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UserList = () => {
  const [data, setData] = useState([]);
  
  const getUsersData = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/api/user/getuserData`);
      setData(response.data || []);
      toast.success("Users fetched successfully");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const userdata = JSON.parse(sessionStorage.getItem("userData"));
  const role = userdata?.role || null;
  console.log("Logged in Role:", role);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9999/api/user/delete/${id}`);
      toast.success("User deleted successfully");
      getUsersData(); // Refresh the list after delete
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    // For now just showing alert/toast, later you can open a modal or navigate
    toast.info(`Edit user: ${user.username}`);
    console.log("Edit user details:", user);
  };

  return (
    <div>
      {data && data.length > 0 ? (
        data.map((el, index) => (
          <ul key={el._id || index} style={{border: "1px solid gray", padding: "10px", marginBottom: "10px"}}>
            <li>Name: {el.username}</li>
            <li>Email: {el.email}</li>
            <li>Role: {el.role}</li>

            {role === "Admin" && (
              <>
              <Link to={`/edit/${el._id}`}>
                <button  style={{ marginRight: "10px" }}>
                  Edit
                </button>
                </Link>
                <button onClick={() => handleDelete(el._id)}>
                  Delete
                </button>
              </>
            )}
          </ul>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UserList;
