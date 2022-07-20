import './App.css';
import Comics from './Comics';
import CharacterDetails from './CharacterDetails';
import Series from './Series';
import ComicDetails from './ComicDetails';
import SeriesDetails from './SeriesDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Characters from './Characters';
import Home from './Home';
import { Container } from 'react-bootstrap';
import Header from './Header';
import NotFound from './NotFound';

function App() {


  return (
    <BrowserRouter>
    <Header/>
    <Container className='pt-5'>
  
    <Routes>
      <Route path="/" element={<Home />}>
        {/* <Route index element={<Home />} />*/}
      </Route>
      <Route path="/characters/page/:pageNum" element={<Characters />}>
         
      </Route> 
      <Route path="/characters/:id" element={<CharacterDetails />} />
      <Route path="/comics/page/:pageNum" element={<Comics />}>
        {/* <Route path="page/:pageNum" element={<Team />} /> */}
      </Route> 
      <Route path="/comics/:id" element={<ComicDetails />} />
      <Route path="/series/page/:pageNum" element={<Series />}>
        {/* <Route path="page/:pageNum" element={<Team />} /> */}
      </Route> 
      <Route path="/series/:id" element={<SeriesDetails />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
    </Container>
    </BrowserRouter>
  );
}

export default App;
