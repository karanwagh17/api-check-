import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// import { useNavigate } from "react-router-dom";
const UserList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getUsersData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9999/api/user/getuserData`
      );
      setData(response.data || []);
      toast.success("Users fetched successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const userdata = JSON.parse(sessionStorage.getItem("userData"));
  const role = userdata?.role || null;
  console.log("Logged in Role:", role);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9999/api/user/delete/${id}`, {
        data: {
          username: userdata.username,
          password: userdata.password,
        },
      });
      toast.success("User deleted successfully");
      getUsersData();
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div>
      <button onClick={handleSignout}>Sign out</button>
      {data && data.length > 0 ? (
        data.map((el, index) => (
          <ul
            key={el._id || index}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <li>Name: {el.username}</li>
            <li>Email: {el.email}</li>
            <li>Role: {el.role}</li>

            {role === "Admin" && (
              <>
                <Link to={`/edit/${el._id}`}>
                  <button style={{ marginRight: "10px" }}>Edit</button>
                </Link>
                <button onClick={() => handleDelete(el._id)}>Delete</button>
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
