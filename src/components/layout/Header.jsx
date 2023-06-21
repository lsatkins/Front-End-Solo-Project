import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../css/header.css'
import Space from '../Space'


const Header = () => {

    return (
        <>
        <Navbar fixed="top" expand="lg" className="custom-navbar">
          <Container>
            <Navbar.Brand href="/"><img style={{height: "50px", backgroundColor: "rgb(1,12,128)"}} src="/images/jobtrackr-high-resolution-logo-white-on-transparent-background.png" alt=""></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/search">Find Jobs</Nav.Link>
                <Nav.Link href="/tasks">Tasks</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Space />
        </>
      );


//   return (
//     <ul>
//         <li> <Link to="/">Home</Link> </li>
       
//         <li> <Link to="/count_hooks">Count Hooks</Link> </li>
        
//         <li> <Link to="/view_count_hooks">View Count Hooks</Link> </li>
       
//     </ul>
//   )
}

export default Header