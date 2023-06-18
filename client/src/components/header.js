import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <>
            <Navbar className="p-3" fixed="top" expand="lg" style={{ backgroundColor: "#edc081", position: "sticky", top: 0 }}>
                <Container fluid>
                    <Navbar.Brand href="#">GajiBaroqah</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">Karyawan</Nav.Link>
                            <Nav.Link href="/jabatan">Jabatan</Nav.Link>
                            <Nav.Link href="/laporan">Laporan</Nav.Link>
                            {/* <Nav.Link><Link to="/setting" className="text-secondary text-decoration-none">Akun</Link></Nav.Link> */}
                        </Nav>
                        {/* <Form className="d-flex">
                            <Link to="/login" className="me-2 btn btn-outline-success">Login</Link>
                            <Link to="/register" className="me-2 btn btn-primary">Register</Link>
                            <img src={ContactIcon} width="25" /><span>Fachrudin</span>
                        </Form> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header