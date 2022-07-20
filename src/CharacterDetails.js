import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Image, ListGroup, Stack } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUrl } from './getUrl';

const CharacterDetails = () => {
    const [details, setDetails] = useState()
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const getDetails = async() => {
            try {
                const url = getUrl(`characters/${params.id}`)
                const result = await axios.get(url)
                if(result.data.data.results.length === 0) {
                    navigate('/NotFound');
                    return;
                }
                setDetails(result.data.data.results[0])
            } catch (error) {
                navigate('/NotFound');
            }

        }
        getDetails()
    },[params])
    return (
       details ? 
       <Container className='mx-auto detail-container'>
           <Stack direction='horizontal' className='mb-4 top-btn-list' >
                <Button   onClick={() => navigate(-1, {replace:true})}>Go Back</Button>
            </Stack>
            <Stack direction='horizontal' className='mx-4 p-3 border rounded'>
                <Image alt='thumbnail-image' src={`${details.thumbnail.path}.${details.thumbnail.extension}`} className='detail-image'/>
                    <Stack gap={2} className='detail-layout'>
                        <h1 className='mb-3'>{details.name}</h1>
                        <h2>Description</h2>
                        <p>{details.description}</p>
                        <h2>Comics</h2>
                        {details.comics.items.length > 0 ? <ListGroup>
                            {details.comics.items.map((i,idx) => <ListGroup.Item action onClick={() => navigate(`/comics/${i.resourceURI.split('/')[6]}`)} key={idx}>{i.name}</ListGroup.Item>)}
                        </ListGroup> :
                        <Alert variant='secondary' className='alert-normal'>
                            <p>No related comics</p>
                        </Alert>
                        }
                        <h2>Series</h2>
                        {details.series.items.length > 0 ? <ListGroup>
                            {details.series.items.map((i,idx) => <ListGroup.Item action onClick={() => navigate(`/series/${i.resourceURI.split('/')[6]}`)} key={idx}>{i.name}</ListGroup.Item>)}
                        </ListGroup> :
                        <Alert variant='secondary' className='alert-normal'>
                            <p>No related series</p>
                        </Alert>
                        }
                    </Stack>

            </Stack>
       </Container>
:
       <></>
    );
};

export default CharacterDetails;