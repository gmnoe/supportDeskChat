import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";


function App() {
  return (
    <BrowserRouter>
      <div className='d-flex flex-column min-vh-100'>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand>Support Desk</Navbar.Brand>
              <Navbar.Toggle id="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end">
                  <a href="/admin" className="nav-link" target="_blank">Admin</a>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/admin" element={<AdminPage />}></Route>
              <Route path="/" element={<HomePage />}></Route>
            </Routes>
          </Container>
        </main>
        <footer className="mt-auto">
          <div className="text-center">All Rights Reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;