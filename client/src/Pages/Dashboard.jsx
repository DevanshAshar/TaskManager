import React from "react";
import Layout from "../Components/Layouts/Layout";
import UserMenu from "../Components/Layouts/UserMenu";

const Dashboard = () => {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-2">
            <UserMenu/>
          </div>
          <div className="col-md-9">
            <h2>Upcoming Tasks</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
