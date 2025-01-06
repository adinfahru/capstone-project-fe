// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component//Home';  // Komponen untuk halaman utama
import Login from './component/Login';  // Komponen untuk halaman login
import Register from './component/Register';
import DashboardSiswa from './component/siswa/dashboard';
import KelasSiswa from './component/siswa/kelas';
import GabungKelas from './component/siswa/gabungkelas';
import Quiz from './component/siswa/quiz';
import DashboardGuru from "./component/guru/dashboard";
import KelasGuru from "./component/guru/kelas";
import BuatKelas from "./component/guru/buatkelas";
import KelasDetail_Guru from "./component/guru/kelas_detail";
import CreateQuiz from './component/guru/create_quiz';
import ProtectedRoute from "./ProtectedRoute";
import CreateSession from "./component/guru/create_session";
import CreateQuestion from "./component/guru/create_question";
import QuizDetail from "./component/guru/quiz_detail";
import SessionQuestions from './component/guru/session_detail';
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
        <Route path="/siswa/gabungkelas" element={<GabungKelas />} />
        <Route path="/siswa/quiz" element={<Quiz />} />


        <Route path="/guru" element={<ProtectedRoute allowedRoles={["teacher"]}><DashboardGuru /></ProtectedRoute> } />
        <Route path="/guru/kelas" element={<KelasGuru />} />
        <Route path="/guru/buatkelas" element={<BuatKelas />} />
        <Route path="/guru/kelas/:id_class" element={<KelasDetail_Guru />} />
        <Route path="/guru/kelas/:id_class/add-quiz" element={<CreateQuiz />} />
        <Route path="/guru/kelas/:id_class/quiz/:id_quiz/create-session" element={<CreateSession />} />
        <Route path="/guru/kelas/:id_class/quiz/:id_quiz/session/:id_session/create-question" element={<CreateQuestion />} />
        <Route path="/guru/kelas/:id_class/quiz/:quizId" element={<QuizDetail />} />
        <Route path="/guru/kelas/:id_class/session/:sessionId/questions" element={<SessionQuestions />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
