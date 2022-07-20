import React from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate()

    return (
        <Container className='container notFound-container'>
             <Stack direction='horizontal' className='mb-2 top-btn-list' >
                <Button onClick={() => navigate(-2,{replace:true})}>Go Back</Button>
            </Stack>
            <div className='h-100 d-flex flex-column justify-content-center pb-4  text-center'>
                <h1>
                    Page not found!
                </h1>
            </div>
        </Container>
    );
};

export default NotFound;