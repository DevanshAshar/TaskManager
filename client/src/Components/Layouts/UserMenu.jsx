import React from 'react'
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <><div className="text-center">
    <div className="list-group">
      <h4>Dashboard</h4>
      <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">
        Profile
      </NavLink>
      <NavLink to="/myTasks" className="list-group-item list-group-item-action">
        My Tasks
      </NavLink>
      <NavLink to="/groups" className="list-group-item list-group-item-action">
        Groups
      </NavLink>
      <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">
        Important
      </NavLink>
      <NavLink to="/history" className="list-group-item list-group-item-action">
        History
      </NavLink>
    </div>
    </div>
    </>
  )
}

export default UserMenu