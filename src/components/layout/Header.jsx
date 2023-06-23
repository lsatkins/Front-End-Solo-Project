import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../css/header.css';
import Space from '../Space';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prevExpanded) => !prevExpanded); // Toggle the value of expanded
  };

  useEffect(() => {
    const handleResize = () => {
      setExpanded(window.innerWidth >= 332); // Set the expanded state based on the screen width
    };

    handleResize(); // Call the function initially

    window.addEventListener('resize', handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up the event listener
    };
  }, []);

  return (
    <>
      <Navbar fixed="top" expand={expanded} className="custom-navbar">
        {console.log(expanded)}
        <Container className="d-flex justify-space-between">
          <Navbar.Brand href="/">
            <img
              style={{ height: '50px', backgroundColor: 'rgb(1,12,128)' }}
              src="./images/jobtrackr-website-favicon-white.png"
              alt=""
            ></img>
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle}>
            
          </Navbar.Toggle> */}
          <div>
          {expanded === false ? (
            <button onClick={handleToggle} aria-controls="basic-navbar-nav" type="button" aria-label="Toggle navigation" class="navbar-toggler collapsed">
                <span class="navbar-toggler-icon"></span>
            </button>
            ) : null}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/search">Find Jobs</Nav.Link>
              <Nav.Link href="/tasks">Tasks</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
      <Space />
    </>
  );
};

export default Header;
