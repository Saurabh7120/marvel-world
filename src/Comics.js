import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUrl } from './getUrl';
import { Button,  Stack} from 'react-bootstrap'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ListLayout from './ListLayout';
import SearchInput from './SearchInput';
import ListItemCard from './ListItemCard';

const Comics = () => {

    const [list, setList] = useState([]);

    const [hasMore, setHasMore] = useState(true);

    let navigate = useNavigate();

    const {pageNum} = useParams();

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if(!pageNum) return
        setList([]);
        getComics();
    },[pageNum])
    
    const getComics = async() => {
        try {
            if(isNaN(pageNum)) navigate(`/NotFound`) 
            const url = getUrl('comics',12,parseInt(pageNum) * 12);
            const result = await axios.get(url)
            if(result.data.data.results.length === 0) navigate(`/NotFound`) 
            setTimeout(() => setList(result.data.data.results), 200) 
            let pageCount = Math.ceil(result.data.data.total/12);
            if(parseInt(pageNum) === pageCount - 1) {
                setHasMore(false)
            }else{
                setHasMore(true)
            }
        } catch (error) {
            navigate(`/NotFound`) 
        }
    }

    useEffect(() => {
        const search = async() => {
            try {
                let query = searchParams.get('query')
                const url = getUrl('comics');
                const result1 = await axios.get(url + '&title=' + query);
                if(result1.data.data.results.length === 0) {
                    const result2 = await axios.get(url + '&titleStartsWith=' + query);
                    if(result2.data.data.results.length === 0) navigate(`/NotFound`)
                    setList(result2.data.data.results)
                }else{
                    setList(result1.data.data.results)
                }
            } catch (error) {
                navigate(`/NotFound`)
            }
        }
        if(searchParams.get('query')){ 
            search()
        }else{
            getComics();
        }
       },[searchParams])

    return (
        <ListLayout>
            <Stack direction='horizontal' className='mb-2 top-btn-list' >
                <Button   onClick={() => navigate(-1, {replace:true})}>Go Back</Button>
                <SearchInput placeholder='comics' handleSearch={value => {
                     if(value.trim().length === 0) {
                        setSearchParams({});
                        return
                    } 
                    setSearchParams({query:value})
                }
                    }/>
                {(searchParams.get('query') === "" ||!searchParams.get('query')) && list  && <Stack className='ms-auto list-btns' gap={2} direction='horizontal'>
                    {pageNum >= 1 && <Button disabled={list.length === 0} onClick={() => navigate(`/comics/page/${parseInt(pageNum) - 1}`, {replace:true})}>Prev</Button>}
                    {hasMore && <Button disabled={list.length === 0} onClick={() => navigate(`/comics/page/${parseInt(pageNum) + 1}`, {replace:true})}>Next</Button>}
                </Stack>}
            </Stack>
            <div className='list'>
                {list && list.length > 0 ? list.map((el) => 
                    <ListItemCard key={el.id} image={`${el.thumbnail.path}.${el.thumbnail.extension}`} name={el.title} desc={el.description} navigate={() => navigate(`/comics/${el.id}`, {replace:true})}/>
                    )
                    :
                    [1,2,3,4].map(i => 
                        <ListItemCard key={i} isEmpty={true} />
                    )
                }
            </div>
        </ListLayout>

    );
};

export default Comics;