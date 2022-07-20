import React, { useState } from 'react';
import { Alert, Button, FormControl, InputGroup, Stack } from 'react-bootstrap';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const SearchInput = ({placeholder,handleSearch}) => {

    const [value, setValue] = useState('')
    const [isError, setIsError] = useState(false);

    // const navigate = useNavigate()
    // const {pathname} = useLocation();
    // const [searchParams, setSearchParams] 

    return (
        <Stack direction='horizontal' gap={2}>
            <InputGroup id='search-input-group' className="mx-2 search-input">
                <FormControl
                value={value}
                placeholder={`Search ${placeholder}`}
                aria-label="Search-Input"
                aria-describedby="search-input-group"
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => {if(e.key === 'Enter') {
                    handleSearch(value);
                }}}
                />
                <Button variant="outline-secondary" id="button-addon1" onClick={() => {
                    handleSearch(value)
                    }}>
                Search
                </Button>
                <Button variant="outline-secondary" id="button-addon2" onClick={() =>{setValue(''); handleSearch("")}}>
                    Clear
                </Button>
            </InputGroup>
            {isError && <Alert className='alert' variant="danger">
                <p>Invalid Search !</p>
            </Alert>}
        </Stack>

    );
};

export default SearchInput;