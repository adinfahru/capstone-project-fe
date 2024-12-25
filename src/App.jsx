// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component//Home';  // Komponen untuk halaman utama
import Login from './component/Login';  // Komponen untuk halaman login
import DashboardSiswa from './component/siswa/dashboard';
import KelasSiswa from './component/siswa/kelas';
import GabungKelas from './component/siswa/gabungkelas';
import Quiz from './component/siswa/quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/siswa" element={<DashboardSiswa />} />
        <Route path="/siswa/kelas" element={<KelasSiswa />} />
        <Route path="/siswa/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
