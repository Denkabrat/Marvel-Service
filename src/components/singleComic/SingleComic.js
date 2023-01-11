import './singleComic.scss';
import {useState,useEffect} from 'react';
import useMarvelService     from '../../services/MarverServices';
import Spinner              from '../spinner/spinner';
import ErrorMessage         from '../errorMessage/errorMessage';
import PropTypes            from 'prop-types';
import {Link}               from 'react-router-dom';
import ComicsList           from '../comicsList/ComicsList';


const SingleComic = (props) => {

    const [comics,setComics] = useState(null);

    const {loading,error,getComics,clearError} = useMarvelService();


    useEffect(()=>{
        updateComics();
    },[props.comicsId])


    const updateComics = () => {
        
        const {comicsId} = props;

        if (!comicsId) {
            return;
        }
        clearError();
        getComics(comicsId)
            .then(onComicsLoaded);
    }


    const onComicsLoaded = (comics) => {
        setComics(comics);
    }

    

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner      = loading ? <Spinner/> : null ;
    const content      = !(loading || error || !comics) ? <View comics={comics}/>  : null;

    

    return (
        <div className="comics__info">
           {errorMessage}
           {spinner}
           {content}
        </div>
    )
 }

    const View = ({comics}) => {

        const {title, description, thumbnail, language, price ,pageCount} = comics;

       
        return(
            <>
            
            <div className="single-comic">
                    <img src={thumbnail} alt={title} className='single-comic'/>
                    <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                        <p className="single-comic__descr">{description}</p>
                        <p className="single-comic__descr">{pageCount}</p>
                        <p className="single-comic__descr">{language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                    <Link  to="/comics" className="single-comic__back">Back to all</Link>
            </div>   

            </>
        );
    }

    SingleComic.propTypes = {
        comicsId: PropTypes.number
    }

export default SingleComic;








   

      






