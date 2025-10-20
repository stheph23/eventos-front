import logo from './logo.svg';
import './App.css';
import Home from './screens/home';
import Events from './screens/events';
import DetailEvent from './screens/detailEvent';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './screens/login';
import AdminLogin from './screens/admin/login';
import AdminGuard from './screens/admin/AdminGuard';
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

<Route path="/admin/login" element={<AdminLogin />} />
<Route
  path="/admin/events"
  element={
    <AdminGuard>
      <AdminEvents />
    </AdminGuard>
  }
/>
<Route
  path="/admin/events/:id"
  element={
    <AdminGuard>
      <AdminEventEditor />
    </AdminGuard>
  }
/>

        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
