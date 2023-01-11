import React,{lazy,Suspense,useState}         from "react";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import AppHeader    from "../appHeader/AppHeader";
import Spinner      from "../spinner/spinner";

const Page404     = lazy(()=> import('../pages/404'));
const MainPage    = lazy(()=> import('../pages/MainPage'));
const ComicsList  = lazy(()=> import('../comicsList/ComicsList')); 
const SingleComic = lazy(()=> import('../singleComic/SingleComic'));

const App = () => {

    const [selectedComics,setComics] = useState(null);


    const onComicsSelected = (id) => {

        setComics(id);

    }

    return (
    <Router>
        <div className="app">
            <AppHeader/>
            <main>
               <Suspense fallback={<Spinner/>}>
                    <Routes>

                <Route  path='/' element={<MainPage/>}/>

                <Route  path='/comics' element={<ComicsList onComicsSelected={onComicsSelected}/>}/>

                <Route  path='/single' element={<SingleComic comicsId={selectedComics}/>}/>

                <Route  path="*" element={<Page404 />}/>
            
            </Routes>
               </Suspense>
            </main>
        </div>
    </Router>
    )
}



  

export default App;