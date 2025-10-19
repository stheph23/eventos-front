import logo from './logo.svg';
import './App.css';
import Home from './screens/home';
import Events from './screens/events';
import DetailEvent from './screens/detailEvent';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './screens/login';

import AdminEventEditor from './screens/admin/events/editor';
import AdminEvents from './screens/admin/events';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route path="/inicio" element={<Home />} />
        <Route path="/eventos" element={<Events />} />
        <Route path="/detalle-evento/:id" element={<DetailEvent />} />
        <Route path="/iniciar-sesión" element={<Login />} />
        <Route path="/admin/events" element={ <AdminEvents />}/>
        <Route path="/admin/events/:id" element={ <AdminEventEditor />}/>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
