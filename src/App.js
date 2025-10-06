import logo from './logo.svg';
import './App.css';
import Home from './screens/home';
import Events from './screens/events';
import DetailEvent from './screens/detailEvent';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './screens/login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route path="/inicio" element={<Home />} />
        <Route path="/eventos" element={<Events />} />
        <Route path="/detalle-evento" element={<DetailEvent />} />
        <Route path="/iniciar-sesión" element={<Login />} />



        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
