import useMarvelService      from '../../services/MarverServices';
import Spinner               from '../spinner/spinner';
import ErrorMessage          from '../errorMessage/errorMessage';
import React,{useState,useEffect ,useRef} from 'react';
import PropTypes             from 'prop-types';
import {Link}                from 'react-router-dom';



import './comicsList.scss';

const ComicsList = (props) => {

    const [comicsList,setComics]       = useState([]);
    const [newItemLoading,setTimeLoad] = useState(false);
    const [offset,setOffset]           = useState(0);
    const [comicsEnded,setComicsEnded] = useState(false);


    const {loading,error,getAllComics} = useMarvelService();

    useEffect(()=>{
        onRequest(offset,true);
    },[])


    const onRequest = (offset,initial) => {
        initial ? setTimeLoad(false) : setTimeLoad(true);
        getAllComics(offset)
        .then(onComicsLoaded);
    }

    const onComicsLoaded = (newcomicslist) => {

        let ended = false;
        if(newcomicslist.length < 8){
            ended = true;
        }

        setComics([...comicsList, ...newcomicslist]);
        setTimeLoad(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }


    const itemsRef = useRef([]);


  

    function renderItems(arr) {

        const items =  arr.map((item,i) => {

             return (
                <li  className="comics__item" 
                key={i} 
                tabIndex={0}
                ref={el => itemsRef.current[i] = el}
                onClick={()=>{
                   props.onComicsSelected(item.id);
                }}
                onKeyPress={(e)=>{
                   if(e.key === ' ' || e.key === 'Enter'){
                       props.ComicsSelected(item.id);
                   }
                }} >
                    <Link  to="/single">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        });
        
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }


    const items                    = renderItems(comicsList);
    const errorMessage             = error ? <ErrorMessage/> : null;
    const spinner                  = loading && !newItemLoading ? <Spinner/> : null;


        return (
            <div className="comics__list">
                {errorMessage}
                {spinner}
                {items}
            <button 
                disabled={newItemLoading} 
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
        )

}
ComicsList.propTypes = {
    onComicsSelected:PropTypes.func.isRequired
}


export default ComicsList;