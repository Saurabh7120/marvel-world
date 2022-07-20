import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Stack} from 'react-bootstrap'

const Home = () => {
    return (
        <div className='text-center pt-4'>
            <h1 className='mb-2'>Welcome to <span className='text-danger'>Marvel</span></h1>
            <strong >Here it's everything Marvel! Click on one of the links below to start exploring!</strong>
            <Stack className='justify-content-center mt-4' gap={3} direction='horizontal'>
                <Link className='home-link' to={'/characters/page/0'}>Link to characters</Link>
                <Link className='home-link'  to={'/comics/page/0'}>Link to comics</Link>
                <Link className='home-link' to={'/series/page/0'}>Link to series</Link>
            </Stack>
            
        </div>
    );
};

export default Home;