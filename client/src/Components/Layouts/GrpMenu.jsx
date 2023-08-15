import React from 'react'
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
const GrpMenu = () => {
  const { grpId } = useParams();
  return (
    <><div className="text-center">
    <div className="list-group">
      <h4>Group Dashboard</h4>
      <NavLink to={`/grpTasks/${grpId}`} className="list-group-item list-group-item-action">
        Tasks
      </NavLink>
      <NavLink to={`/grpUsers/${grpId}`} className="list-group-item list-group-item-action">
        Users
      </NavLink>
      <NavLink to={`/grpImportant/${grpId}`} className="list-group-item list-group-item-action">
        Important
      </NavLink>
      <NavLink to={`/grpHistory/${grpId}`} className="list-group-item list-group-item-action">
        History
      </NavLink>
    </div>
    </div></>
  )
}

export default GrpMenu