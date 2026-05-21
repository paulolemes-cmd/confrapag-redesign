import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mandala from './pages/Mandala';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mandala" element={<Mandala />} />
      </Routes>
    </HashRouter>
  );
}
