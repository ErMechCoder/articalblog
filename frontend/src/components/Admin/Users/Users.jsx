import React from "react";
import Header from "../Include/Header";
import Footer from "../../Include/Footer";
import UserTable from "./UserTable";
import Sidebar from "../Include/Sidebar";

import AuthService from "../../../services/AuthService";

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const authService = new AuthService();

  const fetchUser = async () => {
    try {
      const res = await AuthService.getUsers();
      res.status === 200 && setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="row flex-nowrap">
      <Sidebar />
      <div className="col admin-header">
        <Header />
        <div className="my-2 mx-2 shadow card">
          <div className="py-3 px-3 admin-content-bg d-flex aign-items-center justify-content-between">
            <h4>Users </h4>
          </div>
          <UserTable data={users} setData={setUsers} />
        </div>
      </div>
    </div>
  );
};

export default Users;
