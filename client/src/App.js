import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Karyawan from './pages/karyawan';
import AddKaryawan from './pages/addKaryawan';
import EditKaryawan from './pages/editKaryawan';
import Gaji from './pages/gaji';
import AddGaji from './pages/addGaji';
import EditGaji from './pages/editGaji';
import Jabatan from './pages/jabatan';
import AddJabatan from './pages/addJabatan';
import EditJabatan from './pages/editJabatan';
import Laporan from './pages/laporan';
import PDF from './pages/PDF';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Karyawan />} />
        <Route path="/karyawan/add" element={<AddKaryawan />} />
        <Route path="/karyawan/edit/:id" element={<EditKaryawan />} />

        <Route path="/karyawan/:id/gaji" element={<Gaji />} />
        <Route path="/karyawan/:id/gaji/add" element={<AddGaji />} />
        <Route path="/karyawan/:id/gaji/edit/:gajiId" element={<EditGaji />} />
        
        <Route path="/jabatan" element={<Jabatan />} />
        <Route path="/jabatan/add" element={<AddJabatan />} />
        <Route path="/jabatan/edit/:id" element={<EditJabatan />} />

        <Route path="/laporan" element={<Laporan />} />
        <Route path="/laporan/pdf" element={<PDF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
