import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const [activePath, setActivePath] = useState('home')
    const {pathname} = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        const path = pathname.split('/')[1];
        setActivePath(path);
    },[pathname])

    return (
        <Navbar bg="dark" variant="dark" fixed='top'>
            <Container className='navContainer'>
            <Navbar.Brand className='p-1 bg-danger brand rounded' onClick={() => navigate('/')}>MARVEL</Navbar.Brand>
            <Nav className="ms-auto">
            <Nav.Link active={activePath === ""} onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link active={activePath === "characters"} onClick={() => navigate("/characters/page/0")}>Characters</Nav.Link>
            <Nav.Link active={activePath === "comics"} onClick={() => navigate("/comics/page/0")}  >Comics</Nav.Link>
            <Nav.Link active={activePath === "series"} onClick={() => navigate("/series/page/0")}>Series</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;