import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const ListLayout = ({children}) => {
    const {pathname} = useLocation();
    return (
        <Container fluid className='list-container container mx-auto'>
            <h1 className='mb-4 list-title'>{pathname.split('/')[1]}</h1>
            {children}
        </Container>
    );
};

export default ListLayout;