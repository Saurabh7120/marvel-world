import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Image, ListGroup, Stack } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUrl } from './getUrl';

const SeriesDetails = () => {
    const [details, setDetails] = useState()
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const getDetails = async() => {
            try {
                const url = getUrl(`series/${params.id}`)
                console.log(url)
                const result = await axios.get(url)
                console.log(result);
                setDetails(result.data.data.results[0])
            } catch (error) {
                navigate('/NotFound')   
            }
        }
        getDetails()
    },[params])
    return (
       details ? 
       <Container className='mx-auto detail-container'>
           <Stack direction='horizontal' className='mb-4 top-btn-list' >
                <Button  onClick={() => navigate(-1, {replace:true})}>Go Back</Button>
            </Stack>
            <Stack direction='horizontal' className='mx-4 p-3 border rounded'>
                <Image alt='thumbnail-image' src={`${details.thumbnail.path}.${details.thumbnail.extension}`} className='detail-image'/>
                <Stack gap={2} className='detail-layout'>
                    <h1 className='mb-3'>{details.title}</h1>
                    <p>{details.description}</p>

                    <h2>Characters</h2>
                    {details.characters.items.length > 0 ? <ListGroup>
                        {details.characters.items.map((i,idx) => <ListGroup.Item action onClick={() => navigate(`/characters/${i.resourceURI.split('/')[6]}`)} key={idx}>{i.name}</ListGroup.Item>)}
                    </ListGroup> :
                    <Alert variant='secondary' className='alert-normal'>
                        <p>No related characters</p>
                    </Alert>
                    }


                    <h2>Comics</h2>
                    {details.comics.items.length > 0 ? <ListGroup>
                        {details.comics.items.map((i,idx) => <ListGroup.Item action onClick={() => navigate(`/comics/${i.resourceURI.split('/')[6]}`)} key={idx}>{i.name}</ListGroup.Item>)}
                    </ListGroup> :
                    <Alert variant='secondary' className='alert-normal'>
                        <p>No related comics</p>
                    </Alert>
                    }

                    <h2>Related Links</h2>
                    {details.urls.length > 0 ? <Stack direction='horizontal' gap={3}>
                        {details.urls.map((i,idx) =>  <a key={idx} href={i.url} target="_blank">{i.type}</a>)}
                    </Stack> :
                    <Alert variant='secondary' className='alert-normal'>
                        <p>No related links</p>
                    </Alert>
                    }
                </Stack>
              
            </Stack>
       </Container>
:
       <></>
    );
};

export default SeriesDetails;