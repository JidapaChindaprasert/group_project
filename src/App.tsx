import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Academic from './pages/academic/Academic';
import Admission from './pages/admission/Admission';

import Faculty from './pages/faculty/FacultyIoT';
import FacultyPhys from './pages/faculty/FacultyPhys';
import ProfessorDetail from './pages/faculty/ProfessorDetail';

import Navbar from './components/Navbar'; // ดึง Navbar เข้ามา


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/faculty/industrial-physics" element={<FacultyPhys />} />
          <Route path="/faculty/detail" element={<ProfessorDetail />} />
          <Route path="/faculty/:id" element={<ProfessorDetail />} />
          <Route path="*" element={<h2>404 - ไม่พบหน้านี้</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;