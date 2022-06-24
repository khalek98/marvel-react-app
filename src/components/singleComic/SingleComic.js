import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelSerice from '../../services/MarvelSerice';

import './singleComic.scss';

const SingleComic = ({comicId, onComicSelected}) => {
    const [comic, setComic] = useState(null)

    const {loading, error, getComic, clearError} = useMarvelSerice();

    useEffect(() => {
        clearError()
        getComic(comicId)
            .then(onComicLoaded)
    }, [comicId])
    
    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
            <a href="#" 
                className="single-comic__back"
                onClick={() => onComicSelected(null)}>Back to all
            </a>
        </div>
    )
}

const View = ({comic}) => {
    const {title, thumbnail, description, pageCount, price, language} = comic;

    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info ">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
        </>
    )
}

export default SingleComic;