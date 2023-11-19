import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Headers/Headers";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Edit from "./pages/Edit/Edit";
import Profile from "./pages/Profile/Profile";
import { Routes, Route } from "react-router-dom";
import Team from "./pages/Team/Team";
import AllTeam from "./pages/AllTeam/AllTeam";
import ViewTeam from "./pages/ViewTeam/ViewTeam";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/userprofile/:id" element={<Profile />} />
        <Route path="/viewteam/:id" element={<ViewTeam />} />
        <Route path="/team/create" element={<Team />} />
        <Route path="/team/home" element={<AllTeam />} />
      </Routes>
    </>
  );
}

export default App;
