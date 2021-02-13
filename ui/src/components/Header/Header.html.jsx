import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from "../../utils/gbp.jpg";


function HeaderHtml(props) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home"><img alt="Currency Exchange" src={Logo} style={{ width: 40 }} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#history">History</Nav.Link>
                    <Nav.Link href="#purchase">Purchase</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default HeaderHtml;