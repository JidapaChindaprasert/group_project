import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Academic from './pages/academic/Academic';
import Admission from './pages/admission/Admission';
import Faculty from './pages/faculty/Faculty';
import IoT from './pages/admission/IoT';
import PhysIoT from './pages/admission/PhysIoT';

import Navbar from './components/Navbar';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academic" element={<Academic />} />

          <Route path="/admission" element={<Admission />} />
          <Route path="/course/iot" element={<IoT />} />
          <Route path="/course/physiot" element={<PhysIoT />} />

          <Route path="/faculty" element={<Faculty />} />
          <Route path="*" element={<h2>404 - ไม่พบหน้านี้</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;