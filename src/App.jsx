// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component//Home';  // Komponen untuk halaman utama
import Login from './component/Login';  // Komponen untuk halaman login
import DashboardSiswa from './component/siswa/dashboard';
import KelasSiswa from './component/siswa/kelas';
import GabungKelas from './component/siswa/gabungkelas';
import Quiz from './component/siswa/quiz';
import Register from './component/Register';
import ProtectedRoute from "./ProtectedRoute";
import DashboardGuru from "./component/guru/dashboard";
import Unauthorized from "./unauthorized";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/siswa" element={<ProtectedRoute allowedRoles={["student"]}><DashboardSiswa /></ProtectedRoute> }/>
        <Route path="/siswa/kelas" element={<KelasSiswa />} />
        <Route path="/siswa/quiz" element={<Quiz />} />

        <Route path="/guru" element={<DashboardGuru />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
