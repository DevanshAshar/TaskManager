import { Routes, Route } from "react-router-dom";
import Landing from "./Components/Layouts/Landing";
import Signup from "./Pages/Signup";
import VerifyOtp from "./Pages/VerifyOtp";
import NewPassword from "./Pages/NewPassword";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Private from "./Components/Routes/Private";
import MyTasks from "./Pages/MyTasks";
import CreateTask from "./Pages/CreateTask";
import History from "./Pages/History";
import ParticularTask from "./Pages/ParticularTask";
import Groups from "./Pages/Groups";
import GrpDetails from "./Pages/GrpDetails";
function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="" element={<Private />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/myTasks" element={<MyTasks/>}/>
          <Route exact path="/task/:tid" element={<ParticularTask/>}/>
          <Route exact path="/createTask" element={<CreateTask/>}/>
          <Route exact path="/groups" element={<Groups/>}/>
          <Route exact path="/grp/:grpId" element={<GrpDetails/>}/>
          <Route exact path="/history" element={<History/>}/>
        </Route>        
        <Route path="/signup" element={<Signup />} />
        <Route exact path="/verifyOtp" element={<VerifyOtp />} />
        <Route exact path="/newPass" element={<NewPassword />} />
        <Route exact path="/*" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
