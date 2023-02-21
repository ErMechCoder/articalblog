import React from "react";
import Sidebar from "./Include/Sidebar";
import Header from "./Include/Header";
import axios from "axios";
import { useState } from "react";

const AllUsers = () => {
  const [Title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [id, setId] = useState();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/update-contest/get"
      );
      if (data.length) {
        setTitle(data[0].title);
        setSubTitle(data[0].subtitle);
        setId(data[0]._id);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const data = await axios.patch(
        "http://localhost:5000/update-contest/update/" + id,
        { title: Title, subtitle: subTitle }
      );
      alert("Contest has been updated successfully ");

      fetchData();
    } catch (error) {
      alert(error.message);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="row flex-nowrap">
      <Sidebar />
      <div className="col admin-header">
        <Header />

        <div className="my-2 mx-2 shadow">
          <div className="py-3 px-3 admin-content-bg d-flex aign-items-center justify-content-between">
            <h4>All Users</h4>
          </div>
          <div className="px-5 py-5">
            <table class="table table-bordered table-hover text-center">
              <thead className="table-primary">
                <th>Sr.No.</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Action</th>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
