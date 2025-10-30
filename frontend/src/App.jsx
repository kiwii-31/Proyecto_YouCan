import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Calendar from "./pages/Calendar";
import Habits from "./pages/Habits";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Help from "./pages/Help";

function App() {
  const [user, setUser] = useState(null);
  const [habits, setHabits] = useState([]);

  return (
    <BrowserRouter>
      {!user ? (
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Sidebar setUser={setUser}>
          <div className="main-content">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<Help />} />
              <Route path="/habits" element={<Habits habits={habits} setHabits={setHabits} />} />
              <Route path="/calendar" element={<Calendar habits={habits} setHabits={setHabits} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </Sidebar>
      )}
    </BrowserRouter>
  );
}

export default App;
